/*
  一个程序中使用了大量的相似对象，造成等很大的内存开销，且对象的大部分属性都可以变成外部状态。主要是区分外部状态和内部状态，剥离外部状态，保存在其他地方，在合适的时候再把外部状态组装进共享对象
*/

// 享元模式: 区分内部状态或外部状态

class Model {
  constructor (gender) {
    this.gender = gender;
  }

  takePhoto () {
    console.log('gender: ' + this.gender + ', wear: ' + this.underwear)
  }
}

// 男模特
const maleModel = new Model('male');

// 穿衣服
for (let i = 0; i < 10; i ++) {
  maleModel.underwear = i;
  maleModel.takePhoto();
}

// 女模特
const femaleModel = new Model('female');

// 穿衣服
for (let i = 0; i < 10; i++ ) {
  femaleModel.underwear = i;
  femaleModel.takePhoto();
}

// 对象池: 维护一个空的池子，如果需要一个对象，直接从池子中获取，若是没有则新建一个，该对象完成职责后，再进入池子等待下次被获取。
const toolTipFactory = (function() {
  let toolTipPool = [];

  return {
    create () {
      if (toolTipPool.length === 0) {
        const div = document.createElement('div');
        document.body.appendChild(div);

        return div;
      } else {
        return toolTipPool.shift();
      }
    },
    recover (toolTipDom) {
      return toolTipPool.push(toolTipDom);
    }
  }
})()

// 创建两个节点
const args = [];
const node1 = ['A', 'B'];
for (let i = 0; i < node1.length; i++) {
  const node = toolTipFactory.create();
  node.innerHTML = node1[i];
  args.push(node)
}

// 回收创建的节点
for (let i = 0; i < args.length; i++) {
  toolTipFactory.recover(args[i])
}

// 创建6个节点
const node2 = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < node2.length; i++) {
  const node = toolTipFactory.create();
  node.innerHTML = node2[i];
  args.push(node);
}