import React from 'react';
import { connect } from 'react-redux';
import { updateArray } from '../actionCreators';

//Import action creators

class ArrayDisplay extends React.Component {
  render() {
    return <div> Body </div>;
  }
}

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = () => (dispatch) => ({
  genericActionCreator: () => {},
});

export default connect(mapStateToProps, mapDispatchToProps)(ArrayDisplay);
