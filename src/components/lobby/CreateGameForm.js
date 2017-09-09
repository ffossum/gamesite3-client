/* @flow */
import React from 'react';

type Props = {
  createGame: () => void,
};
export default class CreateGameForm extends React.Component<Props> {
  props: Props;
  handleSubmit: (SyntheticInputEvent<>) => void;

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
