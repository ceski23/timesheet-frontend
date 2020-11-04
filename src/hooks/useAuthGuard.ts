import { useEffect } from 'react';
import { useAuth, useSetAuth } from 'contexts/auth';
import { fetchMe } from 'api/auth';

export const useAuthGuard = () => {
  const { status, user } = useAuth();
  const setAuth = useSetAuth();

  useEffect(() => {
    if (!user) {
      setAuth({ status: 'unauthorized' });
    } else {
      fetchMe().then(userData => {
        setAuth({ user: userData, status: 'authorized' });
      }).catch(() => {
        if (window.navigator.onLine) {
          setAuth({ user: undefined, status: 'unauthorized' });
        }
      });
    }
  }, []);

  return { status };
};
