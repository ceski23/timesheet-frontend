import {
  configureStore, Action, combineReducers, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { persistStore } from 'redux-persist';

import testReducer from './features/test/testSlice';

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'],
  },
});

const rootReducer = combineReducers({
  test: testReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<R> = ThunkAction<R, RootState, null, Action<string>>;
type AppDispatch = typeof store.dispatch;

export const useThunkDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
