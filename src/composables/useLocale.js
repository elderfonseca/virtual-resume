// src/composables/useLocale.js
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * Composable for managing localization and language switching
 * Provides utilities for changing language and persisting preferences
 */
export function useLocale() {
  // Get i18n instance
  const i18n = useI18n();

  // Store available languages
  const availableLocales = ref([
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
  ]);

  // Get current locale from i18n
  const currentLocale = computed(() => i18n.locale.value);

  // Get current locale name
  const currentLocaleName = computed(() => {
    const locale = availableLocales.value.find((l) => l.code === currentLocale.value);
    return locale ? locale.name : 'English';
  });

  /**
   * Change the application locale
   * @param {string} locale - The locale code to change to (e.g., 'en', 'pt')
   */
  const changeLocale = (locale) => {
    if (!availableLocales.value.some((l) => l.code === locale)) {
      console.warn(`Locale "${locale}" is not available`);
      return;
    }

    i18n.locale.value = locale;

    // Store the locale preference in localStorage for persistence
    localStorage.setItem('preferredLocale', locale);

    // Update the HTML lang attribute for accessibility
    document.documentElement.setAttribute('lang', locale);
  };

  /**
   * Initialize locale from saved preference or browser settings
   */
  const initLocale = () => {
    // First try to get from localStorage
    const savedLocale = localStorage.getItem('preferredLocale');

    if (savedLocale && availableLocales.value.some((l) => l.code === savedLocale)) {
      changeLocale(savedLocale);
      return;
    }

    // If no saved preference, try to match browser language
    const browserLocale = navigator.language.split('-')[0];
    if (availableLocales.value.some((l) => l.code === browserLocale)) {
      changeLocale(browserLocale);
      return;
    }

    // Default to English if no match
    changeLocale('en');
  };

  // Watch for locale changes to update HTML lang attribute
  watch(currentLocale, (newLocale) => {
    document.documentElement.setAttribute('lang', newLocale);
  });

  return {
    availableLocales,
    currentLocale,
    currentLocaleName,
    changeLocale,
    initLocale,
    t: i18n.t, // Expose the translation function for convenience
  };
}

export default useLocale;
