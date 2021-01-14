import React from 'react';
import { connect } from 'react-redux';
import '../styles/arrayDisplay.css';
//Import action creators

class ArrayDisplay extends React.Component {
  renderedArray = () => {
    const {
      array,
      currentBubbleFocused,
      currentSorted,
      currentSwappers,
      currentMergeFocused,
      currentQuickFocused,
      currentPivot,
      currentHeapFocused,
      currentSelectionFocused,
      currentSelectionMin,
      currentInsertionShifter,
    } = this.props;

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
        ? 9
        : array.length < 75
        ? 7
        : array.length < 90
        ? 6
        : 4;
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
    const borderRadiusVal =
      array.length < 22 ? 4 : array.length < 30 ? 3 : array.length < 70 ? 2 : 1;
    const borderWidthVal = array.length < 40 ? 2 : 0;
    const borderWidth = `${borderWidthVal}px`;
    const borderRadius = `${borderRadiusVal}px`;
    const elementWidth = `${elementWidthVal}px`;
    const margin = `${1}px`;
    const textColor = 'white';
    const fontSize = `${fontSizeVal}px`;
    if (array.length) {
      return array.map((val, index) => {
        let elementColor = 'purple';

        if (currentSwappers.includes(index)) {
          elementColor = 'red';
        }
        // TODO: This is where we will add currentFocused for other algs
        else if (
          currentMergeFocused.includes(index) ||
          currentBubbleFocused.includes(index) ||
          currentQuickFocused.includes(index) ||
          currentHeapFocused.includes(index) ||
          currentSelectionFocused.includes(index)
        ) {
          elementColor = 'green';
        } else if (
          currentPivot === index ||
          currentSelectionMin === index ||
          currentInsertionShifter === index
        ) {
          elementColor = 'orange';
        }

        //TODO: logic for pivot
        else if (currentSorted.includes(index)) {
          elementColor = 'blue';
        }
        return (
          <div
            className="arrayElement"
            key={index}
            style={{
              height: `${val * 4}px`,
              width: elementWidth,
              marginLeft: margin,
              marginRight: margin,
              backgroundColor: elementColor,
              color: textColor,
              fontSize: fontSize,
              borderRadius: borderRadius,
              borderWidth: borderWidth,
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

const mapStateToProps = ({
  array,
  currentBubbleFocused,
  currentSwappers,
  currentSorted,
  currentMergeFocused,
  currentQuickFocused,
  currentPivot,
  currentHeapFocused,
  currentSelectionFocused,
  currentSelectionMin,
  currentInsertionShifter,
}) => ({
  array,
  currentBubbleFocused,
  currentSwappers,
  currentSorted,
  currentMergeFocused,
  currentQuickFocused,
  currentPivot,
  currentHeapFocused,
  currentSelectionFocused,
  currentSelectionMin,
  currentInsertionShifter,
});
const mapDispatchToProps = () => (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ArrayDisplay);
