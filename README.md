## vue3 整体 vue-next

1. vue3 可以说对 vue 的程序应该如何写，重新下了定义

- JSX
- Typescript
- Composition api
- reativity

```ts
// 在ts环境下，sfc需要一个shim文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare的作用 - 告诉编译器当遇到*.vue文件的时候，ts编译时先将他们当做一个会
export default Component的类型

如果使用ts，就不用shim文件了
从架构设计角度来说，项目概念越多，意味着设计越差

另外，在sfc中需要写template和script标签，会伴随缺点
一、不够灵活
1. 设计不够灵活 需要 v-if/v-show/v-for -》用户可以少记忆一些东西
2. 关注点被分离 -> 模版也好，script也好，都是解决某个关注点的一部分，在sfc中被强行分离。可以思考一个两者都很长的场景
二、ts的类型检查
函数组件可以最大程度的服用ts的类型检查 - 比如检查属性

比如 useMousePosition 在业务代码中使用的时候，其实是没有逻辑的，完全就是渲染逻辑
根本就不用区分sfc，直观感受
1. 逻辑的集中管理
2. 强大的封装能力
3. 不用再去记忆太多东西
```

## 本地组件库调试

<!-- 会在本地的node_modules下面链接到全局，在链接到项 -->

npm link [组件库名]
npm link lego-bricks-wcc

npm i lego-bricks-wcc --loglevel verbose

## Composition Api 生命周期

## Composition Api

a. 提升了组合能力（搭积木的能力） - 自定义 Composition api
b. 提供了 Reactive Programming
c. 提供了函数式 - 简化了 api 的设计

1. 带来了什么？针对复杂项目
   a. 更好的代码组织 - 代码乱->清晰性的体现
   b. 更好的逻辑复用
2. Composition Api 和 Options Api 如何选择
   a. 不建议公用，会引起混乱
   b. 小的项目，逻辑简单的，仍然可以使用 Options Api。中大型，逻辑复杂的使用，用 Composition Api
   c. Composition Api 是一个高阶技巧，不是基础必会的，主要是为了解决复杂业务逻辑而设计的，就向 Hooks 在 react 中的定位，都不会影响框架的一些基础使用
3. 更好的类型推导

