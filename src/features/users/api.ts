import {
  client, handleApiError, PaginatedResponse, FindParams,
} from 'api';
import { User, UsersFindParams } from './types';

export const fetchUsers = async (
  params?: FindParams & UsersFindParams,
): Promise<PaginatedResponse<User[]>> => client
  .get('users', { params })
  .catch(err => { throw handleApiError(err); })
  .then(({ data }) => data);
