
# 图解javascript的this指向

## 普通function函数this指向
![](../../img/1568171213364.jpg)

这里的上下文对象如下：
```javascript
function fn() {console.log('this指向：', this);}

let Obj = {
    fn: fn
}

window.fn();    // 上下文对象调用, 等价于直接调用 fn()
Obj.fn();       // 上下文对象调用
```

## 箭头函数this指向


