/* @flow */
import {
  REGISTRATION_REQUEST,
  registrationSuccess,
  registrationFailure,
} from './registrationActions';
import type { RegistrationRequestAction } from './registrationActions';

type Dependencies = {
  ajax: any,
  location: any,
};

export default function registrationEpic(
  action$: ActionsObservable<*>,
  store: Store<*>,
  { ajax, location }: Dependencies
) {
  return action$
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
        .do(() => location.reload()) // cookie is set, now reload page to reconnect deepstream etc
        .map(res =>
          registrationSuccess({
            username: action.payload.username,
            ...res.response,
          })
        )
        .catch(() => [registrationFailure()])
    );
}
