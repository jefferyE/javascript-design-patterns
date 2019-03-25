import Item from './Item'

function createDiscount () {
  // 用代理做折扣显示
  return new Proxy(item, {
    get: (target, key, receiver) => {
      if (key === 'name') {
        return `${target[key]}【折扣】`
      }
      if (key === 'price') {
        return target[key] * 0.8
      }
      return target[key]
    }
  })
}

// 工厂模式
export default function (list, itemData) {
  if (itemData.discount) {
    itemData = createDiscount()
  }
  return new Item(list, itemData)
}