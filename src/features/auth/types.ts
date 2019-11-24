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
