# js运行机制 和 事件循环

众所周知js是单线程，那么它的运行机制是怎样的，它如何处理同步、异步事件。我将我对于这个的理解写下来，分享给大家，也避免我遗忘。

## 任务队列和事件循环

![img](https://github.com/HerryLo/Record/blob/master/Img/default.svg)

**Stack 栈**:  存储的是同步任务，所谓同步的任务就是那些能立即执行、不耗时的任务

**Heap 堆**: 对象被分配在一个堆中

**Queue 任务队列**：存储异步任务，如 用户的点击事件、浏览器收到服务的响应和后面提到的setTimeout插入的回调函数。

```javascript
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('this is a msg from call back');
  });

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('this is a msg from call back1');
  }, 0);

  console.log('this is the end');

})();

// "this is the start"
// "this is just a message"
// "this is the end"
// note that function return, which is undefined, happens here 
// "this is a msg from call back"
// "this is a msg from call back1"
```

通过上面的代码就可看出同步任务和异步任务的执行顺序
```
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。异步任务会在"任务队列"中注册事件，队列进入等待。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。
```

一个js程序的单线程首先执行栈中的同步任务，当所有同步任务执行完毕，栈被清空，然后读取任务队列中的最先进入队列的待处理函数，压入栈中，单线程开始执行新的同步任务，执行完毕。

单线程从任务队列中读取任务是不断循环的，每次栈被清空后，都会在任务队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫任务循环。因为每个任务都由一个事件所触发，所以也叫事件循环.

## macrotask 和 microtask

```javascript
 setTimeout(function(){
     console.log('定时器开始啦')
 });
 
 new Promise(function(resolve){
     console.log('马上执行for循环啦');
     for(var i = 0; i < 10000; i++){
         i == 99 && resolve();
     }
 }).then(function(){
     console.log('执行then函数啦')
 });
 
 console.log('代码执行结束');
```
按照,上文我们刚学到的JS执行机制去分析

```
setTimeout 是异步任务,被放到 任务队列

new Promise 是同步任务,被放到主线程里,直接执行打印 console.log('马上执行for循环啦')

.then里的函数是 异步任务,被放到 任务队列

console.log('代码执行结束')是同步代码,被放到主线程里,直接执行
```
所以,结果是 【马上执行for循环啦 --- 代码执行结束 --- 定时器开始啦 --- 执行then函数啦】吗?

亲自执行后,结果居然不是这样,而是【马上执行for循环啦 --- 代码执行结束 --- 执行then函数啦 --- 定时器开始啦】

那么,难道是异步任务的执行顺序,不是前后顺序,而是另有规定? 事实上,按照异步和同步的划分方式,并不准确。

而准确的划分方式是:

> macro-task(宏任务)：包括整体代码script，setTimeout，setInterval

> micro-task(微任务)：Promise，process.nextTick

```
// 执行的实际顺序
首先宏任务是有很多轮的，每轮宏任务执行结束后，会去执行这一轮宏任务下的微任务。
然后执行下一轮宏任务，循环往复。
1.整体script作为第一个宏任务进入主线程，这是第一轮宏任务。
2.遇到setTimeout，其回调函数被分发到宏任务Event Queue中，这是第二个宏任务。
3.继续执行，打印【马上执行for循环啦】
4.遇到promise.then()微任务，这是第一轮宏任务下的微任务，因为整体script是第一轮宏任务嘛
5.继续执行，打印【代码执行结束】
6.现在整体script作为第一轮宏任务，去检查这一轮下的微任务，发现有一个promise.then()，去执行它

（至此现在第一轮宏任务，以及这一轮宏任务下的微任务都被执行过了）
7.开始第二轮宏任务，发现宏任务队列里有一个setTimeout，执行它，就打印了【定时器开始啦】

所以按照宏任务和微任务的方式去分类，可以暂时不管异步、同步。
```

> 执行一个宏任务,过程中如果遇到微任务,就将其放插入到 宏任务 的尾部, 当前宏任务执行完成后, 总会优先执行微任务。然后在运行下一个宏任务。


参考:

[JavaScript单线程和异步机制](https://www.cnblogs.com/sxz2008/p/6513619.html)

[MDN 并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[深入理解JS引擎的执行机制](https://segmentfault.com/a/1190000012806637)
