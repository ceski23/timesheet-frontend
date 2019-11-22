/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AsyncState {
  loading: boolean;
  error?: object;
}

export const initialState: AsyncState = {
  loading: false,
  error: undefined,
};

export const createStatusSlice = (prefix: string) => createSlice({
  name: prefix,
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    requestSuccess(state) {
      state.loading = false;
      state.error = undefined;
    },
    requestError(state, { payload }: PayloadAction<object>) {
      state.loading = false;
      state.error = payload;
    },
  },
});
