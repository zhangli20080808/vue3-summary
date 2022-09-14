// import { reactive, onMounted, onUnmounted } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'

function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  // 修改方式 对应变量的.value属性，是稍微有点反人类的操作
  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    console.log('mousemove', 'onMounted')
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    console.log('mousemove', 'onUnmounted')
    window.removeEventListener('mousemove', update)
  })

  return {
    x,
    y
  }
}

/**
 * reactive 响应一个对象
 * @returns
 */
// function useMousePosition2 () {
//   const state = reactive({
//     x: 0,
//     y: 0
//   })

//   function update (e) {
//     state.x = e.pageX
//     state.y = e.pageY
//   }

//   onMounted(() => {
//     console.log('mousemove', 'onMounted')
//     window.addEventListener('mousemove', update)
//   })

//   onUnmounted(() => {
//     console.log('mousemove', 'onUnmounted')
//     window.removeEventListener('mousemove', update)
//   })

//   return state
//   return toRefs(state)  通过 toRefs 将state打包返回，外部仍然是可以使用结构的方式取值的
//   两种方式 1. 通过 ref 去定义  2. 通过 toRefs去返回 注意：合成函数一般返回的都是一堆ref
// }

export default useMousePosition
// export default useMousePosition2
