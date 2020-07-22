import React from 'react';
import { useLocation, Redirect } from 'react-router';
import { ROUTE_HOME } from 'routes';

export const RedirectAfterLogin = () => {
  const location = useLocation();

  return (
    <Redirect to={(location.state as any).nextLocation || ROUTE_HOME} />
  );
};
