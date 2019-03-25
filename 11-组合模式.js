/*
  用于把一组相似的对象当作一个单一的对象。组合模式依据树形结构来组合对象，用来表示部分以及整体层次，一般需要提供相同的方法
  宏命令--->组合模式
  宏命令中包含了一组子命令，组合模式基于宏命令、类似于树与叶子关系
  组合对象，通过宏命令方式添加叶节点对象，叶对象可以继续添加叶对象，最后通过组合对象执行命令方式，依次遍历执行所有的叶节点对象
  组合对象与叶对象需要提供相同的执行方法excute。
  优点： 一致性对待组合对象和基本对象，客户不需要知道当前处理的是宏命令还是普通命令，只要是一个命令，拥有excute方法，这个命令便可以添加到树中
  注意：组合对象拥有叶节点，叶对象没有叶节点，会导致误操作，比如给叶节点添加叶对象，需要在叶对象中也添加一个add方法,在调用该方法时，抛出一个异常
  应用场景：菜单，虚拟DOM
*/

// 文件夹
class Folder {
  constructor (name) {
    this.name = name;
    this.files = [];
  }

  add (file) {
    this.files.push(file);
  }

  scan () {
    console.log('开始扫描文件夹：', this.name);

    for (let i = 0, len = this.files.length; i < len; i++) {
      this.files[i].scan();
    }
  }
}

// 文件
class File {
  constructor (name) {
    this.name = name;
  }

  add () {
    throw new Error('文件下不能再添加文件');
  }

  scan () {
    console.log('开始扫描文件：', this.name);
  }
}


// 创建文件夹
const folder1 = new Folder('学习资料');
const folder2 = new Folder('JavaScript');
const folder3 = new Folder('JQuery');

// 创建文件
const file1 = new File('JavaScript设计模式与开发实践');
const file2 = new File('精通jQuery');
const file3 = new File('重构与模式');

// 添加文件

folder1.add(file1);
folder2.add(file2);

folder3.add(folder1);
folder3.add(folder2);
folder3.add(file3);

folder3.scan();