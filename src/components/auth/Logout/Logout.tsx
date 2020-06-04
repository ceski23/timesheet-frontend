import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'features/auth/authSlice';

export const Logout: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(logout()); }, []);

  return null;
};
