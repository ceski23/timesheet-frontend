import { client } from 'utils/api';
import { useMutation, useQuery } from 'react-query';
import { User } from './users';

// #region API types
export interface Credentials {
  email: string;
  password: string;
}

export type RegisterData = {
  name: string;
  repeatPassword: string;
} & Credentials

export type ForgotPasswordData = {
  email: string;
}

export type ResetPasswordData = {
  password: string;
  repeatPassword: string;
  token: string;
}
// #endregion

/**
 * API calls
 */

export const loginUser = async (credentials: Credentials) => (
  client.post<unknown, User>('login', credentials)
);

export const logoutUser = async () => (
  client.post<unknown, void>('logout')
);

export const fetchMe = async () => (
  client.get<unknown, User>('me')
);

export const requestPasswordReset = async (reqData: ForgotPasswordData) => (
  client.post<unknown, void>('request_password_reset', reqData)
);

export const resetPassword = async (reqData: Pick<ResetPasswordData, 'password' | 'token'>) => (
  client.post<unknown, void>('password_reset', reqData)
);

/**
 * API hooks
 */

export const useLoginUser = () => useMutation(loginUser);

export const useLogoutUser = () => useMutation(logoutUser);

export const useFetchMe = () => useQuery('fetchMe', fetchMe);

export const useRequestPasswordReset = () => useMutation(requestPasswordReset);

export const useResetPassword = () => useMutation(resetPassword);
