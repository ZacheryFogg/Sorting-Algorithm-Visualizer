/*
    File contains all action creators 
*/

// Creates action to render paid or elements about to swap
// arr refers to the array of two elements passed in
export const setCurrentSwappers = (arr) => {
  return {
    type: 'SET_CURRENT_SWAPPERS',
    payload: arr,
  };
};

// Creates action to set the state of the entire array - when the element positions
// have changed:   arr refers to the entire array
export const setArray = (arr) => {
  return {
    type: 'SET_ARRAY',
    payload: arr,
  };
};

// Creates action to set the current two elements being considered for a swap
// arr refers to the two elements being considered
export const setCurrentFocusedElements = (arr) => {
  return {
    type: 'SET_CURRENT_FOCUSED_ELEMENTS',
    payload: arr,
  };
};

// Creates action to set the current portion of the array that is sorted
// element refers to the element that should be added to the portion of elements sorted
export const setCurrentSorted = (element) => {
  return {
    type: 'SET_CURRENT_SORTED',
    payload: element,
  };
};

// Create action to set the status of isRunning depending on if the array sorting
// animation is running or not
export const setIsRunning = (val) => {
  return {
    type: 'SET_IS_RUNNING',
    payload: val,
  };
};

// Create action to update the currently selected sorting algorithm
export const setCurrAlgorithm = (alg) => {
  return {
    type: 'SET_CURR_ALGORITHM',
    payload: alg,
  };
};

export const setCurrSpeed = (val) => {
  return {
    type: 'SET_SPEED',
    payload: val,
  };
};
