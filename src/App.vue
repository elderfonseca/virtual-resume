<!-- src/App.vue -->
<template>
  <div class="relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] min-h-screen">
    <!-- Skip to content link for accessibility -->
    <a href="#main" class="skip-to-content">
      {{ $t('nav.skipToContent') }}
    </a>

    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main id="main" class="relative">
      <!-- Hero Section -->
      <HeroSection />

      <!-- About Section  -->
      <AboutSection />

      <!-- Experience Section -->
      <ExperienceSection />

      <!-- Skills Section -->
      <SkillsSection />

      <!-- Projects Section -->
      <ProjectsSection />

      <!-- Contact Section -->
      <ContactSection />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useLocale } from '@/composables/useLocale';

// Layout components
import AppHeader from '@/components/layout/Header.vue';
import AppFooter from '@/components/layout/Footer.vue';

// Section components
import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import ExperienceSection from '@/components/sections/ExperienceSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';

/**
 * Main application component that structures the entire portfolio
 * Follows a component-based architecture for maintainability
 */
export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    HeroSection,
    AboutSection,
    ExperienceSection,
    SkillsSection,
    ProjectsSection,
    ContactSection,
  },

  setup() {
    // Use the locale composable
    const { initLocale } = useLocale();

    onMounted(() => {
      // Initialize language
      initLocale();

      // Initialize scroll behavior
      window.addEventListener('scroll', handleScroll);

      // Smooth scroll for anchor links
      setupSmoothScroll();
    });

    /**
     * Handle scroll events for animations and active section tracking
     */
    const handleScroll = () => {
      // Implementation will be handled by individual components and directives
    };

    /**
     * Set up smooth scrolling for anchor links
     */
    const setupSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });

            // Update URL without scrolling
            history.pushState(null, null, `#${targetId}`);
          }
        });
      });
    };

    return {};
  },
};
</script>
