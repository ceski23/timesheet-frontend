import { User } from 'features/users/types';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export type AuthStatus = 'authorized' | 'unauthorized' | 'unknown';

export interface AuthState {
  user?: User;
  status: AuthStatus;

  loading: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export type RegisterData = {
  name: string;
  repeatPassword: string;
} & Credentials

export type ForgotPasswordData = {
  email: string;
}

export type ResetPasswordData = {
  password: string;
  repeatPassword: string;
  token: string;
}
