<script setup lang="ts">

const props = defineProps({
  text: String,
  msg: String,
  age: Number
})

console.log(props)

const consoleProp = () => {
  console.log(props)
}

</script>

<template>

<button @click="consoleProp"> consoleProp </button>

</template>
