import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './json/en.json';
import fr from './json/fr.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: typeof window !== 'undefined' ? localStorage.getItem('preferredLanguage') || 'en' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;