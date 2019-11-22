import Axios from 'axios';

export const client = Axios.create({
  baseURL: 'http://127.0.0.1:3000'
});

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