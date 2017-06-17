/* @flow */
import React from 'react';
import ChatContainer from '../../redux/modules/chat/ChatContainer';
import { find } from 'ramda';

type Game = {
  id: string,
  host: PublicUserData,
  players: PublicUserData[],
};
export type Props = {
  enterRoom: () => void,
  exitRoom: () => void,
  joinGame: () => void,
  leaveGame: () => void,
  gameId: string,
  game: ?Game,
  user: ?PublicUserData,
};
export default class GameRoom extends React.Component {
  props: Props;
  handleJoinClick: SyntheticInputEvent => void;
  handleLeaveClick: SyntheticInputEvent => void;

  constructor() {
    super();

    this.handleJoinClick = e => {
      e.preventDefault();
      this.props.joinGame();
    };

    this.handleLeaveClick = e => {
      e.preventDefault();
      this.props.leaveGame();
    };
  }
  componentDidMount() {
    this.props.enterRoom();
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.gameId !== this.props.gameId) {
      this.props.exitRoom();
      this.props.enterRoom();
    }
  }
  componentWillUnmount() {
    this.props.exitRoom();
  }

  render() {
    const { gameId, game, user } = this.props;
    const isInGame =
      user && game && find(player => player.id === user.id, game.players);
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
            {isInGame
              ? <button onClick={this.handleLeaveClick}>Leave game</button>
              : <button disabled={!user} onClick={this.handleJoinClick}>
                  Join game
                </button>}

          </div>}
        <ChatContainer channelName={`game:${gameId}`} />
      </div>
    );
  }
}
