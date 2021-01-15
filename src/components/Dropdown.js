import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setCurrentAlgorithm } from '../actionCreators';
import '../styles/controlBar.css';

const Dropdown = (props) => {
  // Keep track of whether or no menu is dropped down or not
  const [open, setOpen] = useState(false);
  // keep track of element
  const ref = useRef();

  // used to expand of colapse menu when clicking outside meny
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  // used to map out the algOptions to options in menu
  const renderedOptions = props.options.map((option) => {
    if (option.value === props.currenAlgorithm) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => props.changeCurrentAlgorithm(option.value)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} id="dropdown" className="ui form">
      <div className="field">
        <label className="label"> {props.label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"> </i>
          <div className="text">
            {
              props.options.find(
                (element) => element.value === props.currentAlgorithm
              ).label
            }
          </div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ currentAlgorithm }) => ({
  currentAlgorithm: currentAlgorithm,
});

const mapDispatchToProps = () => (dispatch) => ({
  changeCurrentAlgorithm: (alg) => {
    dispatch(setCurrentAlgorithm(alg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
