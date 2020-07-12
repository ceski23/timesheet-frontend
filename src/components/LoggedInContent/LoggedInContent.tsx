import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  styled, Toolbar, Divider, List, ListSubheader,
} from '@material-ui/core';
import {
  getDateLocale, selectLanguage,
} from 'features/preferences/slice';
import { useTranslation } from 'react-i18next';
import {
  loggedInRoutes, ROUTE_HOME, ROUTE_EMPLOYEES, ROUTE_WORKTIME,
} from 'routes';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TimeReportingIcon from '@material-ui/icons/QueryBuilderOutlined';
import VacationIcon from '@material-ui/icons/WorkOutlineOutlined';
import EmployeesIcon from '@material-ui/icons/PeopleAltOutlined';
import ReportIcon from '@material-ui/icons/TimelineOutlined';
import {
  Root, getHeader, getDrawerSidebar, getContent,
  getSidebarTrigger,
} from '@mui-treasury/layout';
import { NavigationHeader } from 'components/NavigationHeader';
import { NavigationItem } from 'components/NavigationItem';
import { renderRoutes } from 'react-router-config';
import { useAppTheme } from 'hooks/useAppTheme';
import { LanguageSelector } from 'components/LanguageSelector/LanguageSelector';
import { EmployeesToolbar } from 'components/EmployeesScreen';
import { DefaultToolbar } from 'components/DefaultToolbar';
import { ScreenType, selectScreenType } from 'features/appState/slice';
import { WorktimeToolbar } from 'components/WorktimeScreen/WorktimeToolbar';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { selectUser } from 'features/auth/slice';
import layoutScheme from './layoutScheme';


const Content = styled(getContent(styled))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.default,
  overflow: 'auto',
}));

const AppToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.background.paper,
}));

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);

export const LoggedInContent: FC = () => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const language = useSelector(selectLanguage);
  const user = useSelector(selectUser);
  const screen = useSelector(selectScreenType);

  const renderToolbarContent = (screenId: ScreenType) => {
    switch (screenId) {
      case 'employees':
        return <EmployeesToolbar />;

      case 'notfound':
        return <DefaultToolbar title={t('notfound.title')} />;

      case 'worktime':
        return <WorktimeToolbar />;

      default:
        return <DefaultToolbar title="Timesheet" />;
    }
  };

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
                {renderToolbarContent(screen)}
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
                <NavigationItem name={t('navigationBar.dashboard')} icon={HomeIcon} to={ROUTE_HOME} />
                <NavigationItem name={t('navigationBar.employees')} icon={EmployeesIcon} to={ROUTE_EMPLOYEES} />
                <NavigationItem name={t('navigationBar.worktime')} icon={TimeReportingIcon} to={ROUTE_WORKTIME} />
                <NavigationItem name={t('navigationBar.vacations')} icon={VacationIcon} to="wadawd" />
                <NavigationItem name={t('navigationBar.reports')} icon={ReportIcon} to="wadawd" badge />
              </List>

              <Divider />

              <ListSubheader>
                {t('settings.language')}
              </ListSubheader>
              <LanguageSelector />

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
