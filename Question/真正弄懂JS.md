## 了解javascript的基本概览

### 题目一
```javascript
if (!("a" in window)) {
   var a = 1;
}
alert(a);
```
代码含义: 如果window不包含属性a，就声明一个变量a，然后赋值为1。

可能认为alert出来的结果是1,然后结果是‘undefined’。要了解为什么， **需要知道JavaScript里的3个概念:**
**1. 所有的全局变量都是window的属性，语句 var a = 1;等价于window.a = 1;**

**2. 所有的变量声明都在范围作用域的顶部，看一下相似的例子:**
  ```javscript
   alert("a" in window);
   var a;
  ```
>此时，尽管声明是在alert之后，alert弹出的依然是true，这是因为JavaScript引擎首先会扫墓所有的变量声明，然后将这些变量声明移动到顶部，最终的代码效果是这样的：
   ```
   var a;
   alert("a" in window);
   ```



### 题目二
```javascript

```
