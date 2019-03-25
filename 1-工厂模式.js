/*
  常见的实例化对象模式，工厂模式就相当于创建实例对象的new，提供一个创建对象的接口
  应用场景：JQuery中的$、Vue.component异步组件、React.createElement等
*/

 // 某个需要创建的具体对象
 class Product {
  constructor (name) {
      this.name = name;
  }
  init () {}
}
// 工厂对象
class Creator {
  create (name) {
      return new Product(name);
  }
}
const creator = new Creator();
const p = creator.create(); // 通过工厂对象创建出来的具体对象

