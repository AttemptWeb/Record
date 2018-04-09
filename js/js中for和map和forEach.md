# Js中的map和forEach和for...in

今天遇到的有些坑，之前一直没有注意，我反正是服了。

# for...in循环

### 函数表达式
在**函数表达式**使用for...in语句时，会需要退出循环体。在 我们**可以使用return、break结束整个循环，continue结束当前循环**。
```javascript
function f(){
    var a = [1,2,3]
    for(var i in a){
        if(i == 2){
            return false // break continue
        }
        console.log(i)
    }
}
f();
```

### 全局作用域
在全局下直接使用for...in语句,不使用函数嵌套时，只可使用break结束循环，continue结束当前循环。
```javascript
for(var i in a){
    if(i == 2){
        return false // break continue
    }
    console.log(i)
}
// 抛出错误
// Uncaught SyntaxError: Illegal return statement
```

**return只可在函数表达式中使用, break适用于结束循环体**
>   提示：for...in不应该用于迭代一个 Array，其中索引顺序很重要。

参考:     [MDN中for...in的阐述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)

# forEach

先来段代码,在chrome下运行
```javascript
const arr = [1,2,3,5].forEach(
    function(i)
    {if(i == 3){return false}
    console.log(i)
})
console.log(arr)
<!-- 打印 -->
// 1
// 2
// 5
// undefined
// undefined
```
以上可以发现forEach中使用return并没有结束forEach循环，而是指结束了当前循环.

查看资料后发现

>   forEach方法对数组的每个元素执行回调，无返回值。没有办法中止或者跳出 forEach 循环，除了抛出一个异常,如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代.如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 Array.every 或 Array.some"

[forEach参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

# map
map和forEach大致一样，但是还是存在细微的差别.
```javascript
const arr = [1,2,3,5].map(
    function(i){
    return i
})
console.log(arr);
<!-- 打印 -->
//  [1, 2, 3, 5]
```
return依然无法结束map循环，同时最后后居然返回一个新数组说出来！what?


>   map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
> 返回结果 一个新数组，每个元素都是回调函数的结果。 