/* @flow */
import { connect } from 'react-redux';
import type { State } from '../root';
import GameRoom from '../../../components/game/GameRoom';
import type { Match } from 'react-router-dom';

type OwnProps = {
  location: Location,
  history: History,
  match: Match,
};

function mapStateToProps(state: State, ownProps: OwnProps) {
  const { gameId } = ownProps.match.params;
  const game = state.games[gameId];
  return {
    gameId,
    game,
  };
}

function mapDispatchToProps() {
  return {};
}

function mergeProps(
  stateProps,
  // dispatchProps,
  // ownProps,
) {
  return {
    ...stateProps,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  GameRoom,
);
