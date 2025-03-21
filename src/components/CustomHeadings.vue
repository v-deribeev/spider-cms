<template>
  <component :is="tag" :class="size">
    <slot />
  </component>
</template>

<script setup>
/**
 * @prop {'h1' | 'h2' | 'h3' | ...} [tag='h2'] - Semantic heading element type
 * @prop {'small' | 'medium' | 'large' | ...} [size='large'] - Semantic heading element size
 * extra props can be added to extended customization, i.e. font style
 * */
defineProps({
  tag: {
    required: true,
    type: String,
  },
  size: {
    type: String,
    default: 'medium',
  },
})
</script>

<style scoped lang="scss">
.small {
  font-size: 1.5rem;
}
.medium {
  font-size: 2rem;
}
.large {
  font-size: 3rem;
}
</style>
