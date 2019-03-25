/*
  实现一种功能有多种选择方案，将算法的使用和实现分离开来。
  定义一系列的算法，把他们封装起来，并且使他们可以相互替换
  可用于替换if else
*/

//e.g1
// 提供策略
class Strategy1 {
  calculate (salary) {
    return salary * 2;
  }
}

class Strategy2 {
  calculate (salary) {
    return salary * 3;
  }
}

// 定义使用类
class Bonus {
  constructor () {
    this.salary = null;
    this.strategy = null;
  }

  setSalary (salary) {
    this.salary = salary;
  }

  setStrategy (strategy) {
    this.strategy = strategy;
  }

  getBonus () {
    return this.strategy.calculate(this.salary);
  }
}

// 创建一个bonus对象
const bonus = new Bonus();

// 设置基本值
bonus.setSalary(1000)

// 设置使用的策略1
bonus.setStrategy(new Strategy1())

// 获取最终的bonus
console.log(bonus.getBonus())

// 设置使用的策略2
bonus.setStrategy(new Strategy2())

console.log(bonus.getBonus())

// 另一种
const startegies = {
  'S': (salary) => {
    return salary * 2;
  },
  'A': (salary) => {
    return salary * 3;
  }
}

const calculateBouns = (level, salary) => {
  return startegies[level](salary)
}

console.log(calculateBouns('S', 2000))
console.log(calculateBouns('A', 3000))


// e.g2
class User {
  constructor (type) {
    this.type = type
  }
  buy () {
    if (this.type === 'ordinary') {
      console.log('普通用户购买')
    } else if (this.type === 'member') {
      console.log('会员用户购买')
    } else if (this.type === 'vip') {
      console.log('vip用户购买')
    }
  }
}

var u1 = new User('ordinary')
u1.buy()
var u2 = new User('member')
u2.buy()
var u3 = new User('vip')
u3.buy()


class OrdinaryUser {
  buy () {
    console.log('普通用户购买')
  }
}

class MemberUser {
  buy () {
    console.log('会员用户购买')
  }
}

class VipUser {
  buy () {
    console.log('vip用户购买')
  }
}

var u1 = new OrdinaryUser()
u1.buy()
var u2 = new MemberUser()
u2.buy()
var u3 = new VipUser()
u3.buy()