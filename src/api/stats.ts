import { useQuery } from 'react-query';
import { client } from 'utils/api';
import { RecordType } from './records';

export interface QuickMonthStatsObj {
  stats: Record<RecordType, number>;
  missing: number;
}

export const fetchQuickMonthStats = async () => (
  client.get<unknown, QuickMonthStatsObj>('stats/quickMonth')
);

export const useQuickMonthStats = () => (
  useQuery('quickMonth', fetchQuickMonthStats)
);
