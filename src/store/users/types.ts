export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  activated: boolean;
}

export interface UsersState {
  users: User[];
  filter: UsersFilter;
  query?: string;
}

export enum UsersFilter {
  ALL, ACTIVATED, DEACTIVATED
}

export interface UsersFindParams {
  activated?: boolean;
}
