/* eslint-disable no-param-reassign */
import {
  createSlice, PayloadAction, combineReducers, createAsyncThunk,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { User } from 'features/users/types';
import { ApiError } from 'api';
import { createStatusSlice } from '../../shared/slices/statusSlice';
import {
  loginUser, logoutUser, requestPasswordReset as rpr,
  resetPassword as rp,
} from './api';
import { AppThunk } from '../../store';
import {
  AuthState, Credentials, ResetPasswordData,
} from './types';

const initialState: AuthState = {
  user: undefined,
  loggedIn: false,

  loading: false,
};

const name = 'auth';

const status = createStatusSlice(name);

export const requestPasswordReset = createAsyncThunk('requestPasswordReset', rpr);

export const resetPassword = createAsyncThunk('resetPassword', async (data: ResetPasswordData, { rejectWithValue }) => (
  rp(data).catch((err: ApiError) => rejectWithValue(err))
));

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
  extraReducers: builder => {
    [requestPasswordReset, resetPassword].forEach(actionType => {
      builder.addCase(actionType.pending, state => {
        state.loading = true;
      });
    });
    [requestPasswordReset, resetPassword].forEach(actionType => {
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
