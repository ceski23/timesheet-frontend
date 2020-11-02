import { QueryConfig, useQuery } from 'react-query';
import { client } from 'utils/api';
import { RecordType } from './records';
import { User } from './users';

export interface QuickMonthStatsObj {
  stats: Record<RecordType, number>;
  missing: number;
}

export interface WorktimeStatsDay {
  hours: number;
  absences: string[];
  details: string[];
}

type BasicStats = {
  _id: string;
  user: User;
} & {
  hours: {
    [key in RecordType]: number;
  };
};

interface ExtraStats {
  // missing: number;
  missingDays: number;
  overtime: number;
  _id: string;
  user: User;
}

type EmployeeStats = BasicStats & ExtraStats;

interface EmployeStatsParams {
  id: string[];
  dateFrom: Date;
  dateTo: Date;
}

export const fetchQuickMonthStats = async () => (
  client.get<unknown, QuickMonthStatsObj>('stats/quickMonth')
);

export const fetchMonthStats = async (month: Date) => (
  client.get<unknown, QuickMonthStatsObj>('stats/month', { params: { month } })
);

export const fetchEmployeesStats = async (params: EmployeStatsParams) => (
  client.get<unknown, EmployeeStats[]>('stats/admin/stats', { params })
);

export const useQuickMonthStats = () => (
  useQuery('quickMonth', fetchQuickMonthStats)
);

export const useMonthStats = () => (
  useQuery('month', fetchMonthStats)
);

export const useEmployeesStats = (
  params: EmployeStatsParams, config?: QueryConfig<EmployeeStats[]>,
) => (
  useQuery(['employeesstats', params], fetchEmployeesStats, config)
);
