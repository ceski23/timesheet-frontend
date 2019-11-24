import { client, handleApiError } from '../../api';
import { Tokens, Credentials } from './types';

export const loginUser = async (
  credentials: Credentials,
): Promise<Tokens> => client
  .post('login', credentials)
  .catch(err => { throw handleApiError<Credentials>(err); })
  .then(({ data }) => data);
