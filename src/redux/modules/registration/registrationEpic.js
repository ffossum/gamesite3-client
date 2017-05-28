/* @flow */
import {
  REGISTRATION_REQUEST,
  registrationSuccess,
  registrationFailure,
} from './registrationActions';
import type { RegistrationRequestAction } from './registrationActions';

type Dependencies = {
  ajax: any,
};

const registrationEpic = (
  action$: ActionsObservable<*>,
  store: Store<*>,
  { ajax }: Dependencies
) =>
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
        .catch(() => [registrationFailure()])
    );

export default registrationEpic;
