<!-- src/components/common/AnimatedName.vue -->
<template>
  <div ref="nameContainer" class="animated-name-container" :aria-label="ariaLabel" :style="containerStyle" role="img">
    <!-- Background SVG with darker base outlines -->
    <svg
      viewBox="0 0 553 200"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      class="animated-name background-letters"
    >
      <g class="layer" display="inline">
        <g
          fill="none"
          fill-rule="evenodd"
          id="svg_1"
          stroke="#00858a"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          transform="translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) matrix(1.40085 0 0 1.40085 66.7975 1.983)"
        >
          <path
            d="m16,105c-16,0 -29,-13 -29,-29s13,-29 29,-29c16,0 28,12.5 29,29l-29,0l0,29l58,0l0,-29c-1,-30 -26,-56 -58,-56c-32,0 -58,26 -58,58s26,58 58,58l0,-31z"
            id="svg_2"
          />
          <path d="m73.93,20l0,116l29.07,0l0,-116l-29.07,0z" id="svg_3" transform="matrix(1 0 0 1 0 0)" />
          <path
            d="m265.14,105c-16,0 -29,-13 -29,-29s13,-29 29,-29c16,0 28,12.5 29,29l-29,0l0,29l58,0l0,-29c-1,-30 -26,-56 -58,-56c-32,0 -58,26 -58,58s26,58 58,58l0,-31z"
            id="svg_6"
            transform="matrix(1 0 0 1 0 0)"
          />
          <g id="svg_18" transform="matrix(1 0 0 1 65.6546 0)">
            <path d="m257.5,20l0,116l27,0l0,-116l-27,0z" id="svg_7" />
            <path d="m257.1,76.21c0,-26.25 22.75,-48 49,-48c26.25,0 49,26 49,48" id="svg_14" />
            <path d="m284.83,76.42c0,-12.76 10.68,-23.33 23,-23.33c12.32,0 23,12.64 23,23.33" id="svg_16" />
            <path d="m330.73,76.38c0,0 24.17,0 24.03,0c-0.14,0 -24.03,0 -24.03,0z" id="svg_17" />
          </g>
          <path
            d="m207.14,20.35l0,116l-44.37,0c-38.83,0 -59.63,-24 -59.63,-58s20.8,-58 59.63,-58l44.37,0z"
            id="svg_4"
            transform="matrix(1 0 0 1 0 0) rotate(-180 155.14 78.35)"
          />
          <path d="m179.14,43.35l0,72c-28.58,0 -49,-17.05 -49,-36s20.42,-36 49,-36z" id="svg_5" transform="rotate(-180 154.64 79.35)" />
        </g>
      </g>
    </svg>

    <!-- Foreground SVG with animated drawing - OPTIMIZED PATHS -->
    <svg class="animated-name foreground-letters" viewBox="0 0 553 200" xmlns="http://www.w3.org/2000/svg">
      <g class="layer" display="inline">
        <g
          fill="none"
          fill-rule="evenodd"
          id="svg_1"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          transform="translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) translate(1 0) matrix(1.40085 0 0 1.40085 66.7975 1.983)"
        >
          <!-- E - First character - Original -->
          <path
            class="line"
            d="m16,105c-16,0 -29,-13 -29,-29s13,-29 29,-29c16,0 28,12.5 29,29l-29,0l0,29l58,0l0,-29c-1,-30 -26,-56 -58,-56c-32,0 -58,26 -58,58s26,58 58,58l0,-31z"
            id="svg_2"
          />

          <!-- L - Second character - Original -->
          <path class="line" d="m73.93,20l0,116l29.07,0l0,-116l-29.07,0z" id="svg_3" transform="matrix(1 0 0 1 0 0)" />

          <!-- D - Third character - OPTIMIZED -->
          <!-- Combining outer and inner contour into a single continuous path starting at top left corner -->
          <path
            class="line"
            d="M103.14,20.35v116h44.37c38.83,0,59.63-24,59.63-58s-20.8-58-59.63-58h-44.37z M127.14,43.35c28.58,0,49,17.05,49,36s-20.42,36-49,36v-72z"
            id="svg_4_optimized"
          />

          <!-- Second E - Fourth character - Original -->
          <path
            class="line"
            d="m265.14,105c-16,0 -29,-13 -29,-29s13,-29 29,-29c16,0 28,12.5 29,29l-29,0l0,29l58,0l0,-29c-1,-30 -26,-56 -58,-56c-32,0 -58,26 -58,58s26,58 58,58l0,-31z"
            id="svg_6"
            transform="matrix(1 0 0 1 0 0)"
          />

          <!-- R - Last character - ORIGINAL with optimized drawing sequence -->
          <g id="svg_18" transform="matrix(1 0 0 1 65.6546 0)">
            <!-- Maintaining original design but adjusting drawing sequence to prevent dots -->
            <!-- Start with vertical stem -->
            <path class="line" d="m257.5,20l0,116l27,0l0,-116l-27,0z" id="svg_7" />
            <!-- Then upper curve - only changing draw sequence, not appearance -->
            <path class="line" d="m257.1,76.21c0,-26.25 22.75,-48 49,-48c26.25,0 49,26 49,48" id="svg_14" />
            <!-- Then lower parts - adjusted for continuous drawing -->
            <path class="line preserve-transform" d="m284.83,76.42c0,-12.76 10.68,-23.33 23,-23.33c12.32,0 23,12.64 23,23.33" id="svg_16" />
            <path class="line preserve-transform" d="m330.73,76.38h24.03" id="svg_17" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAnimations } from '@/composables/useAnimations';

