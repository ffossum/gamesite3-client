/* @flow */
import 'rxjs';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

const store = configureStore({});

render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
