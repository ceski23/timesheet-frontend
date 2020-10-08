import { Record } from 'api/records';
import { NumOfDays } from 'components/Timesheet/Content';
import { endOfWeek, startOfWeek } from 'date-fns';
import { DialogHook } from 'hooks/useDialog';
import { createState } from 'utils/state';

interface TimesheetState {
  numOfDays: NumOfDays;
  firstDay: Date;
  lastDay: Date;
  selectedEvent?: Record;
  mousePos?: {
    x: number;
    y: number;
  };
  deleteDialog?: DialogHook<Record>;
}

const initialState: TimesheetState = {
  numOfDays: 7,
  firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }),
  lastDay: endOfWeek(new Date(), { weekStartsOn: 1 }),
};

const [TimesheetStateProvider, useTimesheetState, useSetTimesheetState] = createState(initialState);

export { TimesheetStateProvider, useTimesheetState, useSetTimesheetState };
