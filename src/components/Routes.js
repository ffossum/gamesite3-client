/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './nav/Nav';
import FrontPage from './FrontPage';
import RegistrationFormContainer
  from '../redux/modules/registration/RegistrationFormContainer';
import LoginFormContainer from '../redux/modules/login/LoginFormContainer';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route
          exact
          path="/registration"
          component={RegistrationFormContainer}
        />
        <Route exact path="/login" component={LoginFormContainer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
