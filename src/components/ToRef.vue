
<template>
  <div>
    <p>toRef demo</p>
    <p>{{ ageRef}} - {{state.name}} -{{ state.age }}</p>
  </div>
</template>

<script>
import { toRef, reactive } from 'vue'
export default {
  name: 'ToRef',
  setup() {
    const state = reactive({
      name: 'zl',
      age: 20
    })
    const ageRef = toRef(state, 'age')
    setTimeout(() => {
      state.age = 25
    }, 1500)
    setTimeout(() => {
      ageRef.value = 30
    }, 3000)
    return {
      ageRef,
      state
    }
  }
}
</script>

<style></style>
