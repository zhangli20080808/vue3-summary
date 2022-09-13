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

*/

