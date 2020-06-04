import { client, handleApiError } from 'api';
import { User } from 'features/users/types';
import {
  Credentials, RegisterData, ForgotPasswordData, ResetPasswordData,
} from './types';

export const loginUser = async (credentials: Credentials): Promise<User> => client
  .post('login', credentials)
  .catch(err => { throw handleApiError<Credentials>(err); })
  .then(({ data }) => data);

export const logoutUser = async (): Promise<void> => client
  .post('logout')
  .catch(err => { throw handleApiError<void>(err); })
  .then(({ data }) => data);

export const registerUser = async (regData: RegisterData): Promise<void> => client
  .post('register', regData)
  .catch(err => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);

export const fetchMe = async (): Promise<User> => client
  .get('me')
  .catch(err => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);

export const requestPasswordReset = async (reqData: ForgotPasswordData): Promise<void> => client
  .post('request_password_reset', reqData)
  .catch(err => { throw handleApiError<ForgotPasswordData>(err); })
  .then(({ data }) => data);

export const resetPassword = async (reqData: ResetPasswordData): Promise<void> => client
  .post('password_reset', reqData)
  .catch(err => { throw handleApiError<ResetPasswordData>(err); })
  .then(({ data }) => data);
