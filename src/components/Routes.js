/* @flow */
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import FrontPage from './FrontPage';
import RegistrationFormContainer
  from '../redux/modules/registration/RegistrationFormContainer';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/registration">Register</Link></li>
          <li><a href="/logout">Log out</a></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route
          exact
          path="/registration"
          component={RegistrationFormContainer}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
