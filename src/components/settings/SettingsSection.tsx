import React, { FC } from 'react';
import { styled, Typography } from '@material-ui/core';

const Section = styled('div')({

});

const SectionTitle = styled(Typography)(({ theme }) => ({
  lineHeight: '48px',
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

interface Props {
  title: string;
}

export const SettingsSection: FC<Props> = ({ title, children }) => (
  <>
    <SectionTitle>{title}</SectionTitle>
    <Section>{children}</Section>
  </>
);
