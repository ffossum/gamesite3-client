/* @flow */
import React from 'react';

export default class CreateGameForm extends React.Component {
  props: {
    createGame: () => void,
  };
  handleSubmit: (e: SyntheticInputEvent) => void;
  constructor() {
    super();

    this.handleSubmit = e => {
      const { createGame } = this.props;
      e.preventDefault();
      createGame();
    };
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Create</button>
      </form>
    );
  }
}
