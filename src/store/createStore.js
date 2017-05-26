/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

let devToolsExtension = f => f;
if (DEVELOPMENT && window.devToolsExtension) {
  devToolsExtension = window.devToolsExtension();
}

export default compose(applyMiddleware(thunk), devToolsExtension)(createStore);
