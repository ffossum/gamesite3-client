/* @flow */
import React from 'react';

export default class ChatInput extends React.Component {
  props: {
    sendMessage: (text: string) => void,
  };
  state: {
    text: string,
  };
  handleChange: (e: SyntheticInputEvent) => void;
  handleSubmit: (e: SyntheticInputEvent) => void;

  constructor() {
    super();

    this.state = {
      text: '',
    };

    this.handleChange = e => {
      const text = e.target.value;
      this.setState(() => ({ text }));
    };
    this.handleSubmit = e => {
      e.preventDefault();
      if (this.state.text.length) {
        this.props.sendMessage(this.state.text);
        this.setState(() => ({ text: '' }));
      }
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Say something"
          value={this.state.text}
          onChange={this.handleChange}
        />
        {' '}
        <button type="submit">Send</button>
      </form>
    );
  }
}
