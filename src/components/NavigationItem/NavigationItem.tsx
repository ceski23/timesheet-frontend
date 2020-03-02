/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, ComponentType,
} from 'react';
import {
  ListItem, ListItemIcon, ListItemText, styled, IconProps, fade,
} from '@material-ui/core';
import { Link as RouterLink, LinkProps as RouterLinkProps, useRouteMatch } from 'react-router-dom';

interface Props {
  name: string;
  icon: ComponentType<IconProps>;
  to: string;
}

const StyledLink = styled(RouterLink)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: '4px 8px',
  width: 'auto',
  '&.Mui-selected, &.Mui-selected:hover, &:hover': {
    borderRadius: 4,
    color: theme.palette.primary.dark,
    backgroundColor: fade(theme.palette.primary.main, 0.1),
  },
}));

export const NavigationItem: FC<Props> = ({ name, icon: Icon, to }): ReactElement => {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  const renderLink = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
      <StyledLink innerRef={ref} to={to} {...itemProps} />
    )),
    [to],
  );

  return (
    <ListItem component={renderLink} button selected={!!match}>
      {Icon && (
        <ListItemIcon>
          <Icon color={match ? 'primary' : 'default'} />
        </ListItemIcon>
      )}

      <ListItemText
        primary={name}
        primaryTypographyProps={{
          color: match ? 'primary' : 'textPrimary',
          variant: 'subtitle2',
        }}
      />
    </ListItem>
  );
};
