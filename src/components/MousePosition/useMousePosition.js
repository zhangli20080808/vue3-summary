// import { reactive, onMounted, onUnmounted } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'

function useMousePosition () {
  const x = ref(0)
  const y = ref(0)

  function update (e) {
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
// }

export default useMousePosition
// export default useMousePosition2
