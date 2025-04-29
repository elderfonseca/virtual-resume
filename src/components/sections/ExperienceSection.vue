<!-- src/components/sections/ExperienceSection.vue -->
<template>
  <section v-animate id="experience" ref="sectionRef" class="py-24 bg-[var(--color-bg-primary)]">
    <div class="container mx-auto px-4">
      <SectionTitle :title="t('experience.title')" />

      <div class="max-w-4xl mx-auto">
        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div
            ref="timelineRef"
            class="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-[var(--color-bg-secondary)] transform md:translate-x-[-50%]"
            v-animate="{ opacity: [0, 0.8], height: ['0%', '100%'], duration: 1200, easing: 'easeInOutQuart' }"
          ></div>

          <!-- Timeline items -->
          <div class="space-y-12">
            <!-- Capgemini -->
            <div class="relative">
              <TimelineItem
                :company="t('experience.capgemini.company')"
                :period="t('experience.capgemini.period')"
                align="right"
                icon="company"
              >
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-[var(--color-accent)]">
                      {{ t('experience.capgemini.seniorRole') }}
                    </h4>
                    <p class="text-sm text-text-secondary mb-2">
                      {{ t('experience.capgemini.seniorPeriod') }}
                    </p>
                    <ul class="space-y-2 text-[var(--color-text-primary)] list-disc list-inside">
                      <li>
                        Reviewed and fixed responsiveness issues in a web-based video support system for people with hearing impairments.
                      </li>
                      <li>Worked on migration of an ASP system to Angular 11.</li>
                      <li>
                        Led a team of nine developers on the Intranet project using Angular on the Frontend and NodeJS on the Backend of a
                        large banking client.
                      </li>
                      <li>Implemented Code Review in the team's delivery flows, reducing bugs found in the approval environment.</li>
                      <li>
                        Coordinated the development of Socket.IO for Notifications, reducing the number of Microservice PODs by
                        approximately 90%.
                      </li>
                      <li>
                        Designed and coordinated the update of Angular from version 11 to 16, achieving significant performance and security
                        gains.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="text-lg font-semibold text-[var(--color-accent)]">
                      {{ t('experience.capgemini.juniorRole') }}
                    </h4>
                    <p class="text-sm text-text-secondary mb-2">
                      {{ t('experience.capgemini.juniorPeriod') }}
                    </p>
                    <ul class="space-y-2 text-[var(--color-text-primary)] list-disc list-inside">
                      <li>
                        Worked on a CSS to SCSS migration of approximately 200 files, implementing best practices based on the AirBnb style
                        guide.
                      </li>
                      <li>
                        Replicated Typescript Lint rules from the client's Jenkins pipeline in Frontend (Angular) and Backend (NodeJS)
                        projects to ensure consistent local linting.
                      </li>
                    </ul>
                  </div>
                </div>
              </TimelineItem>
            </div>

            <!-- IComunicação -->
            <div class="relative">
              <TimelineItem
                :company="t('experience.icomunicacao.company')"
                :period="t('experience.icomunicacao.period')"
                align="left"
                icon="code"
              >
                <div>
                  <h4 class="text-lg font-semibold text-[var(--color-accent)]">
                    {{ t('experience.icomunicacao.role') }}
                  </h4>
                  <ul class="space-y-2 text-[var(--color-text-primary)] list-disc list-inside mt-2">
                    <li>
                      Implemented a gamification project in Angular 8 for a large bank, customizing the user experience for managers,
                      directors, and executives.
                    </li>
                    <li>
                      Developed a web-based virtual museum using Three.js, providing an immersive narrative through virtual reality
                      optimized for browser and VR device access.
                    </li>
                  </ul>
                </div>
              </TimelineItem>
            </div>

            <!-- Control Teleinformática -->
            <div class="relative">
              <TimelineItem
                :company="t('experience.control.company')"
                :period="t('experience.control.period')"
                align="right"
                icon="database"
              >
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-[var(--color-accent)]">
                      {{ t('experience.control.seniorRole') }}
                    </h4>
                    <p class="text-sm text-text-secondary mb-2">
                      {{ t('experience.control.seniorPeriod') }}
                    </p>
                    <ul class="space-y-2 text-[var(--color-text-primary)] list-disc list-inside">
                      <li>
                        Implemented a custom employee management system for Data Senado, optimized for managing approximately 100 employees,
                        including a meeting room scheduling module.
                      </li>
                      <li>
                        Managed the creation and upload of new surveys to the Data Senado website, utilizing a proprietary system and
                        JavaScript to integrate data via API.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="text-lg font-semibold text-[var(--color-accent)]">
                      {{ t('experience.control.juniorRole') }}
                    </h4>
                    <p class="text-sm text-text-secondary mb-2">
                      {{ t('experience.control.juniorPeriod') }}
                    </p>
                    <ul class="space-y-2 text-[var(--color-text-primary)] list-disc list-inside">
                      <li>
                        Provided specialized technical support for the Senate's ombudsman call center, serving approximately 25 simultaneous
                        agents.
                      </li>
                      <li>Optimized call center processes by implementing flow control and generating custom reports.</li>
                    </ul>
                  </div>
                </div>
              </TimelineItem>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Section -->
      <div class="max-w-4xl mx-auto mt-20">
        <h3 class="text-2xl font-bold mb-8 text-[var(--color-accent)] text-center" v-animate="{ delay: 200 }">
          Education & Certifications
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Education -->
          <div class="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-lg" v-animate="{ delay: 300 }">
            <h4 class="text-xl font-bold mb-4 text-[var(--color-accent)]">Education</h4>
            <ul class="space-y-4">
              <li>
                <div class="font-semibold text-[var(--color-text-primary)]">Bachelor of Information Systems</div>
                <div class="text-text-secondary">Anhanguera Educational University</div>
                <div class="text-sm text-text-secondary">2007 - 2010</div>
              </li>
              <li>
                <div class="font-semibold text-[var(--color-text-primary)]">IT Technical Course</div>
                <div class="text-text-secondary">Technical School of Brasilia</div>
                <div class="text-sm text-text-secondary">2005 - 2007</div>
              </li>
            </ul>
          </div>

          <!-- Certifications -->
          <div class="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-lg" v-animate="{ delay: 400 }">
            <h4 class="text-xl font-bold mb-4 text-[var(--color-accent)]">Certifications</h4>
            <ul class="space-y-4">
              <li v-for="(cert, index) in certifications" :key="index">
                <div class="font-semibold text-[var(--color-text-primary)]">{{ cert.name }}</div>
                <div class="text-text-secondary">{{ cert.issuer }}</div>
                <div class="text-sm text-text-secondary">{{ cert.date }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import TimelineItem from '@/components/common/TimelineItem.vue';
import { useLocale } from '@/composables/useLocale';
import { useAnimations } from '@/composables/useAnimations';

/**
 * Experience section component showing work history in a timeline format
 */
export default {
  name: 'ExperienceSection',

  components: {
    SectionTitle,
    TimelineItem,
  },

  setup() {
    // Use composables
    const { t } = useLocale();
    const { scrollTriggeredAnimation, animate } = useAnimations();

    // References for animation
    const sectionRef = ref(null);
    const timelineRef = ref(null);

    // Certifications data
    const certifications = [
      {
        name: 'Connected Manager',
        issuer: 'Capgemini University and Harvard ManageMentor',
        date: 'December 2024',
      },
      {
        name: 'Aspiring Architect',
        issuer: 'Capgemini',
        date: 'October 2024 – September 2026',
      },
      {
        name: 'Industry Campus - Tech & Digital Level 1 Certification',
        issuer: 'Capgemini University',
        date: 'June 2024',
      },
      {
        name: 'AZ-900 – Azure Fundamentals',
        issuer: 'Microsoft',
        date: 'November 2022',
      },
    ];

    // Add additional animations when mounted
    onMounted(() => {
      // Add particle effect to timeline
      if (timelineRef.value) {
        // Add dots along the timeline for visual interest
        const timeline = timelineRef.value;
        const timelineHeight = timeline.offsetHeight;

        for (let i = 0; i < 12; i++) {
          // Create a dot element
          const dot = document.createElement('div');
          dot.classList.add('absolute', 'w-2', 'h-2', 'rounded-full', 'bg-[var(--color-accent)]');

          // Position randomly along the timeline
          const posY = Math.random() * (timelineHeight - 20);
          dot.style.top = `${posY}px`;
          dot.style.left = '50%';
          dot.style.transform = 'translateX(-50%)';
          dot.style.opacity = '0';

          // Add to timeline
          timeline.appendChild(dot);

          // Animate the dot
          animate(dot, {
            opacity: [0, 0.8, 0],
            translateY: ['0px', '10px', '0px'],
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine',
            duration: 3000 + Math.random() * 3000,
            delay: 1000 + Math.random() * 2000,
          });
        }
      }

      // Animate timeline items when they enter viewport
      const timelineItems = document.querySelectorAll('#experience .relative:not(:first-child)');
      timelineItems.forEach((item, index) => {
        scrollTriggeredAnimation(
          item,
          (el) =>
            animate(el, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              easing: 'easeOutQuad',
              delay: 300 + index * 150,
            }),
          { threshold: 0.2 },
        );
      });
    });

    return {
      sectionRef,
      timelineRef,
      certifications,
      t,
    };
  },
};
</script>

<style scoped>
/* Timeline dot pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}
</style>
