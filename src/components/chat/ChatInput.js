/* @flow */
import React from 'react';

type Props = {
  sendMessage: (text: string) => void,
  disabled?: boolean,
  disabledPlaceholder?: string,
};
type State = {
  text: string,
};
export default class ChatInput extends React.Component<Props, State> {
  state = {
    text: '',
  };

  handleChange = (e: SyntheticInputEvent<>) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };
  handleSubmit = (e: SyntheticInputEvent<>) => {
    e.preventDefault();
    if (this.state.text.length) {
      this.props.sendMessage(this.state.text);
      this.setState(() => ({ text: '' }));
    }
  };

  render() {
    const { disabled, disabledPlaceholder } = this.props;

    const placeholder =
      disabled && disabledPlaceholder ? disabledPlaceholder : 'Say something';

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder={placeholder}
          value={this.state.text}
          onChange={this.handleChange}
          readOnly={disabled}
        />{' '}
        <button disabled={disabled} type="submit">
          Send
        </button>
      </form>
    );
  }
}
