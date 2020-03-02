import { RouteConfig } from 'react-router-config';
import { LoginScreen } from 'components/LoginScreen';
import { RegistrationScreen } from 'components/RegistrationScreen';
import { Redirect } from 'react-router';
import React from 'react';
import { Logout } from 'components/Logout';
import { HomeScreen } from 'components/HomeScreen';
import { NotFoundScreen } from 'components/NotFoundScreen';
import { EmployeesScreen } from 'components/EmployeesScreen';

export const ROUTE_HOME = '/';
export const ROUTE_LOGIN = '/logowanie';
export const ROUTE_LOGOUT = '/wyloguj';
export const ROUTE_REGISTER = '/rejestracja';
export const ROUTE_EMPLOYEES = '/pracownicy';

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
    path: ROUTE_LOGOUT,
    component: Logout,
  },
  {
    path: [ROUTE_LOGIN, ROUTE_REGISTER],
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
    path: ROUTE_REGISTER,
    component: RegistrationScreen,
  },
  {
    render: () => <Redirect to={ROUTE_LOGIN} />,
  },
];
