import React from 'react';
import { include } from 'named-urls';
import { RouteConfig } from 'react-router-config';
import { LoginScreen } from 'components/auth/LoginScreen';
import { ForgotPasswordScreen } from 'components/auth/ForgotPasswordScreen';
import { Logout } from 'components/auth/Logout';
import { EmployeesScreen } from 'components/employees/EmployeesScreen';
import { ResetPasswordScreen } from 'components/auth/ResetPasswordScreen';
import { SettingsScreen } from 'components/settings/SettingsScreen';
import { RedirecToLogin } from 'components/auth/RedirectToLogin';
import { RedirectAfterLogin } from 'components/auth/RedirectAfterLogin';
import { Redirect } from 'react-router';
import { NotFoundScreen } from 'components/NotFoundScreen';
import { HomeScreen } from 'components/home/HomeScreen';
import { SchedulesScreen } from 'components/schedules/SchedulesScreen';
// import { WorktimeScreen } from 'components/worktime/WorktimeScreen';

export const routeUrls = {
  // LOGGED IN
  home: '/',
  logout: '/wyloguj',
  employees: include('/pracownicy', {
    employee: ':userId',
  }),
  worktime: '/czas-pracy',
  settings: '/ustawienia',
  schedules: include('/rozklady', {
    schedule: ':scheduleId',
  }),

  // GUEST
  login: '/logowanie',
  forgotPassword: '/zapomnialem-hasla',
  resetPassword: '/resetowanie-hasla',
};

export const commonRoutes: RouteConfig[] = [
  {
    path: routeUrls.logout,
    component: Logout,
  },
  {
    path: routeUrls.settings,
    component: SettingsScreen,
  },
  {
    path: [routeUrls.login, routeUrls.resetPassword],
    component: RedirectAfterLogin,
  },
  {
    component: NotFoundScreen,
  },
];

export const userRoutes: RouteConfig[] = [
  {
    path: routeUrls.home,
    exact: true,
    component: HomeScreen,
    routes: [],
  },
  // {
  //   path: routeUrls.worktime,
  //   component: WorktimeScreen,
  // },
  ...commonRoutes,
];

export const adminRoutes: RouteConfig[] = [
  {
    path: routeUrls.home,
    exact: true,
    // component: AdminDashboard,
    component: HomeScreen,
    routes: [],
  },
  {
    path: String(routeUrls.employees),
    component: EmployeesScreen,
  },
  {
    path: String(routeUrls.schedules),
    component: SchedulesScreen,
  },
  ...commonRoutes,
];

export const guestRoutes: RouteConfig[] = [
  {
    path: routeUrls.login,
    component: LoginScreen,
  },
  {
    path: routeUrls.forgotPassword,
    component: ForgotPasswordScreen,
  },
  {
    path: '/.well-known/change-password',
    render: () => <Redirect to={routeUrls.forgotPassword} />,
  },
  {
    path: routeUrls.resetPassword,
    component: ResetPasswordScreen,
  },
  {
    component: RedirecToLogin,
  },
];
