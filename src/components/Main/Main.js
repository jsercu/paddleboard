import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../Auth/PrivateRoute';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';
import Boards from '../Boards/Boards';
import BoardDetail from '../Boards/BoardDetail/BoardDetail';

class Main extends Component {
  render() {
    return (
      <Router>
        <div className={`bg-gray-100 h-screen`}>
          <Navbar className={`sticky top-0`} />
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
            <PrivateRoute path="/boards" component={Boards}></PrivateRoute>
            <PrivateRoute path="*" component={Boards}></PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;