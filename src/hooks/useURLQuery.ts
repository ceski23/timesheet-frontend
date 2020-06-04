import { useLocation } from 'react-router';

export const useURLQuery = () => (
  new URLSearchParams(useLocation().search)
);
