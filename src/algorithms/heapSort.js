import {
  setCurrentSwappers,
  setArray,
  setCurrentHeapFocused,
  setCurrentSorted,
  setIsRunning,
} from '../actionCreators';

function heapSort(arr, dispatch, speed, getSpeed, getIsRunning) {
  let array = arr.slice(0),
    frames = [];
  buildMaxHeap(array, frames);
  let end = array.length - 1;
  while (end > 0) {
    frames.push([0, end]);
    let temp = array[end];
    array[end] = array[0];
    array[0] = temp;
    frames.push([0, end, true]);
    frames.push(array.slice(0));
    frames.push([]);
    frames.push([true, end]);
    siftDown(array, 0, end, frames);
    end--;
  }
  frames.push([true, end]);
  setTimeout(() => {
    dispatchFrames(frames, dispatch, array, speed, getSpeed, getIsRunning);
    return array;
  }, speed);
}

function buildMaxHeap(array, frames) {
  let currentIndex = Math.floor(array.length / 2);
  while (currentIndex >= 0) {
    siftDown(array, currentIndex, array.length, frames);
    currentIndex--;
  }
}

function siftDown(array, start, end, frames) {
  if (start >= Math.floor(end / 2)) {
    return;
  }
  let left = start * 2 + 1,
    right = start * 2 + 2 < end ? start * 2 + 2 : null,
    swap;
  if (right) {
    frames.push([start, left, right]);
    swap = array[left] > array[right] ? left : right;
  } else {
    frames.push([start, left]);
    swap = left;
  }
  if (array[start] < array[swap]) {
    let temp = array[swap];
    array[swap] = array[start];
    array[start] = temp;
    frames.push([start, swap, true]);
    frames.push(array.slice(0));
    frames.push([]);
    siftDown(array, swap, end, frames);
  }
}

function dispatchFrames(
  frames,
  dispatch,
  array,
  speed,
  getSpeed,
  getIsRunning
) {
  if (!getIsRunning()) {
    dispatch(setCurrentHeapFocused([]));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentSorted([]));

    return;
  }
  // Frames is empty and array is sorted
  speed = getSpeed();
  if (!frames.length) {
    dispatch(setCurrentHeapFocused(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentHeapFocused([]));
      dispatch(setIsRunning(false));
    }, speed);
    return;
  }
  let dispatchFunction =
    frames[0].length > 3
      ? setArray
      : (frames[0].length === 3 && typeof frames[0][2] === 'boolean') ||
        !frames[0].length
      ? setCurrentSwappers
      : frames[0].length === 2 && typeof frames[0][0] === 'boolean'
      ? setCurrentSorted
      : setCurrentHeapFocused;
  dispatch(dispatchFunction(frames.shift()));
  setTimeout(() => {
    dispatchFrames(frames, dispatch, array, speed, getSpeed, getIsRunning);
  }, speed);
}

export default heapSort;
