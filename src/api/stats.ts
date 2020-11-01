import { useQuery } from 'react-query';
import { client } from 'utils/api';
import { RecordType } from './records';

export interface QuickMonthStatsObj {
  stats: Record<RecordType, number>;
  missing: number;
}

export interface WorktimeStatsDay {
  hours: number;
  absences: string[];
  details: string[];
}

export const fetchQuickMonthStats = async () => (
  client.get<unknown, QuickMonthStatsObj>('stats/quickMonth')
);

export const fetchMonthStats = async (month: Date) => (
  client.get<unknown, QuickMonthStatsObj>('stats/month', { params: { month } })
);

export const useQuickMonthStats = () => (
  useQuery('quickMonth', fetchQuickMonthStats)
);

export const useMonthStats = () => (
  useQuery('month', fetchMonthStats)
);
