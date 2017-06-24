/* @flow */
import { playerJoined, playerLeft } from './modules/games/gameRoomActions';
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

type ChatMessageEvent = {
  t: 'chatmsg',
  uid: string,
  txt: string,
  ch: string,
};

type DeepstreamEvent = PlayerJoinedEvent | PlayerLeftEvent | ChatMessageEvent;

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
    case 'chatmsg': {
      const time = new Date().toISOString();
      return [receiveMessage(event, time)];
    }
    default:
      return [];
  }
}
