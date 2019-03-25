/*
  关键是区分事物内部的状态，事物内部状态往往会带来事物的行为改变，即允许对象在内部状态发生改变时改变它的行为
  把事物的每种状态封装成单独的类，跟此种状态相关的行为都被封装在这个类的内部。
  应用场景：灯泡状态、红绿灯切换等
*/

//e.g1
// 状态作为单独的类
class OffLightState {
  constructor (light) {
    this.light = light;
  }
  buttonWasPressed () {
    console.log('弱光');
    this.light.setState(this.light.weakLightState);
  }
}

class WeakLightState {
  constructor (light) {
    this.light = light;
  }
  buttonWasPressed () {
    console.log('强光');
    this.light.setState(this.light.strongLightState);
  }
}

class StrongLightState {
  constructor (light) {
    this.light = light;
  }
  buttonWasPressed () {
    console.log('关灯');
    this.light.setState(this.light.offLightState);
  }
}

class Light {
  constructor () {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);

    this.button = null;
  }
  init () {
    const self = this;
    this.currState = this.offLightState;
    this.button = document.createElement('button');
    document.body.appendChild(this.button);
    this.button.onclick = function() {
      self.currState.buttonWasPressed();
    }
  }
  setState (state) {
    this.currState = state;
  }
}

const light = new Light();
light.init();

//e.g2
// 红灯
class RedLight {
  constructor (state) {
      this.state = state;
  }
  light () {
      console.log('turn to red light');
      this.state.setState(this.state.greenLight)
  }
}
// 绿灯
class greenLight {
  constructor (state) {
      this.state = state;
  }
  light () {
      console.log('turn to green light');
      this.state.setState(this.state.yellowLight)
  }
}
// 黄灯
class yellowLight {
  constructor (state) {
      this.state = state;
  }
  light () {
      console.log('turn to yellow light');
      this.state.setState(this.state.redLight)
  }
}
class State {
  constructor () {
      this.redLight = new RedLight(this)
      this.greenLight = new greenLight(this)
      this.yellowLight = new yellowLight(this)
      this.setState(this.redLight) // 初始化为红灯
  }
  setState (state) {
      this.currState = state;
  }
}
const state = new State();
state.currState.light() // turn to red light
setInterval(() => {
  state.currState.light() // 每隔3秒依次打印红灯、绿灯、黄灯
}, 3000)