// 数据data

const args = []

for (let i = 0; i < 105; i++) {
  args.push(i)
}

const timeChunk = function (args, fn, num) {
  let timer;
  const start = () => {
    for (let n = 0, len = Math.min(num, args.length); n < len; n++) {
      fn(args.shift())
    }
  }

  return function() {
    timer = setInterval(() => {
      if (args.length === 0) {
        return clearInterval(timer)
      }
      start()
    }, 2000)
  }
}

const chunkFn = timeChunk(args, function(n) {
  console.log(n)
}, 10)

chunkFn()