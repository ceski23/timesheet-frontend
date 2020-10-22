import { FC, useEffect } from 'react';
import { useSetAuth } from 'contexts/auth';
import { logoutUser } from 'api/auth';
import { queryCache } from 'react-query';

export const Logout: FC = () => {
  const setAuth = useSetAuth();

  useEffect(() => {
    logoutUser().then(() => {
      queryCache.clear();
      setAuth({ user: undefined, status: 'unauthorized' });
    });
  }, []);

  return null;
};
