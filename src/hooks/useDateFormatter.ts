import { format as formatDate } from 'date-fns';
import { useSelector } from 'react-redux';
import { getDateLocale, selectLanguage } from 'features/preferences/slice';

export const useDateFormatter = () => {
  const language = useSelector(selectLanguage);
  const locale = getDateLocale(language);

  const format = (date: Date | number, formatStr: string) => (
    formatDate(date, formatStr, { locale })
  );

  return { format, locale };
};
