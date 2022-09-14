import { defineComponent } from 'vue'

/**
defineComponent
1. 接受一个setup函数
2. 传入组件的配置
 */
export default defineComponent({
  props: ['a'],
  name: 'child',
  setup(props, context) {
    return () => {
      return <div>{props.a} - child</div>
    }
  }
})
