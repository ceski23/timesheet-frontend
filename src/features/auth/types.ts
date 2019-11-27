export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export type RegisterData = {
  name: string;
  repeatPassword: string;
} & Credentials


// TODO: Move
export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}
