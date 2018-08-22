## Typescript

Typescript作为js超集，是对js的一种扩张和升级，当然ES6/7语法支持了一些ts的特性，比如析构、class、箭头，目前ES6都有很好的支持。但是依然有人在说ts适合团队开发，更加的规范化。现在来一起看看它的优点。

开始我觉得ts是多余的，但后面真的去看时才发现，它让前端开发前进来了一大步。

## 开始

```
# npm install -g typescript
```
安装成功之后即可使用tsc编译 .ts文件

## 变量类型检测
开发工具使用: VScode
```
// hello.ts
let name:string = 'name'
let age:string = 12

提示类型检测出错, 变量age需要修改为string类型，否者编译不成功。
```
对于前端开发或者nodejs开发，它可以标记变量类型，让开发更加明确。虽然后面也会编译为js代码。

[更多ts变量类型](https://www.tslang.cn/docs/handbook/basic-types.html)

## 接口
在js中目前不存在类型检测，而接口是类型检测的升级版
```
interface ParamsType {
  name: string;
}

function print(obj: ParamsType) {
  console.log(obj.name);
}

let myObj = {name: 'HerryLo', age: 999};
print(myObj);
```
在使用interface接口时，括号中传入的对象满足上面提到的必要条件，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

[ts接口文档](https://www.tslang.cn/docs/handbook/interfaces.html)

## 接口扩展
接口属性设置:
```
<!-- 可选属性加? -->
interface Person {
  name: string;
  age?: number;
}
let tom: Person = {
    name: 'Tom'
};

<!-- 只读属性 readonly-->
interface Person {
    readonly id: number;
    name: string;
    age?: number;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527; //报错
```

接口继承
```
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    lesson: string;
}

let obj = <Student>{};
obj.name = "HerryLo";
obj.age = 99;
obj.lesson = 'Math'
```

目前的学习来说，类型检测是ts的最核心的功能之一，也是对于js的一种完善。虽然前端开发百花齐放，但如果希望生态环境越来越好，越来越企业化。那么变量的类型检测是必须支持的。当然ts最后也是需要编译为js才可以在浏览器运行，目前的js还没有支持类型检测。

在团队开发中，变量和函数、类的类型检测都是必须的，希望大家可以关注ts，注重代码规范。




