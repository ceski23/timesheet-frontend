import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'store';
import { fetchMe } from 'features/auth/api';
import { useState, useEffect } from 'react';
import { setUser, logout, selectLoggedIn } from 'features/auth/slice';

export const useAuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      fetchMe()
        .then(userData => {
          dispatch(setUser(userData));
          setLoading(false);
        })
        .catch(() => {
          dispatch(logout());
          setLoading(false);
        });
    } else setLoading(false);
  }, [loggedIn]);

  return { loggedIn, loading };
};
