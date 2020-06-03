/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { User } from 'features/users/types';
import { createStatusSlice } from '../../shared/slices/statusSlice';
import { loginUser, registerUser, logoutUser } from './api';
import { AppThunk } from '../../store';
import {
  AuthState, Credentials, RegisterData,
} from './types';

const initialState: AuthState = {
  user: undefined,
  loggedIn: false,
};

const name = 'auth';

const status = createStatusSlice(name);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
      state.loggedIn = false;
    },
    setUser(state, { payload }: PayloadAction<User>) {
      state.loggedIn = !!payload;
      state.user = payload;
    },
    login(state, { payload }: PayloadAction<User>) {
      state.user = payload;
      state.loggedIn = true;
    },
  },
});

export const login = (credentials: Credentials): AppThunk<Promise<User>> => async dispatch => {
  const { requestError, requestStart, requestSuccess } = status.actions;

  dispatch(requestStart());
  try {
    const user = await loginUser(credentials);
    dispatch(authSlice.actions.login(user));
    dispatch(requestSuccess());
    return user;
  } catch (err) {
    dispatch(requestError(err.message));
    throw err;
  }
};

export const logout = (): AppThunk<Promise<void>> => async dispatch => {
  const { requestStart, requestSuccess } = status.actions;

  dispatch(requestStart());
  try {
    await logoutUser().catch();
  } catch (err) {
    //
  }
  dispatch(authSlice.actions.logout());
  dispatch(requestSuccess());
};

export const register = (
  regData: RegisterData,
): AppThunk<Promise<void>> => async dispatch => {
  const { requestError, requestStart, requestSuccess } = status.actions;

  dispatch(requestStart());
  try {
    const data = await registerUser(regData);
    // TODO: Fix register
    // dispatch(authSlice.actions.setTokens(pick(data, ['refreshToken', 'accessToken'])));
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

export const { setUser } = authSlice.actions;
export default reducer;
