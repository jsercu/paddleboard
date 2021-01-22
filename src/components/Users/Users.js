import React from 'react';
import UserProfile from './UserProfile/UserProfile';
import { Switch, Route } from 'react-router-dom';

const Boards = ({ match }) => {
  return (
    <div className="h-screen">
      <Switch>
        <Route exact path={match.url}>
          <div className="block pt-24">
            <h2>Users List</h2>
          </div>
        </Route>
        <Route exact path={match.url + '/:userId'}>
          <UserProfile />
        </Route>
      </Switch>
    </div>
  );
};

export default Boards;
