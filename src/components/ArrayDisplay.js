import React from 'react';
import { connect } from 'react-redux';
import '../styles/arrayDisplay.css';
//Import action creators

class ArrayDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.yellowColor = '#ffd319';
    this.orangeColor = '#ff901f';
    this.pinkColor = '#ff2975';
    this.lightPurpleColor = '#f222ff';
    this.darkPurpleColor = '#8c1eff';
  }
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
        ? 13
        : array.length < 30
        ? 10
        : array.length < 40
        ? 0
        : 0;
    const borderRadiusVal =
      array.length < 22 ? 4 : array.length < 30 ? 3 : array.length < 70 ? 2 : 1;
    const borderWidthVal = array.length < 30 ? 2 : 0;
    const borderWidth = `${borderWidthVal}px`;
    const borderRadius = `${borderRadiusVal}px`;
    const elementWidth = `${elementWidthVal}px`;
    const margin = `${1}px`;
    const textColor = 'white';
    const fontSize = `${fontSizeVal}px`;
    const yellowColor = '#ffd319';
    const orangeColor = '#ff901f';
    const pinkColor = '#ff2975';
    const lightPurpleColor = '#f222ff';
    const darkPurpleColor = '#8c1eff';
    if (array.length) {
      return array.map((val, index) => {
        let elementColor = this.darkPurpleColor; // purple

        if (currentSwappers.includes(index)) {
          elementColor = this.orangeColor; // redish pink
        }
        // TODO: This is where we will add currentFocused for other algs
        else if (
          currentMergeFocused.includes(index) ||
          currentBubbleFocused.includes(index) ||
          currentQuickFocused.includes(index) ||
          currentHeapFocused.includes(index) ||
          currentSelectionFocused.includes(index)
        ) {
          elementColor = this.pinkColor; // yellowish orange
        } else if (
          currentPivot === index ||
          currentSelectionMin === index ||
          currentInsertionShifter === index
        ) {
          elementColor = this.yellowColor; // yellowish orange
        }

        //TODO: logic for pivot
        else if (currentSorted.includes(index)) {
          elementColor = this.lightPurpleColor; // dark blue
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
      <div className="container" id="arrayDisplay">
        <div className="row">
          <div className="col-10" id="arrayBody">
            {this.renderedArray()}
          </div>
          <div className="col-2" id="legend">
            <div className="legendBlock">
              <div
                className="colorBlock"
                style={{ backgroundColor: this.yellowColor }}
              ></div>
              <p>
                <strong style={{ color: this.yellowColor }}>Yellow:</strong> An
                element is a pivot-(Quick Sort), a Min-(Selection Sort), or the
                element being inserted-(Insertion Sort)
              </p>
            </div>
            <div className="legendBlock">
              <div
                className="colorBlock"
                style={{ backgroundColor: this.orangeColor }}
              ></div>
              <p>
                <strong style={{ color: this.orangeColor }}>Orange:</strong> A
                pair of elements will be swapped
              </p>
            </div>
            <div className="legendBlock">
              <div
                className="colorBlock"
                style={{ backgroundColor: this.pinkColor }}
              ></div>
              <p>
                <strong style={{ color: this.pinkColor }}>Pink:</strong> A pair
                of elements is being evaluated
              </p>
            </div>
            <div className="legendBlock">
              <div
                className="colorBlock"
                style={{ backgroundColor: this.lightPurpleColor }}
              ></div>
              <p>
                <strong style={{ color: this.lightPurpleColor }}>
                  Light Purple:
                </strong>{' '}
                An element is in its final position
              </p>
            </div>

            <div className="legendBlock">
              <div
                className="colorBlock"
                style={{ backgroundColor: this.darkPurpleColor }}
              ></div>
              <p>
                <strong style={{ color: this.darkPurpleColor }}>
                  Dark Purple:
                </strong>{' '}
                An element is still unsorted
              </p>
            </div>
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
