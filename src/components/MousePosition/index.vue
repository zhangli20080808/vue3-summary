<template>
  <div>
    mouse: {{ x }} {{ y }}
  </div>
</template>

<script>
import useMousePosition from './useMousePosition'

export default {
  name: 'mousePosition',
  setup() {
    const { x, y } = useMousePosition()
    return {
      x,
      y
    }
  }
}
</script>