[可复用&组合](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#watch-%E5%93%8D%E5%BA%94%E5%BC%8F%E6%9B%B4%E6%94%B9)

## Composition Api 实现逻辑复用

1. 抽离逻辑代码到一个函数
2. 函数命令约定为 useXxx 格式(react hooks 也是)
3. 在 setup 中引用 useXxx 函数 - 尽量使用 ref 和 toRefs 返回数据，不要用 reactive 的原始数据返回

## Reactive 的值： Ref 和 Reactive

一个值如果是 Reactive 的值，那个他应该具有什么特征呢？
应该具备两个方面的特性

1. 它可以通知(trigger - 触发) - vue 的更新，vue 做其他标准的行为，完成自定义的行为
2. 它可以监听(track - 跟踪) - vue 发生的变化(依赖)

## 如何理解 ref toRef toRefs

### ref

1. 是什么 - 是一个工厂方法，本质是创建爱你一个 Ref 对象，ref 的目标是管理值(RefImpl)
   a. 生成值类型的响应式数据
   b. 可用于模板和 reactive
   c. 通过.value 修改值
2. 最佳使用方式

```jsx
// setup 帮助初始化组件，可以返回一个render函数，render函数的返回是vnode
// jsx的语法div会被编译成createVNode
import { ref } from 'vue'
export default {
  setup () {
   const msg = ref('hello')
   return ()=> <div>{msg.value}</div>
}
function trigger() {}
function track() {}
function createRef<T>(val: T) {
  let _val: T = val;
  const refObj = {
    set value(v: T) {
      console.log('setter called');
      _val = v;
      if(_val !== val){
        trigger();
      }
    },
    get value() {
      console.log('getter called');
      track();
      return _val;
    }
  };
  return refObj;
}
const a = createRef(0);
a.value = 10;
a.value++;
console.log(a.value);
/**
当set的时候 trigger 当get的时候，track？
为什么需要track？
1. 一个ref可以给多个组件用(也就是一个响应式值可以对应多个组件) - 因此依赖关系是不确定的。
什么时候将组件和响应式的值绑定起来呢？vue的解决方案就是在get的时候进行绑定。就好比props传递过来msg属性，此属性
没有在组件中使用，当msg发生变化，组件也不应该更新，反之同理
2. track其实也是在收集依赖，和vue2差不多感觉，defineProperty.就比如只set，不get，这个组件就没必要作为依赖。读取值的时候，才能证明组件的视图依赖这个对象
  为什么作为依赖？
  a. 因为vue组件依赖ref，因此是ref的依赖
  b. ref的依赖应该是一个数组，集合更好理解
3. 为什么不能再ref的构造函数中确定依赖...？其实很简单，因为真正创建和使用它的可能不是一个地方
4. 为什么不是vue来检查依赖，而是ref track 更新依赖？主要是 reactive 的值在相应vue环境的变化，通过观察，发现vue在使用，那就更新了
*/
```

3. 进阶、深入理解

```jsx
// demo 简单原理梳理
// 1. 在组件初始化的时候，执行setup,render在mounted之后执行，每次渲染都会执行
// 2. 点击事件，触发trigger，通知vue更新，const counter = ref(0)不会再执行，重新渲染再拿一次结果，拿到value的新值，去渲染
export default {
  setup() {
    const counter = ref(0)
    return () => (
      <div>
        {counter.value}
        <button
          onClick={() => {
            counter.value++
          }}
        >
          add
        </button>
      </div>
    )
  }
}
```

### Reative 是一个代理对象 - 代理对象 proxy，复习 proxy

```tsx
const state = reactive({
    counter : 0
})
state.counter ++

// 上面的程序会触发代理对象的`getter` 然后`setter` ，因为`++` 不是`atomic` 原子操作
// 具体的和`ref` 一致, Reactive也会在getter中track，在setter中trigger
get(..) {
    track()
    return Reflect.get(...)
},
set(..) {
    trigger()
    Reflect.set(...)
}
```

### toRef

1. 针对一个响应式对象(reactive 封装)的 props 属性
2. 创建一个 ref，具有响应式
3. 两者保持引用关系

### toRefs

1. 讲响应式对象(reactive 封装的)转化为普通对象
2. 对应的每个 prop 属性都是对应的 ref
3. 两者保持引用关系

### ref、toRef、toRefs 的最佳使用方式

1. 用 reactive 做对象的响应式，用 ref 做值类型的响应式
2. setup 中返回 toRefs(state),或者 toRef(state,'xxx')
3. ref 的变量命名都用 xxxRef
4. 合成函数返回响应式对象，使用 toRefs，方便解构

```js
// 合成函数返回响应式对象
function useCommonX() {
  const state = reactive({
    x: 1,
    y: 2
  })
  // 逻辑运行状态
  // 返回时转换为ref
  return toRefs(state)
}
export default {
  setup() {
    // 可以在不丢失响应式的情况下破坏解构
    const { x, y } = useCommonX()
    return {
      x,
      y
    }
  }
}
```

## 深入学习？

1. 为何需要 ref？
   a. 返回值类型，会丢失响应式
   b. 比如在 setup、computed、合成函数中，都有可能返回值类型。
   c. Vue 如果不定义 ref，用户将自造 ref，返回混乱
2. 为什么需要.value?
   a. ref 是一个对象(为了不丢失响应式，使用对象)，value 存储值 - 因为是一个对象，我们希望使用 value 属性去存储这些值
   b. 通过.value 属性的 get 和 set 实现响应式
   c. 用于模板、reactive 时，不需要.value,其他情况都需要

   如果不用.value，直接时值类型的话，里面的返回值和 computed 返回的结果就没有任何关联关系了

```js
// .value 可以实现响应式，保持响应式
function computed(getter) {
  const ref = {
    value: null
  }
  setTimeout(() => {
    ref.value = getter()
  }, 1000)
  return ref
}
const a = computed(() => 100)
a.value = 100
```

3. 为什么需要 toRef toRefs？

- 初衷：不丢失响应式的情况下，把对象数据进行 分解、扩散(不使用对象.的方式)
- 前提：针对的是响应式对象(reactive 对象封装的)非普通对象
- 注意：不创造响应式，而是延续响应式

## Ref 和 Reactive

它们都是`vue` 提供的`reactive` 值。 Ref 维护一个值/对象，Reactive 维护一个对象的所有成员。

```tsx
const obj = ref({
  a: 1,
  b: 2
})
obj.value.a++ //不会触发重绘
obj.value = { ...obj.value, a: 1 } // 触发重绘
const obj1 = reactive({
  a: 1,
  b: 2
})
obj1.a++ // 触发重绘
```
## toRef 和 toRefs ，这两个函数可以将值转换为`ref` 

```tsx
import { defineComponent, reactive, toRef, toRefs } from "vue"
export default defineComponent({
	setup() {
		const state = reactive({
			a : 1,
			b : '-' 
		})
		const aRef = toRef(state, 'a')
		const bRef = toRef(state, 'b')
		// 等价于
		//const refs = toRefs(state)
		//const aRef === refs.a
		//const bRef === refs.b
		return () => {
			return <>
				<h1>aRef : {aRef.value}</h1>
				<h1>aRef : {aRef}</h1>
				<h1>bRef : {bRef.value}</h1>
				<h1>bRef : {bRef}</h1>
				<button onClick={() => state.a++}>state.a++</button>
				<button onClick={() => aRef.value++}>aRef.a++</button>
			</>
		}
	}
})
```

## computed

- computed 会根据依赖重算
- 提供了基于依赖的缓存

## watch 和 watchEffect 的区别

- 两者都可以监听 data 属性变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中的属性，自动监听其变化

## jsx 和 template 的区别

1. 语法上不同，本质差不多。都会编译成 js 代码(render 函数)
2. 具体：比如，插值，自定义组件，属性和事件，条件和循环。template 只能嵌套简单的 js 表达式，其他的需要指令比如 v-if
3. jsx 已经脱离 react 成为 ES 的规范语法的一部分，vue 还是自己的规范

## jsx 与 slot

## jsx 实现作用域 slot

```jsx
```

## script setup 特性
主要是 代码中 >3.2.0

```vue
<!--  defineProps -->
<script setup>
  import { ref } from 'vue';
  // 定义属性
  const props = defineProps({
    msg: String,
    age: Number
  });

  const count = ref(0);
<script>
<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is {{ count }}</button>
</template>
```

## Effect Scope

副作用范围（Effect Scope)用于批量回收定义的副作用。
