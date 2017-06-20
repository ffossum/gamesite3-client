/* @flow */
import 'rxjs';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ajax } from 'rxjs/observable/dom/ajax';
import deepstream from 'deepstream.io-client-js';

import Routes from './Routes';
import DeepstreamClient from './redux/deepstreamClient';
import configureStore from './redux/configureStore';
import { authenticatedUser } from './redux/modules/session/sessionActions';
import { joinChannel } from './redux/modules/chat/chatActions';

const history = createBrowserHistory();
const user = window.__USER__;

const deepstreamClient = new DeepstreamClient(deepstream, 'localhost:6020');

deepstreamClient.login().then(() => {
  const dependencies = {
    ajax,
    deepstreamClient,
    location: window.location,
    devToolsCompose: DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
    history,
  };

  const store = configureStore(undefined, dependencies);

  if (user) {
    store.dispatch(authenticatedUser(user));
  }

  store.dispatch(joinChannel('general'));

  render(
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
});
