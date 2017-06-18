/* @flow */
import React from 'react';
import type { Game } from './GameRoom';

export type Props = {
  enterSpectatorRoom: (gameId: string) => void,
  exitSpectatorRoom: (gameId: string) => void,
  joinGame: () => void,
  gameId: string,
  game: ?Game,
  user: ?PublicUserData,
};
export default class SpectatorRoom extends React.Component {
  props: Props;
  handleJoinClick: SyntheticInputEvent => void;

  constructor() {
    super();

    this.handleJoinClick = e => {
      e.preventDefault();
      this.props.joinGame();
    };
  }
  componentDidMount() {
    this.props.enterSpectatorRoom(this.props.gameId);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.gameId !== this.props.gameId) {
      this.props.exitSpectatorRoom(this.props.gameId);
      this.props.enterSpectatorRoom(nextProps.gameId);
    }
  }
  componentWillUnmount() {
    this.props.exitSpectatorRoom(this.props.gameId);
  }

  render() {
    const { gameId, game, user } = this.props;
    return (
      <div>
        <h2>{gameId}</h2>
        {game &&
          <div>
            <div>
              <h3>Players:</h3>
              <ul>
                {game.players.map(player =>
                  <li key={player.id}>
                    {player.username}
                    {game.host.id === player.id && <span> (Host)</span>}
                  </li>,
                )}
              </ul>
            </div>
            <button disabled={!user} onClick={this.handleJoinClick}>
              Join game
            </button>
          </div>}
      </div>
    );
  }
}
