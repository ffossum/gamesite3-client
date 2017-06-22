/* @flow */

export const FETCH_GAME_DATA_REQUEST = 'data/fetch game request';
export const FETCH_GAME_DATA_SUCCESS = 'data/fetch game success';

import type { GameDataState } from './gamesReducer';

export type FetchGameDataRequestAction = {
  type: 'data/fetch game request',
  payload: string,
};
export function fetchGameDataRequest(
  gameId: string,
): FetchGameDataRequestAction {
  return {
    type: FETCH_GAME_DATA_REQUEST,
    payload: gameId,
  };
}

export type FetchGameDataSuccessAction = {
  type: 'data/fetch game success',
  payload: GameDataState,
};
export function fetchGameDataSuccess(
  game: GameDataState,
): FetchGameDataSuccessAction {
  return {
    type: FETCH_GAME_DATA_SUCCESS,
    payload: game,
  };
}

export type GameDataAction =
  | FetchGameDataRequestAction
  | FetchGameDataSuccessAction;
