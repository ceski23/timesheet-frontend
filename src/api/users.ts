/* eslint-disable @typescript-eslint/interface-name-prefix */
import {
  client, PaginatedResponse, FindParams,
} from 'utils/api';
import { usePaginatedQuery, useMutation, queryCache } from 'react-query';

// #region Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  activated: boolean;
  norm: number;
}

export interface UsersFiltersState {
  filter: UsersFilter;
  query?: string;
}

export enum UsersFilter {
  ALL, ACTIVATED, DEACTIVATED
}

export interface UsersFindParams {
  activated?: boolean;
}

export interface AddUserParams {
  name: string;
  email: string;
  norm: number;
}

export interface EditUserParams {
  name: string;
  email: string;
  norm: number;
}

export interface ID {
  id: string;
}
// #endregion

// #region API calls
export const fetchUsers = async (params?: FindParams & UsersFindParams) => (
  client.get<unknown, PaginatedResponse<User>>('users/admin', { params })
);

export const fetchUserById = async (id: string) => (
  client.get<unknown, User>(`users/admin/${id}`)
);

export const deleteUser = async (id: string) => (
  client.delete<unknown, void>(`users/admin/${id}`)
);

export const addUser = async (params: AddUserParams) => (
  client.post<unknown, User>('users/admin', params)
);

export const updateUser = async ({ id, ...params }: EditUserParams & ID) => (
  client.patch<unknown, User>(`users/admin/${id}`, params)
);
// #endregion

// #region API hooks
export const useUsers = (params?: FindParams & UsersFindParams) => (
  usePaginatedQuery(['users', params], fetchUsers)
);

export const useUser = (id: string) => (
  usePaginatedQuery(['user', id], fetchUserById)
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

export const useEditUser = () => useMutation(updateUser, {
  onSuccess: () => {
    queryCache.invalidateQueries('users');
  },
});
// #endregion
