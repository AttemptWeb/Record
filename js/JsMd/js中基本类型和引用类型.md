# 基本类型(值类型)和引用类型

## 基本类型(值类型)

基本类型有Undefined，Boolean，Number，String，Null，基本类型是按值访问，可以直接操作保存在变量中的值。
** 基本特点如下：**
* **1. 基本类型的值不可变**
```javascript
    var name = 'jozo';
    <!-- 大写，但是本身不会变 -->
    name.toUpperCase(); // 输出 'JOZO'
    console.log(name); // 输出  'jozo'

```
会发现原始的name并未发生改变，而是调用了toUpperCase()方法后返回的是一个新的字符串。


* **2.基本类型的比较是值的比较:**
```javascript
    var a = 1;
    var b = true;

    console.log(a == b);//true
```
其实这是类型转换和 == 运算符的知识了，也就是说在用==比较两个不同类型的变量时会进行一些类型转换。像上面的比较先会把true
转换为数字1再和数字1进行比较，结果就是true了。 这是当比较的两个值的类型不同的时候==运算符会进行类型转换，但是当两个值的类型相同的时候，
即使是==也相当于是===。

* **3.基本类型的变量是存放在栈区的（栈区指内存里的栈内存)**
```javascript
    var name = 'jozo';
    var city = 'guangzhou';
    var age = 22;
```

![Image](https://didiheng.com/Img/zhanxu.png)

栈区包括了 变量的标识符和变量的值。

****

## 引用类型
引用类型有：Array、function、Object

引用类型可以说就是对象，对象是属性和方法的集合。也就是说引用类型可以拥有属性和方法，属性又可以包含基本类型和引用类型。来看看引用类型的一些特性：

* **1.引用类型的值是可变的**
```javascript
    var person = new Object();
    person.name = 23;
    person.age = 22;
    person.sayName = function(){console.log(person.name);} 
    person.sayName();// 'jozo'

    delete person.name; //删除person对象的name属性
    person.sayName(); // undefined
```

上面代码说明引用类型可以拥有属性和方法，并且是可以动态改变的。

* **2.引用类型的值是同时保存在栈内存和堆内存中的对象**

引用类型的存储需要内存的栈区和堆区（堆区是指内存里的堆内存）共同完成，栈区内存保存变量标识符和指向堆内存中该对象的指针，也可以说是该对象在堆内存的地址。
```javascript
var person1 = {name:'jozo'};
var person2 = {name:'xiaom'};
var person3 = {name:'xiaoq'};
```
则这三个对象的在内存中保存的情况如下图：

![Image](https://didiheng.com/Img/Objduizhan.png)

* **3.引用类型的比较是引用的比较**

```javascript
var person1 = {};
var person2 = {};
console.log(person1 == person2); // false
```
引用类型时按引用访问的，换句话说就是比较两个对象的堆内存中的地址是否相同，那很明显，person1和person2在堆内存中地址是不同的;

![Image](https://didiheng.com/Img/DZCompare.png)


## 对象引用


引用类型保存在变量中的是对象的堆内存的地址，所以，与简单赋值不同，这个值的副本实际是一个指针，而这个指针指向存储在堆内存的一个变量。那么赋值操作后，两个变量都保存同一个对象地址，那么这两个变量指向同一个对象。因此这其中的任何一个变量，都会相互影响;
```javascript
var a = {}; // a保存了一个空对象的实例
var b = a;  // a和b都指向了这个空对象
 
a.name = 'jozo';
console.log(a.name); // 'jozo'
console.log(b.name); // 'jozo'
 
b.age = 22;
console.log(b.age);// 22
console.log(a.age);// 22
 
console.log(a == b);// true

```
![Image](https://didiheng.com/Img/DXyingyong.png)
