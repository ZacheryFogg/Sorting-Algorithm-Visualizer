import {
  setCurrentSwappers,
  setArray,
  setCurrentSelectionFocused,
  setCurrentSorted,
  setIsRunning,
  setCurrentSelectionMin,
} from '../actionCreators';

const selectionSort = (stateArr, dispatch, speed, getSpeed, getIsRunning) => {
  let array = stateArr.slice(0);
  let frames = [];

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    frames.push(['min', minIndex]);
    for (let j = i + 1; j < array.length; j++) {
      frames.push(['focus', j]);
      if (array[minIndex] > array[j]) {
        minIndex = j;
        frames.push(['min', minIndex]);
      }
    }

    if (minIndex !== i) {
      frames.push(['swap', minIndex, i]);
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      frames.push(['arr', array.slice(0)]);
      frames.push(['empty']);
    }

    frames.push(['final', i]);
  }
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
    dispatch(setCurrentSelectionMin(null));
    dispatch(setIsRunning(false));
    return;
  }
  speed = getSpeed();
  if (!frames.length) {
    dispatch(setCurrentSelectionFocused(arr.map((val, index) => index)));

    setTimeout(() => {
      dispatch(setCurrentSelectionFocused([]));
      dispatch(setCurrentSorted(arr.map((num, index) => index)));
      dispatch(setCurrentSelectionMin(null));
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
  } else if (method === 'min') {
    outFrame = frames[0][1];
    dispatch(setCurrentSelectionFocused([]));
    dispatchFunc = setCurrentSelectionMin;
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
export default selectionSort;
