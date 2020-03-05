import { User } from 'features/users/types';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

export interface Credentials {
  email: string;
  password: string;
}

export type RegisterData = {
  name: string;
  repeatPassword: string;
} & Credentials
