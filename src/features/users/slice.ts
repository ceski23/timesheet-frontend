/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { createPaginationSlice } from 'shared/slices/paginationSlice';
import { createStatusSlice, createThunk } from '../../shared/slices/statusSlice';
import { fetchUsers } from './api';
import store from '../../store';
import {
  UsersState, User, UsersFilter,
} from './types';

const initialState: UsersState = {
  users: [],
  filter: UsersFilter.ALL,
  query: undefined,
};

const name = 'users';

const status = createStatusSlice(name);
const pagination = createPaginationSlice(name);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<User[]>) {
      state.users = payload;
    },
    setUsersFilter(state, { payload }: PayloadAction<UsersFilter>) {
      state.filter = payload;
    },
    setUsersQuery(state, { payload }: PayloadAction<string | undefined>) {
      state.query = payload;
    },
  },
});

export const getUsers = createThunk<User[]>(
  status,
  async dispatch => {
    const { currentPage } = store.getState().users.pagination;
    const { filter, query } = store.getState().users.data;
    const { data, ...paginate } = await fetchUsers({
      limit: 5,
      page: currentPage,
      query,
      activated: {
        [UsersFilter.ALL]: undefined,
        [UsersFilter.ACTIVATED]: true,
        [UsersFilter.DEACTIVATED]: false,
      }[filter],
    });
    dispatch(slice.actions.setUsers(data));
    dispatch(pagination.actions.updatePagination(paginate));
    return data;
  },
);

const reducer = combineReducers({
  data: slice.reducer,
  status: status.reducer,
  pagination: pagination.reducer,
});

export const { setUsers, setUsersFilter, setUsersQuery } = slice.actions;
export const { changePage } = pagination.actions;

export default reducer;
