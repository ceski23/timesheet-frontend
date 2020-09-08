import Axios, { AxiosError } from 'axios';

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

export type ApiError<T = never> = Error | {
  name: string;
  statusCode: number;
  data: {
    [K in keyof T]: string;
  } | string;
};

export const client = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
  withCredentials: true,
});

client.interceptors.response.use(
  // Automatically unwrap response data
  response => response.data,
  (error: AxiosError) => {
    // client received an error response (5xx, 4xx)
    if (error.response) return Promise.reject(error.response.data);
    // client never received a response, or request never left
    return Promise.reject(Error('Wystąpił błąd podczas komunikacji z serwerem, spróbuj ponownie później'));
  },
);
