import { useMediaQuery, createMuiTheme } from '@material-ui/core';
import { useMemo } from 'react';
import { theme as defaultTheme } from 'utils/theme';
import { usePreferences } from 'contexts/preferences';

export const useThemeType = () => {
  const { theme: themeType } = usePreferences();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  // eslint-disable-next-line no-nested-ternary
  return themeType === 'system' ? (prefersDarkMode ? 'dark' : 'light') : themeType;
};

export const useAppTheme = () => {
  const themeType = useThemeType();

  const theme = useMemo(() => (
    createMuiTheme(defaultTheme(themeType))
  ), [themeType]);

  return theme;
};
