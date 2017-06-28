/* @flow */
import {
  playerJoined,
  playerLeft,
  gameCanceled,
} from './modules/games/gameRoomActions';
import { receiveMessage } from './modules/chat/chatActions';
import type { Action } from './actions';

type PlayerJoinedEvent = {
  t: 'player-joined',
  p: {
    gid: string,
    uid: string,
  },
};

type PlayerLeftEvent = {
  t: 'player-left',
  p: {
    gid: string,
    uid: string,
  },
};

type GameCanceledEvent = {
  t: 'game-canceled',
  p: {
    gid: string,
  },
};

type ChatMessageEvent = {
  t: 'chatmsg',
  uid: string,
  txt: string,
  ch: string,
};

type DeepstreamEvent =
  | PlayerJoinedEvent
  | PlayerLeftEvent
  | ChatMessageEvent
  | GameCanceledEvent;

export default function deepstreamEventToActions(
  event: DeepstreamEvent,
): Array<Action> {
  switch (event.t) {
    case 'player-joined': {
      const gameId = event.p.gid;
      const userId = event.p.uid;
      return [playerJoined(userId, gameId)];
    }
    case 'player-left': {
      const gameId = event.p.gid;
      const userId = event.p.uid;
      return [playerLeft(userId, gameId)];
    }
    case 'game-canceled': {
      const gameId = event.p.gid;
      return [gameCanceled(gameId)];
    }
    case 'chatmsg': {
      const time = new Date().toISOString();
      return [receiveMessage(event, time)];
    }
    default:
      return [];
  }
}
