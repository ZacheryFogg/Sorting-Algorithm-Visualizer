import {
  setCurrentSwappers,
  setArray,
  setCurrentSelectionFocused,
  setCurrentSorted,
  setIsRunning,
  setCurrentInsertionShifter,
} from '../actionCreators';
/*
Types: shift

*/
const insertionSort = (stateArr, dispatch, speed, getSpeed, getIsRunning) => {
  let array = stateArr.slice(0);
  let frames = [];

  // go through each element in array starting at index 1
  for (let i = 1; i < array.length; i++) {
    // push a frame showing the current index that holds the element to be shifted
    frames.push(['shift', i, array.slice(0)]);
    let j = i - 1;
    let key = array[i];
    // while element is larger than element to it's left, keep swapping
    frames.push(['focus', [j]]);
    let skip = j;
    while (j >= 0 && array[j] > key) {
      frames.push(['swap', [j]]);
      array[j + 1] = array[j];
      array[j] = key;

      frames.push(['shift', j, array.slice(0)]);
      j--;
      if (j >= 0) frames.push(['focus', [j]]);
    }
    array[j + 1] = key;
    frames.push(['empty']);
  }
  frames.push(['final', array.slice(0)]);

  console.log(array);
  setTimeout(() => {
    dispatchFrames(frames, dispatch, array, speed, getSpeed, getIsRunning);
    return array;
  }, 100);
};

const dispatchFrames = (
  frames,
  dispatch,
  arr,
  speed,
  getSpeed,
  getIsRunning
) => {
  if (!getIsRunning()) {
    dispatch(setCurrentSelectionFocused([]));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentSorted([]));
    dispatch(setCurrentInsertionShifter(null));
    dispatch(setIsRunning(false));
    return;
  }
  speed = getSpeed();
  if (!frames.length) {
    dispatch(setCurrentSelectionFocused(arr.map((val, index) => index)));

    setTimeout(() => {
      dispatch(setCurrentSelectionFocused([]));
      dispatch(setCurrentSorted(arr.map((num, index) => index)));
      dispatch(setCurrentInsertionShifter(null));
      dispatch(setCurrentSwappers([]));
      dispatch(setIsRunning(false));
    }, speed);
    return;
  }
  // min focus swap arr empy
  let dispatchFunc = null;
  const method = frames[0][0];
  let outFrame = [];
  //frame represents whole array
  if (method === 'swap') {
    outFrame = frames[0][1];
    dispatch(setCurrentSelectionFocused([]));
    dispatchFunc = setCurrentSwappers;
  } else if (method === 'shift') {
    outFrame = frames[0][1];
    dispatchFunc = setCurrentInsertionShifter;
    dispatch(setArray(frames[0][2]));
    dispatch(setCurrentSwappers([]));
  } else if (method === 'focus') {
    outFrame = frames[0][1];
    dispatchFunc = setCurrentSelectionFocused;
  } else if (method === 'final') {
    outFrame.push(frames[0][1]);
    dispatchFunc = setCurrentSorted;
  } else if (method === 'empty') {
    dispatchFunc = setCurrentSwappers;
    dispatch(setCurrentSelectionFocused([]));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentInsertionShifter(null));
  }

  // Dispatch the leading frame and pop it off the frame list
  dispatch(dispatchFunc(outFrame));

  // Recursively call dispatchFrames with updated frames after specified time
  frames.shift();
  setTimeout(() => {
    dispatchFrames(frames, dispatch, arr, speed, getSpeed, getIsRunning);
  }, speed);
};

export default insertionSort;
