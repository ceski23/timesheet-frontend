/* eslint-disable no-param-reassign */
import {
  createSelector, createAsyncThunk, createSlice, PayloadAction, combineReducers,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { createPaginatedReducer, PaginatedSuccess } from 'store/pagination';
import { PaginatedResponse, FindParams } from 'utils/api';
import * as api from './api';
import {
  User, UsersFiltersState, UsersFilter, UsersFindParams,
} from './types';

const mapResponse = <T extends object>(response: PaginatedResponse<T>): PaginatedSuccess<T> => {
  const {
    data, totalItems, currentPage, totalPages,
  } = response;
  return {
    items: data,
    totalItems,
    currentPage,
    totalPages,
  };
};

const name = 'users';
const limit = 5;

type FetchParams = Exclude<FindParams & UsersFindParams, 'limit'>;
export const fetchUsers = createAsyncThunk<PaginatedSuccess<User>, FetchParams>(
  `${name}/fetch`, async params => (
    api.fetchUsers({ ...params, limit }).then(mapResponse)
  ),
);

export const removeUser = createAsyncThunk<void, string>(
  `${name}/remove`, async id => api.deleteUser(id),
);

const fetchedUsers = createPaginatedReducer<User>({
  limit,
  types: {
    pending: fetchUsers.pending.type,
    fulfilled: fetchUsers.fulfilled.type,
    rejected: fetchUsers.rejected.type,
  },
});


const initialState: UsersFiltersState = {
  filter: UsersFilter.ALL,
  query: undefined,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setUsersFilter(state, { payload }: PayloadAction<UsersFilter>) {
      state.filter = payload;
    },
    setUsersQuery(state, { payload }: PayloadAction<string | undefined>) {
      state.query = payload;
    },
  },
});

const reducer = combineReducers({
  fetched: fetchedUsers,
  filters: slice.reducer,
});

const getUsers = (state: RootState) => state.users.fetched;
const getUsersFilters = (state: RootState) => state.users.filters;

export const { setUsersFilter, setUsersQuery } = slice.actions;

export const selectUsersData = createSelector(getUsers, users => users.items);
export const selectUsersStatus = createSelector(getUsers, ({ error, fetching }) => ({
  error, fetching,
}));
export const selectUsersPagination = createSelector(getUsers, ({
  currentPage, totalItems, totalPages,
}) => ({
  limit, currentPage, totalItems, totalPages,
}));

export const selectUsersFilter = createSelector(getUsersFilters, filters => filters.filter);
export const selectUsersQuery = createSelector(getUsersFilters, filters => filters.query);

export default reducer;
