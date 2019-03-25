/*
  为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易
  不符合单一职责原则和开放封闭原则
  应用场景：JS事件不同浏览器兼容处理、同一方法可以传入不同参数兼容处理等
*/

class A {
  eat () {}
}
class  B {
  eat () {}
}
class C {
  eat () {
      const a = new A();
      const b = new B();
      a.eat();
      b.eat();
  }
}
// 跨浏览器事件侦听器
function addEvent(el, type, fn) {
  if (window.addEventListener) {
      el.addEventListener(type, fn, false);
  } else if (window.attachEvent) {
      el.attachEvent('on' + type, fn);
  } else {
      el['on' + type] = fn;
  }
}