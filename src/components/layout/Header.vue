<!-- src/components/layout/Header.vue -->
<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)] py-4 transition-all duration-300"
    :class="{ 'shadow-lg bg-[var(--color-bg-primary)]/95 backdrop-blur-sm py-3': isScrolled }"
    ref="headerRef"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Branding with animated name -->
        <div class="flex items-center">
          <a href="#home" class="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg">
            <AnimatedName
              :color="isScrolled ? 'var(--color-accent)' : 'var(--color-primary)'"
              :loop="true"
              ref="animatedNameRef"
              @animation-ready="handleAnimationReady"
              :width="150"
              :height="48"
            />
          </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NavLink
            v-for="item in navigation"
            :key="item.id"
            :href="`#${item.id}`"
            :text="t(`nav.${item.id}`)"
            :is-active="activeSection === item.id"
          />

          <LanguageSwitcher class="ml-2" />
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="t('accessibility.menuToggle')"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-[var(--color-text-primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-[var(--color-text-primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <MobileMenu :show="isMobileMenuOpen" :navigation="navigation" @close="closeMobileMenu" />
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import NavLink from '@/components/common/NavLink.vue';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import MobileMenu from '@/components/layout/MobileMenu.vue';
import AnimatedName from '@/components/common/AnimatedName.vue';
import { useLocale } from '@/composables/useLocale';
import { NAVIGATION_ITEMS } from '@/config/constants';

/**
 * Header component for site navigation
 * Includes responsive behavior, animation effects, and active section tracking
 */
export default {
  name: 'AppHeader',

  components: {
    NavLink,
    LanguageSwitcher,
    MobileMenu,
    AnimatedName,
  },

  setup() {
    // State
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const activeSection = ref('home');
    const headerRef = ref(null);
    const animatedNameRef = ref(null);
    const nameAnimation = ref(null);

    // Get navigation items from constants
    const navigation = NAVIGATION_ITEMS;

    // Use locale composable for translations
    const { t } = useLocale();

    /**
     * Toggle mobile menu
     */
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;

      // If opening the menu, play name animation
      if (isMobileMenuOpen.value && animatedNameRef.value) {
        animatedNameRef.value.restartAnimation();
      }
    };

    /**
     * Close mobile menu
     */
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };

    /**
     * Handle scroll to detect when to change header style
     */
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;

      // Detect active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100; // Add offset for header height

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          activeSection.value = section.id;
        }
      });
    };

    /**
     * Store animation reference when AnimatedName component is ready
     */
    const handleAnimationReady = (animation) => {
      nameAnimation.value = animation;

      // Play animation when section changes to home
      watch(activeSection, (newSection) => {
        if (newSection === 'home' && nameAnimation.value) {
          animatedNameRef.value.restartAnimation();
        }
      });
    };

    // Setup event listeners when component mounts
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once to set initial state

      // Close mobile menu on resize if screen becomes large enough
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
          isMobileMenuOpen.value = false;
        }
      });

      // Play initial animation after a slight delay
      setTimeout(() => {
        if (animatedNameRef.value) {
          animatedNameRef.value.restartAnimation();
        }
      }, 500);
    });

    // Remove event listeners when component unmounts
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled,
      isMobileMenuOpen,
      activeSection,
      navigation,
      headerRef,
      animatedNameRef,
      toggleMobileMenu,
      closeMobileMenu,
      handleAnimationReady,
      t,
    };
  },
};
</script>

<style scoped>
/* Subtle animation for header background transition */
header {
  transition: all 0.3s ease;
}

/* Force hardware acceleration for smoother animations */
header,
.animate-name {
  transform: translateZ(0);
  will-change: transform, opacity;
}
</style>
