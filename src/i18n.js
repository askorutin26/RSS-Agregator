import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import locales from './locales/locales.js';

i18n.use(LanguageDetector).init({
  fallbackLng: 'ru',
  debug: true,
  resources: locales,
  detection: {
    order: ['queryString', 'cookie'],
    cache: ['cookie'],
  },
  interpolation: {
    escapeValue: false,
  },

});
export default i18n;
