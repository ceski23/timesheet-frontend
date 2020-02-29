import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useMediaQuery, createMuiTheme } from '@material-ui/core';
import { useMemo } from 'react';
import { theme as defaultTheme } from 'theme';

export const useAppTheme = () => {
  const { theme: themeType } = useSelector((state: RootState) => state.preferences);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => (
    // eslint-disable-next-line no-nested-ternary
    createMuiTheme(defaultTheme(themeType === 'system' ? (prefersDarkMode ? 'dark' : 'light') : themeType))
  ), [prefersDarkMode, themeType]);

  return theme;
};
