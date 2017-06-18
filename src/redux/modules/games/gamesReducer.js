/* @flow */
import type { Action } from '../../actions';
import {
  GAME_CREATED,
  GAME_UPDATED,
  REFRESH_LOBBY,
} from '../lobby/lobbyActions';

export type GameDataState = {
  id: string,
  host: string,
  createdTime: string,
  players: string[],
};
export type GamesState = {
  [gameId: string]: GameDataState,
};

const initialState = {};

export default function gamesReducer(
  state: GamesState = initialState,
  action: Action,
) {
  switch (action.type) {
    case REFRESH_LOBBY: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GAME_CREATED: {
      const gameData = action.payload;
      return {
        ...state,
        [gameData.id]: gameData,
      };
    }
    case GAME_UPDATED: {
      const newGameData = action.payload;
      const gameId: string = newGameData.id;
      const previousGame = state[gameId];
      if (previousGame) {
        return {
          ...state,
          [gameId]: {
            ...previousGame,
            ...newGameData,
          },
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
