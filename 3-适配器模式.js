/*
  用来解决两个接口不兼容问题，由一个对象来包装不兼容的对象，比如参数转换，允许直接访问
  应用场景：Vue的computed、旧的JSON格式转换成新的格式等
*/

class Adapter {
  specificRequest () {
      return '德国标准插头';
  }
}
// 适配器对象，对原来不兼容对象进行包装处理
class Target {
  constructor () {
      this.adapter = new Adapter();
  }
  request () {
      const info = this.adapter.specificRequest();
      console.log(`${info} - 转换器 - 中国标准插头`)
  }
}
const target = new Target();
console.log(target.request()); // 德国标准插头 - 转换器 - 中国标准插头

