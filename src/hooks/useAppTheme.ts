import { useMediaQuery, createMuiTheme } from '@material-ui/core';
import { useMemo } from 'react';
import { theme as defaultTheme, contrastTheme } from 'utils/theme';
import { usePreferences } from 'contexts/preferences';

export const useThemeType = () => {
  const { theme: themeType } = usePreferences();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const prefersContrastMode = useMediaQuery('(prefers-contrast: high)', { noSsr: true });

  if (prefersContrastMode) return 'contrast';
  if (themeType === 'system') return prefersDarkMode ? 'dark' : 'light';
  return themeType;
};

export const useAppTheme = () => {
  const themeType = useThemeType();

  const theme = useMemo(() => {
    if (themeType === 'contrast') return createMuiTheme(contrastTheme());
    return createMuiTheme(defaultTheme(themeType));
  }, [themeType]);

  return theme;
};
