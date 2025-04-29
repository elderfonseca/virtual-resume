<!-- src/components/common/TimelineItem.vue -->
<template>
  <div
    ref="itemRef"
    :class="[
      'relative z-10 mb-8',
      align === 'left' ? 'md:ml-auto md:mr-[50%] md:pr-12' : 'md:mr-auto md:ml-[50%] md:pl-12',
      'max-w-full md:max-w-[calc(50%-24px)]',
    ]"
    v-animate="{ delay: 200, translateY: [30, 0] }"
  >
    <!-- Timeline node -->
    <div
      ref="nodeRef"
      class="absolute top-0 left-0 md:left-auto md:right-0 w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center z-10"
      :class="align === 'left' ? 'md:-right-5 md:left-auto' : 'md:-left-5'"
      v-animate="{ delay: 400, scale: [0.5, 1], opacity: [0, 1] }"
    >
      <!-- Icon based on type -->
      <component :is="getIcon" class="h-5 w-5 text-[var(--color-accent)]" />
    </div>

    <!-- Card content -->
    <div
      ref="cardRef"
      class="ml-14 md:ml-0 p-6 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg border-l-4 border-accent"
      v-animate="{ delay: 300, opacity: [0, 1], translateX: [align === 'left' ? 20 : -20, 0] }"
    >
      <!-- Header with company and period -->
      <div class="mb-4">
        <h3 class="text-xl font-bold text-[var(--color-text-primary)]">{{ company }}</h3>
        <div class="flex items-center mt-1 text-text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{{ period }}</span>
        </div>
      </div>

      <!-- Content slot -->
      <div class="text-sm">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, h } from 'vue';
import { useAnimations } from '@/composables/useAnimations';

/**
 * Timeline item component for displaying work experience or education
 */
export default {
  name: 'TimelineItem',

  props: {
    /**
     * Company or institution name
     */
    company: {
      type: String,
      required: true,
    },

    /**
     * Time period (e.g., "Jan 2020 - Present")
     */
    period: {
      type: String,
      required: true,
    },

    /**
     * Alignment in the timeline
     * Can be 'left' or 'right'
     */
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value),
    },

    /**
     * Icon type to display in the timeline node
     * Can be 'company', 'code', 'database', or 'default'
     */
    icon: {
      type: String,
      default: 'default',
      validator: (value) => ['company', 'code', 'database', 'default'].includes(value),
    },
  },

  setup(props) {
    // Element references
    const itemRef = ref(null);
    const nodeRef = ref(null);
    const cardRef = ref(null);

    // Use animations composable
    const { scrollTriggeredAnimation, animate } = useAnimations();

    // Get the appropriate icon based on the icon prop
    const getIcon = computed(() => {
      // Return render functions for SVG icons
      const icons = {
        company: () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'h-5 w-5',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
              }),
            ],
          ),

        code: () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'h-5 w-5',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
              }),
            ],
          ),

        database: () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'h-5 w-5',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
              }),
            ],
          ),

        default: () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'h-5 w-5',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
              }),
            ],
          ),
      };

      return icons[props.icon] || icons.default;
    });

    // Add extra animations on mount
    onMounted(() => {
      if (nodeRef.value) {
        // Add a pulse animation to the node for emphasis
        scrollTriggeredAnimation(
          nodeRef.value,
          (el) => {
            return animate(el, {
              scale: [1, 1.1, 1],
              boxShadow: ['0 0 0 0 rgba(0, 173, 181, 0)', '0 0 0 8px rgba(0, 173, 181, 0.3)', '0 0 0 0 rgba(0, 173, 181, 0)'],
              easing: 'easeInOutQuad',
              duration: 1500,
              delay: 600,
            });
          },
          { threshold: 0.5, once: true },
        );
      }
    });

    return {
      itemRef,
      nodeRef,
      cardRef,
      getIcon,
    };
  },
};
</script>
