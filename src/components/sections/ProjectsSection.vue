<!-- src/components/sections/ProjectsSection.vue -->
<template>
  <section v-animate id="projects" ref="sectionRef" class="py-24 bg-[var(--color-bg-primary)]">
    <div class="container mx-auto px-4">
      <SectionTitle :title="t('projects.title')" />

      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Project Cards -->
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.id"
            :title="t(`projects.${project.id}.title`)"
            :description="t(`projects.${project.id}.description`)"
            :technologies="t(`projects.${project.id}.technologies`).split(',')"
            :image-src="project.image"
            :buttons="getProjectButtons(project.id)"
            :animation-delay="index * 200"
            ref="projectCards"
          />
        </div>

        <!-- More projects section -->
        <div class="mt-16 text-center" ref="moreProjectsRef" v-animate="{ delay: 700 }">
          <p class="text-text-secondary mb-6">
            {{ t('projects.moreProjectsText') }}
          </p>
          <Button href="https://github.com/elderfonseca" variant="outline" size="lg" :isExternal="true">
            <template #icon>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            {{ t('projects.viewGithubProfile') }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import ProjectCard from '@/components/common/ProjectCard.vue';
import Button from '@/components/common/Button.vue';
import { useLocale } from '@/composables/useLocale';
import { useAnimations } from '@/composables/useAnimations';
import { PROJECTS_DATA } from '@/config/constants';

/**
 * Projects section component showcasing featured projects
 */
export default {
  name: 'ProjectsSection',

  components: {
    SectionTitle,
    ProjectCard,
    Button,
  },

  setup() {
    // Use composables
    const { t } = useLocale();
    const { scrollTriggeredAnimation, staggerAnimation, stagger } = useAnimations();

    // References for animation
    const sectionRef = ref(null);
    const projectCards = ref([]);
    const moreProjectsRef = ref(null);

    // Projects data from constants
    const projects = PROJECTS_DATA;

    /**
     * Get button configuration for a project
     * @param {string} projectId - The project identifier
     * @returns {Array} - Array of button configurations
     */
    const getProjectButtons = (projectId) => {
      const defaultButtons = [
        {
          label: t('projects.viewProject'),
          href: '#',
          variant: 'primary',
        },
      ];

      // Some projects may have a code link
      if (['intranet', 'virtualMuseum'].includes(projectId)) {
        defaultButtons.push({
          label: t('projects.viewCode'),
          href: 'https://github.com/elderfonseca',
          variant: 'outline',
          isExternal: true,
        });
      }

      return defaultButtons;
    };

    // Apply additional animations on mount
    onMounted(() => {
      // Add staggered animation for project cards
      if (projectCards.value && projectCards.value.length) {
        const cardElements = projectCards.value.map((card) => card.$el);

        scrollTriggeredAnimation(
          sectionRef.value,
          () =>
            staggerAnimation(cardElements, {
              opacity: [0, 1],
              translateY: [50, 0],
              delay: stagger(150),
              duration: 800,
              easing: 'easeOutCubic',
            }),
          { threshold: 0.1 },
        );
      }
    });

    return {
      sectionRef,
      projectCards,
      moreProjectsRef,
      projects,
      getProjectButtons,
      t,
    };
  },
};
</script>
