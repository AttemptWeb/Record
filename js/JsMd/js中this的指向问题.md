## this指向问题

下面以普通函数作为例子

### 示例1
```javascript
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();
    /||\
     || 等价于
    \||/
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this);　　//Window
}
window.a();
```
调用```a()```时，this指向的是window
***
### 示例2
```javascript
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();
```
调用```o.fn()```时，this指向的是o对象，this的指向在函数创建的时候无法决定，在调用时才能决定，谁调用就指向谁。
***

### 示例3

还没有结束，我们还需要继续完善结论

```javascript
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
window.o.fn();
```

这段代码和上面的那段代码几乎一样，但是这里的this没有指向window，如果按照上面的结论，最终this应该指向调用它的对象。

```javascript
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
        }
    }
}
o.b.fn();
```
这里同样也是调用对象o，但同样，this并没有指向o。你也许会问，那你之前怎么说，谁调用就指向谁呢？上面的描述不够准确，接下来我将进行补充。下面，我相信你就可以彻底的理解this的指向的问题。
 
 ***情况1：如果一个函数中有this，它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题，你想了解可以自行上网查找.**

***情况2：如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象.**

***情况3：如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象，例子3可以证明，如果有疑问，那么接下来我们继续看几个例子。**

```javascript
var o = {
    a:10,
    b:{
        // a:12,
        fn:function(){
            console.log(this.a); //undefined
        }
    }
}
o.b.fn();
```
尽管对象b中没有属性a，这个this指向的也是对象b，因为this只会指向它的上一级对象，不管这个对象中有没有this要的东西。

***

### 例子4
```javascript
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```
这里this指向的是window，是不是有些蒙了？其实是因为你没有理解一句话，这句话同样至关重要。

　　**this永远指向的是最后调用它的对象**，也就是看它执行的时候是谁调用的，例子4中虽然函数fn是被对象b所引用，但是在将fn赋值给变量j的时候并没有执行所以最终指向的是window，这和例子3是不一样的，例子3是直接执行了fn。
  
### 题目
```
var fullname = 'John'
var obj = {
  fullname:'Colin',
  prop:{
    fullname:'Aurelio',
    getFullname:function(){
      return this.fullname
    }
  }
}
var test = obj.prop.getFullname;
console.log(test())
console.log(obj.prop.getFullname())
```
这个理解了，this基本没问题了
