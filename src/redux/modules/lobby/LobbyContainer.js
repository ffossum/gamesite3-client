/* @flow */
import Lobby from '../../../components/lobby/Lobby';
import type { Props as LobbyProps } from '../../../components/lobby/Lobby';
import { connect } from 'react-redux';
import type { State } from '../root';
import { createGameRequest, enterLobby, exitLobby } from './lobbyActions';
import { map, values, compose, pick } from 'ramda';

export function mapStateToProps(state: State) {
  return {
    games: state.games,
    lobby: state.lobby,
    user: state.session.user,
    users: state.users,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    createGame(userId: string) {
      dispatch(createGameRequest(userId));
    },
    enterLobby() {
      dispatch(enterLobby());
    },
    exitLobby() {
      dispatch(exitLobby());
    },
  };
}

function placeholderUser(userId: string): PublicUserData {
  return { id: userId, username: '' };
}

export function mergeProps(stateProps: *, dispatchProps: *): LobbyProps {
  const { user, games, users, lobby } = stateProps;

  let partialCreateGame = () => {};
  if (user) {
    partialCreateGame = () => dispatchProps.createGame(user.id);
  }

  const transformGames = compose(
    values,
    map(game => {
      const { host, players, ...rest } = game;
      return {
        ...rest,
        host: users[host] || placeholderUser(host),
        players: players.map(
          playerId => users[playerId] || placeholderUser(playerId),
        ),
      };
    }),
    pick(lobby.games),
  );

  return {
    user,
    games: transformGames(games),
    createGame: partialCreateGame,
    enterLobby: dispatchProps.enterLobby,
    exitLobby: dispatchProps.exitLobby,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Lobby);
