/* @flow */

export const ENTER_ROOM = 'game/enter room';
export const EXIT_ROOM = 'game/exit room';

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

export type GameRoomAction = EnterRoomAction | ExitRoomAction;
