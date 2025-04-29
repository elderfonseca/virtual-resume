// src/services/contactService.js

/**
 * Service for handling contact form submissions
 * Can be connected to a real backend API in the future
 */

/**
 * Validates contact form data
 *
 * @param {Object} formData - The form data to validate
 * @returns {Object} Object containing isValid flag and any errors
 */
export const validateContactForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Validate name
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
    isValid = false;
  }

  // Validate email
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
    isValid = false;
  } else {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
  }

  // Validate message
  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Message is required';
    isValid = false;
  } else if (formData.message.length < 10) {
    errors.message = 'Message must be at least 10 characters long';
    isValid = false;
  }

  return {
    isValid,
    errors,
  };
};

/**
 * Submits contact form data
 * Currently simulates an API call with a delay
 *
 * @param {Object} formData - The form data to submit
 * @returns {Promise} Promise that resolves when submission is complete
 */
export const submitContactForm = async (formData) => {
  // Validate the form data first
  const validation = validateContactForm(formData);
  if (!validation.isValid) {
    return Promise.reject(validation.errors);
  }

  // For now, simulate an API call with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a 90% success rate
      if (Math.random() < 0.9) {
        resolve({
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        });
      } else {
        reject({
          success: false,
          message: 'There was an error sending your message. Please try again later.',
        });
      }
    }, 1500); // 1.5 second delay to simulate network request
  });
};

/**
 * In the future, when connecting to a real backend:
 *
 * export const submitContactForm = async (formData) => {
 *   const validation = validateContactForm(formData);
 *   if (!validation.isValid) {
 *     return Promise.reject(validation.errors);
 *   }
 *
 *   try {
 *     const response = await fetch('/api/contact', {
 *       method: 'POST',
 *       headers: {
 *         'Content-Type': 'application/json',
 *       },
 *       body: JSON.stringify(formData),
 *     });
 *
 *     const data = await response.json();
 *
 *     if (!response.ok) {
 *       throw new Error(data.message || 'Error submitting form');
 *     }
 *
 *     return data;
 *   } catch (error) {
 *     console.error('Error submitting contact form:', error);
 *     throw error;
 *   }
 * };
 */

export default {
  validateContactForm,
  submitContactForm,
};
