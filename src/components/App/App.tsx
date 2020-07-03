import React, { Suspense } from 'react';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { Helmet } from 'react-helmet';
import { useAppTheme } from 'hooks/useAppTheme';

const LoggedInContentX = React.lazy(() => import('components/LoggedInContent').then(({ LoggedInContent }) => ({ default: LoggedInContent })));
const GuestContentX = React.lazy(() => import('components/GuestContent').then(({ GuestContent }) => ({ default: GuestContent })));

export const App: React.FC = () => {
  const theme = useAppTheme();

  const { status, loading } = useAuthGuard();

  return (
    <>
      <Suspense fallback={<p>Ładowanie...</p>}>
        {!loading && (
          status ? <LoggedInContentX /> : <GuestContentX />
        )}
      </Suspense>

      <Helmet>
        <meta name="theme-color" content={theme.palette.background.paper} />
      </Helmet>
    </>
  );
};
