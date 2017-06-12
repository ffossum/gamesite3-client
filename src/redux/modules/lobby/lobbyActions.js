/* @flow */
import type { GameDataState, GamesState } from '../games/gamesReducer';

export const CREATE_GAME_REQUEST = 'lobby/create game request';
export const GAME_CREATED = 'lobby/game created';
export const ENTER_LOBBY = 'lobby/enter';
export const REFRESH_LOBBY = 'lobby/refresh';

export type EnterLobbyAction = {
  type: 'lobby/enter',
};
export function enterLobby(): EnterLobbyAction {
  return {
    type: ENTER_LOBBY,
  };
}

export type RefreshLobbyAction = {
  type: 'lobby/refresh',
  payload: GamesState,
};
export function refreshLobby(lobby: GamesState): RefreshLobbyAction {
  return {
    type: REFRESH_LOBBY,
    payload: lobby,
  };
}

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

export type GameCreatedAction = {
  type: 'lobby/game created',
  payload: GameDataState,
};

export function gameCreated(gameData: GameDataState): GameCreatedAction {
  return {
    type: GAME_CREATED,
    payload: gameData,
  };
}

export type LobbyAction =
  | EnterLobbyAction
  | RefreshLobbyAction
  | CreateGameRequestAction
  | GameCreatedAction;
