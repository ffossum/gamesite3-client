/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavContainer from './redux/modules/nav/NavContainer';
import FrontPage from './components/FrontPage';
import RegistrationFormContainer from './redux/modules/registration/RegistrationFormContainer';
import LoginFormContainer from './redux/modules/login/LoginFormContainer';
import LobbyContainer from './redux/modules/lobby/LobbyContainer';
import GameRoomContainer from './redux/modules/games/GameRoomContainer';
import Settings from './components/settings/Settings';
import NotFound from './components/NotFound';

export default function Routes() {
  return (
    <div>
      <NavContainer />
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route path="/lobby" component={LobbyContainer} />
        <Route path="/game/:gameId" component={GameRoomContainer} />
        <Route
          exact
          path="/registration"
          component={RegistrationFormContainer}
        />
        <Route exact path="/login" component={LoginFormContainer} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
