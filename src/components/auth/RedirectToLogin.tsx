import React from 'react';
import { Redirect, useLocation } from 'react-router';
import { ROUTE_LOGIN } from 'routes';

export const RedirecToLogin = () => {
  const location = useLocation();

  return (
    <Redirect to={{
      pathname: ROUTE_LOGIN,
      state: { nextLocation: location.pathname },
    }}
    />
  );
};
