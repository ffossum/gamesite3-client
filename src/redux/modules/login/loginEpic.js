/* @flow */
import { LOGIN_REQUEST, loginSuccess, loginFailure } from './loginActions';
import type { LoginRequestAction } from './loginActions';

type Dependencies = {
  ajax: any,
};

const loginEpic = (
  action$: ActionsObservable<*>,
  store: Store<*>,
  { ajax }: Dependencies
) =>
  action$.ofType(LOGIN_REQUEST).mergeMap((action: LoginRequestAction) =>
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

export default loginEpic;
