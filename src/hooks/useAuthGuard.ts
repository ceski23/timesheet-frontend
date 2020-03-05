import { useSelector } from 'react-redux';
import { RootState, useThunkDispatch } from 'store';
import { fetchMe } from 'features/auth/api';
import { useState, useEffect } from 'react';
import { setUser } from 'features/auth/authSlice';

export const useAuthGuard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useSelector((state: RootState) => state.auth.data);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      setLoggedIn(true);
      fetchMe()
        .then(user => dispatch(setUser(user)))
        .catch(() => { setLoggedIn(false); });
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, [accessToken]);

  return { loggedIn, loading };
};
