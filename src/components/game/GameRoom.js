/* @flow */
import React from 'react';

export default class GameRoom extends React.Component {
  props: {
    gameId: string,
    game: Object, // TODO more specific
  };
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>{this.props.gameId}</h2>
      </div>
    );
  }
}
