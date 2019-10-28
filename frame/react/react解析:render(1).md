## react解析 render的FiberRoot

> 感谢 [yck: 剖析 React 源码解析](https://github.com/KieSun/Dream/issues/19)，本篇文章是在读完他的文章的基础上，将他的文章进行拆解和加工，加入我自己的一下理解和例子，便于大家理解。觉得[yck](https://github.com/KieSun)写的真的很棒 。**React 版本为 16.8.6**，关于源码的阅读，可以移步到[yck react源码解析](https://github.com/KieSun/react-interpretation)

下面将会说到 ```ReactDOM.render``` 在ReactDOM中的调用流程，实际就是分析下面代码：
```javascript
ReactDOM.render(<APP />, document.getElementById('app'))
```
实际代码：
```javascript
ReactDOM.render(React.createElement(APP, null), document.getElementById('app'));
```

### render 函数 
> [yck: ReactDOM 源码 702行 render](https://github.com/KieSun/react-interpretation/blob/master/packages/react-dom/src/client/ReactDOM.js#L702)

ReactDOM.render实际调用的就是下面的代码
```javascript
render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function,
  ) {
    // 注意下 forceHydrate 参数，为 true 时是服务端渲染
    // 客户端调用 render 函数的话这个值永远为 false
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      false,
      callback,
    );
  }
```
render函数中的参数```element```是 传入的组件，```container```DOM节点容器，callback是回调函数。[ReactDOM.render文档](http://react.html.cn/docs/react-dom.html#render)。

### legacyRenderSubtreeIntoContainer 函数
> [yck: ReactDOM 源码 554行 legacyRenderSubtreeIntoContainer](https://github.com/KieSun/react-interpretation/blob/master/packages/react-dom/src/client/ReactDOM.js#L554)
```javascript
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: DOMContainer,
  forceHydrate: boolean,
  callback: ?Function,
) {
    // 初始化时，container 肯定没有 _reactRootContainer属性
    let root: Root = (container._reactRootContainer: any);
    if (!root) {
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
            container,    // DOM容器节点
            forceHydrate, // 为false
        );
        // 暂时只说root不存在时，reactRoot的创建
    }
}
```
```container```表示DOM元素节点容器, 在上面的代码中会创建一个ReactRoot，然后将它挂载在container容器上, ```container._reactRootContainer```就是挂载的ReactRoot属性。
```javascript
// 查看_reactRootContainer
document.getElementById('app')._reactRootContainer
```

### 创建FiberRoot核心函数
> [yck: ReactDOM 源码 504行 legacyCreateRootFromDOMContainer](https://github.com/KieSun/react-interpretation/blob/master/packages/react-dom/src/client/ReactDOM.js#L504)
```javascript
function legacyCreateRootFromDOMContainer(
  container: DOMContainer,
  forceHydrate: boolean,
): Root {
  const isConcurrent = false;
  // 调用ReactRoot函数 创建ReactRoot, shouldHydrate是SSR相关，不用管
  return new ReactRoot(container, isConcurrent, shouldHydrate);
}
```
> [yck: ReactDOM 源码 368行 ReactRoot](https://github.com/KieSun/react-interpretation/blob/master/packages/react-dom/src/client/ReactDOM.js#L368)
```javascript
function ReactRoot(
  container: DOMContainer,
  isConcurrent: boolean,
  hydrate: boolean,
) {
  // 这个 root 指的是 FiberRoot
  const root = createContainer(container, isConcurrent, hydrate);
  this._internalRoot = root;
}
```
调用createContainer 创建FiberRoot，下面我们将会说到FiberRoot 对象

#### FiberRoot
> [yck: ReactDOM 源码 368行 createContainer](https://github.com/KieSun/react-interpretation/blob/master/packages/react-reconciler/src/ReactFiberReconciler.js#L276)
```javascript
export function createContainer(
  containerInfo: Container,
  isConcurrent: boolean,
  hydrate: boolean,
): OpaqueRoot {
  return createFiberRoot(containerInfo, isConcurrent, hydrate);
}
```
> [yck: ReactDOM 源码 368行 createFiberRoot](https://github.com/KieSun/react-interpretation/blob/master/packages/react-reconciler/src/ReactFiberRoot.js#L168)
```javascript
function createFiberRoot(
  containerInfo: any,
  isConcurrent: boolean,
  hydrate: boolean,
): FiberRoot {
  const root: FiberRoot = (new FiberRootNode(containerInfo, hydrate): any);
  const uninitializedFiber = createHostRootFiber(isConcurrent);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  return root;
}
```
createFiberRoot函数中，首先创建了一个```root: FiberRoot```，然后又创建了一个```uninitializedFiber: RootFiber```，它们两者还是相互引用。
```
// 查看 FiberRoot 对象
document.getElementById('app')._reactRootContainer._internalRoot
```
我们下面顺便说一下FiberRoot 和 RootFiber的关系，同时拿出几个必须要要了解的属性解释一下。
```javascript
ReactDom.render(
  ()=> (
    <div>
      <div></div>
      <div></div>
    </div>
  ), 
  document.querySelector('#root')
)
```

![img](https://didiheng.com/Img/1565408715828%20.jpg)

想了解[**FiberRoot的数据结构**](https://react.jokcy.me/book/api/react-structure.html)的，可以看这里哦！！
