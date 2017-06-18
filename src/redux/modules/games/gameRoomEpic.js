/* @flow */
import { Observable } from 'rxjs';
import type { Store } from 'redux';
import {
  ENTER_ROOM,
  EXIT_ROOM,
  JOIN_GAME,
  LEAVE_GAME,
} from './gameRoomActions';
import { joinChannel, leaveChannel } from '../chat/chatActions';
import type DeepstreamClient from '../../deepstreamClient';

type Dependencies = {
  deepstreamClient: DeepstreamClient,
};

export default function gameRoomEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return Observable.merge(
    action$
      .filter(action => action.type === ENTER_ROOM)
      .map(action => joinChannel('game:' + action.payload)),
    action$
      .filter(action => action.type === EXIT_ROOM)
      .map(action => leaveChannel('game:' + action.payload)),
    action$
      .filter(action => action.type === JOIN_GAME)
      .do(action => {
        deepstreamClient.make('join-game', action.payload);
      })
      .ignoreElements(),
    action$
      .filter(action => action.type === LEAVE_GAME)
      .do(action => {
        deepstreamClient.make('leave-game', action.payload);
      })
      .ignoreElements(),
  );
}
