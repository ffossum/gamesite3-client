/* @flow */
import { ajax } from 'rxjs/observable/dom/ajax';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './modules/root';
import type { State } from './modules/root';
import deepstream from './deepstream';

export type EpicDependencies = {
  ajax: any,
  deepstream: any,
};
const dependencies: EpicDependencies = {
  ajax,
  deepstream,
};

const composeEnhancers =
  (DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies,
});

export default function configureStore(preloadedState?: State) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
}
