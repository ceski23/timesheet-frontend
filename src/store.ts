import {
  configureStore, Action, combineReducers, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { persistStore } from 'redux-persist';

import authReducer from './features/auth/authSlice';
import preferencesReducer from './features/preferences/preferencesSlice';
import usersReducer from './features/users/slice';

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'],
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  preferences: preferencesReducer,
  users: usersReducer,
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
