/* @flow */
/* eslint-env jest */
import 'rxjs';

import { Observable } from 'rxjs';
import registrationEpic from './registrationEpic';
import { ActionsObservable } from 'redux-observable';
import {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
} from './registrationActions';

describe('registration epic', () => {
  const registration = {
    username: 'bob',
    email: 'bob@test.com',
    password: 'bobisthebest',
    repeatPassword: 'bobisthebest',
  };
  let location;
  beforeEach(() => {
    location = {
      reload: jest.fn(),
    };
  });

  test('registration success', async () => {
    const action = registrationRequest(registration);
    const action$ = ActionsObservable.of(action);
    const ajax = () =>
      Observable.of({
        response: {
          id: 'user id',
          username: 'bob',
        },
      });

    await new Promise(resolve => {
      registrationEpic(action$, null, { ajax, location })
        .toArray()
        .subscribe(actions => {
          expect(location.reload).toHaveBeenCalled();
          expect(actions).toEqual([
            registrationSuccess({
              id: 'user id',
              username: 'bob',
            }),
          ]);
          resolve();
        });
    });
  });

  test('registration failure', async () => {
    const action = registrationRequest(registration);
    const action$ = ActionsObservable.of(action);
    const ajax = () => Observable.throw(new Error('error'));

    await new Promise(resolve => {
      expect(location.reload).not.toHaveBeenCalled();
      registrationEpic(action$, null, { ajax, location })
        .toArray()
        .subscribe(actions => {
          expect(actions).toEqual([registrationFailure()]);
          resolve();
        });
    });
  });
});
