import StateMachine from 'javascript-state-machine'

// 状态机模型
let fsm = new StateMachine({
  init: 'pedding',
  transitions: [
    {
      name: 'resolve', // 事件名称
      from: 'pedding',
      to: 'fullfilled'
    },
    {
      name: 'reject', // 事件名称
      from: 'pedding',
      to: 'rejected'
    }
  ],
  methods: {
    // 监听resolve
    onResolve: function(state, data) {
      data.successList.forEach(fn => fn())
    },
    onReject: function(state, data) {
      data.failList.forEach(fn => fn())
    }
  }
})

// 定义Promise
class MyPromise {
  constructor (fn) {
    this.successList = []
    this.failList = []
    fn(function() {
      // resovle函数
      fsm.resolve(this)
    }, function() {
      // reject函数
      fsm.reject(this)
    })
  }
  then (successFn, failFn) {
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

function loadImg(src) {
  const promise = new MyPromise((resolve, reject) => {
    let img = new Image();
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject()
    }
    img.src = src
  })
  return promise
}

let src = ''
const result = loadImg(src)
result.then(function() {
  console.log('ok1')
}, function(){
  console.log('fail1')
})

result.then(function() {
  console.log('ok2')
}, function(){
  console.log('fail2')
})