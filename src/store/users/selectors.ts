import { RootState } from 'store';

export const selectUsersData = (state: RootState) => state.users.data;
export const selectUsersPagination = (state: RootState) => state.users.pagination;
export const selectUsersStatus = (state: RootState) => state.users.status;
