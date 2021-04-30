<template>
  <div class="home">
    <a-button type="primary">Primary</a-button>
    <p>{{ selectId }}</p>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  setup (props, context) { // attrs slots emit
    const state = reactive({
      selectId: 1
    })
    setTimeout(() => {
      state.selectId = 2
    }, 1000)
    return {
      ...toRefs(state) // 保证数据是响应式的 还有解构的功能
    }
  }
}
</script>
