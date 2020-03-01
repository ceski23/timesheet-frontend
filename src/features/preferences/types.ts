export type ThemeType = 'dark' | 'light' | 'system';

export interface PreferencesState {
  theme: ThemeType;
  language: string;
}
