import React, { FC } from 'react';
import {
  Typography, SvgIconProps, styled, useTheme,
} from '@material-ui/core';
import { ColoredIcon } from './ColoredIcon';

interface Props {
  icon: (props: SvgIconProps) => JSX.Element;
  text: string;
}

// #region styles
const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledIcon = styled(ColoredIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));
// #endregion

export const TitleWithIcon: FC<Props> = ({ icon, text }) => {
  const theme = useTheme();

  return (
    <Container>
      <StyledIcon icon={icon} color={theme.palette.primary.main} />
      <Typography>{text}</Typography>
    </Container>
  );
};
