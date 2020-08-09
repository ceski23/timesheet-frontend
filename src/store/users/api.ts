import {
  client, PaginatedResponse, FindParams,
} from 'utils/api';
import { User, UsersFindParams, AddUserParams } from './types';

export const fetchUsers = async (params?: FindParams & UsersFindParams) => (
  client.get<unknown, PaginatedResponse<User>>('admin/users', { params })
);

export const deleteUser = async (id: string) => (
  client.delete<unknown, void>(`admin/users/${id}`)
);

export const addUser = async (params: AddUserParams) => (
  client.post<unknown, User>('admin/users', params)
);
