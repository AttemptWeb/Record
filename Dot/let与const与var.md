
### 什么是作用域
**作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。在JavaScript中，变量的作用域有全局作用域和局部作用域两种**

### var
在JS中的作用域，使用var声明的变量，无论是在代码中的那个地方声明，它提升到当前作用域的顶部，这种行为叫做 **变量提升（Hoisting）**

也就是说，如果在函数内部声明的变量，都会被提升到该函数的开头，而在全局声明的变量，机会提升到全局作用的顶部。

```javascript
function test() {
    console.log('1: ', a) //undefined
    if (false) {
      var a = 1
    }
    console.log('3: ', a) //undefined
}

test()
```

在函数嵌套函数的场景下，变量只会提升到最近的一个函数顶部，而不会提升到外部函数。

```javascript
//b提升到函数a顶部，但不会提升到函数test。
    function test() {
        function a() {
          if (false) {
            var b = 2
          }
        }
        console.log('b: ', b)
    }
    
    test() //b is not defined
```

### let
let和const都可以声明块级作用域，用法和var是类似的，let的特点的不会变量提升。

唯一正确的使用方法：**必须先声明，再访问。**

```javascript
function test() {
        if(true) {
          let a = 1
          console.log(a)
        }
    }
    test() // 1
```

### const 
声明变量，一段声明，不可更改。初始化必须赋值

尝试修改常量的值
```javascript
const type = "ACTION"
    type = 1
    console.log(type) //"type" is read-only
```

const虽然是常量，不允许修改默认赋值，但如果定义的是对象，那么可以修改对象内部的属性值。

### let 与 var 的区别
不同点在于作用域， var关键词的作用域是最近的函数作用域（如果在函数体的外部就是全局作用域）. let 关键词的作用域是最接近的块作用域（如果在任何块意外就是全局作用域），这将会比函数作用域更小.

* 声明后未赋值，表现相同
```javascript
use strict;

(function() {
  var varTest;
  let letTest;
  console.log(varTest); //输出undefined
  console.log(letTest); //输出undefined
}());
```

* 使用未声明的变量，表现不同:
```javascript
(function() {
  console.log(varTest); //输出undefined(注意要注释掉下面一行才能运行)
  console.log(letTest); //直接报错：ReferenceError: letTest is not defined

  var varTest = 'test var OK.';
  let letTest = 'test let OK.';
}());

* 重复声明同一个变量时，表现不同：
```jacascript
use strict;

(function() {
  var varTest = 'test var OK.';
  let letTest = 'test let OK.';

  var varTest = 'varTest changed.';
  let letTest = 'letTest changed.'; //直接报错：SyntaxError: Identifier 'letTest' has already been declared

  console.log(varTest); //输出varTest changed.(注意要注释掉上面letTest变量的重复声明才能运行)
  console.log(letTest);
}());
```

* 变量作用范围，表现不同
```javascript
use strict;

(function() {
  var varTest = 'test var OK.';
  let letTest = 'test let OK.';

  {
    var varTest = 'varTest changed.';
    let letTest = 'letTest changed.';
  }

  console.log(varTest); //输出"varTest changed."，内部"{}"中声明的varTest变量覆盖外部的letTest声明
  console.log(letTest); //输出"test let OK."，内部"{}"中声明的letTest和外部的letTest不是同一个变量
}());
```
