/* @flow */
import { combineEpics } from 'redux-observable';
import type { Observable } from 'rxjs';
import type { Store } from 'redux';

import {
  SEND_MESSAGE,
  SEND_GAME_MESSAGE,
  JOIN_CHANNEL,
  LEAVE_CHANNEL,
  receiveMessage,
} from './chatActions';
import type {
  SendMessageAction,
  SendGameMessageAction,
  JoinChannelAction,
} from './chatActions';
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

function sendGameMessageEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return action$
    .filter(action => action.type === SEND_GAME_MESSAGE)
    .do((action: SendGameMessageAction) => {
      const { userId, gameId, players, text } = action.payload;
      const channelName = `game:${gameId}`;

      const data = {
        t: 'chatmsg',
        ch: channelName,
        txt: text,
        uid: userId,
      };

      deepstreamClient.emit(`spectate:${gameId}`, data);
      players.forEach(playerId => {
        deepstreamClient.emit(`user:${playerId}`, data);
      });
    })
    .ignoreElements();
}

function joinChannelEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return action$
    .filter(action => action.type === JOIN_CHANNEL)
    .flatMap((action: JoinChannelAction) => {
      const channelName = action.payload;
      return deepstreamClient
        .subscribe(`chat:${channelName}`)
        .takeUntil(
          action$.filter(
            action =>
              action.type === LEAVE_CHANNEL && action.payload === channelName,
          ),
        );
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

export default combineEpics(
  sendMessageEpic,
  sendGameMessageEpic,
  joinChannelEpic,
);
