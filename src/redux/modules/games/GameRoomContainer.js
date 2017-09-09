/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State } from '../root';
import GameRoom from '../../../components/game/GameRoom';
import type { Props as GameRoomProps } from '../../../components/game/GameRoom';
import type { Match } from 'react-router-dom';
import {
  enterRoom,
  exitRoom,
  enterSpectatorRoom,
  exitSpectatorRoom,
  joinGame,
  leaveGame,
  cancelGame,
} from './gameRoomActions';
import { contains } from 'ramda';

type OwnProps = {
  location: Location,
  history: History,
  match: Match,
};

export function mapStateToProps(state: State, ownProps: OwnProps) {
  const gameId = ownProps.match.params.gameId || '';
  const game = state.games[gameId];
  return {
    gameId,
    game,
    users: state.users,
    user: state.session.user,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators(
    {
      enterRoom,
      exitRoom,
      enterSpectatorRoom,
      exitSpectatorRoom,
      joinGame,
      leaveGame,
      cancelGame,
    },
    dispatch,
  );
}

export function mergeProps(
  stateProps: *,
  dispatchProps: *,
  // ownProps,
): GameRoomProps {
  const { game, gameId, users, user } = stateProps;

  const placeholderUser = userId => ({ id: userId, username: '' });

  const transformedGame = game && {
    id: gameId,
    host: users[game.host] || placeholderUser(game.host),
    players: game.players.map(
      playerId => users[playerId] || placeholderUser(playerId),
    ),
    status: game.status,
  };

  const isInGame = !!(game && user && contains(user.id, game.players));

  return {
    enterRoom(gameId) {
      const shouldFetchGameData = !isInGame;
      dispatchProps.enterRoom(gameId, shouldFetchGameData);
    },
    exitRoom(gameId) {
      dispatchProps.exitRoom(gameId, isInGame);
    },
    enterSpectatorRoom: dispatchProps.enterSpectatorRoom,
    exitSpectatorRoom: dispatchProps.exitSpectatorRoom,
    joinGame() {
      user && dispatchProps.joinGame(user.id, gameId);
    },
    leaveGame() {
      user && dispatchProps.leaveGame(user.id, gameId);
    },
    cancelGame() {
      user &&
        game &&
        user.id === game.host &&
        dispatchProps.cancelGame(user.id, game.id);
    },
    gameId,
    game: transformedGame,
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  GameRoom,
);
