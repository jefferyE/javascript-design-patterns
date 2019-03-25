function throttle (fn, interval) {
  let timer, first = true;

  return function() {
    if (first) {
      first = false;
      return fn.apply(this, arguments);
    }

    if (timer) {
      return false;
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, arguments)
    }, interval || 500)
  }
}

const fn = throttle(() => {
  console.log('window.onload delay')
})
window.addEventListener('load', fn)
