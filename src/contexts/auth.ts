import { User } from 'api/users';
import { createState } from 'utils/state';

export type AuthStatus = 'authorized' | 'unauthorized' | 'unknown';

export interface AuthState {
  user?: User;
  status: AuthStatus;
}

const initialState: AuthState = {
  user: undefined,
  status: 'unknown',
};

const [AuthProvider, useAuth, useSetAuth] = createState(initialState, 'timesheet:auth');

export { AuthProvider, useAuth, useSetAuth };
