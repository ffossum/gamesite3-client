/* @flow */
import { LOGIN_REQUEST, loginSuccess, loginFailure } from './loginActions';
import type { LoginRequestAction } from './loginActions';

type Dependencies = {
  ajax: any,
  location: any,
};

export default function loginEpic(
  action$: ActionsObservable<*>,
  store: Store<*>,
  { ajax, location }: Dependencies
) {
  return action$.ofType(LOGIN_REQUEST).mergeMap((action: LoginRequestAction) =>
    ajax({
      url: '/api/login',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    })
      .do(() => location.reload()) // cookie is set, reload page to reconnect deepstream etc
      .map(res => loginSuccess(res.response))
      .catch(() => [loginFailure()])
  );
}
