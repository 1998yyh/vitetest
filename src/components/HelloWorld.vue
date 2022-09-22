<script setup lang="ts">
import Alert from './alert'
import { ref } from 'vue'

const visible = ref(true)
const title = ref('title')

const clickFn = () => {
  visible.value = !visible.value
}

</script>

<template>

<button @click="clickFn"> click </button>
<alert :title="title" :closable="true"/>

</template>
