Function.prototype.before = function (beforeFn) {
  const _self = this
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterFn) {
  const _self = this
  return function () {
    const ret = _self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

let func = function () {
  console.log('2')
}

func = func.before(function() {
  console.log('1')
}).after(function() {
  console.log('3')
})

func()
console.log(func())