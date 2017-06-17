/* @flow */
/* eslint-env jest */
import 'rxjs';

import configureStore from './configureStore';
import { rootReducer } from './modules/root';
import { authenticatedUser } from './modules/session/sessionActions';

describe('configure redux store', () => {
  const user: PublicUserData = {
    id: 'asdf-id',
    username: 'asdf',
  };
  const deepstreamClient: any = null;
  const dependencies = {
    ajax: null,
    deepstreamClient,
    location: null,
    devToolsCompose: null,
  };

  test('without preloaded state', () => {
    const store = configureStore(undefined, dependencies);

    expect(store).toBeDefined();
    expect(typeof store.getState()).toBe('object');
  });

  test('with preloaded state', () => {
    const plainStore = configureStore(undefined, dependencies);

    const preloadedState = rootReducer(undefined, authenticatedUser(user));
    const preloadedStore = configureStore(preloadedState, dependencies);

    expect(plainStore.getState()).not.toEqual(preloadedStore.getState());
  });
});
