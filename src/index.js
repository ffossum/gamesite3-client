/* @flow */
import 'rxjs';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

import { rootReducer } from './redux/modules/root';
import { loginSuccess } from './redux/modules/login/loginActions';

let preloadedState;
if (window.__USER__) {
  preloadedState = rootReducer(preloadedState, loginSuccess(window.__USER__));
}

const store = configureStore(preloadedState);

render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
