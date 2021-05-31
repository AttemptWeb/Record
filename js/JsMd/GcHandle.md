# [译] JavaScript如何工作：垃圾回收机制 + 常见的4种内存泄漏

[原文地址: How JavaScript works: memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)

[本文永久链接: https://github.com/AttemptWeb/Record/blob/master/js/JsMd/GcHandle.md](https://github.com/AttemptWeb/Record/blob/master/js/JsMd/GcHandle.md)

有部分的删减和修改，不过大部分是参照原文来的，翻译的目的主要是弄清JavaScript的垃圾回收机制，觉得有问题的欢迎指正。

## JavaScript 中的内存分配

现在我们将解释第一步（分配内存）是如何在JavaScript中工作的。

JavaScript 减轻了开发人员处理内存分配的责任 - JavaScript自己执行了内存分配，同时声明了值。

```javascript
var n = 374; // 为number分配内存
var s = 'sessionstack'; // 为string分配内存  
var o = {
  a: 1,
  b: null
}; //为对象及属性分配内存 

function f(a) {
  return a + 3;
} // 为函数分配内存
// 函数表达式分配内存
someElement.addEventListener('click', function() {
  someElement.style.backgroundColor = 'blue';
}, false);
```

## 在 JavaScript 中使用内存

基本上在 JavaScript 中使用分配的内存，意味着在其中读写。

这可以通过读取或写入变量或对象属性的值，甚至传递一个变量给函数来完成。

## 垃圾回收机制

由于发现一些内存是否“不再需要”事实上是不可判定的，所以垃圾收集在实施一般问题解决方案时具有局限性。下面将解释主要垃圾收集算法及其局限性的基本概念。

### 内存引用
如果一个对象可以访问另一个对象（可以是隐式的或显式的），则称该对象引用另一个对象。例如, 一个 JavaScript 引用了它的 prototype (隐式引用)和它的属性值(显式引用)。

在这种情况下，“对象”的概念扩展到比普通JavaScript对象更广泛的范围，并包含函数作用域（或全局词法范围）。

词法作用域定义了变量名如何在嵌套函数中解析：即使父函数已经返回，内部函数仍包含父函数的作用域。

### 引用计数垃圾收集
这是最简单的垃圾收集算法。 如果有零个指向它的引用，则该对象被认为是“可垃圾回收的”。
请看下面的代码:
```javascript
var o1 = {
  o2: {
    x: 1
  }
};
// 两个对象被创建。
// ‘o1’对象引用‘o2’对象作为其属性。
// 不可以被垃圾收集

var o3 = o1; // ‘o3’变量是第二个引用‘o1‘指向的对象的变量. 
                                                       
o1 = 1;      // 现在，在‘o1’中的对象只有一个引用，由‘o3’变量表示

var o4 = o3.o2; // 对象的‘o2’属性的引用.
                // 此对象现在有两个引用：一个作为属性、另一个作为’o4‘变量

o3 = '374'; // 原来在“o1”中的对象现在为零，对它的引用可以垃圾收集。
            // 但是，它的‘o2’属性存在，由‘o4’变量引用，因此不能被释放。

o4 = null; // ‘o1’中最初对象的‘o2’属性对它的引用为零。它可以被垃圾收集。
```
### 周期产生问题
在周期循环中有一个限制。在下面的例子中，两个对象被创建并相互引用，这就创建了一个循环。在函数调用之后，它们会超出界限，所以它们实际上是无用的，并且可以被释放。然而，引用计数算法认为，由于两个对象中的每一个都被至少引用了一次，所以两者都不能被垃圾收集。
```javascript
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // ‘o1’ 应用 ‘02’ o1 references o2
  o2.p = o1; // ‘o2’ 引用 ‘o2’ . 一个循环被创建
}
f();
```
![](https://user-gold-cdn.xitu.io/2017/12/4/16021e61ea285ec5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 标记和扫描算法
为了确定是否需要某个对象，本算法判断该对象是否可访问。

标记和扫描算法经过这 3 个步骤：

1.根节点：一般来说，根是代码中引用的全局变量。例如，在 JavaScript 中，可以充当根节点的全局变量是“window”对象。Node.js 中的全局对象被称为“global”。完整的根节点列表由垃圾收集器构建。

2.然后算法检查所有根节点和他们的子节点并且把他们标记为活跃的（意思是他们不是垃圾）。**任何根节点不能访问的变量将被标记为垃圾**。

3.最后，垃圾收集器释放所有未被标记为活跃的内存块，并将这些内存返回给操作系统。

![](https://user-gold-cdn.xitu.io/2017/12/4/16021e620079f335?imageslim)

标记和扫描算法行为的可视化。

因为“一个对象有零引用”导致该对象不可达，所以这个算法比前一个算法更好。我们在周期中看到的情形恰巧相反，是不正确的。
截至 2012 年，所有现代浏览器都内置了标记扫描式的垃圾回收器。去年在 JavaScript 垃圾收集（通用/增量/并发/并行垃圾收集）领域中所做的所有改进都是基于这种算法（标记和扫描）的实现改进，但这不是对垃圾收集算法本身的改进，也不是对判断一个对象是否可访问这个目标的改进。

### 周期不再是问题
在上面的例子中，函数调用返回后，两个对象不再被全局对象中的变量引用。因此，垃圾收集器会认为它们不可访问。

![](https://user-gold-cdn.xitu.io/2017/12/4/16021e6205b858fe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

即使两个对象之间有引用，根节点它们不在被访问。

### 统计垃圾收集器的直观行为

尽管垃圾收集器很方便，但他们也有自己的一套策略。其中之一是不确定性。换句话说，GC（垃圾收集器）是不可预测的。你不能确定一个垃圾收集器何时会执行收集。这意味着在某些情况下，程序其实需要更多的内存。其他情况下，在特别敏感的应用程序中，短暂和卡顿可能是明显的。尽管不确定性意味着不能确定一个垃圾收集器何时执行收集，大多数 GC 共享分配中的垃圾收集通用模式。如果没有执行分配，大多数 GC 保持空闲状态。考虑如下场景：

1.大量的分配被执行。

2.大多数这些元素（或全部）被标记为不可访问（假设我们废除一个指向我们不再需要的缓存的引用）。

3.没有执行更深的内存分配。

在这种情况下，大多数 GC 不会运行任何更深层次的收集。换句话说，即使存在引用可用于收集，收集器也不会收集这些引用。这些并不是严格的泄漏，但仍会导致高于日常的内存使用率。

## 什么是内存泄漏?
内存泄漏是应用程序过去使用，但不再需要的尚未返回到操作系统或可用内存池的内存片段。由于没有被释放而导致的，它将可能引起程序的卡顿和崩溃。

## JavaScript 常见的四种内存泄漏

### 1：全局变量
```javascript
function foo(arg) {
    bar = "some text";
    // window.bar = "some text";
}
```
假设 bar 的目的只是引用 foo 函数中的一个变量。然而不使用 var 来声明它，就会创建一个冗余的全局变量。

> 你可以通过在 JavaScript 文件的开头添加 'use strict'; 来避免这些后果，这将开启一种更严格的 JavaScript 解析模式，从而防止意外创建全局变量。

意外的全局变量当然是个问题，然而更常出现的情况是，你的代码会受到显式的全局变量的影响，而这些全局变量无法通过垃圾收集器收集。需要特别注意用于临时存储和处理大量信息的全局变量。如果你必须使用全局变量来存储数据，当你这样做的时候，要保证一旦完成使用就把他们赋值为 null 或重新赋值 。

### 2：被忘记的定时器或者回调函数

我们以经常在 JavaScript 中使用的 setInterval 为例。

```javascript
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //每5秒执行一次.
```
上面的代码片段显示了使用定时器引用节点或无用数据的后果。它既不会被收集，也不会被释放。无法被垃圾收集器收集，频繁的被调用，占用内存。

而正确的使用方法是，确保一旦依赖于它们的事件已经处理完成，就通过明确的调用来删除它们。

### 3：闭包
闭包是JavaScript开发的一个关键点：一个内部函数可以访问外部（封闭）函数的变量。
```javascript
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // originalThing 被引用
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
};
setInterval(replaceThing, 1000);
```
一旦调用了 replaceThing 函数，theThing 就得到一个新的对象，它由一个大数组和一个新的闭包（someMethod）组成。然而 originalThing 被一个由 unused 变量（这是从前一次调用 replaceThing 变量的 Thing 变量）所持有的闭包所引用。需要记住的是一旦为同一个父作用域内的闭包创建作用域，作用域将被共享。

在个例子中，someMethod 创建的作用域与 unused 共享。unused 包含一个关于 originalThing 的引用。即使 unused 从未被引用过，someMethod 也可以通过 replaceThing 作用域之外的 theThing 来使用它（例如全局的某个地方）。由于 someMethod 与 unused 共享闭包范围，unused 指向 originalThing 的引用强制它保持活动状态（两个闭包之间的整个共享范围）。这阻止了它们的垃圾收集。

在上面的例子中，为闭包 someMethod 创建的作用域与 unused 共享，而 unused 又引用 originalThing。someMethod 可以通过 replaceThing 范围之外的 theThing 来引用，尽管 unused 从来没有被引用过。事实上，unused 对 originalThing 的引用要求它保持活跃，因为 someMethod 与 unused 的共享封闭范围。

所有这些都可能导致大量的内存泄漏。当上面的代码片段一遍又一遍地运行时，您可以预期到内存使用率的上升。当垃圾收集器运行时，其大小不会缩小。一个闭包链被创建（在例子中它的根就是 theThing 变量），并且每个闭包作用域都包含对大数组的间接引用。

### 4: DOM 的过度引用
有些情况下开发人员在变量中存储 DOM 节点。假设你想快速更新表格中几行的内容。如果在字典或数组中存储对每个 DOM 行的引用，就会产生两个对同一个 DOM 元素的引用：一个在 DOM 树中，另一个在字典中。如果你决定删除这些行，你需要记住让两个引用都无法访问。
```javascript
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
    // image 元素是body的直接子元素。
    document.body.removeChild(document.getElementById('image'));
    // 我们仍然可以在全局元素对象中引用button。换句话说，button元素仍在内存中，无法由GC收集
}
```
在涉及 DOM 树内的内部节点或子节点时，还有一个额外的因素需要考虑。如果你在代码中保留对table表格单元格（td 标记）的引用，并决定从 DOM 中删除该table表格但保留对该特定单元格td的引用，则可以预见到严重的内存泄漏。你可能会认为垃圾收集器会释放除了那个单元格td之外的所有东西。但情况并非如此。由于单元格td是table表格的子节点，并且子节点保持对父节点的引用，所以对table表格对单元格td的这种单引用会把整个table表格保存在内存中。

我们在 [SessionStack](https://www.sessionstack.com/?utm_source=medium&utm_medium=blog&utm_content=Post-3-v8-getStarted) 尝试遵循这些最佳实践，编写正确处理内存分配的代码，原因如下：

一旦将 [SessionStack](https://www.sessionstack.com/?utm_source=medium&utm_medium=blog&utm_content=Post-3-v8-getStarted) 集成到你的生产环境的 Web 应用程序中，它就会开始记录所有的事情：所有的 DOM 更改，用户交互，JavaScript 异常，堆栈跟踪，失败网络请求，调试消息等。

通过 [SessionStack](https://www.sessionstack.com/?utm_source=medium&utm_medium=blog&utm_content=Post-3-v8-getStarted) web 应用程序中的问题，并查看所有的用户行为。所有这些都必须在您的网络应用程序没有性能影响的情况下进行。

由于用户可以重新加载页面或导航你的应用程序，所有的观察者，拦截器，变量分配等都必须正确处理，这样它们才不会导致任何内存泄漏，也不会增加我们正在整合的Web应用程序的内存消耗。

这里有一个免费的计划所以你可以试试看.

## Resources
[How JavaScript works: memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)

[MDN 内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

ps: 顺便推一下自己的个人公众号：Yopai，有兴趣的可以关注，每周不定期更新，分享可以增加世界的快乐

![](https://didiheng.com/webChat1.png)
