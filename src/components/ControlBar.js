import React, { Suspense, useState } from 'react';
import { connect } from 'react-redux';
import '../styles/controlBar.css';
import Dropdown from './Dropdown';

import {
  setArray,
  setCurrentAlgorithm,
  setCurrentSorted,
  setIsRunning,
  setCurrentSpeed,
  setIsPaused,
} from '../actionCreators';
import bubbleSort from '../algorithms/bubbleSort';
import mergeSort from '../algorithms/mergeSort';
import quickSort from '../algorithms/quickSort';
import heapSort from '../algorithms/heapSort';
import insertionSort from '../algorithms/insertionSort';
import selectionSort from '../algorithms/selectionSort';

//Import action creators
const algOptions = [
  {
    label: 'Bubble Sort',
    value: 'bubbleSort',
  },
  {
    label: 'Selection Sort',
    value: 'selectionSort',
  },
  {
    label: 'Insertion Sort',
    value: 'insertionSort',
  },
  {
    label: 'Heap Sort',
    value: 'heapSort',
  },
  {
    label: 'Merge Sort',
    value: 'mergeSort',
  },
  {
    label: 'Quick Sort',
    value: 'quickSort',
  },
];

const algDescriptions = [
  {
    key: 'bubbleSort',
    desc: `Bubble Sort: Steps through array, comparing 
      adjacent elements and swapping elements incorrectly
       ordered.This leads to an effect where the largest 
       remaining element is "bubbled" to the end of the 
       array every iteration`,
    complexity: 'sq',
  },
  {
    key: 'selectionSort',
    desc: `Selection Sort: Selects the smallest remaining element 
    at every iteration and swaps it to the front of the array`,
    complexity: 'sq',
  },
  {
    key: 'insertionSort',
    desc: `Insertion Sort: Inserts the smallest remaining element in the
    array at it's final sorted position at every iteration`,
    complexity: 'sq',
  },
  {
    key: 'heapSort',
    desc: `Heap Sort: Build a max heap out of the remaining array, select the root
    node which is now the largest element, reheapify the remaining array`,
    complexity: 'log',
  },
  {
    key: 'mergeSort',
    desc: `Merge Sort: Recursively divides array in half, and then merges halves 
    together is sorted order `,
    complexity: 'log',
  },
  {
    key: 'quickSort',
    desc: `Quick Sort: Select an element as the pivot element, place all smaller elements
    before pivot and all larger elements after pivot, recursively quick sort two partitions`,
    complexity: 'log',
  },
];

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
      pauseSort,
      isPaused,
    } = this.props;
    // TODO: Not sure if speed should be here and how is should be calculated

    // TODO: Play with colors
    return (
      <div className="container" id="controlBar">
        <div className="row">
          <div id="dropdown" className="col-3">
            <Dropdown
              label="Select Sorting Algorithm"
              options={algOptions}
            ></Dropdown>
          </div>
          <div className="col-4" id="algDescription">
            <p>
              {
                algDescriptions.find(
                  (element) => element.key === currentAlgorithm
                ).desc
              }
            </p>

            {algDescriptions.find((element) => element.key === currentAlgorithm)
              .complexity === 'sq' ? (
              <p>
                O(N<sup>2</sup>)
              </p>
            ) : (
              <p>O(N LogN)</p>
            )}
          </div>
          <div className="col-3">
            <div id="generateNewArrayBtn">
              <button
                type="button"
                className="btn btn-outline-primary"
                disabled={isRunning ? 'disabled' : null}
                onClick={() => {
                  generateNewArray(array.length);
                }}
              >
                Generate New Array
              </button>
            </div>
            <form>
              <div id="speedRangeContainer" className="form-group">
                <label htmlFor="formControlRange" id="speedRangeLabel">
                  Set Speed
                </label>

                {
                  <input
                    className="form-control-range"
                    id="formControlRange"
                    type="range"
                    min="1"
                    max="2000"
                    value={speed}
                    //disabled={isRunning ? 'disabled' : null}
                    onChange={(event) =>
                      changeSpeed(event.target.valueAsNumber)
                    }
                  />
                }
                <label>{`${speed}ms`}</label>
              </div>
            </form>
            <form>
              <div id="sizeRangeContainer" className="form-group">
                <label htmlFor="formControlRange" id="sizeRangeLabel">
                  Set Array Size
                </label>

                {
                  <input
                    className="form-control-range"
                    id="sizeRangeInput"
                    type="range"
                    min="4"
                    max="125"
                    value={array.length}
                    disabled={isRunning ? 'disabled' : null}
                    onChange={(event) =>
                      generateNewArray(event.target.valueAsNumber)
                    }
                  />
                }
                <label>{`${array.length} elements`}</label>
              </div>
            </form>
          </div>

          <div className="col-2">
            <button
              id="startBtn"
              type="button"
              className="btn btn-outline-success"
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
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => cancelSort()}
            >
              Cancel Sort
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  array,
  currentAlgorithm,
  isRunning,
  speed,
  isPaused,
}) => ({
  array,
  currentAlgorithm,
  isRunning,
  speed,
  isPaused,
});

// action creators that dispatch info to be caught by reducers
const mapDispatchToProps = () => (dispatch, ownProps) => ({
  changeCurrentAlgorithm: (alg) => {
    dispatch(setCurrentAlgorithm(alg));
  },
  generateNewArray: (len = 20, upperBound = 100, lowerBound = 10) => {
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
  pauseSort: (isPaused) => {
    //if already paused, send code to clearTimeout
    if (isPaused) {
      dispatch(setIsPaused(false));
      console.log('Played');
    } else {
      dispatch(setIsPaused(true));
      console.log('Paused');
    }
    //if not paused, send code to start timeout for 24 hours;
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);

/*
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
              <h3>{this.props.currentAlgorithm}</h3>
            </div>
*/
