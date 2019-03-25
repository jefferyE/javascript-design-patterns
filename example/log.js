export function log(type) {
  return function(target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = function() {
      // 打印日志
      console.log('日志上报 ${type}')
      return oldValue.apply(this, arguments)
    }
    return descriptor
  }
}