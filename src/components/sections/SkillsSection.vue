<!-- src/components/sections/SkillsSection.vue -->
<template>
  <section v-animate id="skills" ref="sectionRef" class="py-24 bg-[var(--color-bg-secondary)]">
    <div class="container mx-auto px-4">
      <SectionTitle :title="t('skills.title')" />

      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Frontend Skills -->
          <div class="bg-[var(--color-bg-primary)] rounded-lg p-6 shadow-lg" ref="frontendRef" v-animate="{ delay: 200 }">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-[var(--color-accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[var(--color-accent)]">{{ t('skills.frontEnd') }}</h3>
            </div>

            <div ref="frontendSkillsRef">
              <!-- Loop through frontend skills -->
              <div v-for="(skill, index) in frontendSkills" :key="index" class="flex items-center mb-3">
                <div class="flex-1">
                  <div class="text-[var(--color-text-primary)] font-medium">{{ skill.name }}</div>
                  <div class="mt-1 h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                    <div class="h-full bg-[var(--color-accent)] rounded-full skill-progress" :data-width="skill.level"></div>
                  </div>
                </div>
                <div class="ml-2 w-8 text-right text-text-secondary text-sm">{{ skill.level }}%</div>
              </div>
            </div>
          </div>

          <!-- Backend Skills -->
          <div class="bg-[var(--color-bg-primary)] rounded-lg p-6 shadow-lg" ref="backendRef" v-animate="{ delay: 400 }">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-[var(--color-accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[var(--color-accent)]">{{ t('skills.backEnd') }}</h3>
            </div>

            <div ref="backendSkillsRef">
              <!-- Loop through backend skills -->
              <div v-for="(skill, index) in backendSkills" :key="index" class="flex items-center mb-3">
                <div class="flex-1">
                  <div class="text-[var(--color-text-primary)] font-medium">{{ skill.name }}</div>
                  <div class="mt-1 h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                    <div class="h-full bg-[var(--color-accent)] rounded-full skill-progress" :data-width="skill.level"></div>
                  </div>
                </div>
                <div class="ml-2 w-8 text-right text-text-secondary text-sm">{{ skill.level }}%</div>
              </div>
            </div>
          </div>

          <!-- Tools & Platforms -->
          <div class="bg-[var(--color-bg-primary)] rounded-lg p-6 shadow-lg" ref="toolsRef" v-animate="{ delay: 600 }">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-[var(--color-accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[var(--color-accent)]">{{ t('skills.tools') }}</h3>
            </div>

            <div ref="toolsSkillsRef">
              <!-- Loop through tools skills -->
              <div v-for="(skill, index) in toolsSkills" :key="index" class="flex items-center mb-3">
                <div class="flex-1">
                  <div class="text-[var(--color-text-primary)] font-medium">{{ skill.name }}</div>
                  <div class="mt-1 h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                    <div class="h-full bg-[var(--color-accent)] rounded-full skill-progress" :data-width="skill.level"></div>
                  </div>
                </div>
                <div class="ml-2 w-8 text-right text-text-secondary text-sm">{{ skill.level }}%</div>
              </div>
            </div>
          </div>

          <!-- Other Skills -->
          <div class="bg-[var(--color-bg-primary)] rounded-lg p-6 shadow-lg" ref="otherRef" v-animate="{ delay: 800 }">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-[var(--color-accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[var(--color-accent)]">{{ t('skills.other') }}</h3>
            </div>

            <div ref="otherSkillsRef">
              <!-- Loop through other skills -->
              <div v-for="(skill, index) in otherSkills" :key="index" class="flex items-center mb-3">
                <div class="flex-1">
                  <div class="text-[var(--color-text-primary)] font-medium">{{ skill.name }}</div>
                  <div class="mt-1 h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                    <div class="h-full bg-[var(--color-accent)] rounded-full skill-progress" :data-width="skill.level"></div>
                  </div>
                </div>
                <div class="ml-2 w-8 text-right text-text-secondary text-sm">{{ skill.level }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech tags cloud -->
        <div class="mt-16 bg-[var(--color-bg-primary)] p-8 rounded-lg shadow-lg" ref="tagCloudRef" v-animate="{ delay: 300 }">
          <div class="flex flex-wrap gap-3 justify-center">
            <div
              v-for="(tag, index) in techTags"
              :key="index"
              :style="{
                animationDelay: `${index * 0.1}s`,
                fontSize: `${Math.max(0.8, Math.min(1.4, tag.size))}rem`,
              }"
              class="px-3 py-1.5 rounded-full bg-[var(--color-bg-secondary)] hover:bg-[var(--color-accent)]/20 transition-colors duration-300 animate-fadeIn"
            >
              <span class="text-[var(--color-text-primary)]">{{ tag.name }}</span>
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
import { useLocale } from '@/composables/useLocale';
import { useAnimations } from '@/composables/useAnimations';
import { SKILLS_DATA } from '@/config/constants';

/**
 * Skills section component displaying various skill categories and levels
 */
export default {
  name: 'SkillsSection',

  components: {
    SectionTitle,
  },

  setup() {
    // Use composables
    const { t } = useLocale();
    const { scrollTriggeredAnimation, animate, stagger } = useAnimations();

    // Element references for animation
    const sectionRef = ref(null);
    const frontendRef = ref(null);
    const frontendSkillsRef = ref(null);
    const backendRef = ref(null);
    const backendSkillsRef = ref(null);
    const toolsRef = ref(null);
    const toolsSkillsRef = ref(null);
    const otherRef = ref(null);
    const otherSkillsRef = ref(null);
    const tagCloudRef = ref(null);

    // Skills data from constants
    const frontendSkills = SKILLS_DATA.frontend;
    const backendSkills = SKILLS_DATA.backend;
    const toolsSkills = SKILLS_DATA.tools;
    const otherSkills = SKILLS_DATA.other;

    // Tech tags for the cloud from combined skills
    const techTags = [
      ...frontendSkills.map((skill) => ({ name: skill.name, size: skill.level / 70 })),
      ...backendSkills.map((skill) => ({ name: skill.name, size: skill.level / 70 })),
      ...toolsSkills.map((skill) => ({ name: skill.name, size: skill.level / 70 })),
      { name: 'Socket.IO', size: 1.0 },
      { name: 'Three.js', size: 0.9 },
      { name: 'Bootstrap', size: 1.0 },
      { name: 'Angular Material', size: 1.1 },
    ];

    // Animate skill bars after component is mounted
    onMounted(() => {
      // Animate all skill progress bars
      const animateSkillBars = (containerRef) => {
        if (!containerRef.value) return;

        const progressBars = containerRef.value.querySelectorAll('.skill-progress');

        progressBars.forEach((bar) => {
          const width = bar.getAttribute('data-width') + '%';
          bar.style.width = '0%';

          // Set up animation for the progress bar
          scrollTriggeredAnimation(
            bar,
            (el) => {
              return animate(el, {
                width: [0, width],
                easing: 'easeOutQuart',
                duration: 1000,
                delay: 300,
              });
            },
            { threshold: 0.2 },
          );
        });
      };

      // Animate skill bars for each category
      animateSkillBars(frontendSkillsRef);
      animateSkillBars(backendSkillsRef);
      animateSkillBars(toolsSkillsRef);
      animateSkillBars(otherSkillsRef);

      // Animate tag cloud
      if (tagCloudRef.value) {
        const tags = tagCloudRef.value.querySelectorAll('.animate-fadeIn');

        scrollTriggeredAnimation(
          tagCloudRef.value,
          () => {
            return animate(tags, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: stagger(30),
              duration: 600,
              easing: 'easeOutQuad',
            });
          },
          { threshold: 0.2 },
        );
      }
    });

    return {
      sectionRef,
      frontendRef,
      frontendSkillsRef,
      backendRef,
      backendSkillsRef,
      toolsRef,
      toolsSkillsRef,
      otherRef,
      otherSkillsRef,
      tagCloudRef,
      frontendSkills,
      backendSkills,
      toolsSkills,
      otherSkills,
      techTags,
      t,
    };
  },
};
</script>

<style scoped>
.skill-progress {
  width: 0%; /* Start at 0, will be animated to the actual percentage */
  transition: width 1.5s ease-out;
}
</style>
