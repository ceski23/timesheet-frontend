import { createState } from 'utils/state';

export type ScreenType = 'employees' | 'notfound' | 'home' | 'worktime' | 'settings';
interface AppState {
  screen: ScreenType;
  worktimeViewType: 'list' | 'timesheet';
}

const initialState: AppState = {
  screen: 'home',
  worktimeViewType: 'timesheet',
};

const [AppStateProvider, useAppState, useSetAppState] = createState(initialState);

export { AppStateProvider, useAppState, useSetAppState };
