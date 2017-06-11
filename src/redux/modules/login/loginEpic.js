/* @flow */
import { Observable } from 'rxjs';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from './loginActions';
import type { LoginRequestAction } from './loginActions';

type Dependencies = {
  ajax: (_: Object) => Observable<*>,
  location: any,
};

export default function loginEpic(
  action$: Observable<*>,
  store: Store<*>,
  { ajax, location }: Dependencies,
) {
  return action$
    .filter(action => action.type === LOGIN_REQUEST)
    .mergeMap((action: LoginRequestAction) =>
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
        .catch(() => Observable.of(loginFailure())),
    );
}
