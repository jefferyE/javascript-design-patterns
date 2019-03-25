// e.g

function curry (fn) {
  const args = [];

  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  }
}

const add = (() => {
  let sum = 0;

  return function () {
    for (let i = 0, len = arguments.length; i < len; i++) {
      sum += arguments[i];
    }

    return sum;
  }
})()

const curr = curry(add)

curr(100)
curr(200)
curr(300)

console.log(curr()) // 求值