/* @flow */
import { Observable } from 'rxjs';

import { ENTER_ROOM, EXIT_ROOM } from './gameRoomActions';
import { joinChannel, leaveChannel } from '../chat/chatActions';

export default function gameRoomEpic(action$: Observable<*>) {
  return Observable.merge(
    action$
      .filter(action => action.type === ENTER_ROOM)
      .map(action => joinChannel('game:' + action.payload)),
    action$
      .filter(action => action.type === EXIT_ROOM)
      .map(action => leaveChannel('game:' + action.payload)),
  );
}
