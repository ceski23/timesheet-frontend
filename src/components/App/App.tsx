import React, { useEffect } from 'react';
import { RootState } from 'store';
import { styled } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { subscribeToToken } from 'api';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { loggedInRoutes, guestRoutes } from 'routes';
import { renderRoutes } from 'react-router-config';

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

export const App: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth.data);
  useEffect(subscribeToToken, [accessToken]);

  const { loggedIn, loading } = useAuthGuard();

  return (
    <Container>
      {!loading && renderRoutes(loggedIn ? loggedInRoutes : guestRoutes)}
    </Container>
  );
};
