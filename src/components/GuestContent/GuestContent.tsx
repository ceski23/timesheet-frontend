import React, { FC } from 'react';
import { guestRoutes } from 'routes';
import { renderRoutes } from 'react-router-config';
import { useAppTheme } from 'hooks/useAppTheme';
import { ThemeProvider, styled } from '@material-ui/core';

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

export const GuestContent: FC = () => {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {renderRoutes(guestRoutes)}
      </Container>
    </ThemeProvider>
  );
};
