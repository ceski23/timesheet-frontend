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

export type EmployeeStats = BasicStats & ExtraStats;

interface EmployeStatsParams {
  id: string[];
  dateFrom: Date;
  dateTo: Date;
}

interface QuickMonthParams {
  month: Date;
  approved: boolean;
}

export const fetchQuickMonthStats = async (params: QuickMonthParams) => (
  client.get<unknown, EmployeeStats>('stats/quickMonth', { params })
);

// export const fetchMonthStats = async (month: Date) => (
//   client.get<unknown, QuickMonthStatsObj>('stats/month', { params: { month } })
// );

export const fetchEmployeesStats = async (params: EmployeStatsParams) => (
  client.get<unknown, EmployeeStats[]>('stats/admin/stats', { params })
);

export const useQuickMonthStats = (params: QuickMonthParams) => (
  useQuery(['quickMonth', params], fetchQuickMonthStats)
);

// export const useMonthStats = (month: Date) => (
//   useQuery(['month', month], fetchMonthStats)
// );

export const useEmployeesStats = (
  params: EmployeStatsParams, config?: QueryConfig<EmployeeStats[]>,
) => (
  useQuery(['employeesstats', params], fetchEmployeesStats, config)
);
