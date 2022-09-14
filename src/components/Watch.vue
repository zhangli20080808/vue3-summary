
<template>
  <div>watch {{numberRef}} - {{age}}</div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
export default {
  name: 'Watch',
  setup() {
    const numberRef = ref(2)
    const state = reactive({
      name: 'zk',
      age: 20
    })

    watchEffect(() => {
      // 初始化时，一定会执行一次？因为需要收集要监听的数据
      console.log('hello watchEffect')
    })
    watchEffect(() => {
      console.log('state.name', state.name)
    })
    watchEffect(() => {
      console.log('state.age', state.age)
    })
    watchEffect(() => {
      console.log('state.age', state.age)
      console.log('state.name', state.name)
    })
    setTimeout(() => {
      state.age = 1000
    }, 1500)
    setTimeout(() => {
      state.name = 'zls'
    }, 3000)

    // watch(numberRef, (newNumber, oldNumber) => {
    //   console.log('ref watch', newNumber, oldNumber)
    // }, {
    //   immediate: true // 初始化之前就监听，可选参数
    // })
    // setTimeout(() => {
    //   numberRef.value = 200
    // }, 1500)

    // // state出发改变
    // setTimeout(() => {
    //   state.age = 1000
    // }, 1500)
    // setTimeout(() => {
    //   state.name = 1000
    // }, 3000)
    // watch(() =>
    // // 第一个参数，确定要监听哪个属性
    //   state.age,
    // // 第二个参数，回调函数
    // (newAge, oldAge) => {
    //   console.log('state age watch', newAge, oldAge)
    // }, {
    //   // 第三个参数，配置项
    //   immediate: true
    //   // deep: true
    // })
    return {
      numberRef,
      ...toRefs(state)
    }
  }
}
</script>

<style>

</style>
