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

export const archiveEmployeesPdf = async (id: string[]) => (
  client.get<unknown, Blob>('archive/employees/pdf', { params: { id }, responseType: 'blob' })
);

export const archiveSchedules = async (id: string[]) => (
  client.get<unknown, Blob>('archive/schedules', { params: { id }, responseType: 'blob' })
);

export const archiveSchedulesPdf = async (id: string[]) => (
  client.get<unknown, Blob>('archive/schedules/pdf', { params: { id }, responseType: 'blob' })
);

export const archiveRecords = async (params: ArchiveRecordsParams) => (
  client.get<unknown, Blob>('archive/records', { params, responseType: 'blob' })
);

export const archiveRecordsPdf = async (params: ArchiveRecordsParams) => (
  client.get<unknown, Blob>('archive/records/pdf', { params, responseType: 'blob' })
);

export const pdf = async (date: Date) => (
  client.get<unknown, Blob>('generator/worktime', { params: { month: date }, responseType: 'blob' })
);
// #endregion

// #region API hooks
// #endregion
