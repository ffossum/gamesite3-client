/* @flow */
import Lobby from '../../../components/lobby/Lobby';
import type { Props as LobbyProps } from '../../../components/lobby/Lobby';
import { connect } from 'react-redux';
import type { State } from '../root';
import { createGameRequest } from './lobbyActions';
import { map, values, compose } from 'ramda';

export function mapStateToProps(state: State) {
  return {
    games: state.lobby,
    user: state.session.user,
    users: state.users,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    createGame(userId: string) {
      dispatch(createGameRequest(userId));
    },
  };
}

export function mergeProps(stateProps: *, dispatchProps: *): LobbyProps {
  const { user, games, users } = stateProps;
  const userId = user && user.id;

  let partialCreateGame = () => {};
  if (userId) {
    partialCreateGame = () => dispatchProps.createGame(userId);
  }

  const transformGames = compose(
    values,
    map(game => {
      const { host, ...rest } = game;
      return {
        ...rest,
        host: users[host] || { id: '', username: '' },
      };
    }),
  );

  return {
    user,
    games: transformGames(games),
    createGame: partialCreateGame,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Lobby);
