import { defineComponent, ref } from 'vue'
import ChildComp from './ChildComp'
/**
defineComponent
1. 接受一个setup函数
2. 传入组件的配置
 */
export default defineComponent(() => {
  const counter = ref(110)
  const render = () => (
    <>
      {counter.value}
      <ChildComp a={counter.value + 100} />
    </>
  )
  return render
})
