/* @flow */

export const ENTER_ROOM = 'game/enter room';
export const EXIT_ROOM = 'game/exit room';

export const ENTER_SPECTATOR = 'game/enter spectator';
export const EXIT_SPECTATOR = 'game/exit spectator';

export const JOIN_GAME = 'game/join';
export const PLAYER_JOINED = 'game/player joined';

export const LEAVE_GAME = 'game/leave';
export const PLAYER_LEFT = 'game/player left';

export type EnterRoomAction = {
  type: 'game/enter room',
  payload: string,
};
export function enterRoom(gameId: string): EnterRoomAction {
  return {
    type: ENTER_ROOM,
    payload: gameId,
  };
}

export type EnterSpectatorRoomAction = {
  type: 'game/enter spectator',
  payload: string,
};
export function enterSpectatorRoom(gameId: string): EnterSpectatorRoomAction {
  return {
    type: ENTER_SPECTATOR,
    payload: gameId,
  };
}

export type ExitRoomAction = {
  type: 'game/exit room',
  payload: string,
};
export function exitRoom(gameId: string): ExitRoomAction {
  return {
    type: EXIT_ROOM,
    payload: gameId,
  };
}

export type ExitSpectatorRoomAction = {
  type: 'game/exit spectator',
  payload: string,
};
export function exitSpectatorRoom(gameId: string): ExitSpectatorRoomAction {
  return {
    type: EXIT_SPECTATOR,
    payload: gameId,
  };
}

export type JoinGameAction = {
  type: 'game/join',
  payload: {
    gid: string,
    uid: string,
  },
};
export function joinGame(userId: string, gameId: string): JoinGameAction {
  return {
    type: JOIN_GAME,
    payload: {
      gid: gameId,
      uid: userId,
    },
  };
}

export type PlayerJoinedAction = {
  type: 'game/player joined',
  payload: {
    gameId: string,
    userId: string,
  },
};
export function playerJoined(
  userId: string,
  gameId: string,
): PlayerJoinedAction {
  return {
    type: PLAYER_JOINED,
    payload: {
      gameId: gameId,
      userId: userId,
    },
  };
}

export type LeaveGameAction = {
  type: 'game/leave',
  payload: {
    gid: string,
    uid: string,
  },
};
export function leaveGame(userId: string, gameId: string) {
  return {
    type: LEAVE_GAME,
    payload: {
      gid: gameId,
      uid: userId,
    },
  };
}

export type PlayerLeftAction = {
  type: 'game/player left',
  payload: {
    gameId: string,
    userId: string,
  },
};
export function playerLeft(userId: string, gameId: string): PlayerLeftAction {
  return {
    type: PLAYER_LEFT,
    payload: {
      gameId: gameId,
      userId: userId,
    },
  };
}

export type GameRoomAction =
  | EnterRoomAction
  | ExitRoomAction
  | JoinGameAction
  | PlayerJoinedAction
  | LeaveGameAction
  | PlayerLeftAction;
