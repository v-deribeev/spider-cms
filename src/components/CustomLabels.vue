<template>
  <component :is="tag" :class="size">
    <slot />
  </component>
</template>
<script setup>
/**
 * @prop {'p' | 'span' | 'a' | ...} [tag='p'] - Semantic element type
 * @prop {'small' | 'medium' | 'large' | ...} [size='small'] - Semantic element size
 * extra props can be added to extended customization, i.e. href attribute, font styling, etc...
 * */
defineProps({
  tag: {
    type: String,
    default: 'p',
  },
  size: {
    type: String,
    default: 'medium',
  },
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
