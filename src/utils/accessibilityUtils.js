// src/utils/accessibilityUtils.js

/**
 * Utility functions for improving accessibility across the application
 */

/**
 * Adds keyboard navigation support to a set of interactive elements
 *
 * @param {HTMLElement} containerElement - The container with interactive elements
 * @param {string} selector - CSS selector to find interactive elements
 * @param {Object} options - Configuration options
 * @param {boolean} options.wrap - Whether to wrap from last to first element and vice versa
 * @param {boolean} options.vertical - Whether to use up/down or left/right keys
 */
export const setupKeyboardNavigation = (containerElement, selector, options = {}) => {
  const { wrap = true, vertical = false } = options;

  if (!containerElement) return;

  const elements = containerElement.querySelectorAll(selector);
  if (!elements.length) return;

  containerElement.addEventListener('keydown', (event) => {
    // Determine which keys to use based on orientation
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const homeKey = 'Home';
    const endKey = 'End';

    // Find the current focused element index
    const focusedElement = document.activeElement;
    const focusedIndex = Array.from(elements).indexOf(focusedElement);

    // Handle keyboard navigation
    switch (event.key) {
      case nextKey:
        event.preventDefault();
        if (focusedIndex >= 0) {
          const nextIndex = focusedIndex === elements.length - 1 ? (wrap ? 0 : focusedIndex) : focusedIndex + 1;
          elements[nextIndex].focus();
        } else {
          elements[0].focus();
        }
        break;

      case prevKey:
        event.preventDefault();
        if (focusedIndex >= 0) {
          const prevIndex = focusedIndex === 0 ? (wrap ? elements.length - 1 : 0) : focusedIndex - 1;
          elements[prevIndex].focus();
        } else {
          elements[0].focus();
        }
        break;

      case homeKey:
        event.preventDefault();
        elements[0].focus();
        break;

      case endKey:
        event.preventDefault();
        elements[elements.length - 1].focus();
        break;
    }
  });
};

/**
 * Adds focus trap to modal or dialog elements
 * Keeps focus within the element when open
 *
 * @param {HTMLElement} element - The element to trap focus within
 * @param {function} onEscape - Callback when Escape key is pressed
 * @returns {function} Function to remove the focus trap
 */
export const createFocusTrap = (element, onEscape) => {
  if (!element) return () => {};

  // Find all focusable elements
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

  if (!focusableElements.length) return () => {};

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Focus the first element when trap is created
  firstElement.focus();

  // Handle keydown events
  const handleKeyDown = (event) => {
    // Handle Escape key
    if (event.key === 'Escape' && typeof onEscape === 'function') {
      onEscape();
      return;
    }

    // Handle Tab key to keep focus within element
    if (event.key === 'Tab') {
      // Shift + Tab on first element should go to last element
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab on last element should go to first element
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Add event listener
  element.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Announces messages to screen readers using ARIA live regions
 *
 * @param {string} message - The message to announce
 * @param {string} priority - The announcement priority (polite or assertive)
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  // Find or create the live region element
  let liveRegion = document.getElementById('screen-reader-announcer');

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'screen-reader-announcer';
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-relevant', 'additions');
    document.body.appendChild(liveRegion);
  }

  // Set the appropriate aria-live value
  liveRegion.setAttribute('aria-live', priority);

  // Clear previous content (important for some screen readers)
  liveRegion.textContent = '';

  // Set the new message after a brief delay
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 50);
};

/**
 * Enhances an element with ARIA attributes for better screen reader support
 *
 * @param {HTMLElement} element - The element to enhance
 * @param {Object} options - ARIA attributes to add
 */
export const enhanceWithAria = (element, options = {}) => {
  if (!element) return;

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(`aria-${key}`, value.toString());
    }
  });
};

export default {
  setupKeyboardNavigation,
  createFocusTrap,
  announceToScreenReader,
  enhanceWithAria,
};
