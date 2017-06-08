/* @flow */
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
      deepstreamClient.emit(`chat:${action.payload.ch}`, {
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
      return deepstreamClient.subscribe(channelName);
    })
    .map(data => {
      switch (data.t) {
        case 'chatmsg': {
          const time = new Date().toISOString();
          return receiveMessage(data, time);
        }

        default:
          return false;
      }
    })
    .filter(v => v);
}

export default combineEpics(sendMessageEpic, joinChannelEpic);
