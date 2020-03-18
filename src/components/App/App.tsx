import React, { useEffect } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { updateAuthHeader } from 'api';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { LoggedInContent } from 'components/LoggedInContent';
import { GuestContent } from 'components/GuestContent';
import { Helmet } from 'react-helmet';
import { useAppTheme } from 'hooks/useAppTheme';

export const App: React.FC = () => {
  // const { accessToken } = useSelector((state: RootState) => state.auth.data);
  const theme = useAppTheme();

  // useEffect(() => {
  //   updateAuthHeader(accessToken);
  // }, [accessToken]);

  const { loggedIn, loading } = useAuthGuard();

  return (
    <>
      {!loading && (
        loggedIn ? <LoggedInContent /> : <GuestContent />
      )}

      <Helmet>
        <meta name="theme-color" content={theme.palette.background.paper} />
      </Helmet>
    </>
  );
};
