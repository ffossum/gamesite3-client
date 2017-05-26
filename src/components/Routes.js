/* @flow */
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import FrontPage from './FrontPage';
import RegistrationForm from './registration/RegistrationForm';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/registration">Register</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/registration" component={RegistrationForm} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
