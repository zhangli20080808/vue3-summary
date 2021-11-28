<template>
  <div id="nav">
    <router-link to="/">Home1</router-link>
    |
    <router-link to="/about">About</router-link>
    <p>{{ selectId }}</p>
    <p>selectKeys: {{ selectKeys }}</p>
    <p>allTime : {{ allTime }}</p>
    <p>逻辑复用</p>
    <MousePosition v-if="flag" />
    <button @click="changFlag">change flag</button>
    <div>
      <p>组件库测试</p>
      <l-text tag="h2" text="hello world"></l-text>
      <l-image
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-f3cb85d3ca5d58e80142a58e4cdb2c57_1200x500.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637318586&t=a745202ad33a3451a089c8fc190d13b6"
      ></l-image>
    </div>
    <div>ref</div>
    <Ref/>
    <div>toRef</div>
    <ToRef/>
    <div>toRefs</div>
    <ToRefs/>
    <div>生命周期</div>
    <CycleLife :msg='msg'/>
    <div>
      Watch
    </div>
    <Watch/>
  </div>
  <router-view />
</template>
<script>
import { computed, reactive, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MousePosition from './components/MousePosition'
import Ref from './components/Ref'
import ToRef from './components/ToRef'
import ToRefs from './components/ToRefs'
import CycleLife from './components/CycleLife'
import Watch from './components/Watch'

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
  },
  data () {
    return {
      flag: true,
      msg: 'zl'
    }
  },
  methods: {
    changFlag () {
      this.flag = !this.flag
    }
  },
  components: {
    MousePosition,
    Ref,
    ToRef,
    ToRefs,
    CycleLife,
    Watch
  }
}
</script>
