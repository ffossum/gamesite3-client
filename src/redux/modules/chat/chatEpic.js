/* @flow */
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { SEND_MESSAGE, JOIN_CHANNEL, receiveMessage } from './chatActions';
import type { SendMessageAction, JoinChannelAction } from './chatActions';

type Dependencies = {
  deepstreamClient: any,
};

function sendMessageEpic(
  action$: ActionsObservable<*>,
  store: Store<*>,
  { deepstreamClient }: Dependencies
) {
  return action$
    .ofType(SEND_MESSAGE)
    .do((action: SendMessageAction) => {
      deepstreamClient.event.emit(`chat:${action.payload.ch}`, {
        t: 'chatmsg',
        ...action.payload,
      });
    })
    .ignoreElements();
}

function joinChannelEpic(
  action$: ActionsObservable<*>,
  store: Store<*>,
  { deepstreamClient }: Dependencies
) {
  return action$
    .ofType(JOIN_CHANNEL)
    .flatMap((action: JoinChannelAction) => {
      const channelName = `chat:${action.payload}`;

      return Observable.fromEventPattern(
        handler => deepstreamClient.event.subscribe(channelName, handler),
        handler => deepstreamClient.event.unsubscribe(channelName, handler)
      );
    })
    .map(data => {
      switch (data.t) {
        case 'chatmsg':
          return receiveMessage(data);

        default:
          return false;
      }
    })
    .filter(v => v);
}

export default combineEpics(sendMessageEpic, joinChannelEpic);
