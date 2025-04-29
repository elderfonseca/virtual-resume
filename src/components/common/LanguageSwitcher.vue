<!-- src/components/common/LanguageSwitcher.vue -->
<template>
  <div class="relative">
    <!-- Language selector button with globe icon and improved accessibility -->
    <button
      @click="toggleMenu"
      class="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2 cursor-pointer hover:bg-[var(--color-bg-secondary)]/30 transition-colors"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      :aria-label="t('accessibility.languageSelector')"
      :title="t('accessibility.languageSelector')"
      ref="globeButtonRef"
    >
      <!-- Current language code -->
      <span class="text-[var(--color-text-primary)] font-medium">
        {{ currentLocale.toUpperCase() }}
      </span>

      <!-- Container for the Three.js globe with tooltip -->
      <div
        ref="globeContainer"
        class="globe-container"
        :aria-label="t('accessibility.globeAlt')"
        :title="t('accessibility.selectLanguage')"
      ></div>

      <!-- Visually hidden text for screen readers -->
      <span class="sr-only">{{ t('accessibility.currentLanguage') }}</span>
    </button>

    <!-- Dropdown menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 right-0 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg py-2 min-w-[120px] origin-top-right"
        role="menu"
        aria-orientation="vertical"
        ref="menuRef"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="changeLanguage(locale.code)"
          class="w-full text-left px-4 py-2 hover:bg-[var(--color-accent)]/10 transition-colors flex items-center gap-2 cursor-pointer"
          :class="{ 'font-bold text-[var(--color-accent)]': currentLocale === locale.code }"
          :aria-current="currentLocale === locale.code ? 'true' : 'false'"
          role="menuitem"
          :title="t('accessibility.switchTo') + ' ' + locale.name"
        >
          <span class="w-6 text-center">{{ locale.code.toUpperCase() }}</span>
          <span>{{ locale.name }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useLocale } from '@/composables/useLocale';
import { useGlobe } from '@/composables/useGlobe';
import { createFocusTrap } from '@/utils/accessibilityUtils';

/**
 * Language switcher component with a real 3D globe
 * Uses the useGlobe composable to manage the Three.js rendering
 * Enhanced with accessibility features and proper cursor styles
 */
export default {
  name: 'LanguageSwitcher',

  setup() {
    // State for controlling menu opening
    const isOpen = ref(false);
    const menuRef = ref(null);
    const globeButtonRef = ref(null);

    // Use composables
    const { currentLocale, changeLocale, availableLocales, t } = useLocale();
    const { globeContainer, initGlobe, startRotation, stopRotation, cleanupGlobe } = useGlobe();

    // Focus trap reference for accessibility
    let removeFocusTrap = null;

    // Toggle menu open/closed
    const toggleMenu = () => {
      isOpen.value = !isOpen.value;

      // Start or stop globe animation
      if (isOpen.value) {
        startRotation();
      } else {
        stopRotation();
      }
    };

    // Change language and close menu
    const changeLanguage = (code) => {
      // Only change if different from current
      if (code !== currentLocale.value) {
        changeLocale(code);
      }

      // Close menu and stop animation
      isOpen.value = false;
      stopRotation();
    };

    // Close menu on Escape key
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen.value) {
        isOpen.value = false;
        stopRotation();
      }
    };

    // Close menu when clicking outside
    const closeOnClickOutside = (event) => {
      if (
        isOpen.value &&
        menuRef.value &&
        !menuRef.value.contains(event.target) &&
        globeButtonRef.value &&
        !globeButtonRef.value.contains(event.target)
      ) {
        isOpen.value = false;
        stopRotation();
      }
    };

    // Set up focus trap when menu opens
    watch(isOpen, (newVal) => {
      if (newVal && menuRef.value) {
        // Create trap when menu opens
        removeFocusTrap = createFocusTrap(menuRef.value, () => {
          isOpen.value = false;
          stopRotation();
        });
      } else if (removeFocusTrap) {
        // Remove trap when menu closes
        removeFocusTrap();
        removeFocusTrap = null;
      }
    });

    // Add event listeners when component mounts
    onMounted(() => {
      document.addEventListener('click', closeOnClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      // Initialize the globe after the component is mounted
      setTimeout(() => {
        if (globeContainer.value) {
          // Get theme colors from CSS variables
          const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00ADB5';
          const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg-primary').trim() || '#222831';
          const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00FFF5';

          // Initialize the globe with theme colors
          initGlobe(globeContainer.value, {
            size: 32,
            mainColor: mainColor,
            secondaryColor: secondaryColor,
            lineColor: lineColor,
            lineOpacity: 0.2,
            rotationSpeed: 0.01,
          });
        }
      }, 100);
    });

    // Clean up when component unmounts
    onUnmounted(() => {
      document.removeEventListener('click', closeOnClickOutside);
      document.removeEventListener('keydown', handleKeyDown);

      if (removeFocusTrap) {
        removeFocusTrap();
      }

      // Clean up Three.js resources
      cleanupGlobe();
    });

    return {
      isOpen,
      menuRef,
      globeButtonRef,
      globeContainer,
      currentLocale,
      availableLocales,
      toggleMenu,
      changeLanguage,
      t,
    };
  },
};
</script>

<style scoped>
/* Container for the globe */
.globe-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
