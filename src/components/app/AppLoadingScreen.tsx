import React, { FC } from 'react';
import { styled, CircularProgress } from '@material-ui/core';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

export const AppLoadingScreen: FC = () => (
  <Container>
    <CircularProgress variant="indeterminate" size={50} />
  </Container>
);
