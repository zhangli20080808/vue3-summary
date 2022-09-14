
<template>
  <div>
    <p>toRefs demo</p>
    <p> {{name}} -{{ age }}</p>
  </div>
</template>

<script>
import { toRefs, reactive } from 'vue'
export default {
  name: 'ToRefs',
  setup() {
    const state = reactive({
      name: 'zl',
      age: 20
    })
    // 将响应式对象，变成普通对象，
    // const stateRefs = toRefs(state)
    // const { age: ageRef, name: nameRef } = stateRefs 每个属性，都是ref对象
    // return {
    //   ageRef,
    //   nameRef
    // }
    setTimeout(() => {
      state.age = 25
    }, 1500)

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style></style>
