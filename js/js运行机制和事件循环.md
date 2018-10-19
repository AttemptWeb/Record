# js运行机制 和 事件循环

众所周知js是单线程，那么它的运行机制是怎样的，它如何处理同步、异步事件。我将我对于这个的理解写下来，分享给大家，也避免我遗忘。

## 任务队列和事件循环

![img](https://github.com/HerryLo/Record/blob/master/Img/default.svg)

**Stack 栈**:  存储的是同步任务，所谓同步的任务就是那些能立即执行、不耗时的任务

**Heap 堆**: 对象被分配在一个堆中

**Queue 任务队列**：存储异步任务，如 用户的点击事件、浏览器收到服务的响应和后面提到的setTimeout插入的回调函数。

```
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。
```

一个js程序的单线程首先执行栈中的同步任务，当所有同步任务执行完毕，栈被清空，然后读取任务队列中的最先进入队列的待处理函数，压入栈中，单线程开始执行新的同步任务，执行完毕。

单线程从任务队列中读取任务是不断循环的，每次栈被清空后，都会在任务队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫任务循环。因为每个任务都由一个事件所触发，所以也叫事件循环.

## 代码示例
```
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

参考:

[JavaScript单线程和异步机制](https://www.cnblogs.com/sxz2008/p/6513619.html)

[MDN 并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[Node.js的事件轮询Event Loop原理解释](https://www.jdon.com/idea/nodejs/event-loop.html)
