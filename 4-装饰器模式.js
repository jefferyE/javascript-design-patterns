/*
  在不改变对象自身的基础上，动态的给某个对象添加新的功能，同时又不改变其接口
  应用场景：ES7装饰器、Vuex中1.0版本混入Vue时，重写init方法、Vue中数组变异方法实现等
*/

//e.g1
class Plane {
  fire () {
    console.log('发射普通子弹');
  }
}

class MissileDecorator {
  constructor (plane) {
    this.plane = plane
  }
  fire () {
    this.plane.fire();
    console.log('发射导弹');
  }
}

class AtomDedorator {
  constructor (plane) {
    this.plane = plane;
  }
  fire () {
    this.plane.fire();
    console.log('发射原子弹');
  }
}

let plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDedorator(plane);

// 发射
plane.fire();

// javascript版本
plane = {
  fire () {
    console.log('发射普通子弹');
  }
}

let missile = () => {
  console.log('发射导弹');
}

let atom = () => {
  console.log('发射原子弹');
}

let fire1 = plane.fire;

plane.fire = () => {
  fire1();
  missile();
}

let fire2 = plane.fire;

plane.fire = () => {
  fire2();
  atom();
}

// 发射
plane.fire();

//e.g2
class Circle {
  draw () {
    console.log('画一个圆形')
  }
}

class Decorator {
  constructor (circle) {
    this.circle = circle
  }
  draw () {
    this.circle.draw()
    this.setRedBorder(circle)
  }
  setRedBorder (circle) {
    console.log('设置红色边框')
  }
}

let circle = new Circle()
circle.draw()

let desc = new Decorator(circle)
desc.draw()
