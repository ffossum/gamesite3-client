/* @flow */
import type { Action } from '../../actions';
import { GAME_CREATED, REFRESH_LOBBY, GAME_UPDATED } from './lobbyActions';
import { keys, union, without } from 'ramda';

type GameId = string;
export type LobbyState = {
  games: GameId[],
};

const initialState = {
  games: [],
};

export default function lobbyReducer(
  state: LobbyState = initialState,
  action: Action,
) {
  switch (action.type) {
    case REFRESH_LOBBY: {
      const gameIds = keys(action.payload);
      return {
        ...state,
        games: gameIds,
      };
    }
    case GAME_CREATED: {
      const game = action.payload;

      return {
        ...state,
        games: union(state.games, [game.id]),
      };
    }
    case GAME_UPDATED: {
      const game = action.payload;
      if (game.status && game.status !== 'not_started') {
        return {
          ...state,
          games: without([game.id], state.games),
        };
      }

      return state;
    }
    default:
      return state;
  }
}
