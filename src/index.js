//Top level Index file

// Library Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddelware } from 'redux';

// Project Component Imports
import reducers from './reducers/index';
import App from './components/App';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
