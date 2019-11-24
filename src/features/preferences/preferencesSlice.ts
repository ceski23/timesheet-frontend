/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { ThemeType, PreferencesState } from './types';

const initialState: PreferencesState = {
  theme: 'system',
};

const name = 'preferences';

const preferencesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<ThemeType>) {
      state.theme = payload;
    },
  },
});

const persistedPreferencesReducer = persistReducer({
  key: name,
  storage: localforage,
}, preferencesSlice.reducer);

export const { setTheme } = preferencesSlice.actions;
export default persistedPreferencesReducer;
