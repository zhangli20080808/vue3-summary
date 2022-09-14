import { defineComponent, reactive, toRef } from 'vue'
/**
toRef和toRefs 这两个函数可以将值转换为`ref`
 */
export default defineComponent({
  setup() {
    const state = reactive({
      a: 1,
      b: '-'
    })
    const aRef = toRef(state, 'a')
    const bRef = toRef(state, 'b')
    // 等价于
    // const refs = toRefs(state)
    // const aRef === refs.a
    // const bRef === refs.b
    return () => {
      return (
        <>
          <h1>aRef : {aRef.value}</h1>
          <h1>aRef : {aRef}</h1>
          <h1>bRef : {bRef.value}</h1>
          <h1>bRef : {bRef}</h1>
          <button onClick={() => state.a++}>state.a++</button>
          <button onClick={() => aRef.value++}>aRef.a++</button>
        </>
      )
    }
  }
})

// reactive会自动将ref拆包。

// const r = reactive({
//   a : ref(0)
// })
// // 等价于：
// const r = reactive({a : 0})
