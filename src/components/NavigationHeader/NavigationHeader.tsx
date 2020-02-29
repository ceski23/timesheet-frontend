/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ReactElement, useState } from 'react';
import {
  Avatar, Typography, styled, IconButton, Collapse, Grid,
} from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { NavigationItem } from 'components/NavigationItem';
import { ROUTE_LOGOUT } from 'routes';

const AccountAvatar = styled(Avatar)({
  width: 48,
  height: 48,
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

interface Props {
  name: string;
  email: string;
  avatar?: string;
}

export const NavigationHeader: FC<Props> = ({
  name, email, avatar,
}): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Container>
        <AccountAvatar alt={name} src={avatar} />
        <Spacer />

        <Grid container direction="row" alignItems="center">
          <Details>
            <Typography variant="h6" noWrap>{name}</Typography>
            <Typography color="textSecondary" noWrap gutterBottom>{email}</Typography>
          </Details>
          <div>
            <IconButton size="small" onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </Grid>
      </Container>

      <Collapse in={expanded} timeout="auto">
        <NavigationItem
          name={t('navigationBar.header.logout')}
          icon={<LogoutIcon />}
          to={ROUTE_LOGOUT}
        />
      </Collapse>

    </>
  );
};
