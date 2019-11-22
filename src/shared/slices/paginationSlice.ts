import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from '../../api';

export type PaginationState = Pagination;

export const initialState: PaginationState = {
  totalItems: -1,
  totalPages: -1,
  currentPage: -1
};

export const createPaginationSlice = (prefix: string) => createSlice({
  name: prefix,
  initialState,
  reducers: {
    updatePagination(state, { payload }: PayloadAction<Pagination>) {
      state.currentPage = payload.currentPage;
      state.totalItems = payload.totalItems;
      state.totalPages = payload.totalPages;
    },
    changePage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    }
  }
})