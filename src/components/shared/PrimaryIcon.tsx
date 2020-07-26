import React, { FC } from 'react';
import {
  SvgIconProps, withStyles, fade,
} from '@material-ui/core';
import { Stylable } from 'utils/types';

interface Props {
  icon: (props: SvgIconProps) => JSX.Element;
}

export const PrimaryIcon: FC<Props & Stylable> = ({ icon: Icon, ...props }) => {
  const MyIcon = withStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: fade(theme.palette.primary.main, 0.3),
      borderRadius: '50%',
      padding: theme.spacing(1),
      fontSize: '2.5rem',
    },
  }))(Icon);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MyIcon color="primary" {...props} />
  );
};
