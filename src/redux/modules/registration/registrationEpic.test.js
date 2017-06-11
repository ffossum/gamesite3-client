/* @flow */
/* eslint-env jest */
import 'rxjs';

import { Observable } from 'rxjs';
import registrationEpic from './registrationEpic';
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
    const action$ = Observable.of(action);
    const ajax = () =>
      Observable.of({
        response: {
          id: 'user id',
          username: 'bob',
        },
      });

    const actions = await registrationEpic(action$, null, { ajax, location })
      .toArray()
      .toPromise();

    expect(location.reload).toHaveBeenCalled();
    expect(actions).toEqual([
      registrationSuccess({
        id: 'user id',
        username: 'bob',
      }),
    ]);
  });

  test('registration failure', async () => {
    const action = registrationRequest(registration);
    const action$ = Observable.of(action);
    const ajax = () => Observable.throw(new Error('error'));

    const actions = await registrationEpic(action$, null, { ajax, location })
      .toArray()
      .toPromise();

    expect(location.reload).not.toHaveBeenCalled();
    expect(actions).toEqual([registrationFailure()]);
  });
});
