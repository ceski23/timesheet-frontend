import {
  client, PaginatedResponse,
} from 'utils/api';
import {
  queryCache, useMutation, usePaginatedQuery, useQuery,
} from 'react-query';

// #region Types
export type RecordType = 'normal' | 'vacationLeave' | 'trainingLeave' | 'leaveOnRequest' | 'sickLeave' | 'childcare';

export const RECORD_TYPES: RecordType[] = [
  'normal', 'vacationLeave', 'trainingLeave', 'leaveOnRequest', 'sickLeave', 'childcare',
];
export interface Record {
  _id: string;
  dateFrom: string;
  dateTo: string;
  type: RecordType;
  details: string;
  approved: boolean;
}

export interface AddRecordParams {
  dateFrom: Date;
  dateTo: Date;
  type: RecordType;
  details: string;
}

export type UpdateRecordParams = AddRecordParams & {
  id: string;
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

export const fetchRecordsForUser = async (
  params?: PaginatedRecordFindParams & { userId: string },
) => (
  client.get<unknown, PaginatedResponse<Record>>('records/admin', { params })
);

export const fetchRecordsByDateRange = async (params: RecordFindParams) => (
  client.get<unknown, Record[]>('records/findByDateRange', { params })
);

export const fetchRecordsByDateRangeForUser = async (
  params: RecordFindParams & { userId: string },
) => (
  client.get<unknown, Record[]>('records/admin/findByDateRange', { params })
);

export const addRecord = async (params: AddRecordParams) => (
  client.post<unknown, Record>('records', params)
);

export const removeRecord = async (id: string) => (
  client.delete<unknown, void>(`records/${id}`)
);

export const patchRecord = async ({ id, ...data }: UpdateRecordParams) => (
  client.patch<unknown, Record>(`records/${id}`, data)
);
// #endregion

// #region API hooks
export const usePaginatedRecords = (
  params?: PaginatedRecordFindParams & { userId?: string },
) => (
  usePaginatedQuery(['records', params], params?.userId ? fetchRecordsForUser : fetchRecords)
);

export const useRecords = (params: RecordFindParams & { userId?: string }) => (
  useQuery(['records', params], params?.userId ? fetchRecordsByDateRangeForUser : fetchRecordsByDateRange)
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

export const useUpdateRecord = () => useMutation(patchRecord, {
  onSuccess: () => {
    queryCache.invalidateQueries('records');
  },
});
// #endregion
