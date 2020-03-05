/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { pick } from 'lodash-es';
import { User } from 'features/users/types';
import { createStatusSlice } from '../../shared/slices/statusSlice';
import { loginUser, registerUser } from './api';
import { AppThunk } from '../../store';
import {
  AuthState, Tokens, Credentials, RegisterData,
} from './types';

const initialState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
};

const name = 'auth';

const status = createStatusSlice(name);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTokens(state, { payload }: PayloadAction<Tokens>) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    logout(state) {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = undefined;
    },
    setUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
  },
});

export const login = (credentials: Credentials): AppThunk<Promise<Tokens>> => async dispatch => {
  const { requestError, requestStart, requestSuccess } = status.actions;

  dispatch(requestStart());
  try {
    const tokens = await loginUser(credentials);
    dispatch(authSlice.actions.setTokens(tokens));
    dispatch(requestSuccess());
    return tokens;
  } catch (err) {
    dispatch(requestError(err.message));
    throw err;
  }
};

export const register = (
  regData: RegisterData,
): AppThunk<Promise<User & Tokens>> => async dispatch => {
  const { requestError, requestStart, requestSuccess } = status.actions;

  dispatch(requestStart());
  try {
    const data = await registerUser(regData);
    dispatch(authSlice.actions.setTokens(pick(data, ['refreshToken', 'accessToken'])));
    dispatch(requestSuccess());
    return data;
  } catch (err) {
    dispatch(requestError(err.message));
    throw err;
  }
};

const persistedAuthReducer = persistReducer({
  key: name,
  storage: localforage,
}, authSlice.reducer);

const reducer = combineReducers({
  data: persistedAuthReducer,
  status: status.reducer,
});

export const { setTokens, logout, setUser } = authSlice.actions;
export default reducer;
