import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from '../Auth/PrivateRoute';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';
import Boards from '../Boards/Boards';

class Main extends Component {
  render() {
    return (
      <Router>
        <div className="h-screen bg-gray-100">
          <Navbar className="sticky top-0" />
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
