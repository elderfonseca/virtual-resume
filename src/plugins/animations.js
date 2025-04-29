// src/plugins/animations.js
// Import using ES Modules syntax
import { animate, stagger } from 'animejs';

/**
 * Animation plugin for Vue
 * Provides animation directives and utilities using anime.js v4
 */
export default {
  install(app) {
    // Store anime functions globally
    app.config.globalProperties.$animate = animate;
    app.config.globalProperties.$stagger = stagger;

    /**
     * v-animate directive for scroll-triggered animations
     * Usage: v-animate or v-animate="{ delay: 300, translateY: [50, 0] }"
     */
    app.directive('animate', {
      mounted(el, binding) {
        // Default animation options
        const defaults = {
          duration: 400,
          easing: 'easeOutCubic',
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 0,
          threshold: 0.1, // Percentage of element visible to trigger animation
          once: true, // Whether to only animate once
        };

        // Merge defaults with provided options
        const options = {
          ...defaults,
          ...(binding.value || {}),
        };

        // Hide element initially
        el.style.opacity = '0';

        // Apply initial transformations
        let transform = '';
        if (options.translateY)
          transform += `translateY(${Array.isArray(options.translateY) ? options.translateY[0] : options.translateY}px) `;
        if (options.translateX)
          transform += `translateX(${Array.isArray(options.translateX) ? options.translateX[0] : options.translateX}px) `;
        if (options.scale) transform += `scale(${Array.isArray(options.scale) ? options.scale[0] : options.scale}) `;
        if (options.rotate) transform += `rotate(${Array.isArray(options.rotate) ? options.rotate[0] : options.rotate}deg) `;

        if (transform) el.style.transform = transform.trim();

        try {
          // Create the animation parameters object
          const animationParams = {
            opacity: options.opacity,
            translateY: options.translateY,
            translateX: options.translateX,
            scale: options.scale,
            rotate: options.rotate,
            duration: options.duration,
            easing: options.easing,
            delay: options.delay,
            autoplay: false,
          };

          // Create the animation passing targets and parameters separately
          const animation = animate(el, animationParams);

          // Set up Intersection Observer to trigger animation when element is visible
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  // Play animation when element is visible
                  if (typeof animation.play === 'function') {
                    animation.play();
                  }

                  // Remove observer after animation if once is true
                  if (options.once) {
                    observer.unobserve(el);
                  }
                } else if (!options.once) {
                  // Reset animation if element is not visible and once is false
                  if (typeof animation.restart === 'function') {
                    animation.restart();
                    animation.pause();
                  }
                }
              });
            },
            {
              threshold: options.threshold,
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
      unmounted(el) {
        if (el._animateObserver) {
          el._animateObserver.disconnect();
        }
      },
    });

    /**
     * v-animate-group directive for animating groups of elements
     * Usage: v-animate-group="{ targets: '.item', delay: stagger(100) }"
     */
    app.directive('animate-group', {
      mounted(el, binding) {
        try {
          // Default animation options
          const defaults = {
            duration: 600,
            easing: 'easeOutQuad',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: stagger(100),
            threshold: 0.1,
            targets: '>*', // All direct children
          };

          // Merge defaults with provided options
          const options = {
            ...defaults,
            ...(binding.value || {}),
          };

          // Find target elements
          const targets = el.querySelectorAll(options.targets);

          // Hide targets initially
          targets.forEach((target) => {
            target.style.opacity = '0';

            // Apply initial transformations if needed
            let transform = '';
            if (options.translateY)
              transform += `translateY(${Array.isArray(options.translateY) ? options.translateY[0] : options.translateY}px) `;
            if (options.translateX)
              transform += `translateX(${Array.isArray(options.translateX) ? options.translateX[0] : options.translateX}px) `;
            if (options.scale) transform += `scale(${Array.isArray(options.scale) ? options.scale[0] : options.scale}) `;
            if (options.rotate) transform += `rotate(${Array.isArray(options.rotate) ? options.rotate[0] : options.rotate}deg) `;

            if (transform) target.style.transform = transform.trim();
          });

          // Create the animation parameters object
          const animationParams = {
            opacity: options.opacity,
            translateY: options.translateY,
            translateX: options.translateX,
            scale: options.scale,
            rotate: options.rotate,
            duration: options.duration,
            easing: options.easing,
            delay: options.delay,
            autoplay: false,
          };

          // Create the animation passing targets and parameters separately
          const animation = animate(targets, animationParams);

          // Set up Intersection Observer
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
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
              threshold: options.threshold,
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
      unmounted(el) {
        if (el._animateGroupObserver) {
          el._animateGroupObserver.disconnect();
        }
      },
    });

    /**
     * Helper function to check if an element is in viewport
     */
    app.config.globalProperties.$isInViewport = (element, offset = 0) => {
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset && rect.bottom >= 0 + offset;
    };
  },
};
