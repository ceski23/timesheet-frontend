import React from 'react';
import { useLocation, Redirect } from 'react-router';
import { routeUrls } from 'routes';

interface LocationState {
  nextLocation?: string;
}

export const RedirectAfterLogin = () => {
  const location = useLocation<LocationState | undefined>();

  return (
    <Redirect to={location.state?.nextLocation || routeUrls.home} />
  );
};
