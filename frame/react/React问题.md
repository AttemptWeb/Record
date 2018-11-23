
### 1. state与props的区别
>* prop用于定义外部接口， state用于记录内部状态 

>**props：一般用于父组件向子组件通信，在组件之间通信使用。**

>**state：一般用于组件内部的状态维护，更新组件内部的数据、状态，更新组件的props等。**

### 2.什么时候class创建组件，什么时候用一个函数创建
>* 需要使用state时，使用class创建组件，而无状态的组件，使用函数创建即可

### 3.什么是shouldComponentUpdate？有啥作用？
>* 它是react生命周期的一员， 用于告诉组件什么时候不需要更新。render和shouldComponentUpdate函数，是react生命周期中唯二两个要求返回结果的函数。shouldComponentUpdate使用得当，可大大提升组件的性能   [shouldComponentUpdate示例参考](http://blog.csdn.net/liwusen/article/details/53908266)

### 4.当组件setState被调用之后，会发生什么？
>* 调用之后, React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程(Reconciliation)。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。 

### 5.为什么利用循环产生的组件中要用上key这个特殊的prop

### 6.setState可以接受函数为参数吗？有啥作用？
```javascript
(prevState, props) => stateChange

prevState是对以前状态的引用。不应该直接突变。相反，应该根据来自prevState和的输入构建一个新对象来表示更改props。例如，假设我们想增加一个状态值props.step：

this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});

如果下一个状态取决于以前的状态，我们建议使用updater函数形式：
this.setState((prevState) => {
  return {counter: prevState.quantity + 1};
});
```
参考：[setState](https://reactjs.org/docs/react-component.html#setstate)

### 7.什么是HoC(Higher-Order-Component)适合那些场景?
>* 高阶组件HoC。它不是react提供的某种API，而是使用react的一种模式，用于增强组件功能  。可应用场景: 操作prop、访问ref、抽取状态、包装组件 

### 8.什么是Fiber?是为了解决什么问题?

### 9.两个并不是父子关系的组件，如何实现相互的消息传递？
