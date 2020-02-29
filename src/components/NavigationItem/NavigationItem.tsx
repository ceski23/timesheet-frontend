/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ReactElement } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link as RouterLink, LinkProps as RouterLinkProps, useRouteMatch } from 'react-router-dom';

interface Props {
  name: string;
  icon: ReactElement;
  to: string;
}

export const NavigationItem: FC<Props> = ({ name, icon, to }): ReactElement => {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  const renderLink = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
      <RouterLink to={to} ref={ref} {...itemProps} />
    )),
    [to],
  );

  return (
    <ListItem button component={renderLink} selected={!!match}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={name} />
    </ListItem>
  );
};
