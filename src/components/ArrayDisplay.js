import React from 'react';
import { connect } from 'react-redux';
import '../styles/arrayDisplay.css';
//Import action creators

class ArrayDisplay extends React.Component {
  renderedArray = () => {
    const { array, currFocusedElements, currSorted, currSwappers } = this.props;

    // TODO: make width and margin, fontSize depend on length of array
    const elementWidthVal =
      array.length < 10
        ? 40
        : array.length < 15
        ? 35
        : array.length < 22
        ? 25
        : array.length < 30
        ? 16
        : array.length < 40
        ? 11
        : array.length < 60
        ? 5
        : array.length < 70
        ? 4
        : array.length < 80
        ? 3
        : 2;
    const fontSizeVal =
      array.length < 10
        ? 20
        : array.length < 22
        ? 15
        : array.length < 30
        ? 12
        : array.length < 40
        ? 9
        : 0;
    const elementWidth = `${elementWidthVal}px`;
    const margin = `${1}px`;
    const textColor = 'white';
    const fontSize = `${fontSizeVal}px`;
    if (array.length) {
      return array.map((val, index) => {
        let elementColor = 'purple';

        if (currSwappers.includes(index)) {
          elementColor = 'red';
        }
        // TODO: This is where we will add currentFocused for other algs
        else if (currFocusedElements.includes(index)) {
          elementColor = 'green';
        }
        //TODO: logic for pivot
        else if (currSorted.includes(index)) {
          elementColor = 'blue';
        }
        return (
          <div
            className="arrayElement"
            key={index}
            style={{
              height: `${val * 3}px`,
              width: elementWidth,
              marginLeft: margin,
              marginRight: margin,
              backgroundColor: elementColor,
              color: textColor,
              fontSize: fontSize,
            }}
          >
            {val}
          </div>
        );
      });
    } else {
      return null;
    }
  };
  render() {
    return (
      <div id="arrayDisplay">
        <div id="arrayBody">{this.renderedArray()}</div>
        <div id="legend">
          <div className="legendBlock">
            <div className="colorBlock" id="swapBlock">
              R
            </div>
            <p>
              <strong>Red:</strong> A pair of elements will be swapped
            </p>
          </div>
          <div className="legendBlock">
            <div className="colorBlock" id="finalBlock">
              B
            </div>
            <p>
              <strong>Blue:</strong> An element is in its final position
            </p>
          </div>
          <div className="legendBlock">
            <div className="colorBlock" id="evalBlock">
              G
            </div>
            <p>
              <strong>Green:</strong> A pair of elements is being evaluated
            </p>
          </div>
          <div className="legendBlock">
            <div className="colorBlock" id="unsortedBlock">
              P
            </div>
            <p>
              <strong>Purple:</strong> An element is still unsorted
            </p>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     array: state.array,
//     currFocusedElements: state.currentFocusedElements,
//     currSwappers: state.currSwappers,
//     currSorted: state.currSorted,
//   };
// };
const mapStateToProps = ({
  array,
  currFocusedElements,
  currSwappers,
  currSorted,
}) => ({
  array,
  currFocusedElements,
  currSwappers,
  currSorted,
});
const mapDispatchToProps = () => (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ArrayDisplay);
