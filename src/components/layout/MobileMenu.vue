<!-- src/components/layout/MobileMenu.vue -->
<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-10 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-10 opacity-0"
  >
    <div v-if="show" class="md:hidden fixed inset-0 z-40 flex flex-col" @keydown.esc="$emit('close')" ref="menuRef">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-[var(--color-bg-primary)]/90 backdrop-blur-md" @click="$emit('close')"></div>

      <!-- Mobile menu content -->
      <div class="relative z-10 mt-16 p-6 flex flex-col h-full overflow-y-auto">
        <ul class="flex flex-col gap-6 items-center text-xl" ref="menuItemsRef">
          <li v-for="item in navigation" :key="item.id" @click="$emit('close')">
            <NavLink :href="`#${item.id}`" :text="t(`nav.${item.id}`)" :is-active="false" />
          </li>
        </ul>

        <div class="flex justify-center mt-8">
          <LanguageSwitcher />
        </div>

        <!-- Social links -->
        <div class="mt-auto pt-8 flex justify-center gap-6" ref="socialLinksRef">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-text-secondary hover:text-[var(--color-accent)] transition-colors"
            :aria-label="link.name"
          >
            <component :is="getSocialIcon(link.icon)" class="h-6 w-6" />
            <span class="sr-only">{{ link.name }}</span>
          </a>
        </div>

        <!-- Close button -->
        <button
          class="absolute top-4 right-4 text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
          @click="$emit('close')"
          :aria-label="t('accessibility.closeMenu')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, watch, h } from 'vue';
import NavLink from '@/components/common/NavLink.vue';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import { useLocale } from '@/composables/useLocale';
import { useAnimations } from '@/composables/useAnimations';
import { SOCIAL_LINKS } from '@/config/constants';
import { createFocusTrap } from '@/utils/accessibilityUtils';

/**
 * Mobile menu component that appears on small screens
 * Displays navigation links and language switcher
 */
export default {
  name: 'MobileMenu',

  components: {
    NavLink,
    LanguageSwitcher,
  },

  props: {
    /**
     * Navigation items to display
     */
    navigation: {
      type: Array,
      required: true,
    },

    /**
     * Whether the menu is visible
     */
    show: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    // Use composables
    const { t } = useLocale();
    const { staggerAnimation } = useAnimations();

    // References to elements for animation
    const menuRef = ref(null);
    const menuItemsRef = ref(null);
    const socialLinksRef = ref(null);

    // Social links from constants
    const socialLinks = SOCIAL_LINKS;

    // Focus trap to keep keyboard focus within menu when open
    let removeFocusTrap = null;

    /**
     * Get the appropriate icon component for a social platform
     */
    const getSocialIcon = (iconName) => {
      // LinkedIn icon
      if (iconName === 'linkedin') {
        return {
          render() {
            return h(
              'svg',
              {
                fill: 'currentColor',
                viewBox: '0 0 24 24',
                'aria-hidden': 'true',
              },
              [
                h('path', {
                  d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                }),
              ],
            );
          },
        };
      }

      // GitHub icon
      if (iconName === 'github') {
        return {
          render() {
            return h(
              'svg',
              {
                fill: 'currentColor',
                viewBox: '0 0 24 24',
                'aria-hidden': 'true',
              },
              [
                h('path', {
                  'fill-rule': 'evenodd',
                  d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
                  'clip-rule': 'evenodd',
                }),
              ],
            );
          },
        };
      }

      // Default icon
      return {
        render() {
          return h('svg', {
            fill: 'currentColor',
            viewBox: '0 0 24 24',
            'aria-hidden': 'true',
          });
        },
      };
    };

    // Set up animations when menu is shown
    watch(
      () => props.show,
      (isVisible) => {
        if (isVisible) {
          // Apply staggered animations to menu items
          if (menuItemsRef.value) {
            const menuItems = menuItemsRef.value.querySelectorAll('li');
            staggerAnimation(menuItems, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: 50,
            });
          }

          // Apply animation to social links
          if (socialLinksRef.value) {
            const socialLinks = socialLinksRef.value.querySelectorAll('a');
            staggerAnimation(socialLinks, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: 30,
              duration: 500,
            });
          }

          // Set up focus trap
          if (menuRef.value) {
            removeFocusTrap = createFocusTrap(menuRef.value, () => {
              emit('close');
            });
          }
        } else {
          // Clean up focus trap
          if (removeFocusTrap) {
            removeFocusTrap();
            removeFocusTrap = null;
          }
        }
      },
    );

    // Clean up when component is unmounted
    onMounted(() => {
      return () => {
        if (removeFocusTrap) {
          removeFocusTrap();
        }
      };
    });

    return {
      menuRef,
      menuItemsRef,
      socialLinksRef,
      socialLinks,
      getSocialIcon,
      t,
    };
  },
};
</script>
