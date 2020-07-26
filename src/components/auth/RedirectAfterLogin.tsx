import React from 'react';
import { useLocation, Redirect } from 'react-router';
import { ROUTE_HOME } from 'routes';

interface LocationState {
  nextLocation?: string;
}

export const RedirectAfterLogin = () => {
  const location = useLocation<LocationState>();

  return (
    <Redirect to={location.state.nextLocation || ROUTE_HOME} />
  );
};
