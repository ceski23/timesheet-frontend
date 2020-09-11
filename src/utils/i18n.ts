import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from 'locales/pl.json';
import en from 'locales/en.json';

import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      pl: {
        translation: pl,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18n;