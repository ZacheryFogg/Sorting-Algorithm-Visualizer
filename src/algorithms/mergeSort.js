import {
  setArray,
  setCurrentMergeFocused,
  setCurrentSwappers,
  setIsRunning,
  setCurrentSorted,
} from '../actionCreators';

function mergeSort(stateArray, dispatch, speed, getSpeed, getIsRunning) {
  let array = stateArray.slice(0),
    frames = [];
  let finalArray = mergeSortHelper(
    array.map((num, idx) => [num, idx]),
    frames,
    0,
    array.length - 1,
    { array: array.slice(0) }
  );
  setTimeout(() => {
    handleDispatch(frames, dispatch, finalArray, speed, getSpeed, getIsRunning);
  }, 100);
}

function mergeSortHelper(array, frames, start, end, obj) {
  if (array.length === 1) {
    return array;
  }
  let half = Math.floor(array.length / 2),
    first = array.slice(0, half),
    second = array.slice(half),
    indexHalf = Math.floor((end + 1 + start) / 2),
    actualFirst = mergeSortHelper(first, frames, start, indexHalf - 1, obj),
    actualSecond = mergeSortHelper(second, frames, indexHalf, end, obj),
    isFinalMerge = false;
  if (actualFirst.length + actualSecond.length === obj.array.length)
    isFinalMerge = true;
  return actualSort(
    actualFirst,
    actualSecond,
    frames,
    obj,
    start,
    end,
    isFinalMerge
  );
}

function actualSort(first, second, frames, obj, start, end, isFinalMerge) {
  let sortedArray = [];
  let indexToPush = start;
  while (first.length && second.length) {
    frames.push([first[0][1], second[0][1]]);
    if (first[0][0] <= second[0][0]) {
      indexToPush++;
      sortedArray.push(first.shift());
    } else {
      frames.push([first[0][1], second[0][1], true]);
      second[0][1] = indexToPush++;
      sortedArray.push(second.shift());
      first.forEach((subArr) => subArr[1]++);
      if (start === 0) {
        obj.array = sortedArray
          .map((subArr) => subArr[0])
          .concat(first.map((subArr) => subArr[0]))
          .concat(second.map((subArr) => subArr[0]))
          .concat(obj.array.slice(end + 1));
      } else {
        obj.array = obj.array
          .slice(0, start)
          .concat(sortedArray.map((subArr) => subArr[0]))
          .concat(first.map((subArr) => subArr[0]))
          .concat(second.map((subArr) => subArr[0]))
          .concat(obj.array.slice(end + 1));
      }
      frames.push(obj.array.concat([indexToPush - 1, indexToPush]));
      frames.push([]);
    }
    if (isFinalMerge) frames.push([true, indexToPush - 1]);
  }
  return sortedArray.concat(first).concat(second);
}

function handleDispatch(
  frames,
  dispatch,
  array,
  speed,
  getSpeed,
  getIsRunning
) {
  if (!getIsRunning()) {
    dispatch(setCurrentMergeFocused([]));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentSorted([]));

    return;
  }
  speed = getSpeed();
  if (!frames.length) {
    dispatch(setCurrentMergeFocused(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentMergeFocused([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setIsRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction =
    frames[0].length > 3
      ? setArray
      : (frames[0].length === 3 && typeof frames[0][2] === 'boolean') ||
        frames[0].length === 0
      ? setCurrentSwappers
      : frames[0].length === 2 && typeof frames[0][0] === 'boolean'
      ? setCurrentSorted
      : setCurrentMergeFocused;
  if (dispatchFunction === setArray) {
    let currentframes = frames.shift();
    dispatch(
      dispatchFunction(currentframes.slice(0, currentframes.length - 2))
    );
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentMergeFocused([]));
    dispatch(
      setCurrentSwappers([
        currentframes[currentframes.length - 2],
        currentframes[currentframes.length - 1],
      ])
    );
    dispatch(
      setCurrentMergeFocused([
        currentframes[currentframes.length - 2],
        currentframes[currentframes.length - 1],
      ])
    );
  } else {
    dispatch(dispatchFunction(frames.shift()));
  }
  setTimeout(() => {
    handleDispatch(frames, dispatch, array, speed, getSpeed, getIsRunning);
  }, speed);
}

export default mergeSort;
