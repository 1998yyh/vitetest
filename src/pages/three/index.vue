<template>
  <div class="demo"></div>
</template>

<script lang="ts">
import ThreeJs from './index'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'Demo01',
  props: {},
  setup() {
    onMounted(() => {
      const three = new ThreeJs()
      console.log(three)
    })
  }
})
</script>
<style scoped lang="scss"></style>
