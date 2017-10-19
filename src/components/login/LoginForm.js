/* @flow */
import React from 'react';

type Props = {
  logIn: Function,
  loading: boolean,
};
type State = {
  email: string,
  password: string,
};
export default class LoginForm extends React.Component<Props, State> {
  handleSubmit = (e: SyntheticInputEvent<>) => {
    e.preventDefault();
    if (!this.props.loading) {
      this.props.logIn(this.state);
    }
  };

  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { loading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              name="email"
              onChange={this.handleChange}
              readOnly={loading}
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              name="password"
              onChange={this.handleChange}
              readOnly={loading}
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          Log in
        </button>
      </form>
    );
  }
}
