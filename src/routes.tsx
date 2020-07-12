import { RouteConfig } from 'react-router-config';
import { LoginScreen } from 'components/auth/LoginScreen';
import { ForgotPasswordScreen } from 'components/auth/ForgotPasswordScreen';
import { Redirect } from 'react-router';
import React from 'react';
import { Logout } from 'components/auth/Logout';
import { HomeScreen } from 'components/HomeScreen';
import { NotFoundScreen } from 'components/NotFoundScreen';
import { EmployeesScreen } from 'components/EmployeesScreen';
import { WorktimeScreen } from 'components/WorktimeScreen';
import { ResetPasswordScreen } from 'components/auth/ResetPasswordScreen';
import { SettingsScreen } from 'components/settings/SettingsScreen';

export const ROUTE_HOME = '/';
export const ROUTE_LOGIN = '/logowanie';
export const ROUTE_LOGOUT = '/wyloguj';
export const ROUTE_FORGOT_PASSWORD = '/zapomnialem-hasla';
export const ROUTE_EMPLOYEES = '/pracownicy';
export const ROUTE_WORKTIME = '/czaspracy';
export const ROUTE_PASSWORD_RESET = '/resetowanie-hasla';
export const ROUTE_SETTINGS = '/ustawienia';

export const loggedInRoutes = [
  {
    path: ROUTE_HOME,
    exact: true,
    component: HomeScreen,
    routes: [],
  },
  {
    path: ROUTE_EMPLOYEES,
    component: EmployeesScreen,
  },
  {
    path: ROUTE_WORKTIME,
    component: WorktimeScreen,
  },
  {
    path: ROUTE_LOGOUT,
    component: Logout,
  },
  {
    path: ROUTE_SETTINGS,
    component: SettingsScreen,
  },
  {
    path: [ROUTE_LOGIN, ROUTE_FORGOT_PASSWORD],
    render: () => <Redirect to={ROUTE_HOME} />,
  },
  {
    component: NotFoundScreen,
  },
];

export const guestRoutes: RouteConfig[] = [
  {
    path: ROUTE_LOGIN,
    component: LoginScreen,
  },
  {
    path: ROUTE_FORGOT_PASSWORD,
    component: ForgotPasswordScreen,
  },
  {
    path: ROUTE_PASSWORD_RESET,
    component: ResetPasswordScreen,
  },
  {
    render: () => <Redirect to={ROUTE_LOGIN} />,
  },
];
