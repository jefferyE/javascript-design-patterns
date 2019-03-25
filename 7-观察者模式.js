/*
  定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
  被观察者：维护一组观察者， 提供用于增加和移除观察者的方法。
  观察者：提供一个更新接口，用于当被观察者状态变化时，得到通知。
  具体的被观察者：状态变化时广播通知给观察者，保持具体的观察者的信息。
  具体的观察者：保持一个指向具体被观察者的引用，实现一个更新接口，用于观察，以便保证自身状态总是和被观察者状态一致的。
  应用场景：JS事件、JS Promise、JQuery.$CallBack、Vue watch、NodeJS自定义事件，文件流等
*/

// e.g1
class Subject {
  constructor () {
    this.state = 0
    this.observers = []
  }
  getState () {
    return this.state
  }
  setState (state) {
    this.state = state
    this.notify()
  }
  notify () {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
  attach (observer) {
    this.observers.push(observer)
  }
}


class Observer {
  constructor (name, subject) {
    this.name = name;
    this.subject = subject
    this.subject.attach(this)
  }
  update () {
    console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

let sub = new Subject()
let observer1 = new Observer('o1', sub)
let observer2 = new Observer('o2', sub)

sub.setState(1)


// e.g2
//观察者列表
function ObserverList(){
  this.observerList = [];
}
ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};
ObserverList.prototype.count = function(){
  return this.observerList.length;
};
ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};
ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;
  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }
  return -1;
};
ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};

//目标
function Subject(){
  this.observers = new ObserverList();
}
Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};
Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};
Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};

//观察者
function Observer(){
  this.update = function(){
    // ...
  };
}