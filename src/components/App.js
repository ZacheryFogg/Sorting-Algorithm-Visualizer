import React from 'react';
import ControlBar from './ControlBar';
import ArrayDisplay from './ArrayDisplay';
import '../styles/controlBar.css';

const App = () => {
  return (
    <div id="pageBody">
      <ControlBar />
      <ArrayDisplay />
    </div>
  );
};

export default App;
