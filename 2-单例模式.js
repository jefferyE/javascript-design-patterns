/* 
  保证一个类仅有一个实例，并提供一个访问它的全局访问点，一般登录、购物车等都是一个单例。
  应用场景：JQuery中的$、Vuex中的Store、Redux中的Store等
*/

 // 单例对象
 class SingleObject {
  login () {}
}
// 访问方法
SingleObject.getInstance = (function () {
  let instance;
  return function () {
      if (!instance) {
          instance = new SingleObject();
      }
      return instance;
  }
})()
const obj1 = SingleObject.getInstance();
const obj2 = SingleObject.getInstance();
console.log(obj1 === obj2); // true
