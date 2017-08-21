
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


