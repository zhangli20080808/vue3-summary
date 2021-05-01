<template>
  <div id="nav">
    <router-link to="/">Home1</router-link> |
    <router-link to="/about">About</router-link>
    <p>{{ selectId }}</p>
    <p>selectKeys: {{ selectKeys }}</p>
    <p>allTime : {{ allTime }}</p>
  </div>
  <router-view />
</template>
<script>
import { computed, reactive, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup (props, context) {
    // attrs slots emit  0 包装成{ value:0 }
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      selectId: 1,
      selectKeys: computed(() => {
        return [route.path]
      }),
      allTime: ref(store.getters.allTime) // ref 单独将某个属性包装成响应式的
    })

    // setTimeout(() => {
    //   state.selectId = 2
    // }, 1000)

    // watch(
    //   () => route.path,
    //   newValue => {
    //     state.selectKeys = [newValue]
    //   }, {
    //     immediate: true
    //   }
    // )

    return {
      ...toRefs(state) // 保证数据是响应式的 还有解构的功能,
    }
  }
}
</script>
