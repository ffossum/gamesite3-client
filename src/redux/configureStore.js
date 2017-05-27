/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './modules/root';
import type { State } from './modules/root';

const composeEnhancers =
  (DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore(preloadedState?: State) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
}
