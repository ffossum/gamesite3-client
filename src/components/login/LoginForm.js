/* @flow */
import React from 'react';

export default class LoginForm extends React.Component {
  props: {
    logIn: Function,
    loading: boolean,
  };
  handleSubmit: (e: SyntheticInputEvent) => void;
  handleChange: (e: SyntheticInputEvent) => void;
  state: {
    email: string,
    password: string,
  };
  constructor() {
    super();

    this.handleSubmit = e => {
      e.preventDefault();
      if (!this.props.loading) {
        this.props.logIn(this.state);
      }
    };

    this.handleChange = e => {
      const { name, value } = e.target;
      this.setState(() => ({
        [name]: value,
      }));
    };
  }

  render() {
    const { loading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.handleChange}
            readOnly={loading}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.handleChange}
            readOnly={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          Log in
        </button>
      </form>
    );
  }
}
