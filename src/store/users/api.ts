import {
  client, handleApiError, PaginatedResponse, FindParams,
} from 'utils/api';
import { User, UsersFindParams } from './types';

export const fetchUsers = async (
  params?: FindParams & UsersFindParams,
): Promise<PaginatedResponse<User[]>> => client
  .get('users', { params })
  .catch(err => { throw handleApiError(err); })
  .then(({ data }) => data);

export const deleteUser = async (id: string): Promise<void> => client
  .delete(`users/${id}`)
  .catch(err => { throw handleApiError(err); })
  .then();
