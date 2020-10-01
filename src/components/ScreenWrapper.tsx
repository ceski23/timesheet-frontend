import React, { FC } from 'react';
import { styled, Toolbar } from '@material-ui/core';
import {
  getContent, getHeader, getSidebarTrigger,
} from '@mui-treasury/layout';
import { DefaultToolbar } from './DefaultToolbar';

// #region styles
export const Content = styled(getContent(styled))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.default,
  overflow: 'auto',
  height: '100%',
}));

export const AppToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.background.paper,
}));
// #endregion

interface Props {
  toolbar?: React.ReactNode;
  title?: string;
}

const Header = getHeader(styled);
const SidebarTrigger = getSidebarTrigger(styled);

export const ScreenWrapper: FC<Props> = ({ children, toolbar, title }) => (
  <>
    <Header elevation={1}>
      <AppToolbar>
        <SidebarTrigger sidebarId="primarySidebar" />
        {toolbar || <DefaultToolbar title={title} />}
      </AppToolbar>
    </Header>

    <Content>
      {children}
    </Content>
  </>
);
