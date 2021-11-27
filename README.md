# vue3-summary

## 本地组件库调试

<!-- 会在本地的node_modules下面链接到全局，在链接到项 -->
npm link [组件库名]
npm link lego-bricks-wcc

npm i lego-bricks-wcc --loglevel verbose


## Composition Api
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
1. 是什么
   a. 生成值类型的响应式数据
   b. 可用于模板和reactive
   c. 通过.value修改值
2. 最佳使用方式
3. 进阶、深入理解