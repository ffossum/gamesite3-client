/* @flow */
/* eslint-env jest */
import 'rxjs';

import { Observable } from 'rxjs';
import loginEpic from './loginEpic';
import { ActionsObservable } from 'redux-observable';
import { loginRequest, loginSuccess, loginFailure } from './loginActions';

describe('login epic', () => {
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
    const action$ = ActionsObservable.of(action);
    const ajax = () =>
      Observable.of({
        response: {
          id: 'user id',
          username: 'bob',
        },
      });

    await new Promise(resolve => {
      loginEpic(action$, null, { ajax, location })
        .toArray()
        .subscribe(actions => {
          expect(location.reload).toHaveBeenCalled();
          expect(actions).toEqual([
            loginSuccess({
              id: 'user id',
              username: 'bob',
            }),
          ]);
          resolve();
        });
    });
  });

  test('login failure', async () => {
    const action = loginRequest(login);
    const action$ = ActionsObservable.of(action);
    const ajax = () => Observable.throw(new Error('error'));

    await new Promise(resolve => {
      expect(location.reload).not.toHaveBeenCalled();
      loginEpic(action$, null, { ajax, location })
        .toArray()
        .subscribe(actions => {
          expect(actions).toEqual([loginFailure()]);
          resolve();
        });
    });
  });
});