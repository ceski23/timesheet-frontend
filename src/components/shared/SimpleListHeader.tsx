import { Divider, styled, Typography } from '@material-ui/core';
import React, { FC } from 'react';

// #region styles
const InnerContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  width: '100%',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const HeaderActions = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
// #endregion

interface Props {
  title: string;
}

export const SimpleListHeader: FC<Props> = ({ children, title }) => (
  <>
    <InnerContainer>
      <Typography variant="h6" component="h2" style={{ flex: 1 }}>{title}</Typography>
      <HeaderActions>{children}</HeaderActions>
    </InnerContainer>
    <Divider />
  </>
);
