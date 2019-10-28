
# 图解javascript的this指向

以就只有两张图，请放心食用！！

## 简版this指向
![](https://didiheng.com/Img/1568171213364.jpg)

## 升级版this指向
![](https://didiheng.com/Img/1568272846327.jpg)

### **解释：**
这里的上下文对象如下：
```javascript
function fn() {console.log('this指向：', this);}

let Obj = {
    fn: fn
}

window.fn();    // 上下文对象调用, 等价于直接调用 fn()
Obj.fn();       // 上下文对象调用
```
### 参考：

[MDN: 箭头函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

[MDN: 函数的this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

