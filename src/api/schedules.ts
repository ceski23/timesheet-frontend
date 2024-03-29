import {
  client, PaginatedResponse, FindParams,
} from 'utils/api';
import { queryCache, useMutation, usePaginatedQuery } from 'react-query';

// #region Types
export interface Schedule {
  _id: string;
  fromDate: string;
  toDate: string;
  daysOff: string[];
  name: string;
}

export interface AddScheduleParams {
  name: string;
  fromDate: Date;
  toDate: Date;
  daysOff: Date[];
}

export interface EditScheduleParams {
  name: string;
  fromDate: Date;
  toDate: Date;
  daysOff: Date[];
  id: string;
}
// #endregion

// #region API calls
export const fetchSchedules = async (params?: FindParams) => (
  client.get<unknown, PaginatedResponse<Schedule>>('schedules/admin', { params })
);

export const addSchedule = async (params: AddScheduleParams) => (
  client.post<unknown, Schedule>('schedules/admin', params)
);

export const removeSchedule = async (id: string) => (
  client.delete<unknown, void>(`schedules/admin/${id}`)
);

export const editSchedule = async ({ id, ...data }: EditScheduleParams) => (
  client.patch<unknown, Schedule>(`schedules/admin/${id}`, data)
);
// #endregion

// #region API hooks
export const useSchedules = (params?: FindParams) => (
  usePaginatedQuery(['schedules', params], fetchSchedules)
);

export const useAddSchedule = () => useMutation(addSchedule, {
  onSuccess: () => {
    queryCache.invalidateQueries('schedules');
  },
});

export const useRemoveSchedule = () => useMutation(removeSchedule, {
  onSuccess: () => {
    queryCache.invalidateQueries('schedules');
  },
});

export const useEditSchedule = () => useMutation(editSchedule, {
  onSuccess: () => {
    queryCache.invalidateQueries('schedules');
  },
});
// #endregion
