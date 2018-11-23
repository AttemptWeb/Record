# js构造函数的继承
	函数function 方法的继承是常见的，那么下面我说的就是函数function之间的继承

## 构造函数

```javascript

function parent() {}
parent.prototype.name = 'dili';
parent.prototype.age =40;

function child() {}
child.prototype.age = 23 

// 以上是两个构造函数
```

## new实例化

```javascript
function parent() {}
parent.prototype.name = 'dili';
parent.prototype.age =40;

const fn = new parent(); //new构造函数 创建实例化对象
console.log(fn.name, fn.age) // 'dili',40

```
以上明显看出fn函数继承了parent函数的属性，此处是最常见的实例化对象。使用**prototype 实现基于原型的继承与属性的共享**。
	
	此处可以思考 fn.__proto__和parent.prototype的指向
* 可以参考[令人炸裂的_proto_和prototype](https://github.com/HerryLo/Record/blob/master/js/%E4%BB%A4%E4%BA%BA%E7%82%B8%E8%A3%82%E7%9A%84_proto_%E5%92%8Cprototype.md)

## 函数之间的继承

```javascript
function parent(x) {
	this.x = x;
}
parent.prototype.name = 'dili';
parent.prototype.age =40;

function child(x) {
	parent.call(this, x); //继承属性
}
child.prototype.age = 23 

child.prototype = Object.create(parent.prototype); // child原型对象指向parent的实例化对象
child.prototype.constructor = child; // child原型构造函数指向child

const fn = new child('x');
console.log(fn.name, fn.age) // 'dili',23

```
使用以上方法可以实现多层函数的继承，但并不影响构造函数的指向。


```
fn.__proto__ === child.prototype;

//child.__proto__ === Function.prototype
child.prototype.__proto__ === parent.prototype

//parent.__proto__ === Function.prototype
parent.prototype.__proto__ == Object.prototype

//Function.__proto__ === Function.prototype
//Function.prototype.__protope === Object.prototype
```
由以上可以看出，__proto__ 构成原型链。__proto__ 指向构造该对象的构造函数的原型
