/* @flow */
import React from 'react';
import { find } from 'ramda';
import SpectatorRoom from './SpectatorRoom';
import GameChatContainer from '../../redux/modules/chat/GameChatContainer';

export type Game = {
  id: string,
  host: PublicUserData,
  players: PublicUserData[],
};
export type Props = {
  enterRoom: (gameId: string) => any,
  exitRoom: (gameId: string) => any,
  enterSpectatorRoom: (gameId: string) => any,
  exitSpectatorRoom: (gameId: string) => any,
  joinGame: () => any,
  leaveGame: () => any,
  cancelGame: () => any,
  gameId: string,
  game: ?Game,
  user: ?PublicUserData,
};
export default class GameRoom extends React.Component {
  props: Props;
  handleCancelClick: SyntheticInputEvent => void;
  handleLeaveClick: SyntheticInputEvent => void;

  constructor() {
    super();

    this.handleCancelClick = e => {
      e.preventDefault();
      this.props.cancelGame();
    };
    this.handleLeaveClick = e => {
      e.preventDefault();
      this.props.leaveGame();
    };
  }
  componentDidMount() {
    this.props.enterRoom(this.props.gameId);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.gameId !== this.props.gameId) {
      this.props.exitRoom(this.props.gameId);
      this.props.enterRoom(nextProps.gameId);
    }
  }
  componentWillUnmount() {
    this.props.exitRoom(this.props.gameId);
  }

  render() {
    const { gameId, game, user } = this.props;

    if (!game) {
      return <div>Game data unavailable</div>;
    }

    const isInGame =
      user && game && find(player => player.id === user.id, game.players);

    if (!isInGame) {
      return (
        <SpectatorRoom
          enterSpectatorRoom={this.props.enterSpectatorRoom}
          exitSpectatorRoom={this.props.exitSpectatorRoom}
          joinGame={this.props.joinGame}
          game={game}
          gameId={gameId}
          user={user}
        />
      );
    }

    const isHost = user && user.id === game.host;

    return (
      <div>
        <h2>
          {gameId}
        </h2>
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
            {isHost
              ? <button onClick={this.handleLeaveClick}>Leave game</button>
              : <button onClick={this.handleCancelClick}>Cancel game</button>}
            <GameChatContainer gameId={gameId} />
          </div>}
      </div>
    );
  }
}
