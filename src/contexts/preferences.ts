import { createState } from 'utils/state';

export type ThemeType = 'dark' | 'light' | 'system' | 'contrast';

export type Language = 'pl' | 'en';

export interface PreferencesState {
  theme: ThemeType;
  language: Language;
}

const initialState: PreferencesState = {
  theme: 'system',
  language: 'pl',
};

const [
  PreferencesProvider, usePreferences, useSetPreferences,
] = createState(initialState, 'timesheet:preferences');

export { PreferencesProvider, usePreferences, useSetPreferences };
