/*
  将抽象部分与实现部分分离，使它们都可以独立的变化
*/

class Color {
  constructor(name) {
    this.name = name
  }
}

class Shape {
  constructor(name, color) {
    this.name = name;
    this.color = color
  }
  draw () {
    console.log(`${this.color.name} ${this.name}`)
  }
}