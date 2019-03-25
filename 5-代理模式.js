/*
  为其他对象提供一种代理，便以控制对这个对象的访问，不能直接访问目标对象
  应用场景：ES6 Proxy、Vuex中对于getters访问、图片预加载等
*/
// e.g1
// 没有代理

class Flower {}

const Jeffery = {
  sendFlower: (target) => {
    const flower = new Flower();
    target.receiveFlower(flower);
  }
}

const Athy = {
  receiveFlower: (flower) => {
    console.log('收到花: ', flower)
  }
}

Jeffery.sendFlower(Athy)

// 引入中间人
const Other = {
  receiveFlower: (flower) => {
    Athy.receiveFlower(flower)
  }
}

Jeffery.sendFlower(Other)

// e.g2
// 1、图片预加载
const myImage = (() => {
  const img = document.createElement('img');
  document.body.appendChild(img);

  return (src) => {
    img.src = src
  }
})()

const proxyImage = (() => {
  const img = new Image();
  img.onload = () => {
    myImage(img.src);
  }

  return (src) => {
    myImage('file://loading.gif');
    img.src = src;
  }
})()

proxyImage('https://www.baidu.com/logo.png'); // 使用代理
myImage('https://www.baidu.com/logo.png'); // 没有使用代理

// e.g3
class ReadImg {
  constructor (fileName) {
    this.fileName = fileName
    this.loadFromDisk()
  }
  display () {
    console.log('display...' + this.fileName)
  }
  loadFromDisk () {
    console.log('loading...' + this.fileName)
  }
}

class ProxyImg {
  constructor (fileName) {
    this.readImg = new ReadImg(fileName)
  }
  display () {
    this.readImg.display()
  }
}

let proxyImg = new ProxyImg('1.png')
proxyImg.display()

// ES6 Proxy
let star = {
  name: '张XX',
  age: 15,
  phone: '_star: 13987804521'
}

let agent = new Proxy(star, {
  get: (target, key) => {
    if (key === 'phone') {
      return '_agent: 16089893333'
    }
    if (key === 'price') {
      return 12000
    }
    return target[key]
  },
  set: (target, key, val) => {
    if (key === 'customPrice') {
      if (val < 100000) {
        throw new Error('报价太低')
      } else {
        target[key] = val
        return true
      }
    }
  }
})


console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)
