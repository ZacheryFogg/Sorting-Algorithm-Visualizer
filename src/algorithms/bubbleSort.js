//Import action creators to handle updating array visual
import {
  setCurrentSwappers,
  setArray,
  setCurrentFocusedElements,
  setCurrentSorted,
  setIsRunning,
} from '../actionCreators';

// Speed at which final frame updates

// Function sorts array and creates array of frames to be rendered
const bubbleSort = (stateArr, dispatch, speed, getSpeed, getIsRunning) => {
  // New array as to avoid mutating the original state
  let arr = stateArr.slice(0);
  // Array to hold 'frames' to be rendered
  let frames = [];
  let sorted = false;
  let iteration = 0;

  // Bubble sort algorithm
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < arr.length - 1 - iteration; i++) {
      // Push current elements being considered for swap
      frames.push([i, i + 1]);
      if (arr[i] > arr[i + 1]) {
        // Push a frame that represents that these will be highlighted for swapping
        frames.push([i, i + 1, true]);
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        sorted = false;
        // Push the updated array as a frame to render
        frames.push(arr.slice(0));
        // Push an empty to frame
        frames.push([]);
      }
    }
    // Push a frame that represents that the
    // element at the given index is in its final place
    frames.push([true, arr.length - 1 - iteration]);
    iteration++;
  }
  setTimeout(() => {
    dispatchFrames(frames, dispatch, arr, speed, getSpeed, getIsRunning);
    return arr;
  }, 100);
};

// Function recursively calls itself while dispatching frames to be rendered with
// a pause of 'speed' time inbetween.

const dispatchFrames = (
  frames,
  dispatch,
  arr,
  speed,
  getSpeed,
  getIsRunning
) => {
  /*
    TODO: 
    
    add an isRunning check to allow the user to stop the program
    clears timeouts and catches in initial condition that returns unitl 
    animation is complete 
    */
  if (!getIsRunning()) {
    /*
        setCurrentSwappers,
  setArray,
  setCurrentFocusedElements,
  setCurrentSorted,
        */
    dispatch(setCurrentFocusedElements([]));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentSorted([]));

    return;
  }
  // Frames is empty and array is sorted
  speed = getSpeed();

  if (!frames.length) {
    // Dispatch a frame of all to show that all are sorted
    dispatch(setCurrentFocusedElements(arr.map((val, index) => index)));
    // Using timeout dispatch cleanup
    setTimeout(() => {
      // remove highlighting from all elements because algorithm has terminated
      dispatch(setCurrentFocusedElements([]));
      // revert all elements to be highlighted as sorted
      dispatch(setCurrentSorted(arr.map((num, index) => index)));
      // revert isRunning to false as sorting has terminated
      dispatch(setIsRunning(false));
    }, speed);
    return;
  }
  // Frames is empty

  // Determine the dispatch function to call the frames with
  let dispatchFunc = null;
  const leadingFrameLen = frames[0].length;
  // If length is greater than 3 then this frame represents the entire array
  if (leadingFrameLen > 3) {
    dispatchFunc = setArray;
  }
  // If length is 3 or 0 then this frame represents the elements that will swap
  // a frame of length 0 meaning that no frames will swap at this iteration
  else if (leadingFrameLen === 3 || leadingFrameLen === 0) {
    dispatchFunc = setCurrentSwappers;
  }
  // If frame is length 2 and contains boolean in first position then this element
  // is to be added to the portion of elements in their final sorted position
  else if (leadingFrameLen === 2 && typeof frames[0][0] === 'boolean') {
    dispatchFunc = setCurrentSorted;
  }
  // Else this frame if of length 2 and contains two elements that are being focused
  else {
    dispatchFunc = setCurrentFocusedElements;
  }

  // Dispatch the leading frame and pop it off the frame list
  dispatch(dispatchFunc(frames.shift()));

  // Recursively call dispatchFrames with updated frames after specified time
  setTimeout(() => {
    dispatchFrames(frames, dispatch, arr, speed, getSpeed, getIsRunning);
  }, speed);
};

export default bubbleSort;
