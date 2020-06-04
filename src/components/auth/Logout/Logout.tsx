import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'features/auth/slice';

export const Logout: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(logout()); }, []);

  return null;
};
