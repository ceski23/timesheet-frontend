/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useMemo } from 'react';
import {
  SvgIconProps, withStyles, fade, createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { Stylable } from 'utils/types';
import { useThemeType } from 'hooks/useAppTheme';

interface Props {
  icon: (props: SvgIconProps) => JSX.Element;
  color: string;
}

export const ColoredIcon: FC<Props & Stylable> = ({ icon: Icon, color, ...props }) => {
  const themeType = useThemeType();

  const muiTheme = useMemo(() => (
    createMuiTheme({
      palette: {
        primary: {
          main: color,
        },
        type: themeType,
      },
    })
  ), [themeType]);

  // #region styles
  const MyIcon = withStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: fade(theme.palette.primary.main, 0.2),
      borderRadius: '50%',
      padding: theme.spacing(1),
      fontSize: '2.5rem',
    },
  }))(Icon);
  // #endregion

  return (
    <MuiThemeProvider theme={muiTheme}>
      <MyIcon color="primary" {...props} />
    </MuiThemeProvider>
  );
};
