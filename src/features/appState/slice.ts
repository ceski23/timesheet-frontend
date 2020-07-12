/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export type ScreenType = 'employees' | 'notfound' | 'home' | 'worktime' | 'settings';

interface AppState {
  screen: ScreenType;
}

const initialState: AppState = {
  screen: 'home',
};

const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setScreen(state, { payload }: PayloadAction<ScreenType>) {
      state.screen = payload;
    },
  },
});

export const { setScreen } = slice.actions;
export default slice.reducer;

const getAppState = (state: RootState) => state.app;

export const selectScreenType = createSelector(getAppState, state => state.screen);
