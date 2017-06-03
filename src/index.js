/* @flow */
import 'rxjs';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ajax } from 'rxjs/observable/dom/ajax';

import Routes from './Routes';
import { login as deepstreamLogin } from './redux/deepstream';
import configureStore from './redux/configureStore';
import { rootReducer } from './redux/modules/root';
import { loginSuccess } from './redux/modules/login/loginActions';
import { joinChannel } from './redux/modules/chat/chatActions';

let preloadedState;
const user = window.__USER__;

if (user) {
  preloadedState = rootReducer(preloadedState, loginSuccess(user));
}

deepstreamLogin().then(deepstreamClient => {
  const dependencies = {
    ajax,
    deepstreamClient,
    location: window.location,
    devToolsCompose: DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  };

  const store = configureStore(preloadedState, dependencies);

  store.dispatch(joinChannel('general'));

  render(
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
});
