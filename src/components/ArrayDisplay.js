import React from 'react';
import { connect } from 'react-redux';
import '../styles/arrayDisplay.css';
//Import action creators

class ArrayDisplay extends React.Component {
  renderedArray = () => {
    const { array, currFocusedElements, currSorted, currSwappers } = this.props;

    // TODO: make width and margin, fontSize depend on length of array
    const elementWidth = `${20}px`;
    const margin = `${2}px`;
    // if width is too small than color of text for values of each element become transparent
    const textColor = elementWidth > 15 ? 'black' : 'transparent';
    const fontSize = `${10}`;
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
    return <div id="arrayDisplay">{this.renderedArray()}</div>;
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
