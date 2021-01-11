import {
  setCurrentSwappers,
  setArray,
  setCurrentQuickFocused,
  setCurrentPivot,
  setCurrentSorted,
  setIsRunning,
} from '../actionCreators';

function quickSort(stateArray, dispatch, speed, getSpeed, getIsRunning) {
  let array = stateArray.slice(0),
    frames = [];
  quickSortHelper(array, 0, array.length - 1, frames);

  setTimeout(() => {
    dispatchFrames(frames, dispatch, array, speed, getSpeed, getIsRunning);
    return array;
  }, 100);
}

function quickSortHelper(array, start, end, frames) {
  if (start >= end) {
    frames.push([true, start]);
    return;
  }
  let pivot = start,
    left = start + 1,
    right = end;
  frames.push(pivot);
  frames.push([left, right]);
  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      frames.push([left, right, true]);
      let temp = array[right];
      array[right] = array[left];
      array[left] = temp;
      frames.push(array.slice(0));
      frames.push([]);
    }
    if (array[right] >= array[pivot]) {
      right--;
    }
    if (array[left] <= array[pivot]) {
      left++;
    }
    if (right >= left) frames.push([left, right]);
  }
  frames.push([pivot, right]);
  if (pivot !== right) {
    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
    frames.push([pivot, right, true]);
    frames.push(array.slice(0));
    frames.push([]);
    frames.push([true, right]);
  }
  quickSortHelper(array, start, right - 1, frames);
  quickSortHelper(array, right + 1, end, frames);
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
    dispatch(setCurrentQuickFocused([]));
    dispatch(setCurrentPivot(null));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentSorted([]));

    return;
  }
  // Frames is empty and array is sorted
  speed = getSpeed();

  if (!frames.length) {
    dispatch(setCurrentPivot(null));
    dispatch(setCurrentQuickFocused(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentQuickFocused([]));
      dispatch(setIsRunning(false));
    }, 900);
    return;
  }
  let dispatchFunc = !(frames[0] instanceof Array)
    ? setCurrentPivot
    : frames[0].length > 3
    ? setArray
    : frames[0].length !== 2
    ? setCurrentSwappers
    : frames[0].length === 2 && typeof frames[0][0] === 'boolean'
    ? setCurrentSorted
    : setCurrentQuickFocused;
  dispatch(dispatchFunc(frames.shift()));
  if (dispatchFunc === setCurrentPivot)
    dispatch(setCurrentQuickFocused(frames.shift()));
  setTimeout(() => {
    dispatchFrames(frames, dispatch, array, speed, getSpeed, getIsRunning);
  }, speed);
}

export default quickSort;
