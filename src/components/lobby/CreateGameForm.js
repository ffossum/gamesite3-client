/* @flow */
import React from 'react';

type Props = {
  createGame: () => void,
};
export default class CreateGameForm extends React.Component<Props> {
  handleSubmit = (e: SyntheticInputEvent<>) => {
    const { createGame } = this.props;
    e.preventDefault();
    createGame();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Create</button>
      </form>
    );
  }
}
