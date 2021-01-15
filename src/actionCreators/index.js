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
export const setCurrentBubbleFocused = (arr) => {
  return {
    type: 'SET_CURRENT_BUBBLE_FOCUSED',
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
export const setCurrentAlgorithm = (alg) => {
  return {
    type: 'SET_CURRENT_ALGORITHM',
    payload: alg,
  };
};

//Used to modify speed during sorting execution
export const setCurrentSpeed = (val) => {
  return {
    type: 'SET_SPEED',
    payload: val,
  };
};

//
export const setCurrentMergeFocused = (arr) => {
  return {
    type: 'SET_CURRENT_MERGE_FOCUSED',
    payload: arr,
  };
};

export const setCurrentQuickFocused = (arr) => {
  return {
    type: 'SET_CURRENT_QUICK_FOCUSED',
    payload: arr,
  };
};

export const setCurrentPivot = (val) => {
  return {
    type: 'SET_CURRENT_PIVOT',
    payload: val,
  };
};

export const setCurrentHeapFocused = (arr) => {
  return {
    type: 'SET_CURRENT_HEAP_FOCUSED',
    payload: arr,
  };
};

export const setCurrentSelectionFocused = (arr) => {
  return {
    type: 'SET_CURRENT_SELECTION_FOCUSED',
    payload: arr,
  };
};

export const setCurrentSelectionMin = (val) => {
  return {
    type: 'SET_CURRENT_SELECTION_MIN',
    payload: val,
  };
};

export const setCurrentInsertionShifter = (val) => {
  return {
    type: 'SET_CURRENT_INSERTION_SHIFTER',
    payload: val,
  };
};

export const setIsPaused = (val) => {
  return {
    type: 'SET_IS_PAUSED',
    payload: val,
  };
};
