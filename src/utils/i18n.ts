import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import plForm from 'locales/pl/form.json';
import plUi from 'locales/pl/ui.json';

import enForm from 'locales/en/form.json';
import enUi from 'locales/en/ui.json';

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
        form: plForm,
        ui: plUi,
      },
      en: {
        form: enForm,
        ui: enUi,
      },
    },
  });

export default i18n;
