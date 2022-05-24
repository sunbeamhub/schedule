import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';

i18n
  .use(i18nextPlugin)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      addPath: '/schedule/add/{{lng}}/{{ns}}',
      loadPath: '/schedule/locales/{{lng}}/{{ns}}.json',
    },
    debug: true,
    fallbackLng: 'en',
    ns: ['common'],
  });

export default i18n;
