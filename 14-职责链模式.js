
/*
  使得多个对象都可以处理请求，避免发送者和接受者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递请求，直到有一个对象可以处理为止
  应用场景：链式操作
*/

// e.g1
const order500 = (orderType, pay, stock) => {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预约，获取100元优惠券');
  } else {
    // order200(orderType, pay, stock);
    return 'next'
  }
}

const order200 = (orderType, pay, stock) => {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预约，获取50元优惠券');
  } else {
    // orderNormal(orderType, pay, stock);
    return 'next'
  }
}

const orderNormal = (orderType, pay, stock) => {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('库存不足...');
  }
}

// 创建链
class Clain {
  constructor (fn) {
    this.fn = fn;
    this.successor = null;
  }
  setNextSuccessor (successor) {
    return this.successor = successor;
  }
  passRequest () {
    const ret = this.fn.apply(this, arguments);

    if (ret === 'next') {
      return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
  }
}

const clainOrder500 = new Clain(order500);
const clainOrder200 = new Clain(order200);
const clainOrderNormal = new Clain(orderNormal);

// 设置链
// clainOrder500.setNextSuccessor(clainOrder200)
// clainOrder200.setNextSuccessor(clainOrderNormal);
clainOrder500.setNextSuccessor(clainOrder200).setNextSuccessor(clainOrderNormal)

// 开始
clainOrder500.passRequest(1, true, 500)
clainOrder500.passRequest(2, true, 500)
clainOrder500.passRequest(3, true, 500)
clainOrder500.passRequest(1, false, 0)

// 如果是异步的需要手动调用next方法

function next () {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments);
}

// AOP实现职责链
Function.prototype.after = function(fn) {
  let self = this;

  return function() {
    const ret = self.apply(this, arguments);
    if (ret === 'next') {
      return fn.apply(this, arguments);
    }

    return ret;
  }
}

const order = order500.after(order200).after(orderNormal);

order(1, true, 500);
order(2, true, 500);
order(1, false, 500);

// e.g2
class Action {
  constructor(name) {
    this.name = name;
    this.nextAction = null
  }
  setNextAction (action) {
    this.nextAction = action
  }
  handle () {
    console.log(`${this.name} 审批`)
    if (this.nextAction != null) {
      this.nextAction.handle()
    }
  }
}

let a1 = new Action('组长')
let a2 = new Action('经理')
let a3 = new Action('总监')
a1.setNextAction(a2)
a2.setNextAction(a3)
a1.handle()