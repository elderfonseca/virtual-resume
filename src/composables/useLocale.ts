import { AVAILABLE_LANGUAGES } from '@/config/constants';
import { computed, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Language } from '@/types';

/**
 * Composable for managing localization/internationalization
 * Provides access to translations and language switching capabilities
 */
export function useLocale() {
  // Use vue-i18n composable
  const { t, locale, availableLocales } = useI18n();

  // Store user preference in local state
  const userPreferredLocale: Ref<string> = ref(localStorage.getItem('preferredLocale') || 'en');

  /**
   * Get the currently active locale
   */
  const currentLocale = computed(() => locale.value);

  /**
   * Get all available language options
   */
  const availableLanguages = computed((): Language[] => AVAILABLE_LANGUAGES);

  /**
   * Initialize locale based on user preference or browser settings
   */
  const initLocale = (): void => {
    // First try to load from localStorage
    let savedLocale = localStorage.getItem('preferredLocale');

    // If no saved preference, try to detect browser language
    if (!savedLocale) {
      const browserLang = navigator.language.split('-')[0];

      // Check if browser language is supported
      if (availableLocales.includes(browserLang)) {
        savedLocale = browserLang;
      } else {
        // Default to English if not supported
        savedLocale = 'en';
      }
    }

    // Set the locale
    changeLocale(savedLocale);
  };

  /**
   * Change the active locale
   * @param {string} newLocale - The locale code to switch to (e.g., 'en', 'pt')
   */
  const changeLocale = (newLocale: string): void => {
    // Only change if locale is available
    if (availableLocales.includes(newLocale)) {
      // Update the active locale
      locale.value = newLocale;

      // Save user preference
      localStorage.setItem('preferredLocale', newLocale);
      userPreferredLocale.value = newLocale;

      // Update document language for accessibility
      document.documentElement.lang = newLocale;
    }
  };

  /**
   * Get the name of a locale
   * @param {string} localeCode - The locale code to get name for
   * @returns {string} The locale name
   */
  const getLocaleName = (localeCode: string): string => {
    const language = AVAILABLE_LANGUAGES.find((lang) => lang.code === localeCode);
    return language ? language.name : localeCode;
  };

  return {
    t,
    currentLocale,
    availableLanguages,
    initLocale,
    changeLocale,
    getLocaleName,
  };
}

export default useLocale;
