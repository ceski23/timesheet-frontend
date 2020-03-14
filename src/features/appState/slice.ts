/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export type ScreenType = 'employees' | 'notfound' | 'home' | 'worktime';

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

export const selectAppState = (state: RootState) => state.app;
