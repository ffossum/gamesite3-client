/* @flow */
import React from 'react';
import Recaptcha from 'react-google-recaptcha';

type Props = {
  register: Function,
  loading: boolean,
};
type State = {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
  recaptchaResponse: string,
};
export default class RegistrationForm extends React.Component<Props, State> {
  handleSubmit = (e: SyntheticInputEvent<>) => {
    e.preventDefault();
    if (!this.props.loading) {
      this.props.register(this.state);
    }
  };

  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleRecaptcha = (recaptchaResponse: string) => {
    this.setState(() => ({
      recaptchaResponse,
    }));
  };

  render() {
    const { loading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.handleChange}
              readOnly={loading}
            />
          </label>
        </div>

        <div>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
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
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
              readOnly={loading}
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Repeat password
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              onChange={this.handleChange}
              readOnly={loading}
            />
          </label>
        </div>
        <Recaptcha
          sitekey="6LfOuSYUAAAAAAclQ1FS0hsa-PJvWr_p1FGms3b-" // TODO do not hard-code sitekey
          onChange={this.handleRecaptcha}
        />

        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
    );
  }
}
