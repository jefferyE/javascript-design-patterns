/*
  把请求封装成命令对象，从而分离请求发起者和接收者之间的耦合关系，在命令被执行之前，可以预先往命令对象中植入命令的接收者
  提供相同的excute执行方法
  发起命令者 => 执行的命令对象 => 接收者（具体执行命令操作对象）
  应用场景： 富文本编辑器、浏览器封装的命令对象
*/

// e.g1
const setCommand = (target, command) => {
  target.onclick = () => {
    command.execute();
  }
}

// 增加菜单
const menuBar = {
  execute () {
    console.log('update...');
  }
}

const addMenu = {
  execute () {
    console.log('add...'); 
  }
}

setCommand('btn1', menuBar);
setCommand('btn2', addMenu);

// e.g2
// 撤销和重做
const Jeffery = {
  attack () {
    console.log('attack...', '攻击');
  },
  defense () {
    console.log('defense...', '防御');
  },
  jump () {
    console.log('jump...', '跳跃');
  },
  crouch () {
    console.log('crouch...', '蹲下')
  }
}

const commands = {
  119: 'jump', // W
  115: 'crouch', // S
  97: 'defense', // A
  100: 'attack' // D
}

const makeCommand = (receiver, state) => {
  return () => {
    receiver[state]();
  }
}

const commandStack = [];

document.onkeypress = (e) => {
  const keyCode = e.keyCode;
  const command = makeCommand(Jeffery, commands[keyCode]);

  if (command) {
    command();
    commandStack.push(command);
  }
}

document.getElementById('replay').onclick = () => {
  const command;

  while(command = commandStack.shift()) {
    command();
  }
}

// 宏命令: 使用add方法添加一组命令到堆栈，并一次性执行完所有命令
const closeDoor = {
  execute () {
    console.log('关门...');
  }
}

const openPc = {
  execute () {
    console.log('打开电脑...');
  }
}

const openQQ = {
  execute () {
    console.log('打开QQ')
  }
}

const MacroCommand = () => {
  return {
    commandsList: [],
    add (command) {
      this.commandsList.push(command)
    },
    execute () {
      for (let i = 0, len = this.commandsList.length; i < len; i++) {
        this.commandsList[i].execute();
      }
    }
  }
}

const macroCommand = MacroCommand()

// 添加命令
macroCommand.add(closeDoor)
macroCommand.add(openPc);
macroCommand.add(openQQ);

// 执行命令
makeCommand.execute();


// e.g3
class Receiver {
  exec () {
    console.log('执行')
  }
}

class Command {
  constructor (receiver) {
    this.receiver = receiver
  }
  cmd () {
    console.log('触发命令')
    this.receiver.exec()
  }
}

class Invoker {
  constructor (command) {
    this.command = command
  }
  invoke () {
    console.log('开始')
    this.command.cmd()
  }
}

let soldier = new Receiver()
let trumpleter = new Command(soldier)
let general = new Invoker(trumpleter)

general.invoke()
