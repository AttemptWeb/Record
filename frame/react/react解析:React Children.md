## react解析 React.Children(二)

> 感谢 [yck: 剖剖析 React 源码解析](https://github.com/KieSun/Dream/issues/18)，本篇文章是在读完他的文章的基础上，将他的文章进行拆解和加工，加入我自己的一下理解和例子，便于大家理解。觉得[yck](https://github.com/KieSun)写的真的很棒 。**React 版本为 16.8.6**，关于源码的阅读，可以移步到[yck react源码解析](https://github.com/KieSun/react-interpretation)

> 本文永久有效链接: [react解析 React.Children(二)](https://github.com/AttemptWeb/Record/edit/master/frame/react/react%E8%A7%A3%E6%9E%90:React%20Children.md)

在React实际开发中, ```React.Children``` 这个API我们虽然使用的比较少, 但是我们通过这个API可以操作```children```, 可以查看[文档](https://reactjs.org/docs/react-api.html#reactchildren)

我们来看下这个API的神奇用法
```javascript
React.Children.map(this.props.children, c => [[c, c]])
```
下面可以看一下它在**项目中的实际用法**：
![](https://didiheng.com/Img/WechatIMG50.jpeg)

**控制台打印渲染的节点和props**，如下图 
![](https://didiheng.com/Img/1557231565848.jpg)
从上图可以得知，通过 c => [[c, c]] 转换以后节点变为了：
```html
// 通过 c => [[c, c]] 转换以后
<div>
    <p>1</p>
    <p>1</p>
    <p>2</p>
    <p>2</p>
</div>
```

我们需要定位到 ReactChildren.js 文件，[查看代码](https://github.com/KieSun/react-interpretation/blob/master/packages/react/src/ReactChildren.js), React.Children.map 方法实际就是mapChildren函数，让我们来看看 mapChildren 内部到底是如何实现的吧！

```javascript
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  const result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  // 这里是处理 key，不关心也没事
  let escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  const traverseContext = getPooledTraverseContext(
    array,
    escapedPrefix,
    func,
    context,
  );
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}
```
getPooledTraverseContext 和 releaseTraverseContext 中的代码, 引入了对象重用池的概念。这个概念的用处就是维护一个大小固定的对象重用池，每次从这个池子里取一个对象去赋值，用完之后就将对象上的属性清空然后丢回池子。维护这个池子的用意就是提高性能，避免频繁创建销毁多属性对象。

虽然在调用了traverseAllChildren函数，实际调用的是traverseAllChildrenImpl方法。

```javascript
function traverseAllChildrenImpl( children, nameSoFar, callback,traverseContext ) {
  const type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    children = null;
  }

  let invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }
  if (invokeCallback) {
    callback(
      traverseContext,
      children,
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar,
    );
    return 1;
  }

  let child;
  let nextName;
  let subtreeCount = 0;
  const nextNamePrefix =
    nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(
        child,
        nextName,
        callback,
        traverseContext,
      );
    }
  } else {
    const iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      const iterator = iteratorFn.call(children);
      let step;
      let ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          callback,
          traverseContext,
        );
      }
    }
  }

  return subtreeCount;
}
```
这个函数首先 判断 children 的类型, 若children为数组，继续递归调用```traverseAllChildrenImpl```,直到处理成单个可渲染的节点，然后调用才能调用callback，也就是```mapSingleChildIntoContext```。

最后让我们来读一下 mapSingleChildIntoContext 函数的实现。

```javascript
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  const {result, keyPrefix, func, context} = bookKeeping;
  let mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, c => c);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(
        mappedChild,
        keyPrefix +
          (mappedChild.key && (!child || child.key !== mappedChild.key)
            ? escapeUserProvidedKey(mappedChild.key) + '/'
            : '') +
          childKey,
      );
    }
    result.push(mappedChild);
  }
}
```
```mapSingleChildIntoContext```函数其实就是调用```React.Children.map(children, callback)```中的callback. **如果map之后还是数组, 那么再次进入mapIntoWithKeyPrefixInternal, 那么这个时候我们就会再次从对象重用池里面去获取context, 而对象重用池的意义也就是在这里, 如果循环嵌套多了, 可以减少很多对象创建和gc的损耗**. 如果不是数组, 判断返回值是否是有效的 Element, 验证通过的话就 clone 一份并且替换掉 key, 最后把返回值放入 result 中, result 其实也就是 mapChildren 的返回值.

下面是运行顺序：
```html
mapChildren 函数
     |
    \|/
mapIntoWithKeyPrefixInternal 函数     
     |
    \|/
traverseAllChildrenImpl函数(循环成单个可渲染的节点，如果不是递归)
     |    
     |单个节点
    \|/mapSingleChildIntoContext函数(判断是否是有效Element, 验证通过就 clone 并且替换掉 key,
并值放入result，result就是map的返回值)
```

更多内容：

[react解析: React.createElement(一)](https://github.com/AttemptWeb/Record/blob/master/frame/react/react%E8%A7%A3%E6%9E%90:ReactElement.md)

参考：

[yck: 剖剖析 React 源码](https://github.com/KieSun/Dream/issues/18)

[Jokcy 的 《React 源码解析》: react.jokcy.me/](https://react.jokcy.me/book/api/react-element.html)
