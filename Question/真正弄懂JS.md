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

**3.你需要理解该题目的意思是，变量声明被提前了，但变量赋值没有，因为这行代码包括了**变量声明**和**变量赋值**。**
```javascript
// 你可以将语句拆分为如下代码：
var a; //声明
a = 1; //初始化赋值
```
>当变量声明和赋值在一起用的时候，JavaScript引擎会自动将它分为两部以便将变量声明提前，不将赋值的步骤提前是因为他有可能影响代码执行出不可预期的结果。

所以，知道了这些概念以后，重新回头看一下题目的代码，其实就等价于：
```javascript
var a;
if (!("a" in window)) {
a = 1;
}
alert(a);
```




### 题目二
```javascript

```
