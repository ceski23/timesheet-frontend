import React, { useMemo } from 'react';
import { RootState } from 'store';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';
import { theme as defaultTheme } from 'theme';

export const ThemeContainer: React.FC = ({ children }) => {
  const { theme: themeType } = useSelector((state: RootState) => state.preferences);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => (
    // eslint-disable-next-line no-nested-ternary
    createMuiTheme(defaultTheme(themeType === 'system' ? (prefersDarkMode ? 'dark' : 'light') : themeType))
  ), [prefersDarkMode, themeType]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};
