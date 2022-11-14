<template>
  <button @click="increment">click</button>
  <p>count:{{count}}</p>
  {{x}}
  <my-button v-bind="obj"></my-button>
</template>

<script setup lang="ts">
import MyButton from '@/components/Button.vue'

const count = ref(0)

const obj = reactive<Record<string, any>>({

})

const increment = () => count.value++

onMounted(() => {
  console.log(count.value)
})

watch(count, (val) => {
  console.log('watch', val)
}, {
  immediate: true
})

watchEffect(() => {
  console.log('watcheffect', count.value)
})

const x = computed(() => {
  console.log('computed')
  return count.value + 1
})
console.log('x', x.value)
</script>
