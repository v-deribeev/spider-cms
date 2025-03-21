<template>
  <button
    :type
    :disabled="disabled || loading"
    :class="['custom-btn', variant, size, customCardClass, { disabled, loading }]"
    :aria-label="arias"
  >
    <div v-if="!loading">
      <template v-if="$slots.prependIcon">
        <slot name="prependIcon">
          <!-- Place for Icon BEFORE content -->
        </slot>
      </template>
      <slot name="content"> {{ label }} </slot>
      <template v-if="$slots.appendIcon">
        <slot name="appendIcon">
          <!-- Place for Icon AFTER content -->
        </slot>
      </template>
    </div>
    <span v-else class="loader"></span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

/**
 * @prop {String} label - Text inside the button
 * @prop {String} [arias="does x"] - Improves accessibility
 * @prop {'button' | 'submit' | 'reset'} [type='button'] - Type of the button
 * @prop {'primary' | 'secondary' | 'card'} [variant='primary'] - Defines button style
 * @prop {'small' | 'medium' | 'large'} [size='medium'] - Button size
 * @prop {Boolean} [disabled=false] - Disables the button
 * @prop {Boolean} [loading=false] - Shows a loading state
 * @prop {String} [customClass] - Custom styling override
 */
const props = defineProps({
  label: {
    type: [String, Number],
    default: '',
  },
  arias: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'medium',
  },
  customClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const customCardClass = computed(() => {
  if (props.customClass) return props.customClass
  return props.variant === 'card' ? 'card' : ''
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

/* Primary Variant */
.custom-btn.primary {
  background: #007bff;
  color: white;
}

/* Secondary Variant */
.custom-btn.secondary {
  background: #6c757d;
  color: white;
}

/* Sizes */
.custom-btn.small {
  font-size: 12px;
  padding: 6px 12px;
}

.custom-btn.medium {
  font-size: 14px;
  padding: 10px 16px;
}

.custom-btn.large {
  font-size: 16px;
  padding: 14px 20px;
}

/* Card Styles */
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
