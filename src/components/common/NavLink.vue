<!-- src/components/common/NavLink.vue -->
<template>
  <a
    :href="href"
    :class="[
      'transition-colors relative block py-2',
      'hover:text-[var(--color-accent)] focus:text-[var(--color-accent)] focus:outline-none',
      isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]',
    ]"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
    <span
      v-if="isActive"
      class="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-accent)] transform"
      :class="animate ? 'animate-slideIn' : ''"
    ></span>
  </a>
</template>

<script>
import { useAnimations } from '@/composables/useAnimations';

/**
 * Navigation link component with active state indicator
 * Used in the main navigation
 */
export default {
  name: 'NavLink',

  props: {
    /**
     * The link's href attribute
     */
    href: {
      type: String,
      required: true,
    },

    /**
     * Text to display
     */
    text: {
      type: String,
      default: '',
    },

    /**
     * Whether this link is currently active
     */
    isActive: {
      type: Boolean,
      default: false,
    },

    /**
     * Whether to animate the active indicator
     */
    animate: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    // Use animations composable
    const { fadeIn } = useAnimations();

    /**
     * Handle click event and emit the click event to parent
     */
    const handleClick = (event) => {
      // If it's a hash link, handle smooth scrolling
      if (props.href.startsWith('#')) {
        event.preventDefault();

        const targetId = props.href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Scroll smoothly to the element
          targetElement.scrollIntoView({ behavior: 'smooth' });

          // Update URL without scrolling (replaceState)
          window.history.replaceState(null, null, props.href);

          // Apply a subtle animation to the target section
          fadeIn(targetElement, {
            opacity: [0.95, 1],
            duration: 600,
            easing: 'easeOutQuad',
          });

          // Emit click event
          emit('click', event);
        }
      } else {
        // For regular links, just emit the click event
        emit('click', event);
      }
    };

    return {
      handleClick,
    };
  },
};
</script>
