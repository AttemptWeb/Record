## redux应用状态数据管理

阅读完[reactjs小书](http://huziketang.mangojuice.top/books/react/lesson30)的第三阶段，希望将redux部分的内容写下来，让自己理解的更加透彻，所以下面的内容算是对[reactjs小书](http://huziketang.mangojuice.top/books/react/lesson30)的第三阶段的整理。

Redux，常被用来管理react的数据服务。而redux本身是一种新型的前端“架构模式”，是应用状态管理服务，它解决的是**应用模块之间需要共享访问的数据问题**。当然它不是仅仅局限于对react数据管理，jq、angular、vue也可以配合使用。

## 优雅的修改共享数据
下面我们来一个例子：
```javascript
// index.html
<body>
    <div id="content"></div>
    <div id="content1"></div>
<body>

// index.js
const appStore = {
    content: {
        text: 'react 小书整理',
        color: 'blue'
    },
    content1: {
        text: 'react 小书整理1',
        color: 'red'
    }
}

function render(content) {
    const contentDOM = document.getElementById(content.id)
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

function renderApp() {
    render(appState.content)
    render(appState.content1)
}

renderApp();
```

上面是一个很简单的 App，但是它存在一个重大的隐患，我们渲染数据的时候，使用的是一个共享状态 appState，**每个人都可以修改它**。假设需要在**renderApp**之前做了一系列其他操作：
```
loadDataServer();
doSomethingUnexpected()
doSomthingMore()
// ...
renderApp(appState)
```
**renderApp** 函数运行之前，你根本不知道它们会对 **appState** 做什么事情，renderApp(appState) 的结果根本没法得到保障。**一个可以被不同模块任意修改共享的数据状态就是魔鬼**。出现问题的时候 debug 起来就非常困难，这也是老生常谈的尽量避免全局变量

![img1](https://didiheng.com/Img/CA34AC20-F3C0-438F-AD64-66C5E0986669.png)

那么我们需要解决这个问题。我们专门来定义一个函数，叫 dispatch，它专门负责数据的修改：
```javascript
// index.js
function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_CONTENT_TEXT':
      appState.content.text = action.text
      break
    case 'UPDATE_CONTENT_COLOR':
      appState.content.color = action.color
      break
    default:
      break
  }
}
```
**所有对数据的操作必须通过 dispatch 函数**。它接受一个参数 action，这个 action 是一个普通的 JavaScript 对象，里面必须包含一个 type 字段来声明你到底想干什么。

任何的模块如果想要修改 appState.title.text，必须大张旗鼓地调用 dispatch：
```
dispatch({ type: 'UPDATE_CONTENT_TEXT', text: '《React.js 小书》' }) // 修改内容文本
dispatch({ type: 'UPDATE_CONTENT_COLOR', color: 'blue' }) // 修改内容颜色
```

![img2](https://didiheng.com/img/7536BBF9-6563-4FD5-8359-28D3A5254EE7.png)

本节完整代码：
```javascript
// index.js
let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}

function renderApp (appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

renderApp(appState) // 首次渲染页面
dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
renderApp(appState) // 把新的数据渲染到页面上
```

下载可以通过 dispatch 触发 appState 的修改。下面将会把这种 dispatch 的模式抽离出来，让它变得更加通用。

## 抽离store和监控数据变化

上面的dispatch 和 appState, 我们希望集中在一个地方. 我们通过 createStore 函数来创建这个地方，它叫做store。

```javascript
function createStore (state, stateChanger) {
  const getState = () => state
  const dispatch = (action) => stateChanger(state, action)
  return { getState, dispatch }
}
```
createStore函数 接受两个参数，表示前者表示应用程序状态 state， 后者是 stateChanger，描述应用程序状态根据 action 发生什么的变化，其实就是相当第一节的 dispatch 代码里面的内容。






