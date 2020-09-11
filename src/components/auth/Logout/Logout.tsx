import { FC, useEffect } from 'react';
import { useSetAuth } from 'contexts/auth';
import { logoutUser } from 'store/auth/api';

export const Logout: FC = () => {
  const setAuth = useSetAuth();

  useEffect(() => {
    logoutUser().then(() => {
      setAuth({ user: undefined, status: 'unauthorized' });
    });
  }, []);

  return null;
};
