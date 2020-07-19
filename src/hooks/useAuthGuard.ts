import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'store';
import { fetchMe } from 'store/auth/api';
import { useState, useEffect } from 'react';
import { logout, setUser, selectAuthStatus } from 'store/auth/slice';

export const useAuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const status = useSelector(selectAuthStatus);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (status === 'authorized') {
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
  }, [status]);

  return { status, loading };
};
