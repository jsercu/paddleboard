import React from 'react';
import './assets/output.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProvideAuth } from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoute';
import Login from './routes/Account/Login/Login';
import Register from './routes/Account/Register/Register';
import ResetPassword from './routes/Account/ResetPassword/ResetPassword';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './routes/Dashboard/Dashboard';
import Boards from './routes/Boards/Boards';
import Tasks from './routes/Tasks/Tasks';
import Users from './routes/Users/Users';

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={ResetPassword} />
          <PrivateRoute exact path="/*" component={AuthenicatedRoutes} />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

const AuthenicatedRoutes = () => {
  return (
    <Router>
      <div className="h-screen bg-gray-100">
        <Navbar className="sticky top-0" />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
          <PrivateRoute path="/boards" component={Boards}></PrivateRoute>
          <PrivateRoute path="/tasks" component={Tasks}></PrivateRoute>
          <PrivateRoute path="/users" component={Users}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
