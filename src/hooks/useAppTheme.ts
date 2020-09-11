import { useMediaQuery, createMuiTheme } from '@material-ui/core';
import { useMemo } from 'react';
import { theme as defaultTheme } from 'utils/theme';
import { usePreferences } from 'contexts/preferences';

export const useAppTheme = () => {
  const { theme: themeType } = usePreferences();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  const theme = useMemo(() => (
    // eslint-disable-next-line no-nested-ternary
    createMuiTheme(defaultTheme(themeType === 'system' ? (prefersDarkMode ? 'dark' : 'light') : themeType))
  ), [prefersDarkMode, themeType]);

  return theme;
};
