import { client } from 'utils/api';
import { User } from 'store/users/types';
import {
  Credentials, RegisterData, ForgotPasswordData, ResetPasswordData,
} from './types';

export const loginUser = async (credentials: Credentials) => (
  client.post<unknown, User>('login', credentials)
);

export const logoutUser = async () => (
  client.post<unknown, void>('logout')
);

export const registerUser = async (regData: RegisterData) => (
  client.post<unknown, void>('register', regData)
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
