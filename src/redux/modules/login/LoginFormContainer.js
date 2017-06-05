/* @flow */
import { connect } from 'react-redux';
import RegistrationForm from '../../../components/login/LoginForm';
import { loginRequest } from './loginActions';

import type { Login } from './loginActions';
import type { State } from '../root';

export function mapStateToProps(state: State) {
  return {
    loading: state.login.loading,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    logIn(login: Login) {
      dispatch(loginRequest(login));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
