import { client } from 'utils/api';
import { User } from 'store/users/types';
import {
  Credentials, ForgotPasswordData, ResetPasswordData,
} from 'store/auth/types';
import { useMutation, useQuery } from 'react-query';

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

export const resetPassword = async (reqData: ResetPasswordData) => (
  client.post<unknown, void>('password_reset', reqData)
);

/**
 * API hooks
 */

export const useLoginUser = () => useMutation(loginUser);

export const useLogoutUser = () => useMutation(logoutUser);

export const useFetchMe = () => useQuery('fetchMe');

export const useRequestPasswordReset = () => useMutation(requestPasswordReset);

export const useResetPassword = () => useMutation(resetPassword);
