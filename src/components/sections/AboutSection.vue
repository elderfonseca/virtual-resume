<!-- src/components/sections/AboutSection.vue -->
<template>
  <section v-animate id="about" ref="sectionRef" class="py-24 bg-[var(--color-bg-secondary)]">
    <div class="container mx-auto px-4">
      <SectionTitle :title="t('about.title')" />

      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <!-- Profile image -->
          <div class="md:w-1/3 mb-8 md:mb-0" ref="profileImageRef" v-animate="{ delay: 200 }">
            <div class="relative">
              <div class="w-64 h-64 md:w-full md:h-auto aspect-square rounded-full overflow-hidden border-4 border-accent mx-auto">
                <img src="@/assets/images/profile.jpg" alt="Elder Fonseca" class="w-full h-full object-cover" loading="lazy" />
              </div>
              <div class="absolute -bottom-4 -right-4 bg-[var(--color-bg-primary)] text-[var(--color-accent)] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Bio information -->
          <div class="md:w-2/3">
            <p ref="paragraph1Ref" v-animate="{ delay: 400 }" class="text-lg mb-6 text-[var(--color-text-primary)]">
              {{ t('about.paragraph1') }}
            </p>
            <p ref="paragraph2Ref" v-animate="{ delay: 600 }" class="text-lg mb-8 text-[var(--color-text-primary)]">
              {{ t('about.paragraph2') }}
            </p>

            <!-- Personal info -->
            <div ref="personalInfoRef" v-animate="{ delay: 800 }" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <div>
                  <span class="block text-text-secondary text-sm">Email</span>
                  <a href="mailto:elder.fonseca15@gmail.com" class="text-[var(--color-accent)] hover:underline">
                    elder.fonseca15@gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <span class="block text-text-secondary text-sm">Phone</span>
                  <span class="text-[var(--color-text-primary)]">+55 (61) 98429-9449</span>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span class="block text-text-secondary text-sm">Location</span>
                  <span class="text-[var(--color-text-primary)]">{{ t('contact.location') }}</span>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span class="block text-text-secondary text-sm">Experience</span>
                  <span class="text-[var(--color-text-primary)]">17+ years in IT</span>
                </div>
              </div>
            </div>

            <!-- Call to action -->
            <div ref="ctaRef" v-animate="{ delay: 1000 }" class="flex flex-wrap gap-4">
              <Button href="#contact">
                {{ t('hero.contactButton') }}
              </Button>
              <Button href="/resume.pdf" variant="outline" :isExternal="true">
                {{ t('hero.resumeButton') }}
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </template>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import Button from '@/components/common/Button.vue';
import { useLocale } from '@/composables/useLocale';
import { useAnimations } from '@/composables/useAnimations';
import { CONTACT_INFO } from '@/config/constants';

/**
 * About section component with personal information
 */
export default {
  name: 'AboutSection',

  components: {
    SectionTitle,
    Button,
  },

  setup() {
    // Use composables
    const { t } = useLocale();
    const { scrollTriggeredAnimation, fadeIn, animate, stagger } = useAnimations();

    // References to elements for animation
    const sectionRef = ref(null);
    const profileImageRef = ref(null);
    const paragraph1Ref = ref(null);
    const paragraph2Ref = ref(null);
    const personalInfoRef = ref(null);
    const ctaRef = ref(null);

    // Contact information from constants
    const contactInfo = CONTACT_INFO;

    onMounted(() => {
      // Add additional animations
      if (profileImageRef.value) {
        scrollTriggeredAnimation(profileImageRef.value, (el) => fadeIn(el, { scale: [0.8, 1], duration: 1000 }), { threshold: 0.3 });
      }

      // Staggered animation for personal info items when scrolled into view
      if (personalInfoRef.value) {
        const infoItems = personalInfoRef.value.querySelectorAll('.flex.items-center');
        if (infoItems.length) {
          scrollTriggeredAnimation(
            personalInfoRef.value,
            (el) => {
              return animate(infoItems, {
                opacity: [0, 1],
                translateX: [-20, 0],
                delay: stagger(100),
                duration: 600,
                easing: 'easeOutQuad',
              });
            },
            { threshold: 0.2 },
          );
        }
      }
    });

    return {
      sectionRef,
      profileImageRef,
      paragraph1Ref,
      paragraph2Ref,
      personalInfoRef,
      ctaRef,
      contactInfo,
      t,
    };
  },
};
</script>
