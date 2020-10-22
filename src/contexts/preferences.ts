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

// type Action =
//   { type: 'setTheme'; payload: ThemeType } |
//   { type: 'setLanguage'; payload: Language };

// const reducer: Reducer<typeof initialState, Action> = (state, action) => {
//   switch (action.type) {
//     case 'setLanguage':
//       return ({ ...state, language: action.payload });

//     case 'setTheme':
//       return ({ ...state, theme: action.payload });
//   }
// };

// const [
//   PreferencesProvider, usePreferences, usePreferencesDispatch,
// ] = createStore(reducer, initialState, 'timesheet:preferences');

const [
  PreferencesProvider, usePreferences, useSetPreferences,
] = createState(initialState, 'timesheet:preferences');

export { PreferencesProvider, usePreferences, useSetPreferences };
