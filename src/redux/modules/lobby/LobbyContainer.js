/* @flow */
import Lobby from '../../../components/lobby/Lobby';
import type { Props as LobbyProps } from '../../../components/lobby/Lobby';
import { connect } from 'react-redux';
import type { State } from '../root';
import { createGameRequest } from './lobbyActions';

export function mapStateToProps(state: State) {
  return {
    user: state.session.user,
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
  const { user } = stateProps;
  const userId = user && user.id;

  let partialCreateGame = () => {};
  if (userId) {
    partialCreateGame = () => dispatchProps.createGame(userId);
  }

  return {
    user,
    createGame: partialCreateGame,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Lobby);
