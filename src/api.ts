import Axios, { AxiosError } from 'axios';
import store from 'store';
import Snackbar from 'utils/snackbar';

export interface FindParams {
  limit?: number;
  page?: number;
  query?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export type ApiResponse<T> = {
  data: T;
} & Pagination;

export interface FieldError {
  keyword: string;
  message: string;
  params: object;
}

export interface ApiError<T> {
  name: string;
  statusCode: number;
  data: {
    [K in keyof T]: FieldError;
  } | string;
}


export const client = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const subscribeToToken = () => {
  const updateAuthHeader = () => {
    const { accessToken } = store.getState().auth.data;
    if (accessToken) {
      client.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } else delete client.defaults.headers.Authorization;
  };

  updateAuthHeader();
  return store.subscribe(updateAuthHeader);
};

client.interceptors.response.use(
  response => response,
  error => {
    if (!error || (error.response && error.response.status === 500)) {
      Snackbar.error('Wystąpił błąd serwera, spróbuj ponownie później');
      return Promise.reject(Error('Wystąpił błąd serwera, spróbuj ponownie później'));
    }
    return Promise.reject(error);
  },
);

export function handleApiError<T>(error: object): ApiError<T> {
  const err = error as AxiosError<ApiError<T>>;
  if (err.response) return err.response.data;
  throw err;
}
