import React, { FC } from 'react';
import { guestRoutes } from 'routes';
import { renderRoutes } from 'react-router-config';
import { styled } from '@material-ui/core';

// #region styles
const Container = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.background.default,
}));
// #endregion

export const GuestContent: FC = () => (
  <Container>
    {renderRoutes(guestRoutes)}
  </Container>
);

export default GuestContent;
