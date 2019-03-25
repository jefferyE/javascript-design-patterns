/*
  定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。
  为防止子类没有重写父类中定义的方法，可在父类方法中抛出异常
*/

// 定义一个抽象类
class Beverage {
  boilWater () {
    console.log('把水煮沸')
  }

  brew () {
    throw new Error('空方法，必须由子类重写');
  }

  pourInCup () {
    throw new Error('空方法，必须由子类重写');
  }

  addCondiments () {
    throw new Error('空方法，必须由子类重写');
  }

  init () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
}

// 创建咖啡子类
class Coffee extends Beverage {
  brew () {
    console.log('用沸水冲泡咖啡');
  }
  pourInCup () {
    console.log('把咖啡倒进杯子');
  }
  addCondiments () {
    console.log('加糖和牛奶');
  }
}

const coffee = new Coffee();
coffee.init();


// JavaScript版本
const Beverage1 = function (params) {
  const boilWater = params.boilWater || function() {
    console.log('把水煮沸')
  }

  const brew = params.brew || function() {
    throw new Error('空方法，必须由子类重写');
  }

  const pourInCup = params.pourInCup || function() {
    throw new Error('空方法，必须由子类重写');
  }

  const addCondiments = params.addCondiments || function() {
    throw new Error('空方法，必须由子类重写');
  }

  const F = function () {}
  F.prototype.init = () => {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }

  return F;
}

const Tea = Beverage1({
  brew () {
    console.log('用沸水浸泡茶叶');
  },
  pourInCup () {
    console.log('把茶倒进杯子');
  },
  addCondiments () {
    console.log('加柠檬');
  }
})

const tea = new Tea();

tea.init();