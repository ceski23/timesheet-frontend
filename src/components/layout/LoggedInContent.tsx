/* eslint-disable max-len */
import React, { FC } from 'react';
import {
  styled, Divider, List,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TimeReportingIcon from '@material-ui/icons/QueryBuilderOutlined';
import EmployeesIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import {
  Root, getDrawerSidebar,
} from '@mui-treasury/layout';
import { renderRoutes } from 'react-router-config';
import { useAppTheme } from 'hooks/useAppTheme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { adminRoutes, routeUrls, userRoutes } from 'routes';
import { usePreferences } from 'contexts/preferences';
import { getDateLocale } from 'hooks/useDateFormatter';
import { useAuth } from 'contexts/auth';
import SchedulesIcon from '@material-ui/icons/TodayOutlined';
import layoutScheme from './layoutScheme';
import { NavigationHeader } from './NavigationHeader';
import { NavigationItem } from './NavigationItem';

const DrawerSidebar = getDrawerSidebar(styled);

export const LoggedInContent: FC = () => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const { language } = usePreferences();
  const { user } = useAuth();

  return (
    <Root scheme={layoutScheme()} theme={theme}>
      {({ state: { sidebar }, setOpen }) => {
        const closeDrawer = () => setOpen('primarySidebar', false);

        return (
          <>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              locale={getDateLocale(language)}
            >

              <DrawerSidebar sidebarId="primarySidebar">
                <NavigationHeader
                  name={user?.name}
                  email={user?.email}
                  collapsed={sidebar.primarySidebar.collapsed}
                />

                <Divider />

                {user && (
                  <List component="nav">
                    {user.role === 'admin' && (
                      <>
                        <NavigationItem name={t('navigationBar.dashboard')} icon={HomeIcon} to={routeUrls.home} onClick={closeDrawer} />
                        <NavigationItem name={t('navigationBar.employees')} icon={EmployeesIcon} to={String(routeUrls.employees)} onClick={closeDrawer} />
                        <NavigationItem name={t('navigationBar.schedules')} icon={SchedulesIcon} to={String(routeUrls.schedules)} onClick={closeDrawer} />
                      </>
                    )}

                    {user.role === 'user' && (
                      <>
                        <NavigationItem name={t('navigationBar.dashboard')} icon={HomeIcon} to={routeUrls.home} onClick={closeDrawer} />
                        <NavigationItem name={t('navigationBar.worktime')} icon={TimeReportingIcon} to={routeUrls.worktime} onClick={closeDrawer} />
                      </>
                    )}

                    <Divider />

                    <NavigationItem name={t('navigationBar.settings')} icon={SettingsIcon} to={routeUrls.settings} onClick={closeDrawer} />
                    <NavigationItem name={t('navigationBar.header.logout')} icon={LogoutIcon} to={routeUrls.logout} onClick={closeDrawer} />
                  </List>
                )}
              </DrawerSidebar>

              {renderRoutes(user?.role === 'admin' ? adminRoutes : userRoutes)}
            </MuiPickersUtilsProvider>
          </>
        );
      }}
    </Root>
  );
};

export default LoggedInContent;
