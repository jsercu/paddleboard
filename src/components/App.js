import React from 'react';
import '../assets/output.css';
import Main from './Main/Main';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProvideAuth } from '../hooks/useAuth';
import PrivateRoute from './Auth/PrivateRoute';

function App(props) {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
