## vue3整体 vue-next
1. vue3可以说对vue的程序应该如何写，重新下了定义
* JSX 
* Typescript
* Composition api
* reativity
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

## Composition Api生命周期


## Composition Api
a. 提升了组合能力（搭积木的能力） - 自定义Composition api
b. 提供了 Reactive Programming
c. 提供了函数式 - 简化了api的设计

1. 带来了什么？针对复杂项目
   a. 更好的代码组织 - 代码乱->清晰性的体现
   b. 更好的逻辑复用
2. Composition Api 和 Options Api 如何选择 
   a. 不建议公用，会引起混乱
   b. 小的项目，逻辑简单的，仍然可以使用 Options Api。中大型，逻辑复杂的使用，用Composition Api
   c. Composition Api 是一个高阶技巧，不是基础必会的，主要是为了解决复杂业务逻辑而设计的，就向Hooks在react中的定位，都不会影响框架的一些基础使用
3. 更好的类型推导

[可复用&组合](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#watch-%E5%93%8D%E5%BA%94%E5%BC%8F%E6%9B%B4%E6%94%B9)

## Composition Api实现逻辑复用
1. 抽离逻辑代码到一个函数
2. 函数命令约定为 useXxx 格式(react hooks 也是) 
3. 在setup中引用 useXxx 函数 - 尽量使用ref和toRefs返回数据，不要用 reactive的原始数据返回

## 如何理解 ref toRef toRefs

### ref
1. 是什么
   a. 生成值类型的响应式数据
   b. 可用于模板和reactive
   c. 通过.value修改值
2. 最佳使用方式
3. 进阶、深入理解

### toRef
1. 针对一个响应式对象(reactive封装)的props属性
2. 创建一个ref，具有响应式
3. 两者保持引用关系

### toRefs
1. 讲响应式对象(reactive封装的)转化为普通对象
2. 对应的每个prop属性都是对应的ref
3. 两者保持引用关系

### ref、toRef、toRefs的最佳使用方式
1. 用 reactive 做对象的响应式，用ref做值类型的响应式
2. setup中返回 toRefs(state),或者toRef(state,'xxx')
3. ref的变量命名都用xxxRef
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
  setup(){
    // 可以在不丢失响应式的情况下破坏解构
    const { x, y} = useCommonX()
    return {
      x,y
    }
  }
}
```
## 深入学习？
1. 为何需要ref？
   a. 返回值类型，会丢失响应式
   b. 比如在setup、computed、合成函数中，都有可能返回值类型。
   c. Vue如果不定义 ref，用户将自造ref，返回混乱
2. 为什么需要.value?
   a. ref是一个对象(为了不丢失响应式，使用对象)，value存储值 - 因为是一个对象，我们希望使用value属性去存储这些值
   b. 通过.value属性的 get 和 set 实现响应式
   c. 用于模板、reactive时，不需要.value,其他情况都需要

   如果不用.value，直接时值类型的话，里面的返回值和computed返回的结果就没有任何关联关系了
```js
// .value 可以实现响应式，保持响应式
function computed (getter) {
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
* 初衷：不丢失响应式的情况下，把对象数据进行 分解、扩散(不使用对象.的方式)
* 前提：针对的是响应式对象(reactive对象封装的)非普通对象
* 注意：不创造响应式，而是延续响应式

## watch和watchEffect的区别
* 两者都可以监听data属性变化
* watch需要明确监听哪个属性
* watchEffect会根据其中的属性，自动监听其变化


