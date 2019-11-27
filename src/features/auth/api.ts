import { client, handleApiError } from 'api';
import {
  Tokens, Credentials, RegisterData, User,
} from './types';

export const loginUser = async (credentials: Credentials): Promise<Tokens> => client
  .post('login', credentials)
  .catch(err => { throw handleApiError<Credentials>(err); })
  .then(({ data }) => data);

export const registerUser = async (regData: RegisterData): Promise<User & Tokens> => client
  .post('register', regData)
  .catch(err => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);

export const fetchMe = async (): Promise<User> => client
  .get('me')
  .catch(err => { throw handleApiError<RegisterData>(err); })
  .then(({ data }) => data);