/**
 * AnimatedName component
 *
 * Creates an SVG text animation for "elder" with artistic line drawing animation
 * Using the exact "e" from the anime.js example with custom stylized letters for the rest
 * Compatible with anime.js version 4
 */
export default {
  name: 'AnimatedName',

  props: {
    /**
     * Primary color for the animation (default comes from theme)
     */
    color: {
      type: String,
      default: '#00FFF5', // Cyan accent color from theme
    },

    /**
     * Whether to loop the animation
     */
    loop: {
      type: Boolean,
      default: true,
    },

    /**
     * Draw pattern for SVG animation
     * Array of strings in format 'start end' where 0 is start of path, 1 is end
     * Example: ['0 0', '0 1', '1 1'] - line starts invisible, draws from start to end, stays visible
     */
    drawPattern: {
      type: Array,
      default: () => ['0 0', '0 1', '1 1'],
    },

    /**
     * Delay between line animations in milliseconds
     */
    staggerDelay: {
      type: Number,
      default: 100,
    },

    /**
     * Animation duration in milliseconds
     */
    duration: {
      type: Number,
      default: 2000,
    },

    /**
     * Animation easing function
     */
    easing: {
      type: String,
      default: 'inOutQuad',
    },

    /**
     * Width of the animation container
     */
    width: {
      type: [String, Number],
      default: 700,
    },

    /**
     * Height of the animation container
     */
    height: {
      type: [String, Number],
      default: 222,
    },

    /**
     * Stroke width for the SVG paths
     */
    strokeWidth: {
      type: Number,
      default: 4,
    },
  },

  emits: ['animation-ready'],

  setup(props, { emit }) {
    // DOM references
    const nameContainer = ref(null);

    // Computed styles
    const containerStyle = computed(() => {
      const width = typeof props.width === 'number' ? `${props.width}px` : props.width;
      const height = typeof props.height === 'number' ? `${props.height}px` : props.height;
      return { width, height };
    });

    // Accessibility
    const ariaLabel = 'Animated drawing of the name elder';

    // Animation objects
    let drawAnimation = null;

    // Use animations composable
    const { drawSVG, stagger } = useAnimations();

    /**
     * Initialize and start the animation
     */
    const initAnimation = () => {
      if (!nameContainer.value) return;

      // Get all line elements
      const lines = nameContainer.value.querySelectorAll('.line');

      if (!lines || lines.length === 0) {
        console.error('No .line elements found to animate');
        return;
      }

      try {
        // Use drawSVG function from the composable to create the drawing animation
        drawAnimation = drawSVG(lines, {
          draw: props.drawPattern,
          easing: props.easing,
          duration: props.duration,
          delay: stagger(props.staggerDelay),
          loop: props.loop,
          autoplay: true,
        });

        // Set initial color for all lines
        lines.forEach((line) => {
          line.style.stroke = props.color;
          line.classList.add('preserve-transform');
        });

        // Emit an event when animation is initialized
        emit('animation-ready', drawAnimation);
      } catch (error) {
        console.error('Error initializing SVG animation:', error);
      }
    };

    /**
     * Restart animation from beginning
     */
    const restartAnimation = () => {
      if (drawAnimation && typeof drawAnimation.restart === 'function') {
        drawAnimation.restart();
      } else {
        // If animation doesn't exist, reinitialize it
        initAnimation();
      }
    };

    /**
     * Pause animation
     */
    const pauseAnimation = () => {
      if (drawAnimation && typeof drawAnimation.pause === 'function') {
        drawAnimation.pause();
      }
    };

    /**
     * Resume animation
     */
    const playAnimation = () => {
      if (drawAnimation && typeof drawAnimation.play === 'function') {
        drawAnimation.play();
      } else {
        // If animation doesn't exist, reinitialize it
        initAnimation();
      }
    };

    // Clean up animations when component is unmounted
    onBeforeUnmount(() => {
      if (drawAnimation && typeof drawAnimation.pause === 'function') {
        drawAnimation.pause();
      }
    });

    // Initialize animations when component is mounted
    onMounted(() => {
      // Allow DOM to render first with a small delay
      setTimeout(() => {
        initAnimation();
      }, 300);
    });

    return {
      nameContainer,
      containerStyle,
      ariaLabel,
      restartAnimation,
      pauseAnimation,
      playAnimation,
    };
  },
};
</script>

<style scoped>
.animated-name-container {
  display: inline-block;
  overflow: visible;
  position: relative;
  /* Width and height set dynamically through props */
}

.animated-name {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: absolute;
  top: 0;
  left: 0;
}

.background-letters {
  opacity: 0.2;
}

.foreground-letters {
  z-index: 2;
  color: var(--color-accent, #00fff5);
}

.line {
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-origin: center;
}

.animated-name-container .line {
  transform-box: fill-box;
  transform-origin: center center;
}

.animated-name-container .foreground-letters #svg_4.line,
.animated-name-container .foreground-letters #svg_5.line {
  transform: rotate(-180deg) translate(0, 0);
}

/* Animation to indicate interactivity on hover */
@media (hover: hover) {
  .animated-name-container:hover .foreground-letters {
    filter: drop-shadow(0 0 5px var(--color-accent, #00fff5));
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .animated-name-container {
    max-width: 90%; /* Ensure it fits on small screens */
  }
}
</style>
