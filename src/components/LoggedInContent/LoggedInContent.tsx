import React, { FC, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'store';
import {
  RadioGroup, FormControlLabel,
  Radio, styled, Toolbar, Divider, List, ListSubheader,
} from '@material-ui/core';
import { setTheme } from 'features/preferences/preferencesSlice';
import { ThemeType } from 'features/preferences/types';
import { useTranslation } from 'react-i18next';
import { loggedInRoutes, ROUTE_HOME, ROUTE_EMPLOYEES } from 'routes';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TimeReportingIcon from '@material-ui/icons/QueryBuilderOutlined';
import VacationIcon from '@material-ui/icons/WorkOutlineOutlined';
import EmployeesIcon from '@material-ui/icons/PeopleAltOutlined';
import ReportIcon from '@material-ui/icons/TimelineOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  Root,
  Header,
  Sidebar,
  SidebarTrigger,
  Content,
} from '@mui-treasury/layout';
import { NavigationHeader } from 'components/NavigationHeader';
import { NavigationItem } from 'components/NavigationItem';
import { renderRoutes } from 'react-router-config';
import { useAppTheme } from 'hooks/useAppTheme';
import { selectPreferences } from 'features/preferences/selectors';
import { LanguageSelector } from 'components/LanguageSelector/LanguageSelector';
import { EmployeesToolbar } from 'components/EmployeesScreen';

const StyledThemeControls = styled(RadioGroup)(({ theme }) => ({
  margin: `0 ${theme.spacing(2)}px`,
}));

const StyledContent = styled(Content)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.default,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.background.paper,
}));


const layoutConfig = {
  autoCollapseDisabled: false,
  collapsedBreakpoint: 'sm',
  heightAdjustmentDisabled: false,
  xs: {
    sidebar: {
      anchor: 'left',
      hidden: false,
      inset: false,
      variant: 'temporary',
      width: 240,
      collapsible: false,
      collapsedWidth: 64,
    },
    header: {
      position: 'relative',
      clipped: false,
      offsetHeight: 56,
      persistentBehavior: 'flexible',
    },
    content: {
      persistentBehavior: 'flexible',
    },
    footer: {
      persistentBehavior: 'flexible',
    },
  },
  sm: {
    sidebar: {
      anchor: 'left',
      hidden: false,
      inset: false,
      variant: 'persistent',
      width: 256,
      collapsible: false,
      collapsedWidth: 64,
    },
    header: {
      position: 'relative',
      clipped: false,
      offsetHeight: 64,
      persistentBehavior: 'flexible',
    },
    content: {
      persistentBehavior: 'flexible',
    },
    footer: {
      persistentBehavior: 'flexible',
    },
  },
  md: {
    sidebar: {
      anchor: 'left',
      hidden: false,
      inset: false,
      variant: 'permanent',
      width: 256,
      collapsible: false,
      collapsedWidth: 64,
    },
    header: {
      position: 'relative',
      clipped: false,
      offsetHeight: 64,
      persistentBehavior: 'flexible',
    },
    content: {
      persistentBehavior: 'flexible',
    },
    footer: {
      persistentBehavior: 'flexible',
    },
  },
};

export const LoggedInContent: FC = () => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation();
  const theme = useAppTheme();
  const { theme: themeType } = useSelector(selectPreferences);

  const handleThemeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTheme(target.value as ThemeType));
  };

  return (
    <Root config={layoutConfig} theme={theme}>
      {({
        headerStyles,
        opened,
      }: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        headerStyles: any;
        opened: boolean;
        collapsed: boolean;
      }) => (
        <>
          <Header elevation={1}>
            <StyledToolbar>
              <SidebarTrigger className={headerStyles.leftTrigger}>
                {opened ? <ChevronLeftIcon /> : <MenuIcon />}
              </SidebarTrigger>

              <EmployeesToolbar />
            </StyledToolbar>
          </Header>

          <Sidebar>
            <NavigationHeader
              name="Cezary Bober"
              email="ceski23@gmail.com"
              avatar="https://avatars0.githubusercontent.com/u/2845072?s=460&v=4"
            />

            <Divider />

            <List component="nav">
              <NavigationItem name={t('navigationBar.dashboard')} icon={HomeIcon} to={ROUTE_HOME} />
              <NavigationItem name={t('navigationBar.employees')} icon={EmployeesIcon} to={ROUTE_EMPLOYEES} badge />
              <NavigationItem name={t('navigationBar.worktime')} icon={TimeReportingIcon} to="wadawd" />
              <NavigationItem name={t('navigationBar.vacations')} icon={VacationIcon} to="wadawd" />
              <NavigationItem name={t('navigationBar.reports')} icon={ReportIcon} to="wadawd" />
            </List>

            <Divider />

            <ListSubheader>
              {t('settings.theme')}
            </ListSubheader>
            <StyledThemeControls value={themeType} onChange={handleThemeChange}>
              {['dark', 'light', 'system'].map(type => (
                <FormControlLabel
                  key={type}
                  value={type}
                  control={<Radio />}
                  label={t(`themeType.${type}`)}
                />
              ))}
            </StyledThemeControls>

            <ListSubheader>
              {t('settings.language')}
            </ListSubheader>
            <LanguageSelector />

          </Sidebar>

          <StyledContent>
            {renderRoutes(loggedInRoutes)}
          </StyledContent>
        </>
      )}
    </Root>
  );
};
