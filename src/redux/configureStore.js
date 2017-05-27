/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
// import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './modules/root';
import thunk from 'redux-thunk';

import type { State } from './modules/root';

let devToolsExtension = f => f;
if (DEVELOPMENT && window.devToolsExtension) {
  devToolsExtension = window.devToolsExtension();
}

const storeEnhancer = compose(applyMiddleware(thunk), devToolsExtension);

export default function configureStore(preloadedState?: State) {
  return createStore(rootReducer, preloadedState, storeEnhancer);
}
