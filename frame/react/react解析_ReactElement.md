## react解析 React.createElement(一)

> 感谢 [yck: 剖剖析 React 源码解析](https://github.com/KieSun/Dream/issues/18)，本篇文章是在读完他的文章的基础上，将他的文章进行拆解和加工，加入我自己的一下理解和例子，便于大家理解。觉得[yck](https://github.com/KieSun)写的真的很棒 。**React 版本为 16.8.6**，关于源码的阅读，可以移步到[yck react源码解析](https://github.com/KieSun/react-interpretation)

> 本文永久有效链接：[react解析: React.createElement(一)](https://github.com/AttemptWeb/Record/edit/master/frame/react/react%E8%A7%A3%E6%9E%90:ReactElement.md)

在我们使用React开发项目的过程中，react的引入是必不可少的，因为babel会将JSX语法编译为React.createElement，如下

![](https://didiheng.com/Img/1557149501347.jpg)

现在可以定位到ReactElement.js ,[查看代码](https://github.com/KieSun/react-interpretation/blob/master/packages/react/src/ReactElement.js), 文件阅读 createElement 函数的实现

createElement接受三个参数：
```javascript
export function createElement(type, config, children) {
  // ...省略
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```
type指代这个ReactElement的类型，config 是指元素的属性，children是指子元素，return 调用 ReactElement函数。

```javascript
// 省略部分
// function createElement中，对于 config 的处理
if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }
```
这段代码对 ref 以及 key 做了处理，然后遍历 config 并把内建的几个属性（比如 ref 和 key）放入 props 对象中。

```javascript
// 省略部分
// function createElement中，对于 children 的处理
const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
```
因为会嵌套多个子元素, 所以childrenLength是大于等于一的。把第二个参数之后的参数取出来，这时候 props.children 会是一个数组，否则是一个对象。因此我们需要注意在对 props.children 进行遍历的时候要注意它是否是数组。最后我们来看看**ReactElement函数**

```javascript
// function createElement中，返回 一个 ReactElement 对象
// 调用的 ReactElement 函数
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };
  // ...省略
  return element
}
```
其中```$$typeof```是用来帮助我们识别这是一个 ReactElement, 下面我们来看看，经过createElement转换之后的ReactElement。

![](https://didiheng.com/Img/1557200456091.jpg)

下面是打印出来```App```组件

![](https://didiheng.com/Img/1557200356701.jpg)

更多内容：

[react解析: React.Children(二)](https://github.com/AttemptWeb/Record/blob/master/frame/react/react%E8%A7%A3%E6%9E%90:React%20Children.md)

参考：

[yck: 剖剖析 React 源码](https://github.com/KieSun/Dream/issues/18)

[Jokcy 的 《React 源码解析》: react.jokcy.me/](https://react.jokcy.me/book/api/react-element.html)
