import React from 'react';
import { connect } from 'react-redux';
import '../styles/controlBar.css';

import {
  setArray,
  setCurrAlgorithm,
  setCurrentSorted,
  setIsRunning,
} from '../actionCreators';
import bubbleSort from '../algorithms/bubbleSort';

//Import action creators

class ControlBar extends React.Component {
  componentDidMount() {
    /*
      TODO: 
      - give generate array proper args
      - make scroll bar for speed start at 50 out of 100

    */
    this.props.generateNewArray();
  }

  handleSizeChange(event) {
    /*
      TODO:
      - allow size of array to be changed depending on slider postition
    */
  }
  handleSpeedChange(event) {
    /*
      TODO:
      - allow speed to change based on position of slider
      would like speed to a state property that can be changed
    */
  }
  render() {
    const {
      array,
      currAlgorithm,
      startSort,
      generateNewArray,
      changeCurrAlgorithm,
      isRunning,
    } = this.props;
    // TODO: Not sure if speed should be here and how is should be calculated
    const speed = 100;
    // TODO: Play with colors
    const textColor = 'purple';

    return (
      <div id="controlBar">
        <div id="generateNewArrayBtn">
          <button
            onClick={() => {
              generateNewArray(array.length);
            }}
          >
            Generate New Array
          </button>
        </div>
        <div>{/*Add Speed Slider and associated logic*/}</div>
        <div>{/*Add Size Slider and associated logic*/}</div>
        <div>{/*Add Ability to change Algorithms*/}</div>
        <div>
          <button
            id="startSortBtn"
            onClick={() => {
              startSort(currAlgorithm, array, speed);
            }}
          >
            Start Sort
          </button>
        </div>
      </div>
    );
  }
}

// Get state from store and map to props
// const mapStateToProps = (state, ownProps) => {
//   return {
//     array: state.array,
//     currAlgorithm: state.currAlgorithm,
//     isRunning: state.isRunning,
//   };
// };
const mapStateToProps = ({ array, currAlgorithm, isRunning }) => ({
  array,
  currAlgorithm,
  isRunning,
});

// action creators that dispatch info to be caught by reducers
const mapDispatchToProps = () => (dispatch) => ({
  changeCurrAlgorithm: (alg) => {
    dispatch(setCurrAlgorithm(alg));
  },
  generateNewArray: (len = 20, upperBound = 100, lowerBound = 20) => {
    let randomArr = [];
    // push n random numbers between bounds to randomArr
    for (let i = 0; i < len; i++) {
      let num = Math.floor(Math.random() * upperBound) + lowerBound;
      if (num > upperBound) {
        num = (num % upperBound) + lowerBound;
      }
      randomArr.push(num);
    }
    dispatch(setArray(randomArr));
    dispatch(setCurrentSorted([]));
  },
  startSort: (alg, arr, speed) => {
    // Determine sort to launch
    let sortingAlg = bubbleSort;
    // Nothing has been sorted so pass nothing
    dispatch(setCurrentSorted([]));
    dispatch(setIsRunning(true));
    // start sorting alg
    sortingAlg(arr, dispatch, speed);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
