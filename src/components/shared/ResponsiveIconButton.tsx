/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, ButtonProps, IconButton, IconButtonProps, useMediaQuery, useTheme,
} from '@material-ui/core';
import React from 'react';

interface Props {
  icon: React.ReactNode;
}

export const ResponsiveIconButton = (
  { icon, ...props }: (ButtonProps & IconButtonProps) & Props,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {isMobile ? (
        <IconButton {...props}>{icon}</IconButton>
      ) : (
        <Button startIcon={icon} {...props} />
      )}
    </>
  );
};
