import Axios, { AxiosError } from 'axios';
import i18next from 'i18next';

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
  },
  withCredentials: true,
});

const translateApiErrors = (error: string) => {
  switch (error) {
    case 'Too many requests': return i18next.t('ui:notifications.too_many_requests');
    default: return error;
  }
};

client.interceptors.response.use(
  // Automatically unwrap response data
  response => response.data,
  (error: AxiosError) => {
    // client received an error response (5xx, 4xx)
    if (error.response) {
      if (typeof error.response.data.data === 'string') {
        return Promise.reject(Error(translateApiErrors(error.response.data.data)));
      }
      return Promise.reject(error.response.data);
    }
    // client never received a response, or request never left
    return Promise.reject(Error(i18next.t('ui:notifications.failure.internal_error')));
  },
);
