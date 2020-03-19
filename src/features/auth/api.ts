import { client, handleApiError } from 'api';
import { User } from 'features/users/types';
import {
  Tokens, Credentials, RegisterData,
} from './types';

export const loginUser = async (credentials: Credentials): Promise<User> => client
  .post('login', credentials)
  .catch(err => { throw handleApiError<Credentials>(err); })
  .then(({ data }) => data);

export const logoutUser = async (): Promise<void> => client
  .post('logout')
  .catch(err => { throw handleApiError<void>(err); })
  .then(({ data }) => data);

export const registerUser = async (regData: RegisterData): Promise<User & Tokens> => client
  .post('register', regData)
  .catch(err => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);

export const fetchMe = async (): Promise<User> => client
  .get('me')
  .catch(err => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);
