/* @flow */
import { connect } from 'react-redux';
import type { State } from '../root';
import GameRoom from '../../../components/game/GameRoom';
import type { Props as GameRoomProps } from '../../../components/game/GameRoom';
import type { Match } from 'react-router-dom';
import { enterRoom, exitRoom, joinGame, leaveGame } from './gameRoomActions';

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
    exitRoom(gameId) {
      dispatch(exitRoom(gameId));
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

  return {
    enterRoom() {
      dispatchProps.enterRoom(gameId);
    },
    exitRoom() {
      dispatchProps.exitRoom(gameId);
    },
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
