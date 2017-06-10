/* @flow */
import type { GameDataState } from './lobbyReducer';

export const CREATE_GAME_REQUEST = 'lobby/create game request';
export const GAME_CREATED = 'lobby/game created';

export type CreateGameRequestAction = {
  type: 'lobby/create game request',
  payload: {
    userId: string,
  },
};

export function createGameRequest(userId: string): CreateGameRequestAction {
  return {
    type: CREATE_GAME_REQUEST,
    payload: {
      userId,
    },
  };
}

type GameCreatedAction = {
  type: 'lobby/game created',
  payload: GameDataState,
};

export function gameCreated(gameData: GameDataState): GameCreatedAction {
  return {
    type: GAME_CREATED,
    payload: gameData,
  };
}

export type LobbyAction = CreateGameRequestAction | GameCreatedAction;
