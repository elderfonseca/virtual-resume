<!-- src/components/common/Button.vue -->
<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :target="isLink && isExternal ? '_blank' : undefined"
    :rel="isLink && isExternal ? 'noopener noreferrer' : undefined"
    :download="isDownload ? '' : undefined"
    :type="isLink ? undefined : type"
    :class="[
      'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      fullWidth ? 'w-full' : '',
    ]"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="!disabled && $emit('click', $event)"
  >
    <span v-if="$slots.icon && iconPosition === 'left'" class="mr-2">
      <slot name="icon"></slot>
    </span>
    <span>
      <slot></slot>
    </span>
    <span v-if="$slots.icon && iconPosition === 'right'" class="ml-2">
      <slot name="icon"></slot>
    </span>
    <span v-if="isLink && isExternal" class="sr-only">{{ externalLinkLabel }}</span>
  </component>
</template>

<script>
import { computed } from 'vue';
import { useLocale } from '@/composables/useLocale';

/**
 * Reusable button component that can be used as a button or link
 * Supports different variants, sizes, and states
 */
export default {
  name: 'AppButton',

  props: {
    /**
     * Button variant controls the appearance
     * Available options: primary, secondary, outline, text
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value),
    },

    /**
     * Button size
     * Available options: sm, md, lg
     */
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },

    /**
     * If true, button will fill the width of its container
     */
    fullWidth: {
      type: Boolean,
      default: false,
    },

    /**
     * If true, button is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * HTML button type
     * Only applies when component is rendered as a button
     */
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },

    /**
     * URL for link buttons
     * If provided, button will render as an <a> tag
     */
    href: {
      type: String,
      default: '',
    },

    /**
     * If true, link will open in a new tab
     * Only applies when href is provided
     */
    isExternal: {
      type: Boolean,
      default: false,
    },

    /**
     * If true, link will be treated as a download
     * Only applies when href is provided
     * and isExternal is true
     */
    isDownload: {
      type: Boolean,
      default: false,
    },

    /**
     * Position of the icon relative to the text
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value),
    },
  },

  emits: ['click'],

  setup(props) {
    // Use locale composable for translations
    const { t } = useLocale();

    /**
     * Determine if the button should be rendered as a link
     */
    const isLink = computed(() => Boolean(props.href));

    /**
     * Classes for button size
     */
    const sizeClasses = computed(() => {
      const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };

      return sizes[props.size] || sizes.md;
    });

    /**
     * Classes for button variant
     */
    const variantClasses = computed(() => {
      const variants = {
        primary:
          'bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)]/90 active:bg-[var(--color-primary)]/80',
        secondary:
          'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]/90 active:bg-[var(--color-bg-secondary)]/80',
        outline:
          'bg-transparent border-2 border-primary text-primary hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/20',
        text: 'bg-transparent text-primary hover:underline active:bg-[var(--color-primary)]/10',
      };

      return variants[props.variant] || variants.primary;
    });

    /**
     * Screen reader text for external links
     */
    const externalLinkLabel = computed(() => t('accessibility.externalLink'));

    return {
      isLink,
      sizeClasses,
      variantClasses,
      externalLinkLabel,
    };
  },
};
</script>
