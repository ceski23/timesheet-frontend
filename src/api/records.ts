import {
  client, PaginatedResponse, FindParams,
} from 'utils/api';
import {
  queryCache, useMutation, usePaginatedQuery, useQuery,
} from 'react-query';

// #region Types
export type RecordType = 'normal' | 'vacationLeave' | 'trainingLeave' | 'leaveOnRequest' | 'sickLeave' | 'childcare';

export interface Record {
  _id: string;
  dateFrom: string;
  dateTo: string;
  type: RecordType;
  details: string;
}

export interface AddRecordParams {
  dateFrom: Date;
  dateTo: Date;
  type: RecordType;
  details: string;
}

export interface RecordFindParams {
  dateFrom: Date;
  dateTo: Date;
}

export type PaginatedRecordFindParams = {
  page?: number;
} & RecordFindParams
// #endregion

// #region API calls
export const fetchRecords = async (params?: PaginatedRecordFindParams) => (
  client.get<unknown, PaginatedResponse<Record>>('records', { params })
);

export const fetchRecordsByDateRange = async (params: RecordFindParams) => (
  client.get<unknown, Record[]>('records/findByDateRange', { params })
);

export const addRecord = async (params: AddRecordParams) => (
  client.post<unknown, Record>('records', params)
);

export const removeRecord = async (id: string) => (
  client.delete<unknown, void>(`records/${id}`)
);
// #endregion

// #region API hooks
export const usePaginatedRecords = (params?: PaginatedRecordFindParams) => (
  usePaginatedQuery(['records', params], fetchRecords)
);

export const useRecords = (params: RecordFindParams) => (
  useQuery(['records', params], fetchRecordsByDateRange)
);

export const useAddRecord = () => useMutation(addRecord, {
  onSuccess: () => {
    queryCache.invalidateQueries('records');
  },
});

export const useRemoveRecord = () => useMutation(removeRecord, {
  onSuccess: () => {
    queryCache.invalidateQueries('records');
  },
});
// #endregion
