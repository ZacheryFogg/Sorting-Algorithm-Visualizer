import React from 'react';
import { connect } from 'react-redux';
import '../styles/controlBar.css';

import {
  setArray,
  setCurrAlgorithm,
  setCurrentSorted,
  setIsRunning,
  setCurrSpeed,
} from '../actionCreators';
import bubbleSort from '../algorithms/bubbleSort';

//Import action creators

class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.callbackChangeSpeedBound = this.callbackChangeSpeed.bind(this);
    this.callbackIsRunningBound = this.callbackIsRunning.bind(this);
  }
  componentDidMount() {
    /*
      TODO: 
      - give generate array proper args
      - make scroll bar for speed start at 50 out of 100

    */
    this.props.generateNewArray();
  }

  handleSizeChange(event) {
    //calc bounds

    this.props.generateNewArray(event.target.valueAsNumber);
    console.log(event.target.valueAsNumber);
  }
  handleSpeedChange(event) {
    this.props.changeSpeed(event.target.valueAsNumber);
  }

  callbackChangeSpeed() {
    return this.props.speed;
  }

  callbackIsRunning() {
    return this.props.isRunning;
  }
  render() {
    const {
      array,
      currAlgorithm,
      startSort,
      cancelSort,
      generateNewArray,
      //changeCurrAlgorithm,
      isRunning,
      speed,
    } = this.props;
    // TODO: Not sure if speed should be here and how is should be calculated

    // TODO: Play with colors
    return (
      <div id="controlBar">
        <div id="generateNewArrayBtn">
          <button
            disabled={isRunning ? 'disabled' : null}
            onClick={() => {
              generateNewArray(array.length);
            }}
          >
            Generate New Array
          </button>
        </div>
        <div id="speedRangeContainer">
          <label id="speedRangeLabel">Set Speed:</label>

          {
            <input
              id="speedRangeInput"
              type="range"
              min="1"
              max="1000"
              value={speed}
              //disabled={isRunning ? 'disabled' : null}
              onChange={(event) => this.handleSpeedChange(event)}
            />
          }
        </div>
        <div id="sizeRangeContainer">
          <label id="sizeRangeLabel">Set Array Size:</label>

          {
            <input
              id="sizeRangeInput"
              type="range"
              min="4"
              max="90"
              value={array.length}
              disabled={isRunning ? 'disabled' : null}
              onChange={(event) => this.handleSizeChange(event)}
            />
          }
        </div>
        <div>{/*Add Ability to change Algorithms*/}</div>
        <div>
          <button
            id="startSortBtn"
            disabled={isRunning ? 'disabled' : null}
            onClick={() => {
              startSort(
                currAlgorithm,
                array,
                speed,
                this.callbackChangeSpeedBound,
                this.callbackIsRunningBound
              );
            }}
          >
            Start Sort
          </button>
        </div>
        <div>
          <button onClick={() => cancelSort()}>Cancel Sort</button>
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
const mapStateToProps = ({ array, currAlgorithm, isRunning, speed }) => ({
  array,
  currAlgorithm,
  isRunning,
  speed,
});

// action creators that dispatch info to be caught by reducers
const mapDispatchToProps = () => (dispatch) => ({
  changeCurrAlgorithm: (alg) => {
    dispatch(setCurrAlgorithm(alg));
  },
  generateNewArray: (len = 20, upperBound = 100, lowerBound = 5) => {
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
  startSort: (
    alg = bubbleSort,
    arr,
    speed,
    callbackChangeSpeed,
    callbackIsRunning
  ) => {
    // Determine sort to launch
    let sortingAlg = bubbleSort;
    // Nothing has been sorted so pass nothing
    dispatch(setCurrentSorted([]));
    dispatch(setIsRunning(true));
    // start sorting alg
    sortingAlg(arr, dispatch, speed, callbackChangeSpeed, callbackIsRunning);
  },
  //TODO: add pause resume mechanism maybe, would work differently to cancel sort
  cancelSort: () => {
    dispatch(setIsRunning(false));
  },
  changeSpeed: (val) => {
    dispatch(setCurrSpeed(val));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
