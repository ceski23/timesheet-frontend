/* eslint-disable no-param-reassign */
import { createReducer, PayloadAction, Draft } from '@reduxjs/toolkit';

interface PaginateConfig {
  limit: number;
  types: {
    pending: string;
    fulfilled: string;
    rejected: string;
  };
}

export interface Paginated<T> {
  fetching: boolean;
  error: boolean;
  limit: number;
  items: T[] | null;
  totalItems: number | null;
  currentPage: number | null;
  totalPages: number | null;
}

export interface PaginatedSuccess<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}


export const getDefaultPaginatedState = <T extends object>(limit: number): Paginated<T> => ({
  fetching: false,
  error: false,
  limit,
  totalItems: null,
  items: null,
  currentPage: null,
  totalPages: null,
});

export const createPaginatedReducer = <T extends object>({ limit, types }: PaginateConfig) => (
  createReducer(getDefaultPaginatedState<T>(limit), builder => {
    builder.addCase(types.pending, state => {
      state.fetching = true;
    });
    builder.addCase(types.fulfilled, (state, { payload }: PayloadAction<PaginatedSuccess<T>>) => {
      state.fetching = false;
      state.error = false;
      // state.items = (state.items || []).concat(payload.items as Draft<T>[]);
      state.items = payload.items as Draft<T>[];
      state.totalItems = payload.totalItems;
      state.totalPages = payload.totalPages;
      state.currentPage = payload.currentPage;
    });
    builder.addCase(types.rejected, state => {
      state.fetching = false;
      state.error = true;
    });
  })
);
