/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'store';
import { Event } from 'components/Timesheet/Content';
import { addDays, subDays, startOfWeek } from 'date-fns';
import { getDateLocale } from 'store/preferences/slice';

interface Pos {
  x: number;
  y: number;
}

export type NumOfDays = 1 | 3 | 7;

export interface WorktimeState {
  numOfDays: NumOfDays;
  firstDay: Date;
  lastDay: Date;
  selectedEvent?: Event;
  mousePos: Pos;
}

const getDates = (date: Date, num: NumOfDays): Pick<WorktimeState, 'firstDay'|'lastDay'> => ({
  firstDay: date,
  lastDay: addDays(date, num - 1),
});

const nextDates = (date: Date, num: NumOfDays): Pick<WorktimeState, 'firstDay'|'lastDay'> => (
  getDates(addDays(date, num), num)
);

const prevDates = (date: Date, num: NumOfDays): Pick<WorktimeState, 'firstDay'|'lastDay'> => (
  getDates(subDays(date, num), num)
);

export const getFirstDate = (num: NumOfDays, locale: Locale, date: Date = new Date()): Date => {
  switch (num) {
    case 1:
    case 3:
      return date;
    case 7:
    default:
      return startOfWeek(date, { locale });
  }
};

const initialState: WorktimeState = {
  numOfDays: 7,
  mousePos: { x: 0, y: 0 },
  ...getDates(getFirstDate(7, getDateLocale()), 7),
};

const slice = createSlice({
  name: 'worktime',
  initialState,
  reducers: {
    setNumOfDays(state, { payload }: PayloadAction<NumOfDays>) {
      state.numOfDays = payload;
    },
    openEventPopover(state, { payload }: PayloadAction<Pick<WorktimeState, 'mousePos' | 'selectedEvent'>>) {
      state.mousePos = payload.mousePos;
      state.selectedEvent = payload.selectedEvent;
    },
    setDays(state, { payload }: PayloadAction<Date>) {
      const { firstDay, lastDay } = getDates(payload, state.numOfDays);
      state.firstDay = firstDay;
      state.lastDay = lastDay;
    },
    prevDays(state) {
      const { firstDay, lastDay } = prevDates(state.firstDay, state.numOfDays);
      state.firstDay = firstDay;
      state.lastDay = lastDay;
    },
    nextDays(state) {
      const { firstDay, lastDay } = nextDates(state.firstDay, state.numOfDays);
      state.firstDay = firstDay;
      state.lastDay = lastDay;
    },
  },
});

export const nowDay = (): AppThunk<void> => (dispatch, getState) => {
  const { worktime: { numOfDays }, preferences: { language } } = getState();
  const { setDays } = slice.actions;
  const firstDay = getFirstDate(numOfDays, getDateLocale(language), new Date());

  dispatch(setDays(firstDay));
};

export const {
  setNumOfDays, openEventPopover, setDays, prevDays, nextDays,
} = slice.actions;
export default slice.reducer;

export const selectWorktimeState = (state: RootState) => state.worktime;
