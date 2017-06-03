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
    .do((action: JoinChannelAction) => {
      const channelName = action.payload;
      deepstreamClient.event.subscribe(`chat:${channelName}`, data => {
        switch (data.t) {
          case 'chatmsg': {
            store.dispatch(receiveMessage(data));
            break;
          }
        }
      });
    })
    .ignoreElements();
}

export default combineEpics(sendMessageEpic, joinChannelEpic);
