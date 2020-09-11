import {
  client, PaginatedResponse, FindParams,
} from 'utils/api';
import { UsersFindParams, User, AddUserParams } from 'store/users/types';
import { usePaginatedQuery, useMutation, queryCache } from 'react-query';

/**
 * API calls
 */

export const fetchUsers = async (params?: FindParams & UsersFindParams) => (
  client.get<unknown, PaginatedResponse<User>>('admin/users', { params })
);

export const deleteUser = async (id: string) => (
  client.delete<unknown, void>(`admin/users/${id}`)
);

export const addUser = async (params: AddUserParams) => (
  client.post<unknown, User>('admin/users', params)
);

/**
 * API hooks
 */

export const useUsers = (params?: FindParams & UsersFindParams) => (
  usePaginatedQuery(['users', params], fetchUsers)
);

export const useDeleteUser = () => useMutation(deleteUser, {
  onSuccess: () => {
    queryCache.invalidateQueries('users');
  },
});

export const useAddUser = () => useMutation(addUser, {
  onSuccess: () => {
    queryCache.invalidateQueries('users');
  },
});
