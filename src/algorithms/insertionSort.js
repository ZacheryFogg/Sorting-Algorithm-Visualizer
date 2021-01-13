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
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      array[j] = key;
      // frame setArrays before the shift is moved down an index. If this loop is not entered then the
      // array has not changed
      //frames.push(['arr', array.slice(0)]);
      // now that array is updated, set next index down as the shifter
      frames.push(['shift', j, array.slice(0)]);
      j--;
    }
    array[j + 1] = key;
    //frames.push(['empty']);
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
  if (method === 'arr') {
    outFrame = frames[0][1];
    dispatchFunc = setArray;
  } else if (method === 'swap') {
    outFrame.push(frames[0][1], frames[0][2]);
    dispatchFunc = setCurrentSwappers;
  } else if (method === 'shift') {
    outFrame = frames[0][1];
    //dispatch(setCurrentSelectionFocused([]));
    dispatchFunc = setCurrentInsertionShifter;
    dispatch(setArray(frames[0][2]));
  } else if (method === 'focus') {
    outFrame.push(frames[0][1]);
    dispatchFunc = setCurrentSelectionFocused;
  } else if (method === 'final') {
    outFrame.push(frames[0][1]);
    dispatchFunc = setCurrentSorted;
  } else if (method !== 'empty') {
    console.log('Error Selection Sort - Method:', method);
  } else {
    dispatchFunc = setCurrentSwappers;
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
