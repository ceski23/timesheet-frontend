import { useSelector } from 'react-redux';
import { useThunkDispatch, RootState } from 'store';
import { fetchMe } from 'features/auth/api';
import { useState, useEffect } from 'react';
import { setUser, logout } from 'features/auth/authSlice';

export const useAuthGuard = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useSelector((state: RootState) => state.auth.data);
  const dispatch = useThunkDispatch();

  // useEffect(() => {
  //   setLoading(true);
  //   if (accessToken) {
  //     setLoggedIn(true);
  //     fetchMe()
  //       .then(user => dispatch(setUser(user)))
  //       .catch(() => { setLoggedIn(false); });
  //   } else {
  //     setLoggedIn(false);
  //   }
  //   setLoading(false);
  // }, [accessToken]);

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
