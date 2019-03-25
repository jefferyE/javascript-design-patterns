import $ from 'jquery'
import createItem from './createItem'

const data = [
  {
    id: 1,
    name: '《JS面试技巧》',
    price: '$128.0',
    discount: 0
  },
  {
    id: 2,
    name: '《JS高级面试指南》',
    price: '$198.0',
    discount: 1
  },
  {
    id: 3,
    name: '《Vue开发实战与解析》',
    price: '$298.0',
    discount: 1
  },
  {
    id: 4,
    name: '《Vue设计与源码解析》',
    price: '$228.0',
    discount: 0
  }
]

export default class List {
  constructor (app) {
    this.app = app
    this.$el = $('<div>')
  }
  // 获取数据
  loadData () {
    return data
  }
  // 生成列表
  initItemList (data) {
    data.forEach(item => {
      let item = createItem(this, item)
      item.init()
    })
  }
  // 渲染
  render () {
    this.app.$el.append(this.$el)
  }
  init () {
    const data = this.loadData()
    this.initItemList(data)
    this.render()
  }
}