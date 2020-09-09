export type ThemeType = 'dark' | 'light' | 'system';

export type Language = 'pl' | 'en';

export interface PreferencesState {
  theme: ThemeType;
  language: Language;
}
