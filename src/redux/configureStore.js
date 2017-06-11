/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './modules/root';
import type { State } from './modules/root';
import type DeepstreamClient from './deepstreamClient';

type Dependencies = {
  ajax: any,
  deepstreamClient: DeepstreamClient,
  location: any,
  devToolsCompose: any,
};

export default function configureStore(
  preloadedState?: State,
  dependencies: Dependencies,
) {
  const composeEnhancers = dependencies.devToolsCompose || compose;

  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies,
  });

  const storeEnhancer = composeEnhancers(applyMiddleware(epicMiddleware));

  if (preloadedState) {
    return createStore(rootReducer, preloadedState, storeEnhancer);
  }

  return createStore(rootReducer, storeEnhancer);
}
