import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteType } from '@material-ui/core';
import { green, deepPurple } from '@material-ui/core/colors';

export const theme = (type: PaletteType): ThemeOptions => ({
  palette: {
    primary: {
      main: green.A400,
    },
    secondary: {
      main: deepPurple.A700,
    },
    type,
  },
});
