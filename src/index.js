/* @flow */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import createStore from './store/createStore';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
