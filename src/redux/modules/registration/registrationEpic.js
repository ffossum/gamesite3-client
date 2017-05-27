/* @flow */
import {
  REGISTRATION_REQUEST,
  registrationSuccess,
} from './registrationActions';

import type { Action } from '../../actions';

const registrationEpic = (action$: ActionsObservable<Action>) =>
  action$.ofType(REGISTRATION_REQUEST).delay(1000).mapTo(registrationSuccess());

export default registrationEpic;

// TODO: rewrite this to rxjs
// function register(registration: Registration) {
//   return (dispatch: Dispatch<*>) => {
//     dispatch(registrationRequest(registration));

//     fetch('/api/registration', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify(registration),
//     }).then(response => {
//       if (response.ok) {
//         dispatch(registrationSuccess());
//       } else {
//         dispatch(registrationFailure(registration));
//       }
//     });
//   };
// }
