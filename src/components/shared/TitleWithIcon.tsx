import React, { FC } from 'react';
import { Typography, SvgIconProps, styled } from '@material-ui/core';
import { PrimaryIcon } from './PrimaryIcon';

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

const StyledIcon = styled(PrimaryIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));
// #endregion

export const TitleWithIcon: FC<Props> = ({ icon, text }) => (
  <Container>
    <StyledIcon icon={icon} />
    <Typography>{text}</Typography>
  </Container>
);
