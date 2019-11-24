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


// eslint-disable-next-line import/prefer-default-export
export const client = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function handleApiError<T>(error: object): ApiError<T> {
  const err = error as AxiosError<ApiError<T>>;
  if (err.response) return err.response.data;
  throw err;
}
