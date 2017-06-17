/* @flow */
import { Observable } from 'rxjs';
import { AUTHENTICATED_USER } from './sessionActions';
import type { AuthenticatedUserAction } from './sessionActions';
import type { Store } from 'redux';
import type DeepstreamClient from '../../deepstreamClient';

type Dependencies = {
  deepstreamClient: DeepstreamClient,
};

export default function sessionEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return action$
    .filter(action => action.type === AUTHENTICATED_USER)
    .switchMap((action: AuthenticatedUserAction) => {
      return deepstreamClient
        .subscribe('user:' + action.payload.id)
        .flatMap(data => {
          switch (data.t) {
            default:
              return [];
          }
        });
    });
}
