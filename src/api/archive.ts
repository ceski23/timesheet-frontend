import { client } from 'utils/api';

// #region Types
interface ArchiveRecordsParams {
  dateFrom: Date;
  dateTo: Date;
  id: string[];
}
// #endregion

// #region API calls
export const archiveEmployees = async (id: string[]) => (
  client.get<unknown, Blob>('archive/employees', { params: { id }, responseType: 'blob' })
);

export const archiveSchedules = async (id: string[]) => (
  client.get<unknown, Blob>('archive/schedules', { params: { id }, responseType: 'blob' })
);

export const archiveRecords = async (params: ArchiveRecordsParams) => (
  client.get<unknown, Blob>('archive/records', { params, responseType: 'blob' })
);
// #endregion

// #region API hooks
// #endregion
