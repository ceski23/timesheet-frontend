import { createState } from 'utils/state';

export type ScreenType = 'employees' | 'notfound' | 'home' | 'worktime' | 'settings';
interface AppState {
  screen: ScreenType;
}

const initialState: AppState = {
  screen: 'home',
};

const [AppStateProvider, useAppState, useSetAppState] = createState(initialState);

export { AppStateProvider, useAppState, useSetAppState };
