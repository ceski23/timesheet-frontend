import React, { FC, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useThunkDispatch } from 'store';
import {
  Typography, RadioGroup, FormControlLabel,
  Radio, styled, Toolbar, Divider, List, ListSubheader,
} from '@material-ui/core';
import { setTheme } from 'features/preferences/preferencesSlice';
import { ThemeType } from 'features/preferences/types';
import { useTranslation } from 'react-i18next';
import { loggedInRoutes, ROUTE_HOME } from 'routes';
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

const StyledThemeControls = styled(RadioGroup)(({ theme }) => ({
  margin: `0 ${theme.spacing(2)}px`,
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

  const { theme: themeType } = useSelector((state: RootState) => state.preferences);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
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
          <Header>
            <Toolbar>
              <SidebarTrigger className={headerStyles.leftTrigger}>
                {opened ? <ChevronLeftIcon /> : <MenuIcon />}
              </SidebarTrigger>

              <Typography variant="h6">
                Grafik Pracy
              </Typography>
            </Toolbar>
          </Header>

          <Sidebar>
            <NavigationHeader
              name="Cezary Bober"
              email="ceski23@gmail.com"
              avatar="https://avatars0.githubusercontent.com/u/2845072?s=460&v=4"
            />

            <Divider />

            <List component="nav">
              <NavigationItem name="Przegląd" icon={<HomeIcon />} to={ROUTE_HOME} />
              <NavigationItem name="Pracownicy" icon={<EmployeesIcon />} to="wadawd" />
              <NavigationItem name="Czas pracy" icon={<TimeReportingIcon />} to="wadawd" />
              <NavigationItem name="Urlopy" icon={<VacationIcon />} to="wadawd" />
              <NavigationItem name="Raporty" icon={<ReportIcon />} to="wadawd" />
            </List>

            <Divider />

            <ListSubheader>
              {t('themeSwitcher.title')}
            </ListSubheader>
            <StyledThemeControls value={themeType} onChange={handleChange}>
              {['dark', 'light', 'system'].map(type => (
                <FormControlLabel
                  key={type}
                  value={type}
                  control={<Radio />}
                  label={t(`themeType.${type}`)}
                />
              ))}
            </StyledThemeControls>
          </Sidebar>

          <Content>
            {renderRoutes(loggedInRoutes)}
          </Content>
        </>
      )}
    </Root>
  );
};
