import React from 'react';
import { connect } from 'react-redux';
import '../styles/controlBar.css';

import {
  setArray,
  setCurrentAlgorithm,
  setCurrentSorted,
  setIsRunning,
  setCurrentSpeed,
} from '../actionCreators';
import bubbleSort from '../algorithms/bubbleSort';
import mergeSort from '../algorithms/mergeSort';
import quickSort from '../algorithms/quickSort';
import heapSort from '../algorithms/heapSort';
import insertionSort from '../algorithms/insertionSort';
import selectionSort from '../algorithms/selectionSort';

//Import action creators

class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.callbackChangeSpeedBound = this.callbackChangeSpeed.bind(this);
    this.callbackIsRunningBound = this.callbackIsRunning.bind(this);
  }
  componentDidMount() {
    this.props.generateNewArray();
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
      currentAlgorithm,
      startSort,
      cancelSort,
      generateNewArray,
      changeCurrentAlgorithm,
      changeSpeed,
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
              onChange={(event) => changeSpeed(event.target.valueAsNumber)}
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
              onChange={(event) => generateNewArray(event.target.valueAsNumber)}
            />
          }
        </div>
        <div id="algSelection">
          <button
            onClick={() => {
              changeCurrentAlgorithm('bubbleSort');
            }}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => {
              changeCurrentAlgorithm('mergeSort');
            }}
          >
            Merge Sort
          </button>
          <button
            onClick={() => {
              changeCurrentAlgorithm('quickSort');
            }}
          >
            Quick Sort
          </button>
          <button
            onClick={() => {
              changeCurrentAlgorithm('heapSort');
            }}
          >
            Heap Sort
          </button>
          <button
            onClick={() => {
              changeCurrentAlgorithm('selectionSort');
            }}
          >
            Selection Sort
          </button>
          <button
            onClick={() => {
              changeCurrentAlgorithm('insertionSort');
            }}
          >
            Insertion Sort
          </button>
          <h1>{this.props.currentAlgorithm}</h1>
        </div>
        <div>
          <button
            id="startSortBtn"
            disabled={isRunning ? 'disabled' : null}
            onClick={() => {
              startSort(
                currentAlgorithm,
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

const mapStateToProps = ({ array, currentAlgorithm, isRunning, speed }) => ({
  array,
  currentAlgorithm,
  isRunning,
  speed,
});

// action creators that dispatch info to be caught by reducers
const mapDispatchToProps = () => (dispatch) => ({
  changeCurrentAlgorithm: (alg) => {
    dispatch(setCurrentAlgorithm(alg));
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
    alg = 'bubbleSort',
    arr,
    speed,
    callbackChangeSpeed,
    callbackIsRunning
  ) => {
    // Determine sort to launch
    let sortingAlg =
      alg === 'bubbleSort'
        ? bubbleSort
        : alg === 'quickSort'
        ? quickSort
        : alg === 'heapSort'
        ? heapSort
        : alg === 'mergeSort'
        ? mergeSort
        : alg === 'insertionSort'
        ? insertionSort
        : alg === 'selectionSort'
        ? selectionSort
        : null;
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
    dispatch(setCurrentSpeed(val));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
