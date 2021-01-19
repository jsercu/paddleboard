import React from 'react';
import '../assets/output.css';
import Main from './Main/Main';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProvideAuth } from '../hooks/useAuth';
import PrivateRoute from './Auth/PrivateRoute';

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/*" component={Main} />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
