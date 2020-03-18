// import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'store';
import { fetchMe } from 'features/auth/api';
import { useState, useEffect } from 'react';
import { setUser } from 'features/auth/authSlice';

export const useAuthGuard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // const { accessToken } = useSelector((state: RootState) => state.auth.data);
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
    setLoading(true);
    fetchMe()
      .then(user => {
        dispatch(setUser(user));
        setLoggedIn(true);
        setLoading(false);
      })
      .catch(() => {
        setLoggedIn(false);
        setLoading(false);
      });
  }, []);

  return { loggedIn, loading };
};
