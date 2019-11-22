import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AsyncState {
  loading: boolean;
  error?: any;
}

export const initialState: AsyncState = {
  loading: false,
  error: null
};

export const createStatusSlice = (prefix: string) => createSlice({
  name: prefix,
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    requestError(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.error = payload;
    }
  }
})