import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Tabs',
  props: ['defaultActiveKey'],
  emits: ['change'],
  setup(props, context) {
    // 获取插槽内容
    const children = context.slots.default()
    const titles = children.map(panel => {
      const { key, title } = panel.props || {}
      return {
        key,
        title
      }
    })
    const activeKey = ref(props.defaultActiveKey)

    function changeKey(key) {
      activeKey.value = key
      context.emit('change', key)
    }
    const render = () => {
      return (
        <>
          {titles.map(titleInfo => {
            const { key, title } = titleInfo
            return (
              <button
                key={key}
                style={{
                  color: activeKey.value === key ? 'blue' : '#333'
                }}
                onClick={() => changeKey(key)}
              >
                {title}
              </button>
            )
          })}
          <div>
            {children.filter(panel => {
              const { key } = panel.props
              if (key === activeKey.value) return true
              return false
            })}
          </div>
        </>
      )
    }
    return render
  }
})
