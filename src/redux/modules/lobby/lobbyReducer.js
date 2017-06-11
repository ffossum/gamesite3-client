/* @flow */
import type { Action } from '../../actions';
import { GAME_CREATED, REFRESH_LOBBY } from './lobbyActions';

export type GameDataState = {
  id: string,
  host: string,
  createdTime: string,
};
export type LobbyState = {
  [gameId: string]: GameDataState,
};

const initialState = {};

export default function lobbyReducer(
  state: LobbyState = initialState,
  action: Action,
) {
  switch (action.type) {
    case REFRESH_LOBBY: {
      return action.payload;
    }
    case GAME_CREATED: {
      const gameData = action.payload;
      return {
        ...state,
        [gameData.id]: gameData,
      };
    }
    default:
      return state;
  }
}
