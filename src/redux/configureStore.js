/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './modules/root';
import type { State } from './modules/root';

type Dependencies = {
  ajax: any,
  deepstreamClient: any,
  location: any,
  devToolsCompose: any,
};

export default function configureStore(
  preloadedState?: State,
  dependencies: Dependencies
) {
  const composeEnhancers =
    (DEVELOPMENT && dependencies.devToolsCompose) || compose;

  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies,
  });

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
}
