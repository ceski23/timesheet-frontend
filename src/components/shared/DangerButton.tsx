/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, ButtonTypeMap, createMuiTheme, ExtendButtonBase,
  MuiThemeProvider, PaletteType, ThemeOptions,
} from '@material-ui/core';
import { useThemeType } from 'hooks/useAppTheme';
import React, { useMemo } from 'react';

const theme = (type: PaletteType): ThemeOptions => ({
  palette: {
    primary: {
      main: '#ff0000',
    },
    type,
  },
});

export const DangerButton: ExtendButtonBase<ButtonTypeMap<{}, 'button'>> = (props: any) => {
  const themeType = useThemeType();

  const muiTheme = useMemo(() => (
    createMuiTheme(theme(themeType))
  ), [themeType]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Button color="primary" {...props} />
    </MuiThemeProvider>
  );
};
