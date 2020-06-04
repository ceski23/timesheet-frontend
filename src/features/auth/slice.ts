/* eslint-disable no-param-reassign */
import {
  createSlice, PayloadAction, createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { User } from 'features/users/types';
import { ApiError } from 'api';
import { RootState } from 'store';
import * as API from './api';
import {
  AuthState, Credentials, ResetPasswordData,
} from './types';

const initialState: AuthState = {
  user: undefined,
  loggedIn: false,

  loading: false,
};

const name = 'auth';

export const requestPasswordReset = createAsyncThunk(`${name}/requestPasswordReset`, API.requestPasswordReset);

export const resetPassword = createAsyncThunk(`${name}/resetPassword`, async (data: ResetPasswordData, { rejectWithValue }) => (
  API.resetPassword(data).catch((err: ApiError) => rejectWithValue(err))
));

export const login = createAsyncThunk(`${name}/login`, async (credentials: Credentials, { rejectWithValue }) => (
  API.loginUser(credentials).catch((err: ApiError) => rejectWithValue(err))
));

export const logout = createAsyncThunk(`${name}/logout`, API.logoutUser);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      state.loggedIn = !!payload;
      state.user = payload;
    },
  },
  extraReducers: builder => {
    [requestPasswordReset, resetPassword, login, logout].forEach(actionType => {
      builder.addCase(actionType.pending, state => {
        state.loading = true;
      });
    });
    [requestPasswordReset, resetPassword, login, logout].forEach(actionType => {
      builder.addCase(actionType.rejected, state => {
        state.loading = false;
      });
    });
    builder.addCase(requestPasswordReset.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(resetPassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.loggedIn = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.loading = false;
      state.user = undefined;
      state.loggedIn = false;
    });
  },
});

const persistedAuthReducer = persistReducer({
  key: name,
  storage: localforage,
}, slice.reducer);

export const { setUser } = slice.actions;
export default persistedAuthReducer;

const getAuthState = (state: RootState) => state.auth;

export const selectLoggedIn = createSelector(getAuthState, state => state.loggedIn);
export const selectUser = createSelector(getAuthState, state => state.user);
