import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from '@locales/en/translation.json';
import errorsEn from '@locales/en/errors.json';
import translationFr from '@locales/fr/translation.json';
import errorsFr from '@locales/fr/errors.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEn,
        errors:errorsEn
      },
      fr: {
        translation: translationFr,
        errors:errorsFr
      }
    },
    fallbackLng: 'en',
    ns: ['translation', 'header'],
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
