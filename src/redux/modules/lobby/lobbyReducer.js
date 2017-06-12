/* @flow */
import type { Action } from '../../actions';
import { GAME_CREATED, REFRESH_LOBBY } from './lobbyActions';
import { keys, union } from 'ramda';

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
    default:
      return state;
  }
}
