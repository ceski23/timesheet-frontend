/* eslint-disable max-len */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  styled, Toolbar, Divider, List,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TimeReportingIcon from '@material-ui/icons/QueryBuilderOutlined';
import EmployeesIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import {
  Root, getHeader, getDrawerSidebar, getContent,
  getSidebarTrigger,
} from '@mui-treasury/layout';
import { NavigationHeader } from 'components/NavigationHeader';
import { NavigationItem } from 'components/NavigationItem';
import { renderRoutes } from 'react-router-config';
import { useAppTheme } from 'hooks/useAppTheme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { selectUser } from 'store/auth/slice';
import { routeUrls, loggedInRoutes } from 'routes';
import { usePreferences } from 'contexts/preferences';
import { getDateLocale } from 'hooks/useDateFormatter';
import { useAppState } from 'contexts/appState';
import layoutScheme from './layoutScheme';
import { ToolbarRenderer } from './ToolbarRenderer';

// #region styles
const Content = styled(getContent(styled))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.default,
  overflow: 'auto',
  height: '100%',
}));

const AppToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.background.paper,
}));
// #endregion

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);

export const LoggedInContent: FC = () => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const { language } = usePreferences();
  const user = useSelector(selectUser);
  const { screen } = useAppState();

  return (
    <Root scheme={layoutScheme()} theme={theme}>
      {({ state: { sidebar } }) => (
        <>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={getDateLocale(language)}
          >
            <Header elevation={1}>
              <AppToolbar>
                <SidebarTrigger sidebarId="primarySidebar" />
                <ToolbarRenderer screenId={screen} />
              </AppToolbar>
            </Header>

            <DrawerSidebar sidebarId="primarySidebar">
              <NavigationHeader
                name={user?.name}
                email={user?.email}
                collapsed={sidebar.primarySidebar.collapsed}
              />

              <Divider />

              <List component="nav">
                <NavigationItem name={t('navigationBar.dashboard')} icon={HomeIcon} to={routeUrls.home} />
                <NavigationItem name={t('navigationBar.employees')} icon={EmployeesIcon} to={String(routeUrls.employees)} />
                <NavigationItem name={t('navigationBar.worktime')} icon={TimeReportingIcon} to={routeUrls.worktime} />
                {/* <NavigationItem name={t('navigationBar.vacations')} icon={VacationIcon} to={} /> */}
                {/* <NavigationItem name={t('navigationBar.reports')} icon={ReportIcon} to={} badge /> */}
                <Divider />
                <NavigationItem name={t('navigationBar.settings')} icon={SettingsIcon} to={routeUrls.settings} />
                <NavigationItem name={t('navigationBar.header.logout')} icon={LogoutIcon} to={routeUrls.logout} />
              </List>
            </DrawerSidebar>

            <Content>
              {renderRoutes(loggedInRoutes)}
            </Content>
          </MuiPickersUtilsProvider>
        </>
      )}
    </Root>
  );
};
