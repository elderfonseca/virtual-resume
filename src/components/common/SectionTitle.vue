<!-- src/components/common/SectionTitle.vue -->
<template>
  <div class="mb-12 text-center" ref="titleContainerRef" v-animate>
    <h2 class="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
      <slot>{{ title }}</slot>
    </h2>
    <div v-if="subtitle" class="max-w-2xl mx-auto text-text-secondary">
      <p>{{ subtitle }}</p>
    </div>
    <div class="w-24 h-1 bg-[var(--color-accent)] rounded-full mx-auto mt-6" ref="decoratorRef" v-animate="{ delay: 200 }"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAnimations } from '@/composables/useAnimations';

/**
 * Consistent section title component with optional subtitle
 * Used at the top of each main section
 */
export default {
  name: 'SectionTitle',

  props: {
    /**
     * Main title text
     */
    title: {
      type: String,
      default: '',
    },

    /**
     * Optional subtitle text
     */
    subtitle: {
      type: String,
      default: '',
    },

    /**
     * Whether to animate the title when visible
     */
    animate: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    // Element references for animation
    const titleContainerRef = ref(null);
    const decoratorRef = ref(null);

    // Use animations composable
    const { scrollTriggeredAnimation, animate } = useAnimations();

    // Apply additional animations when component is mounted
    onMounted(() => {
      if (props.animate && decoratorRef.value) {
        // Animate the decorator line with a width animation
        scrollTriggeredAnimation(
          decoratorRef.value,
          (el) => {
            // Start with 0 width and animate to full width
            el.style.width = '0';
            return animate(el, {
              width: ['0px', '96px'], // 24rem = 96px
              easing: 'easeOutExpo',
              duration: 1000,
              delay: 300,
            });
          },
          { threshold: 0.7 },
        );
      }
    });

    return {
      titleContainerRef,
      decoratorRef,
    };
  },
};
</script>
