import { createI18n } from 'vue-i18n';
import pt from '@/locales/pt.js';
import en from '@/locales/en.js';

/**
 * i18n configuration for multi-language support
 * Default language: English (en)
 * Available languages: English (en), Portuguese (pt)
 */
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en', // Default language
  fallbackLocale: 'en',
  messages: { en, pt },
});

export default i18n;
