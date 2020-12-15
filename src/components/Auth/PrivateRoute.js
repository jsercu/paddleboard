import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(routeProps) => (!!auth.user ? <RouteComponent {...routeProps} /> : <Redirect to={'/login'} />)}
    />
  );
};

export default PrivateRoute;
