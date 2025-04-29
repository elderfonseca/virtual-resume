import { animate, stagger, svg } from 'animejs';
// src/composables/useAnimations.js
import { ref, onUnmounted } from 'vue';

/**
 * Composable for handling animations across components
 * Provides reusable animation functions and utilities
 * Compatible with anime.js version 4
 */
export function useAnimations() {
  const animationInstances = ref([]);

  /**
   * Creates a fade-in animation for an element
   * @param {HTMLElement} element - The DOM element to animate
   * @param {Object} options - Animation options
   * @return {Object} Animation instance
   */
  const fadeIn = (element, options = {}) => {
    if (!element) return null;

    const defaultOptions = {
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 0,
    };

    // anime.js v4 format
    const instance = animate(element, {
      ...defaultOptions,
      ...options,
    });

    animationInstances.value.push(instance);
    return instance;
  };

  /**
   * Creates a slide-up animation for an element
   * @param {HTMLElement} element - The DOM element to animate
   * @param {Object} options - Animation options
   * @return {Object} Animation instance
   */
  const slideUp = (element, options = {}) => {
    if (!element) return null;

    const defaultOptions = {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 0,
    };

    // anime.js v4 format
    const instance = animate(element, {
      ...defaultOptions,
      ...options,
    });

    animationInstances.value.push(instance);
    return instance;
  };

  /**
   * Creates a sequential animation for multiple elements
   * @param {NodeList|Array} elements - Collection of DOM elements to animate
   * @param {Object} options - Animation options
   * @return {Object} Animation instance
   */
  const staggerAnimation = (elements, options = {}) => {
    if (!elements || !elements.length) return null;

    const defaultOptions = {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutQuad',
      delay: stagger(100),
    };

    // anime.js v4 format
    const instance = animate(elements, {
      ...defaultOptions,
      ...options,
    });

    animationInstances.value.push(instance);
    return instance;
  };

  /**
   * Creates an SVG drawing animation
   * @param {String|NodeList|Array} pathElements - SVG elements to animate (selector or elements)
   * @param {Object} options - Animation options
   * @return {Object} Animation instance
   */
  const drawSVG = (pathElements, options = {}) => {
    if (!pathElements) return null;

    // Default options for SVG drawing animation
    const defaultOptions = {
      draw: ['0 0', '0 1', '1 1'], // Standard drawing pattern
      easing: 'easeInOutQuad',
      duration: 2000,
      delay: stagger(150),
      loop: true,
    };

    // If pathElements is a string, treat it as a selector
    const elements = typeof pathElements === 'string' ? document.querySelectorAll(pathElements) : pathElements;

    try {
      // Create drawables for SVG elements
      const drawables = [];
      const elementsArray = Array.from(elements);

      elementsArray.forEach((element) => {
        const [drawable] = svg.createDrawable(element);
        if (drawable) {
          drawables.push(drawable);
        }
      });

      // Anime.js v4 format
      const instance = animate(drawables, {
        ...defaultOptions,
        ...options,
      });

      animationInstances.value.push(instance);
      return instance;
    } catch (error) {
      console.error('Error initializing SVG animation:', error);
      return null;
    }
  };

  /**
   * Creates a scroll-triggered animation using Intersection Observer
   * @param {HTMLElement} element - The DOM element to animate
   * @param {Function} animationFn - Function that creates the animation
   * @param {Object} options - Animation options
   * @return {Object} Cleanup function to remove observer
   */
  const scrollTriggeredAnimation = (element, animationFn, options = {}) => {
    if (!element || typeof animationFn !== 'function') return null;

    const defaultOptions = {
      threshold: 0.2,
      rootMargin: '0px',
      once: true,
    };

    const observerOptions = {
      ...defaultOptions,
      ...options,
    };

    // Prepare animation but don't play yet
    const animation = animationFn(element);

    if (animation) {
      animation.pause(); // Make sure it's paused initially
    }

    // Create observer to trigger animation when element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play animation when element is visible
            if (animation) {
              animation.play();
            }

            // Remove observer after animation if once is true
            if (observerOptions.once) {
              observer.unobserve(element);
            }
          } else if (!observerOptions.once) {
            // Reset animation if element is not visible and once is false
            if (animation) {
              animation.restart();
              animation.pause();
            }
          }
        });
      },
      {
        threshold: observerOptions.threshold,
        rootMargin: observerOptions.rootMargin,
      },
    );

    // Start observing the element
    observer.observe(element);

    // Return cleanup function
    return () => {
      observer.unobserve(element);
    };
  };

  // Clean up any animations when component unmounts
  onUnmounted(() => {
    animationInstances.value.forEach((instance) => {
      if (instance && typeof instance.pause === 'function') {
        instance.pause();
      }
    });
    animationInstances.value = [];
  });

  // Return the composable functions
  return {
    fadeIn,
    slideUp,
    staggerAnimation,
    scrollTriggeredAnimation,
    drawSVG,
    animate,
    stagger,
    svg,
  };
}

export default useAnimations;
