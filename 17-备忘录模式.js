/*
  保存一个对象的某个状态，以便在适当的时候恢复对象
*/
class Memento {
  constructor (content) {
    this.content = content
  }
  getContent () {
    return this.content
  }
}

class CareTaker {
  constructor () {
    this.list = []
  }
  add (memento) {
    this.list.push(memento)
  }
  get (index) {
    return this.list[index]
  }
}

class Editor {
  constructor () {
    this.content = ''
  }
  setContent (content) {
    this.content = content
  }
  getContent () {
    return this.content
  }
  saveContentToMemento () {
    return new Memento(this.content)
  }
  getContentFromMemento (memento) {
    this.content = memento.getContent()
  }
}

let editor = new Editor()
let careTaker = new CareTaker()

editor.setContent('111')
editor.setContent('222')
careTaker.add(editor.saveContentToMemento())

editor.setContent('333')
careTaker.add(editor.saveContentToMemento())

editor.setContent('444')

console.log(editor.getContent())

editor.getContentFromMemento(careTaker.get(1))
console.log(editor.getContent())

editor.getContentFromMemento(careTaker.get(0))
console.log(editor.getContent())