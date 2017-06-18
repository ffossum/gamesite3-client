/* @flow */
import { union } from 'ramda';
import type { Action } from '../../actions';
import {
  GAME_CREATED,
  GAME_UPDATED,
  REFRESH_LOBBY,
} from '../lobby/lobbyActions';

import { PLAYER_JOINED } from './gameRoomActions';

export type GameDataState = {
  id: string,
  host: string,
  createdTime: string,
  players: string[],
};
export type GamesState = {
  [gameId: string]: GameDataState,
};

const initialState: GamesState = {};

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
    case PLAYER_JOINED: {
      const { gameId, userId } = action.payload;
      const game = state[gameId];
      if (game) {
        return {
          ...state,
          [gameId]: {
            ...game,
            players: union(game.players, [userId]),
          },
        };
      }

      return state;
    }
    default:
      return state;
  }
}
