import {
  client, handleApiError, PaginatedResponse, FindParams,
} from 'utils/api';
import { User, UsersFindParams } from './types';

export const fetchUsers = async (params?: FindParams & UsersFindParams) => client
  .get<PaginatedResponse<User>>('admin/users', { params })
  .catch(err => { throw handleApiError(err); })
  .then(({ data }) => data);

export const deleteUser = async (id: string) => client
  .delete<void>(`admin/users/${id}`)
  .catch(err => { throw handleApiError(err); })
  .then(({ data }) => data);
