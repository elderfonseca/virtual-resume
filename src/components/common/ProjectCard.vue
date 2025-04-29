<!-- src/components/common/ProjectCard.vue -->
<template>
  <div
    ref="cardRef"
    class="bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
    :class="{ 'cursor-pointer': clickable }"
    @click="handleCardClick"
  >
    <!-- Project image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="imageSrc"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        :onerror="setDefaultImage"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-bg-[var(--color-primary)]/80 to-transparent"></div>
    </div>

    <!-- Project details -->
    <div class="p-6 flex-grow flex flex-col">
      <h3 class="font-bold text-xl mb-2 text-[var(--color-text-primary)]">{{ title }}</h3>
      <p class="text-text-secondary mb-4 flex-grow">{{ description }}</p>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="(tech, index) in technologies"
          :key="index"
          class="text-xs px-2 py-1 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-full"
          >{{ tech }}</span
        >
      </div>

      <!-- Action buttons -->
      <div class="flex flex-wrap gap-3 mt-2">
        <Button
          v-for="(button, index) in buttons"
          :key="index"
          :href="button.href"
          :variant="button.variant || 'primary'"
          :isExternal="button.isExternal"
          size="sm"
        >
          {{ button.label }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Button from '@/components/common/Button.vue';
import { useAnimations } from '@/composables/useAnimations';

/**
 * Project card component for displaying project information
 */
export default {
  name: 'ProjectCard',

  components: {
    Button,
  },

  props: {
    /**
     * Project title
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Project description
     */
    description: {
      type: String,
      required: true,
    },

    /**
     * Array of technologies used in the project
     */
    technologies: {
      type: Array,
      default: () => [],
    },

    /**
     * Path to the project image
     */
    imageSrc: {
      type: String,
      default: null,
    },

    /**
     * Array of button objects
     * { label: String, href: String, variant: String, isExternal: Boolean }
     */
    buttons: {
      type: Array,
      default: () => [],
    },

    /**
     * Whether the entire card is clickable
     */
    clickable: {
      type: Boolean,
      default: false,
    },

    /**
     * URL to navigate to when card is clicked (if clickable)
     */
    href: {
      type: String,
      default: null,
    },

    /**
     * Whether to open in a new tab when clicked (if clickable)
     */
    isExternal: {
      type: Boolean,
      default: false,
    },

    /**
     * Animation delay for the card
     */
    animationDelay: {
      type: Number,
      default: 0,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    // Reference to the card element
    const cardRef = ref(null);

    // Use animations composable
    const { fadeIn, scrollTriggeredAnimation } = useAnimations();

    /**
     * Handle click on the card
     */
    const handleCardClick = () => {
      if (!props.clickable) return;

      emit('click');

      if (props.href) {
        if (props.isExternal) {
          window.open(props.href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = props.href;
        }
      }
    };

    /**
     * Set default image if the provided image fails to load
     */
    const setDefaultImage = "this.onerror=null; this.src='/images/projects/default-project.jpg'";

    // Apply animations when component is mounted
    onMounted(() => {
      if (cardRef.value) {
        // Add scroll-triggered animation to the card
        scrollTriggeredAnimation(
          cardRef.value,
          (el) =>
            fadeIn(el, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: props.animationDelay,
              duration: 800,
              easing: 'easeOutCubic',
            }),
          { threshold: 0.1 },
        );
      }
    });

    return {
      cardRef,
      handleCardClick,
      setDefaultImage,
    };
  },
};
</script>
