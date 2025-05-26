// src/plugins/animations.ts
import { animate, stagger, svg, JSAnimation, AnimationParams } from 'animejs';
import { ScrollAnimationOptions } from '@/types';
import { App, DirectiveBinding } from 'vue';

type AnimationDirectiveElement = HTMLElement & {
  _animateObserver?: IntersectionObserver;
  _animateGroupObserver?: IntersectionObserver;
};

/**
 * Helper function to clean options for anime.js compatibility
 * Removes our custom properties before passing to animate()
 */
function cleanAnimationOptions(options: ScrollAnimationOptions): AnimationParams {
  const { threshold, once, targets, ...animeOptions } = options;
  return animeOptions as AnimationParams;
}

/**
 * Extract custom options from binding value
 */
function extractCustomOptions(bindingValue: any): {
  threshold: number;
  once: boolean;
  targets: string;
} {
  return {
    threshold: bindingValue && typeof bindingValue === 'object' && 'threshold' in bindingValue ? (bindingValue.threshold as number) : 0.1,
    once: bindingValue && typeof bindingValue === 'object' && 'once' in bindingValue ? (bindingValue.once as boolean) : true,
    targets: bindingValue && typeof bindingValue === 'object' && 'targets' in bindingValue ? (bindingValue.targets as string) : '>*',
  };
}

/**
 * Apply initial transformations to element
 */
function applyInitialTransform(element: HTMLElement, options: ScrollAnimationOptions): void {
  let transform = '';

  if (options.translateY) {
    const value = Array.isArray(options.translateY) ? options.translateY[0] : options.translateY;
    transform += `translateY(${value}px) `;
  }

  if (options.translateX) {
    const value = Array.isArray(options.translateX) ? options.translateX[0] : options.translateX;
    transform += `translateX(${value}px) `;
  }

  if (options.scale) {
    const value = Array.isArray(options.scale) ? options.scale[0] : options.scale;
    transform += `scale(${value}) `;
  }

  if (options.rotate) {
    const value = Array.isArray(options.rotate) ? options.rotate[0] : options.rotate;
    transform += `rotate(${value}deg) `;
  }

  if (transform) {
    element.style.transform = transform.trim();
  }
}

/**
 * Animation plugin for Vue
 * Provides animation directives and utilities using anime.js v4
 */
export default {
  install(app: App): void {
    // Store anime functions globally
    app.config.globalProperties.$animate = animate;
    app.config.globalProperties.$stagger = stagger;
    app.config.globalProperties.$svg = svg;

    /**
     * v-animate directive for scroll-triggered animations
     * Usage: v-animate or v-animate="{ delay: 300, translateY: [50, 0] }"
     */
    app.directive('animate', {
      mounted(el: AnimationDirectiveElement, binding: DirectiveBinding): void {
        // Default animation options
        const defaults: ScrollAnimationOptions = {
          duration: 400,
          easing: 'easeOutCubic',
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 0,
          autoplay: false,
          threshold: 0.1,
          once: true,
        };

        // Merge defaults with provided options
        const options: ScrollAnimationOptions = {
          ...defaults,
          ...(binding.value || {}),
        };

        // Extract custom options
        const { threshold, once } = extractCustomOptions(binding.value);

        // Hide element initially
        el.style.opacity = '0';

        // Apply initial transformations
        applyInitialTransform(el, options);

        try {
          // Clean options for anime.js compatibility
          const cleanOptions = cleanAnimationOptions(options);

          // Create the animation
          const animation: JSAnimation = animate(el, cleanOptions);

          // Set up Intersection Observer to trigger animation when element is visible
          const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
              entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                  // Play animation when element is visible
                  if (typeof animation.play === 'function') {
                    animation.play();
                  }

                  // Remove observer after animation if once is true
                  if (once) {
                    observer.unobserve(el);
                  }
                } else if (!once) {
                  // Reset animation if element is not visible and once is false
                  if (typeof animation.restart === 'function') {
                    animation.restart();
                    if (typeof animation.pause === 'function') {
                      animation.pause();
                    }
                  }
                }
              });
            },
            {
              threshold,
            },
          );

          // Start observing the element
          observer.observe(el);

          // Store observer on element for cleanup
          el._animateObserver = observer;
        } catch (error) {
          console.error('Error initializing animation:', error);
        }
      },

      // Clean up when element is unmounted
      unmounted(el: AnimationDirectiveElement): void {
        if (el._animateObserver) {
          el._animateObserver.disconnect();
          delete el._animateObserver;
        }
      },
    });

    /**
     * v-animate-group directive for animating groups of elements
     * Usage: v-animate-group="{ targets: '.item', delay: stagger(100) }"
     */
    app.directive('animate-group', {
      mounted(el: AnimationDirectiveElement, binding: DirectiveBinding): void {
        try {
          // Default animation options
          const defaults: ScrollAnimationOptions = {
            duration: 600,
            easing: 'easeOutQuad',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: stagger(100),
            autoplay: false,
            threshold: 0.1,
            targets: '>*',
          };

          // Merge defaults with provided options
          const options: ScrollAnimationOptions = {
            ...defaults,
            ...(binding.value || {}),
          };

          // Extract custom options
          const { threshold, targets: targetsSelector } = extractCustomOptions(binding.value);

          // Find target elements
          const targets = el.querySelectorAll(targetsSelector);

          if (targets.length === 0) {
            console.warn('v-animate-group: No target elements found with selector:', targetsSelector);
            return;
          }

          // Hide targets initially and apply transformations
          targets.forEach((target: Element) => {
            const htmlTarget = target as HTMLElement;
            htmlTarget.style.opacity = '0';
            applyInitialTransform(htmlTarget, options);
          });

          // Clean options for anime.js compatibility
          const cleanOptions = cleanAnimationOptions(options);

          // Create the animation
          const animation: JSAnimation = animate(targets, cleanOptions);

          // Set up Intersection Observer
          const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
              entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                  // Play animation when container is visible
                  if (typeof animation.play === 'function') {
                    animation.play();
                  }

                  // Remove observer after animation
                  observer.unobserve(el);
                }
              });
            },
            {
              threshold,
            },
          );

          // Start observing the container
          observer.observe(el);

          // Store observer for cleanup
          el._animateGroupObserver = observer;
        } catch (error) {
          console.error('Error initializing group animation:', error);
        }
      },

      // Clean up when container is unmounted
      unmounted(el: AnimationDirectiveElement): void {
        if (el._animateGroupObserver) {
          el._animateGroupObserver.disconnect();
          delete el._animateGroupObserver;
        }
      },
    });

    /**
     * Helper function to check if an element is in viewport
     */
    app.config.globalProperties.$isInViewport = (element: HTMLElement | null, offset: number = 0): boolean => {
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      return rect.top <= windowHeight - offset && rect.bottom >= 0 + offset;
    };
  },
};
