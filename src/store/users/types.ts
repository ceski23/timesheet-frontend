export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  activated: boolean;
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
}
