/*
  提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示
  可分为：内部迭代器和外部迭代器
  内部迭代器： 内部已经定义好迭代规则，外部只需要调用一次即可
  应用场景： JQuery.each方法
  外部迭代器：必须显示的请求迭代下一个元素。
  应用场景：JS Iterator、JS Generator
*/

// 内部迭代器

const each = (args, fn) => {
  for (let i = 0, len = args.length; i < len; i++) {
    const value = fn(args[i], i, args);

    if (value === false) break;
  }
}

each([1, 2, 3, 4, 5], (item, index, arr) => {
  console.log('item: ', item);
  // console.log('index: ', index);
  // console.log('arr: ', arr);

  // 中断
  if (item === 3) {
    return false;
  }
})

// 外部迭代器
//e.g1
const Iterator = (obj) => {
  let current = 0;

  const next = () => {
    ++current;
  }

  const isDone = () => {
    return current >= obj.length;
  }

  const getCurrItem = () => {
    return obj[current];
  }

  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
}

let ite = Iterator([1, 2, 3, 4, 5])

ite.next()
console.log(ite.getCurrItem())
console.log(ite.isDone())
ite.next()
ite.next()
ite.next()
ite.next()
console.log(ite.getCurrItem())
console.log(ite.isDone())

//e.g2
// 迭代器
class Iterator {
  constructor (list) {
    this.list = list;
    this.index = 0;
  }
  next () {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null;
  }
  hasNext () {
    if (this.index === this.list.length) {
      return false;
    }
    return true;
  }
}
const arr = [1, 2, 3, 4, 5, 6];
const ite = new Iterator();

while(ite.hasNext()) {
  console.log(ite.next()); // 依次打印 1 2 3 4 5 6
}


