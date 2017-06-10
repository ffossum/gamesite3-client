/* @flow */
import 'rxjs';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux';
import { ajax } from 'rxjs/observable/dom/ajax';
import deepstream from 'deepstream.io-client-js';

import Routes from './Routes';
import DeepstreamClient from './redux/deepstreamClient';
import configureStore from './redux/configureStore';
import { rootReducer } from './redux/modules/root';
import { loginSuccess } from './redux/modules/login/loginActions';
import { joinChannel } from './redux/modules/chat/chatActions';
import { enterLobby } from './redux/modules/lobby/lobbyActions';

const history = createBrowserHistory();

let preloadedState;
const user = window.__USER__;

if (user) {
  preloadedState = rootReducer(preloadedState, loginSuccess(user));
}

const deepstreamClient = new DeepstreamClient(deepstream, 'localhost:6020');

deepstreamClient.login().then(() => {
  const dependencies = {
    ajax,
    deepstreamClient,
    location: window.location,
    devToolsCompose: DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  };

  const store = configureStore(preloadedState, dependencies);

  store.dispatch(joinChannel('general'));
  store.dispatch(enterLobby());

  render(
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
});
