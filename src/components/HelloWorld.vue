<script setup lang="ts">

defineProps<{ msg: string }>()

console.log(new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href)

</script>

<template>
  <h1>{{ msg }}</h1>

  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
