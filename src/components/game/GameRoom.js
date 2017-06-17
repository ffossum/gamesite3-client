/* @flow */
import React from 'react';
import ChatContainer from '../../redux/modules/chat/ChatContainer';

type Game = {
  id: string,
  host: PublicUserData,
  players: PublicUserData[],
};
export type Props = {
  enterRoom: (gameId: string) => void,
  exitRoom: (gameId: string) => void,
  gameId: string,
  game: ?Game,
};
export default class GameRoom extends React.Component {
  props: Props;
  constructor() {
    super();
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
    const { gameId, game } = this.props;
    return (
      <div>
        <h2>{gameId}</h2>
        {game &&
          <div>
            <p>Host: {game.host.username}</p>
          </div>}
        <ChatContainer channelName={`game:${gameId}`} />
      </div>
    );
  }
}
