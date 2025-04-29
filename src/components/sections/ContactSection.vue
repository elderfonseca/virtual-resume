<!-- src/components/sections/ContactSection.vue -->
<template>
  <section v-animate id="contact" class="py-24 bg-[var(--color-bg-secondary)]">
    <div class="container mx-auto px-4">
      <SectionTitle :title="$t('contact.title')" />

      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Contact form -->
          <div class="bg-[var(--color-bg-primary)] rounded-lg p-8 shadow-lg" v-animate="{ delay: 200 }">
            <form @submit.prevent="submitForm" class="space-y-6" novalidate>
              <!-- Name field -->
              <div>
                <label for="name" class="block text-[var(--color-text-primary)] mb-2 font-medium">
                  {{ $t('contact.nameLabel') }}
                </label>
                <input
                  id="name"
                  type="text"
                  v-model="form.name"
                  :class="[
                    'w-full px-4 py-3 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50',
                    errors.name ? 'border-2 border-red-500' : '',
                  ]"
                  :aria-invalid="errors.name ? 'true' : 'false'"
                  :aria-describedby="errors.name ? 'name-error' : undefined"
                  required
                />
                <p v-if="errors.name" id="name-error" class="mt-1 text-sm text-red-500">
                  {{ errors.name }}
                </p>
              </div>

              <!-- Email field -->
              <div>
                <label for="email" class="block text-[var(--color-text-primary)] mb-2 font-medium">
                  {{ $t('contact.emailLabel') }}
                </label>
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  :class="[
                    'w-full px-4 py-3 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50',
                    errors.email ? 'border-2 border-red-500' : '',
                  ]"
                  :aria-invalid="errors.email ? 'true' : 'false'"
                  :aria-describedby="errors.email ? 'email-error' : undefined"
                  required
                />
                <p v-if="errors.email" id="email-error" class="mt-1 text-sm text-red-500">
                  {{ errors.email }}
                </p>
              </div>

              <!-- Message field -->
              <div>
                <label for="message" class="block text-[var(--color-text-primary)] mb-2 font-medium">
                  {{ $t('contact.messageLabel') }}
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  :class="[
                    'w-full px-4 py-3 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50',
                    errors.message ? 'border-2 border-red-500' : '',
                  ]"
                  :aria-invalid="errors.message ? 'true' : 'false'"
                  :aria-describedby="errors.message ? 'message-error' : undefined"
                  required
                ></textarea>
                <p v-if="errors.message" id="message-error" class="mt-1 text-sm text-red-500">
                  {{ errors.message }}
                </p>
              </div>

              <!-- Submit button -->
              <Button type="submit" variant="primary" fullWidth :disabled="isSubmitting">
                <template v-if="isSubmitting">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </template>
                <template v-else>
                  {{ $t('contact.submitButton') }}
                </template>
              </Button>

              <!-- Success message -->
              <div
                v-if="formSubmitted"
                class="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center"
                role="alert"
              >
                {{ $t('contact.formSuccess') }}
              </div>

              <!-- Error message -->
              <div v-if="formError" class="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center" role="alert">
                {{ formError }}
              </div>
            </form>
          </div>

          <!-- Contact information -->
          <div>
            <div class="bg-[var(--color-bg-primary)] rounded-lg p-8 shadow-lg mb-8" v-animate="{ delay: 400 }">
              <h3 class="text-xl font-bold text-[var(--color-accent)] mb-6">Contact Information</h3>

              <div class="space-y-6">
                <!-- Location -->
                <div class="flex">
                  <div class="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-[var(--color-accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-[var(--color-text-primary)] mb-1">Location</h4>
                    <p class="text-text-secondary">{{ $t('contact.location') }}</p>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex">
                  <div class="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-[var(--color-accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-[var(--color-text-primary)] mb-1">Email</h4>
                    <a href="mailto:elder.fonseca15@gmail.com" class="text-[var(--color-accent)] hover:underline">
                      elder.fonseca15@gmail.com
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex">
                  <div class="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-[var(--color-accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-[var(--color-text-primary)] mb-1">Phone</h4>
                    <p class="text-text-secondary">{{ $t('contact.phone') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social links card -->
            <div class="bg-[var(--color-bg-primary)] rounded-lg p-8 shadow-lg" v-animate="{ delay: 600 }">
              <h3 class="text-xl font-bold text-[var(--color-accent)] mb-6">Social Profiles</h3>

              <div class="grid grid-cols-2 gap-4">
                <a
                  href="https://www.linkedin.com/in/elder-fonseca-lima"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center p-4 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-accent)]/10 transition-colors"
                >
                  <svg class="h-6 w-6 text-[var(--color-accent)] mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                  <span class="text-[var(--color-text-primary)]">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/elderfonseca"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center p-4 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-accent)]/10 transition-colors"
                >
                  <svg class="h-6 w-6 text-[var(--color-accent)] mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-[var(--color-text-primary)]">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from 'vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import Button from '@/components/common/Button.vue';
import { validateContactForm, submitContactForm } from '@/services/contactService';

/**
 * Contact section component with form and contact information
 */
export default {
  name: 'ContactSection',

  components: {
    SectionTitle,
    Button,
  },

  setup() {
    // Form data
    const form = reactive({
      name: '',
      email: '',
      message: '',
    });

    // Form errors
    const errors = reactive({
      name: '',
      email: '',
      message: '',
    });

    // Form states
    const isSubmitting = ref(false);
    const formSubmitted = ref(false);
    const formError = ref('');

    /**
     * Submit the form
     */
    const submitForm = async () => {
      // Reset error message
      formError.value = '';

      // Validate form using the contactService
      const validation = validateContactForm(form);

      if (!validation.isValid) {
        // Update errors from validation
        Object.assign(errors, validation.errors);
        return;
      }

      // Reset errors
      Object.keys(errors).forEach((key) => {
        errors[key] = '';
      });

      // Set submitting state
      isSubmitting.value = true;

      try {
        // Submit form using the contactService
        const result = await submitContactForm(form);

        // Form submitted successfully
        formSubmitted.value = true;

        // Reset form
        form.name = '';
        form.email = '';
        form.message = '';

        // Hide success message after a delay
        setTimeout(() => {
          formSubmitted.value = false;
        }, 5000);
      } catch (error) {
        // Handle error
        if (typeof error === 'object' && error !== null) {
          // If error contains validation errors
          if ('name' in error || 'email' in error || 'message' in error) {
            Object.assign(errors, error);
          } else if (error.message) {
            formError.value = error.message;
          } else {
            formError.value = 'An unexpected error occurred. Please try again later.';
          }
        } else {
          formError.value = 'An unexpected error occurred. Please try again later.';
        }
      } finally {
        // Reset submitting state
        isSubmitting.value = false;
      }
    };

    return {
      form,
      errors,
      isSubmitting,
      formSubmitted,
      formError,
      submitForm,
    };
  },
};
</script>
