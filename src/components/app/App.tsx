import React, { Suspense } from 'react';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { Helmet } from 'react-helmet';
import { useAppTheme } from 'hooks/useAppTheme';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from 'utils/Notificator';
import { AppLoadingScreen } from 'components/app/AppLoadingScreen';

const LoggedInContentX = React.lazy(() => import('components/LoggedInContent'));
const GuestContentX = React.lazy(() => import('components/GuestContent'));

export const App: React.FC = () => {
  const theme = useAppTheme();

  const { status, loading } = useAuthGuard();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <SnackbarUtilsConfigurator />
        <Suspense fallback={<AppLoadingScreen />}>
          {!loading && (
            status === 'authorized' ? <LoggedInContentX /> : <GuestContentX />
          )}
        </Suspense>

        <Helmet>
          <meta name="theme-color" content={theme.palette.background.paper} />
        </Helmet>

      </SnackbarProvider>
    </ThemeProvider>
  );
};
