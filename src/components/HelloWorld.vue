<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)

const clickFn = () => {
  visible.value = !visible.value
}

</script>

<template>

<button @click="clickFn"> click </button>

</template>
