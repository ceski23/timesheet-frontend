import { format as formatDate } from 'date-fns';
import { enGB, pl } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import { selectPreferences } from 'features/preferences/selectors';
import { useState, useEffect } from 'react';

export const useDateFormatter = () => {
  const { language } = useSelector(selectPreferences);
  const [locale, setLocale] = useState(pl);

  useEffect(() => {
    switch (language) {
      case 'en':
        setLocale(enGB);
        break;
      case 'pl':
        setLocale(pl);
        break;

      default:
        break;
    }
  }, [language]);

  const format = (date: Date | number, formatStr: string) => (
    formatDate(date, formatStr, { locale })
  );

  return { format };
};
