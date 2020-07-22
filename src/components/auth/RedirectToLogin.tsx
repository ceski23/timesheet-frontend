import React from 'react';
import { Redirect, useLocation } from 'react-router';
import { ROUTE_LOGIN, ROUTE_LOGOUT } from 'routes';

export const RedirecToLogin = () => {
  const location = useLocation();
  const badRoutes = [ROUTE_LOGIN, ROUTE_LOGOUT];

  return (
    <Redirect to={{
      pathname: ROUTE_LOGIN,
      state: { nextLocation: (badRoutes.includes(location.pathname)) ? null : location.pathname },
    }}
    />
  );
};
