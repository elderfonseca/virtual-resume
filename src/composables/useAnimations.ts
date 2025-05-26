import { animate, stagger, svg, JSAnimation, AnimationParams } from 'animejs';
import { ScrollAnimationOptions } from '@/types';
import { ref, onUnmounted, Ref } from 'vue';

// Define types for animation instances
type CleanupFunction = () => void;

/**
 * Helper function to clean options for anime.js compatibility
 * Removes our custom properties before passing to animate()
 */
function cleanAnimationOptions(options: ScrollAnimationOptions): AnimationParams {
  const { threshold, once, targets, ...animeOptions } = options;
  return animeOptions as AnimationParams;
}

/**
 * Composable for handling animations across components
 * Provides reusable animation functions and utilities
 * Compatible with anime.js version 4
 */
export function useAnimations() {
  const animationInstances: Ref<JSAnimation[]> = ref([]);

  /**
   * Creates a fade-in animation for an element
   * @param {HTMLElement} element - The DOM element to animate
   * @param {ScrollAnimationOptions} options - Animation options
   * @return {JSAnimation | null} Animation instance
   */
  const fadeIn = (element: HTMLElement, options: ScrollAnimationOptions = {}): JSAnimation | null => {
    if (!element) return null;

    const defaultOptions: ScrollAnimationOptions = {
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 0,
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const cleanOptions = cleanAnimationOptions(mergedOptions);

    // anime.js v4 format
    const instance = animate(element, cleanOptions);

    animationInstances.value.push(instance);
    return instance;
  };

  /**
   * Creates a slide-up animation for an element
   * @param {HTMLElement} element - The DOM element to animate
   * @param {ScrollAnimationOptions} options - Animation options
   * @return {JSAnimation | null} Animation instance
   */
  const slideUp = (element: HTMLElement, options: ScrollAnimationOptions = {}): JSAnimation | null => {
    if (!element) return null;

    const defaultOptions: ScrollAnimationOptions = {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 0,
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const cleanOptions = cleanAnimationOptions(mergedOptions);

    // anime.js v4 format
    const instance = animate(element, cleanOptions);

    animationInstances.value.push(instance);
    return instance;
  };

  /**
   * Creates a sequential animation for multiple elements
   * @param {NodeListOf<Element> | HTMLElement[] | Element[]} elements - Collection of DOM elements to animate
   * @param {ScrollAnimationOptions} options - Animation options
   * @return {JSAnimation | null} Animation instance
   */
  const staggerAnimation = (
    elements: NodeListOf<Element> | HTMLElement[] | Element[],
    options: ScrollAnimationOptions = {},
  ): JSAnimation | null => {
    if (!elements || !elements.length) return null;

    const defaultOptions: ScrollAnimationOptions = {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutQuad',
      delay: stagger(100),
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const cleanOptions = cleanAnimationOptions(mergedOptions);

    // anime.js v4 format
    const instance = animate(elements, cleanOptions);

    animationInstances.value.push(instance);
    return instance;
  };

  /**
   * Creates an SVG drawing animation
   * @param {string | NodeListOf<Element> | Element[]} pathElements - SVG elements to animate (selector or elements)
   * @param {ScrollAnimationOptions} options - Animation options
   * @return {JSAnimation | null} Animation instance
   */
  const drawSVG = (pathElements: string | NodeListOf<Element> | Element[], options: ScrollAnimationOptions = {}): JSAnimation | null => {
    if (!pathElements) return null;

    // Default options for SVG drawing animation
    const defaultOptions: ScrollAnimationOptions = {
      draw: ['0 0', '0 1', '1 1'], // Standard drawing pattern
      easing: 'easeInOutQuad',
      duration: 2000,
      delay: stagger(150),
      loop: true,
    };

    try {
      // Create drawable elements
      const drawables: any[] = [];

      if (typeof pathElements === 'string') {
        // If pathElements is a string, treat it as a selector
        const elements = document.querySelectorAll(pathElements);
        const elementsArray = Array.from(elements);

        elementsArray.forEach((element) => {
          const [drawable] = svg.createDrawable(element);
          if (drawable) {
            drawables.push(drawable);
          }
        });
      } else if (pathElements instanceof NodeList || Array.isArray(pathElements)) {
        // If pathElements is a NodeList or Array
        const elementsArray = Array.from(pathElements);

        elementsArray.forEach((element) => {
          const [drawable] = svg.createDrawable(element);
          if (drawable) {
            drawables.push(drawable);
          }
        });
      }

      const mergedOptions = { ...defaultOptions, ...options };
      const cleanOptions = cleanAnimationOptions(mergedOptions);

      // Create the animation
      const instance = animate(drawables, cleanOptions);

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
   * @param {Object} options - Observer options
   * @return {CleanupFunction | null} Cleanup function to remove observer
   */
  const scrollTriggeredAnimation = (
    element: HTMLElement,
    animationFn: (el: HTMLElement) => JSAnimation | null,
    options: {
      threshold?: number;
      rootMargin?: string;
      once?: boolean;
    } = {},
  ): CleanupFunction | null => {
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

    if (animation && typeof animation.pause === 'function') {
      animation.pause(); // Make sure it's paused initially
    }

    // Create observer to trigger animation when element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play animation when element is visible
            if (animation && typeof animation.play === 'function') {
              animation.play();
            }

            // Remove observer after animation if once is true
            if (observerOptions.once) {
              observer.unobserve(element);
            }
          } else if (!observerOptions.once) {
            // Reset animation if element is not visible and once is false
            if (animation && typeof animation.restart === 'function') {
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
