/* @flow */
import { ajax } from 'rxjs/observable/dom/ajax';
import {
  REGISTRATION_REQUEST,
  registrationSuccess,
  registrationFailure,
} from './registrationActions';
import type { RegistrationRequestAction } from './registrationActions';

const registrationEpic = (action$: ActionsObservable<*>) =>
  action$
    .ofType(REGISTRATION_REQUEST)
    .mergeMap((action: RegistrationRequestAction) =>
      ajax({
        url: '/api/registration',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      })
        .mapTo(registrationSuccess())
        .catch(() => [registrationFailure(action.payload)])
    );

export default registrationEpic;
