<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['custom-btn', variant, size, customCardClass, { disabled, loading }]"
    :aria-label="ariaLabel"
  >
    <div v-if="!loading" class="button-content">
      <slot name="prependIcon" />
      <slot name="content">{{ label }}</slot>
      <slot name="appendIcon" />
    </div>
    <span v-else class="loader" :aria-label="$t('common.loading')" aria-hidden="true" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/**
 * CommonButton Component
 *
 * A reusable button component with various styles, sizes, and states.
 * Supports icons, loading state, and accessibility features.
 *
 * @example
 * ```vue
 * <CommonButton
 *   label="Click me"
 *   variant="primary"
 *   size="medium"
 *   :loading="isLoading"
 *   @click="handleClick"
 * >
 *   <template #prependIcon>
 *     <q-icon name="add" />
 *   </template>
 * </CommonButton>
 * ```
 */
const props = defineProps({
  /** Text content of the button */
  label: {
    type: [String, Number],
    default: '',
  },
  /** Accessibility label for screen readers */
  arias: {
    type: String,
    default: '',
  },
  /** HTML button type */
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  /** Visual style variant */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'card'].includes(value),
  },
  /** Size variant */
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  /** Custom CSS class to override default styles */
  customClass: {
    type: String,
    default: '',
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** Loading state */
  loading: {
    type: Boolean,
    default: false,
  },
})

const customCardClass = computed(
  () => props.customClass || (props.variant === 'card' ? 'card' : ''),
)

const ariaLabel = computed(() => {
  if (props.loading) return t('common.loading')
  if (props.disabled) return t('common.error')
  return props.arias || props.label
})
</script>

<style scoped lang="scss">
.custom-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: bold;
  transition:
    background 0.3s ease,
    opacity 0.3s ease;
  border-radius: 6px;

  &:hover {
    opacity: 0.9;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.loading {
    position: relative;
    pointer-events: none;
  }
}

.button-content {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* Variants */
.primary {
  background: #007bff;
  color: white;
}

.secondary {
  background: #6c757d;
  color: white;
}

/* Sizes */
.small {
  font-size: 12px;
  padding: 6px 12px;
}

.medium {
  font-size: 14px;
  padding: 10px 16px;
}

.large {
  font-size: 16px;
  padding: 14px 20px;
}

/* Card Style */
.card {
  width: 32px;
  height: 24px;
  border-radius: 5px;
  border: none;
}

/* Loader */
.loader {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
