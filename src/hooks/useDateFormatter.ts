import { format as formatDate } from 'date-fns';
import { usePreferences } from 'contexts/preferences';
import { enGB, pl } from 'date-fns/locale';

export const getDateLocale = (code?: string) => {
  switch (code) {
    case 'en':
      return enGB;

    case 'pl':
    default:
      return pl;
  }
};

export const useDateLocale = () => {
  const { language } = usePreferences();
  const locale = getDateLocale(language);

  return locale;
};

export const useDateFormatter = () => {
  const { language } = usePreferences();
  const locale = getDateLocale(language);

  const format = (date: Date | number, formatStr: string) => (
    formatDate(date, formatStr, { locale })
  );

  return { format, locale };
};
