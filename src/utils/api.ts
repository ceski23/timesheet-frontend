import Axios, { AxiosError } from 'axios';
import Notificator from 'utils/Notificator';

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

export type PaginatedResponse<T> = {
  data: T[];
} & Pagination;

export interface ApiError<T = never> {
  name: string;
  statusCode: number;
  data: {
    [K in keyof T]: string;
  } | string;
}


export const client = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
  withCredentials: true,
});

client.interceptors.response.use(
  response => response,
  error => {
    if (
      !error
      || (error.response && error.response.status === 500)
      || !error.response
    ) {
      Notificator.error('Wystąpił błąd serwera, spróbuj ponownie później');
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
