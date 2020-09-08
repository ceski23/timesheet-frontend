/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ReactElement } from 'react';
import {
  Avatar, Typography, styled, Grid,
} from '@material-ui/core';

interface AvatarProps {
  collapsed?: boolean;
}

// #region styles
const AccountAvatar = styled(({ collapsed, ...props }) => <Avatar {...props} />)({
  width: ({ collapsed }: AvatarProps) => (collapsed ? 32 : 48),
  height: ({ collapsed }: AvatarProps) => (collapsed ? 32 : 48),
  transition: '0.3s',
});

const Spacer = styled('div')(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  transition: '0.3s',
}));

const Details = styled('div')({
  flex: 1,
});
// #endregion

interface Props {
  name?: string;
  email?: string;
  avatar?: string;
  collapsed?: boolean;
}

export const NavigationHeader: FC<Props> = ({
  name, email, avatar, collapsed,
}): ReactElement => (
  <>
    <Container>
      <AccountAvatar alt={name} src={avatar} collapsed={collapsed} />
      <Spacer />

      <Grid container direction="row" alignItems="center">
        <Details>
          <Typography variant="h6" noWrap>{name}</Typography>
          <Typography color="textSecondary" noWrap gutterBottom>{email}</Typography>
        </Details>
      </Grid>
    </Container>
  </>
);
