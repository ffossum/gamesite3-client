/* @flow */
import React from 'react';

type Game = {
  id: string,
  host: PublicUserData,
  players: PublicUserData[],
};
export type Props = {
  gameId: string,
  game: ?Game,
};
export default class GameRoom extends React.Component {
  props: Props;
  constructor() {
    super();
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
      </div>
    );
  }
}
