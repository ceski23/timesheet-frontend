import React, { Suspense } from 'react';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { Helmet } from 'react-helmet';
import { useAppTheme } from 'hooks/useAppTheme';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from 'utils/Notificator';
import { AppLoadingScreen } from 'components/app/AppLoadingScreen';
import { AppStateProvider } from 'contexts/appState';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query';
import { ApiError } from 'utils/api';
import { useSetAuth } from 'contexts/auth';

const LoggedInContent = React.lazy(() => import('components/layout/LoggedInContent'));
const GuestContent = React.lazy(() => import('components/layout/GuestContent'));

export const App: React.FC = () => {
  const theme = useAppTheme();
  const { status } = useAuthGuard();
  const setAuth = useSetAuth();

  const reactQueryConfig: ReactQueryConfig = React.useMemo(() => ({
    queries: {
      queryFnParamsFilter: args => args.slice(1),
      onError: error => {
        const err = error as ApiError;
        if (!(err instanceof Error) && err.statusCode === 401) {
          setAuth({ status: 'unauthorized' });
        }
      },
      retry: (_count, error) => {
        const err = error as ApiError;
        if (!(err instanceof Error) && err.statusCode === 401) return false;
        return (_count < 2);
      },
    },
  }), []);

  return (
    <AppStateProvider>
      <ReactQueryDevtools />
      <ReactQueryConfigProvider config={reactQueryConfig}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <SnackbarUtilsConfigurator />

            <Suspense fallback={<AppLoadingScreen />}>
              {status === 'authorized' && <LoggedInContent />}
              {status === 'unauthorized' && <GuestContent />}
            </Suspense>

            <Helmet>
              <meta name="theme-color" content={theme.palette.background.paper} />
            </Helmet>

          </SnackbarProvider>
        </ThemeProvider>
      </ReactQueryConfigProvider>
    </AppStateProvider>
  );
};
