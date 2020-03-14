import { format as formatDate } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectPreferences } from 'features/preferences/selectors';
import { getDateLocale } from 'features/preferences/preferencesSlice';

export const useDateFormatter = () => {
  const { language } = useSelector(selectPreferences);
  const locale = getDateLocale(language);

  const format = (date: Date | number, formatStr: string) => (
    formatDate(date, formatStr, { locale })
  );

  return { format, locale };
};
