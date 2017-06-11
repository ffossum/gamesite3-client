/* @flow */
import { combineEpics } from 'redux-observable';
import type { Observable } from 'rxjs';
import type { Store } from 'redux';

import { SEND_MESSAGE, JOIN_CHANNEL, receiveMessage } from './chatActions';
import type { SendMessageAction, JoinChannelAction } from './chatActions';
import type DeepstreamClient from '../../deepstreamClient';

type Dependencies = {
  deepstreamClient: DeepstreamClient,
};

function sendMessageEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return action$
    .filter(action => action.type === SEND_MESSAGE)
    .do((action: SendMessageAction) => {
      deepstreamClient.emit(`chat:${action.payload.ch}`, {
        t: 'chatmsg',
        ...action.payload,
      });
    })
    .ignoreElements();
}

export function joinChannelEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return action$
    .filter(action => action.type === JOIN_CHANNEL)
    .flatMap((action: JoinChannelAction) => {
      const channelName = `chat:${action.payload}`;
      return deepstreamClient.subscribe(channelName);
    })
    .flatMap(data => {
      switch (data.t) {
        case 'chatmsg': {
          const time = new Date().toISOString();
          return [receiveMessage(data, time)];
        }

        default:
          return [];
      }
    });
}

export default combineEpics(sendMessageEpic, joinChannelEpic);
