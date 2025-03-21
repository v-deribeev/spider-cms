<template>
  <a href="#main-content" class="skip-link">Skip to Main Content</a>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view id="main-content" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
//
</script>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 10px;
  background: #fff;
  color: #000;
  padding: 8px 12px;
  border-radius: 4px;
  z-index: 1000;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 10px; /* Make it visible when focused */
}
</style>
