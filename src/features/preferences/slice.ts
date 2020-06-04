/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { enGB, pl } from 'date-fns/locale';
import { RootState } from 'store';
import { ThemeType, PreferencesState } from './types';

const initialState: PreferencesState = {
  theme: 'system',
  language: 'pl',
};

const name = 'preferences';

export const getDateLocale = (code?: string) => {
  switch (code) {
    case 'en':
      return enGB;

    case 'pl':
    default:
      return pl;
  }
};

const preferencesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<ThemeType>) {
      state.theme = payload;
    },
    setLanguage(state, { payload }: PayloadAction<string>) {
      state.language = payload;
    },
  },
});

const persistedPreferencesReducer = persistReducer({
  key: name,
  storage: localforage,
}, preferencesSlice.reducer);

export const { setTheme, setLanguage } = preferencesSlice.actions;
export default persistedPreferencesReducer;

const getPreferencesState = (state: RootState) => state.preferences;

export const selectTheme = createSelector(getPreferencesState, state => state.theme);
export const selectLanguage = createSelector(getPreferencesState, state => state.language);
