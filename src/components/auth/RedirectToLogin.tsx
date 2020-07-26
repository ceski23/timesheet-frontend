import React from 'react';
import { Redirect, useLocation } from 'react-router';
import { routeUrls } from 'routes';

export const RedirecToLogin = () => {
  const location = useLocation();
  const badRoutes = [routeUrls.login, routeUrls.logout];

  return (
    <Redirect to={{
      pathname: routeUrls.login,
      state: { nextLocation: (badRoutes.includes(location.pathname)) ? null : location.pathname },
    }}
    />
  );
};
