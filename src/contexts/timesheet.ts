import { NumOfDays, Event } from 'components/Timesheet/Content';
import { endOfWeek, startOfWeek } from 'date-fns';
import { createState } from 'utils/state';

interface TimesheetState {
  numOfDays: NumOfDays;
  firstDay: Date;
  lastDay: Date;
  selectedEvent?: Event;
  mousePos?: {
    x: number;
    y: number;
  };
}

const initialState: TimesheetState = {
  numOfDays: 7,
  firstDay: startOfWeek(new Date()),
  lastDay: endOfWeek(new Date()),
};

const [TimesheetStateProvider, useTimesheetState, useSetTimesheetState] = createState(initialState);

export { TimesheetStateProvider, useTimesheetState, useSetTimesheetState };
