/**
 * 思考两个地方
1. 为什么用Reflect.set、Reflect.get而不用target[name]这种形式？
主要是 - 可以在getter和setter间同步receiver(this指针)
 * @param obj
 * @returns
 */
function createReactive(obj: any) {
  return new Proxy(obj, {
    // get trap
    get: (target, name, receiver) => {
      console.log('get value', name)
      if (name === 'c') {
        return 'this is a proxy value'
      }
      // 注意：target 不是proxy对象  receiver代表proxy对象
      return Reflect.get(target, name, receiver)
    },
    // set trap
    set: (target, name, value, receiver): boolean => {
      if (!(name in target)) {
        return false
      }
      Reflect.set(target, name, value, receiver)
      console.log('set value to', value, receiver)
      return true
    }
  })
}
const o = createReactive({
  a: 1,
  b: 2,
  foo: function() {
    console.log('a is', this.a)
  },
  get bar(){
    return this.c
  }
})

o.a = 100
console.log(o.c)
// o.foo()
console.log(o.bar);


// 坑 Stack Overflow的原因就是因为receiver是proxy代理对象，地贵了
// const p = new Proxy({
// 	a : 1
// }, {
// get(target, property, receiver) {
// 		console.log("get trap", ...arguments)
// 		return Reflect.get(receiver, property,receiver)
// }
// })
// console.log(p.a)
