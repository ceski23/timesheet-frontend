import {
  configureStore, Action, combineReducers, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { persistStore } from 'redux-persist';

import authReducer from './features/auth/slice';
import preferencesReducer from './features/preferences/slice';
import usersReducer from './features/users/slice';
import appReducer from './features/appState/slice';
import worktimeReducer from './features/worktime/slice';

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const rootReducer = combineReducers({
  auth: authReducer,
  preferences: preferencesReducer,
  users: usersReducer,
  app: appReducer,
  worktime: worktimeReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<R> = ThunkAction<R, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const useThunkDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
