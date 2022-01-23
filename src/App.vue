<template>
  <div>
    <Menu />
    <div class="container mx-auto mt-6">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
</script>