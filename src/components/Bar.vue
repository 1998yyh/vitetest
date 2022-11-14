<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

console.log(useRoute())
console.log(useRouter())

const visible = ref(true)

const clickFn = () => {
  visible.value = !visible.value
}

</script>

<template>

<button @click="clickFn"> click </button>

</template>
