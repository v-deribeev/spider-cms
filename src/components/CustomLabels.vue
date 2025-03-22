<template>
  <component :is="tag" :class="size" :aria-label="ariaLabel">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/**
 * CustomLabels Component
 *
 * A flexible text component that can render as different HTML elements
 * with predefined size variants. Useful for consistent typography across the app.
 *
 * @example
 * ```vue
 * <CustomLabels tag="p" size="large">
 *   {{ $t('some.translation.key') }}
 * </CustomLabels>
 * ```
 */
const props = defineProps({
  /** HTML element to render */
  tag: {
    type: String,
    default: 'p',
    validator: (value) => ['p', 'span', 'a', 'div', 'label'].includes(value),
  },
  /** Size variant for text */
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  /** Accessibility label for screen readers */
  ariaLabel: {
    type: String,
    default: '',
  },
})

const ariaLabel = computed(() => {
  if (!props.ariaLabel) return ''
  return t(props.ariaLabel)
})
</script>

<style scoped lang="scss">
.small {
  font-size: 0.75rem;
}
.medium {
  font-size: 1rem;
}
.large {
  font-size: 1.25rem;
}
</style>
