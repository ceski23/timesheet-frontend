import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchMe } from 'features/auth/api';
import { useState, useEffect } from 'react';

export const useAuthGuard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useSelector((state: RootState) => state.auth.data);

  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      setLoggedIn(true);
      fetchMe().catch(() => { setLoggedIn(false); });
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, [accessToken]);

  return { loggedIn, loading };
};
