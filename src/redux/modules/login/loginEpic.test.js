/* @flow */
/* eslint-env jest */
import 'rxjs';

import { Observable } from 'rxjs';
import loginEpic from './loginEpic';
import { loginRequest, loginSuccess, loginFailure } from './loginActions';

describe('login epic', () => {
  let store;
  const login = {
    email: 'bob@test.com',
    password: 'bobisthebest',
  };
  let location;
  beforeEach(() => {
    location = {
      reload: jest.fn(),
    };
  });

  test('login success', async () => {
    const action = loginRequest(login);
    const action$ = Observable.of(action);
    const ajax = () =>
      Observable.of({
        response: {
          id: 'user id',
          username: 'bob',
        },
      });

    const actions = await loginEpic(action$, store, { ajax, location })
      .toArray()
      .toPromise();

    expect(location.reload).toHaveBeenCalled();
    expect(actions).toEqual([
      loginSuccess({
        email: 'bob@test.com',
        id: 'user id',
        username: 'bob',
      }),
    ]);
  });

  test('login failure', async () => {
    const action = loginRequest(login);
    const action$ = Observable.of(action);
    const ajax = () => Observable.throw(new Error('error'));

    const actions = await loginEpic(action$, store, { ajax, location })
      .toArray()
      .toPromise();

    expect(location.reload).not.toHaveBeenCalled();
    expect(actions).toEqual([loginFailure()]);
  });
});
