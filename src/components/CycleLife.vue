<template>
  <div>life-cycle</div>
</template>

<script>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated } from 'vue'
export default {
  // setup 等价于beforeCreate和created，统一代理 都有对应的生命中周期
  props: {
    msg: String
  },
  setup() {
    console.log('setup')
    onBeforeMount(() => { console.log('onBeforeMount') })
    onMounted(() => { console.log('onMounted') })
    onBeforeUpdate(() => { console.log('onBeforeUpdate') })
    onUpdated(() => { console.log('onUpdated') })
    onBeforeUnmount(() => { console.log('onBeforeUnmount') })
    onUnmounted(() => { console.log('onUnmounted') })
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mount() {
    console.log('mount')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  // beforeDestroy 改名
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  // destroy 改名
  onUnmounted() {
    console.log('onUnmounted')
  }

}
</script>

<style>

</style>
