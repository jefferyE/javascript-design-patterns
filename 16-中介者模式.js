/*
  解除对象与对象之间的紧耦合关系，增加一个中介者对象后，所有的相关对象都通过中介者对象泪通信，而不是下相互引用，因此只要当一个对象发生改变时，只需要通知中介者对象即可
*/
class A {
  constructor () {
    this.number = 0;
  }
  setNumber (num, m) {
    this.number = num;
    if (m) {
      m.setB()
    }
  }
}
class B {
  constructor () {
    this.number = 0;
  }
  setNumber (num, m) {
    this.number = num;
    if (m) {
      m.setA()
    }
  }
}

class Mediator {
  constructor (a, b) {
    this.a = a;
    this.b = b;
  }
  setB () {
    let number = this.a.number
    this.b.setNumber(number * 100)
  }
  setA () {
    let number = this.b.number
    this.a.setNumber(number * 100)
  }
}

let a = new A()
let b = new B()
let m = new Mediator(a, b)
a.setNumber(100)
console.log(a.number, b.number)
b.setNumber(100)
console.log(a.number, b.number)
// 泡泡堂游戏