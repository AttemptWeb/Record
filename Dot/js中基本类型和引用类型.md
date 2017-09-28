## 基本类型和引用类型

### 基本类型

基本类型有Undefined，Boolean，Number，String，Null，基本类型是按值访问，可以直接操作保存在变量中的值。
** 基本特点如下：**
* 1. 基本类型的值不可变
```javascript
var name = 'jozo';
<!-- 大写，但是本身不会变 -->
name.toUpperCase(); // 输出 'JOZO'
console.log(name); // 输出  'jozo'

```
会发现原始的name并未发生改变，而是调用了toUpperCase()方法后返回的是一个新的字符串。


* 2.基本类型的比较是值的比较:
```javascript
var a = 1;
var b = true;

console.log(a == b);//true
```
其实这是类型转换和 == 运算符的知识了，也就是说在用==比较两个不同类型的变量时会进行一些类型转换。像上面的比较先会把true
转换为数字1再和数字1进行比较，结果就是true了。 这是当比较的两个值的类型不同的时候==运算符会进行类型转换，但是当两个值的类型相同的时候，
即使是==也相当于是===。

* 3.基本类型的变量是存放在栈区的（栈区指内存里的栈内存）
```javascript
var name = 'jozo';
var city = 'guangzhou';
var age = 22;
```

![Image](https://raw.githubusercontent.com/HerryLo/Knowledge/master/Img/zhunxu.jpg)

栈区包括了 变量的标识符和变量的值。

