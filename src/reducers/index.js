/*
    File contains all reducers and exports a combinedReducers
*/

import { combineReducers } from 'redux';

// Sets current elements in array to be swapped for highlighting
const currentSwappersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_SWAPPERS':
      return action.payload;
    default:
      return state;
  }
};

// Sets current state of array for body
const currentArrayReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARRAY':
      return action.payload;
    default:
      return state;
  }
};

// Sets current elements being evalutated
const currentFocusedElementsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_FOCUSED_ELEMENTS':
      return action.payload;
    default:
      return state;
  }
};
// Update the list of elements sorted in their final positions
const currentSortedReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_SORTED':
      if (action.payload.length) {
        // Concatenate the payload elements to the current list
        return state.slice(0).concat(action.payload);
      }
      return [];
    default:
      return state;
  }
};
// Update the state of isRunning
const isRunningReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_RUNNING':
      return action.payload;
    default:
      return state;
  }
};

// Update the currently selected algorithm
const currentAlgorithmReducer = (state = 'bubbleSort', action) => {
  switch (action.type) {
    case 'SET_CURRENT_ALGORITHM':
      return action.payload;
    default:
      return state;
  }
};

// Update speed
const currentSpeedReducer = (state = 300, action) => {
  switch (action.type) {
    case 'SET_SPEED':
      return action.payload;
    default:
      return state;
  }
};

const currentMergeFocusedReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_MERGE_FOCUSED':
      return action.payload;
    default:
      return state;
  }
};

const currentQuickFocusedReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_QUICK_FOCUSED':
      return action.payload;
    default:
      return state;
  }
};

const currentPivotReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PIVOT':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  currentPivot: currentPivotReducer,
  currentQuickFocused: currentQuickFocusedReducer,
  currentMergeFocused: currentMergeFocusedReducer,
  speed: currentSpeedReducer,
  isRunning: isRunningReducer,
  currentBubbleFocused: currentFocusedElementsReducer,
  array: currentArrayReducer,
  currentSorted: currentSortedReducer,
  currentSwappers: currentSwappersReducer,
  currentAlgorithm: currentAlgorithmReducer,
});
