# __proto__和protype
	一直在试图理解js的原型，这次希望将自己的理解记录下来
谈__proto__和protype，就不得不从说到 function和Object

## function和Object
- 对象具有属性__proto__，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

- 函数 也是对象，函数的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。

- 函数 这个特殊的对象，除了和其他对象一样有上述proto属性之外，还有自己特有的属性——原型属性（prototype），这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数.

### __proto__

```javascript
var A = function () {};
var B ={};

console.log(A.__proto__, typeof A.__proto__)
console.log(B.__proto__, typeof B.__proto__)
```
结果如下:

![图片](https://didiheng.com/Img/20180301112234.png)

刚才不是说函数是对象吗？它们的proto为啥不一样？往下看，别着急。


****

```javascript
var A = function () {};
var B ={};
console.log(A.prototype.__proto__)
console.log(B.__proto__)
```

console.log结果如下：

![图片](https://didiheng.com/Img/20180301112422.png)

所以重点 **隐式原型（proto）指向构造该对象的构造函数的原型**。因为function是特殊的对象，A.prototype 就指向了函数A的原型对象。而proto指向一致。

### prototype

```javascript
var A = function () {};
var B ={};
console.log(A.prototype, typeof A.prototype)
console.log(B.prototype, typeof B.prototype)
```

![图片](https://didiheng.com/Img/20180301113203.png)

**对象并不具有prototype属性，只有函数才有prototype属性**。

## 总结

- js里所有的对象都有proto属性(对象，函数)，指向构造该对象的构造函数的原型。
- 只有函数function才具有prototype属性。这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。
