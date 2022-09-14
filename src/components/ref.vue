<template>
  <div>
    <p>ref demo</p>
    <p>{{ ageRef }} {{ state.name }}</p>
    <p ref="elemRef">我是一行文字</p>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
export default {
  name: 'Ref',
  setup() {
    const ageRef = ref(20)
    const nameRef = ref('zhang')
    const elemRef = ref(null)
    const state = reactive({
      name: nameRef
    })
    setTimeout(() => {
      console.log('ageRef', ageRef.value)
      ageRef.value = 25
      nameRef.value = 'zl'
    }, 1000)

    onMounted(() => {
      console.log('ref template', elemRef.value, elemRef.value.innerHTML)
    })
    return {
      ageRef,
      state,
      elemRef
    }
  }
}
</script>

<style></style>
