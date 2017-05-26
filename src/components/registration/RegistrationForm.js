/* @flow */
import React from 'react';

export default class RegistrationForm extends React.Component {
  props: {
    register: Function,
  };
  handleSubmit: (e: SyntheticInputEvent) => void;
  handleChange: (e: SyntheticInputEvent) => void;
  state: {
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
  };
  constructor() {
    super();

    this.handleSubmit = e => {
      e.preventDefault();
      this.props.register(this.state);
    };

    this.handleChange = e => {
      const { name, value } = e.target;
      this.setState(() => ({
        [name]: value,
      }));
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Repeat password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={this.handleChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    );
  }
}
