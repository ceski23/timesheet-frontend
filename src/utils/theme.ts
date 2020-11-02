import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteType } from '@material-ui/core';
import { green, deepPurple } from '@material-ui/core/colors';

export const theme = (type: PaletteType): ThemeOptions => ({
  palette: {
    primary: {
      main: green.A700,
    },
    secondary: {
      main: deepPurple.A700,
    },
    background: {
      default: (type === 'light') ? '#f4f4f4' : '#000000',
      paper: (type === 'light') ? '#ffffff' : '#1a1a1a',
    },
    type,
  },
});

export const contrastTheme = (): ThemeOptions => ({
  palette: {
    primary: {
      main: '#ffff00',
    },
    secondary: {
      main: '#ffff00',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    type: 'dark',
    divider: '#ffff00',
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderWidth: '2px',
        borderColor: '#ffffff',
      },
    },
    MuiDialog: {
      root: {
        border: '2px solid #ffffff',
      },
      paper: {
        border: '2px solid #ffffff',
      },
    },
    MuiPaper: {
      root: {
        border: '2px solid #ffffff',
      },
    },
    MuiPopover: {
      paper: {
        border: '2px solid #ffffff',
      },
    },
    MuiMenu: {
      paper: {
        border: '2px solid #ffffff',
      },
    },
    MuiListItem: {
      root: {
        border: '2px solid #ffffff',
      },
    },
    MuiChip: {
      root: {
        border: '2px solid #ffffff',
        backgroundColor: '#000000',
      },
    },
    MuiTypography: {
      root: {
        color: '#ffffff',
      },
    },
  },
});
