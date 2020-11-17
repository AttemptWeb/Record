# React组件的生命周期

**生命周期共提供了 ~~10~~ 个不同的API。**

## 首次实例化

- [constructor()](##constructor())
- [static getDerivedStateFromProps() **16.4 New**](##static-getderivedstatefromprops-164-new)
- componentWillMount / UNSAFE_componentWillMount() **16.4 废弃**
- [render](##render())
- [componentDidMount](##componentDidMount)

## 存在期
**组件已存在时的状态改变**
- ~~componentWillReceiveProps / UNSAFE_componentWillReceiveProps()~~ **16.4 废弃** 
- [static getDerivedStateFromProps() **16.4 New**](##static-getderivedstatefromprops-164-new)
- [shouldComponentUpdate](##shouldComponentUpdate)
- ~~componentWillUpdate / UNSAFE_componentWillUpdate()~~ **16.4 废弃** 
- [render](##render())
- [getSnapshotBeforeUpdate **16.4 New**](##getSnapshotBeforeUpdate())
- [componentDidUpdate](##componentDidUpdate)

## 销毁&清理期
- [componentWillUnmount](##componentWillUnmount)

## 生命周期API

### constructor()

```javascript
constructor(props)
```
在 React 组件挂载之前，会调用它的构造函数。
> [生命周期：constructor()](https://zh-hans.reactjs.org/docs/react-component.html#constructor)

### static getDerivedStateFromProps() 16.4 New

```javascript
static getDerivedStateFromProps(props, state)
```
getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
> [生命周期：static getDerivedStateFromProps()](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

## componentWillMount() 16.4废弃

```javascript
componentWillMount()
```
componentWillMount()在挂载发生之前立即调用。在之前render()调用，因此setState()在此方法中同步调用不会触发额外的渲染
> [生命周期：componentWillMount()](https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.com/docs/react-component.html#componentwillmount)

## componentWillReceiveProps() 16.4废弃

```javascript
componentWillReceiveProps(nextProps)
componentWillReceiveProps(nextProps) {
    if (nextProps.bool) {
        this.setState({
            bool: true
        });
    }
}
```
componentWillReceiveProps()在已安装的组件接收新props之前调用
> [生命周期：componentWillReceiveProps(nextProps)](https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.com/docs/react-component.html#componentwillreceiveprops)

### shouldComponentUpdate()
```javascript
shouldComponentUpdate(nextProps, nextState)
```
根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
> [生命周期：shouldComponentUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)

### componentWillUpdate() 16.4废弃

```javascript
componentWillUpdate(nextProps, nextState)
```
componentWillUpdate()当接收到新的道具或状态时，会在渲染之前立即调用。以此为契机在更新发生之前进行准备。初始渲染不调用此方法.
> [生命周期：componentWillUpdate()](https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.com/docs/react-component.html#componentwillupdate)

### render()
```javascript
render()
```
必选的方法，创建虚拟DOM，该方法具有特殊的规则：
只能通过this.props和this.state访问数据
可以返回null、false或任何React组件
只能出现一个顶级组件（不能返回数组）
不能改变组件的状态
不能修改DOM的输出
> [生命周期：render()](https://zh-hans.reactjs.org/docs/react-component.html#render)

### componentDidMount
```javascript
componentDidMount()
```
真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。**在服务端中，该方法不会被调用**
> [生命周期：componentDidMount()](https://zh-hans.reactjs.org/docs/react-component.html#componentdidmount)

### getSnapshotBeforeUpdate() 16.4 New
```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```
getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate().
> [生命周期：getSnapshotBeforeUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

## componentDidUpdate
```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```
componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。
> [生命周期：componentDidUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)

## componentWillUnmount
```javascript
componentWillUnmount()
```
componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
> [生命周期：componentWillUnmount()](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)

## 更新方式

**在react中，触发render的有4条路径。**

以下假设shouldComponentUpdate都是按照默认返回true的方式。

> 1.首次渲染Initial Render

> 2.调用this.setState

> 3.父组件发生更新

> 4.调用this.forceUpdate

下面是react16之前的更新：

![](https://didiheng.com/Img/react_Update.png)

**react16.3生命周期图👇下面**，目前生命周期在16.4时再次修改，可以点击链接查看对比[React 生命周期图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
![](https://pic3.zhimg.com/v2-ee102ce9ad7399fc98d56a0b7eb7efc6_r.jpg)
