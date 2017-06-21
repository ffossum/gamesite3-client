/* @flow */
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
} from './gameRoomActions';
import { contains } from 'ramda';

type OwnProps = {
  location: Location,
  history: History,
  match: Match,
};

function mapStateToProps(state: State, ownProps: OwnProps) {
  const gameId: string = ownProps.match.params.gameId;
  const game = state.games[gameId];
  return {
    gameId,
    game,
    users: state.users,
    user: state.session.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    enterRoom(gameId) {
      dispatch(enterRoom(gameId));
    },
    exitRoom(gameId, isInGame) {
      dispatch(exitRoom(gameId, isInGame));
    },
    enterSpectatorRoom(gameId) {
      dispatch(enterSpectatorRoom(gameId));
    },
    exitSpectatorRoom(gameId) {
      dispatch(exitSpectatorRoom(gameId));
    },
    joinGame(userId, gameId) {
      dispatch(joinGame(userId, gameId));
    },
    leaveGame(userId, gameId) {
      dispatch(leaveGame(userId, gameId));
    },
  };
}

function mergeProps(
  stateProps,
  dispatchProps,
  // ownProps,
): GameRoomProps {
  const { game, gameId, users, user } = stateProps;

  const placeholderUser = { id: '', username: '' };

  const transformedGame = game && {
    id: gameId,
    host: users[game.host] || placeholderUser,
    players: game.players.map(playerId => users[playerId] || placeholderUser),
  };

  const isInGame = !!(game && user && contains(user.id, game.players));

  return {
    enterRoom: dispatchProps.enterRoom,
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
    gameId,
    game: transformedGame,
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  GameRoom,
);
