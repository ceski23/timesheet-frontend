import { include } from 'named-urls';
import { RouteConfig } from 'react-router-config';
import { LoginScreen } from 'components/auth/LoginScreen';
import { ForgotPasswordScreen } from 'components/auth/ForgotPasswordScreen';
import { Logout } from 'components/auth/Logout';
import { HomeScreen } from 'components/HomeScreen';
import { NotFoundScreen } from 'components/NotFoundScreen';
import { EmployeesScreen } from 'components/employees/EmployeesScreen';
import { WorktimeScreen } from 'components/WorktimeScreen';
import { ResetPasswordScreen } from 'components/auth/ResetPasswordScreen';
import { SettingsScreen } from 'components/settings/SettingsScreen';
import { RedirecToLogin } from 'components/auth/RedirectToLogin';
import { RedirectAfterLogin } from 'components/auth/RedirectAfterLogin';

export const routeUrls = {
  // LOGGED IN
  home: '/',
  logout: '/wyloguj',
  employees: include('/pracownicy', {
    employee: ':userId',
  }),
  worktime: '/czas-pracy',
  settings: '/ustawienia',

  // GUEST
  login: '/logowanie',
  forgotPassword: '/zapomnialem-hasla',
  resetPassword: '/resetowanie-hasla',
};

export const loggedInRoutes: RouteConfig[] = [
  {
    path: routeUrls.home,
    exact: true,
    component: HomeScreen,
    routes: [],
  },
  {
    path: String(routeUrls.employees),
    component: EmployeesScreen,
  },
  {
    path: routeUrls.worktime,
    component: WorktimeScreen,
  },
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
    path: routeUrls.resetPassword,
    component: ResetPasswordScreen,
  },
  {
    component: RedirecToLogin,
  },
];
