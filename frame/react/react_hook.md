# [译] 5种方法将React类组件转换为具有React Hooks的功能组件

[原文地址: 5 Ways to Convert React Class Components to Functional Components w/ React Hooks](https://scotch.io/tutorials/5-ways-to-convert-react-class-components-to-functional-components-w-react-hooks)

[本文永久链接: https://github.com/AttemptWeb/Record/blob/master/frame/react/react_hook.md](https://github.com/AttemptWeb/Record/blob/master/frame/react/react_hook.md)


在React的最新alpha版本中，引入了一个新概念，它被称为Hooks。React引入Hook可以用来解决[许多问题](https://reactjs.org/docs/hooks-intro.html#motivation)，如[Hooks 介绍](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)中所阐述的那样，它主要用作类(class)的替代方案。使用Hooks，我们可以创建使用状态(state)和生命周期方法的功能组件。

相关阅读：

[Getting Started with React Hooks](https://scotch.io/tutorials/getting-started-with-react-hooks)

[Build a React To-Do App with React Hooks](https://scotch.io/tutorials/build-a-react-to-do-app-with-react-hooks-no-class-components)

## 目录

* [没有state或生命周期方法的class](##没有state或生命周期方法的class)

* [class 和 state](##class和state)

* [具有多个state属性的class](##具有多个state属性的class)

* [具有state和componentDidMount的class](##具有state和componentDidMount的class)

* [具有state、componentDidMount和componentDidUpdate的class](##具有state、componentDidMount和componentDidUpdate的class)

* [将PureComponent转换为React memo](##将PureComponent转换为React.memo)

* [结论](##结论)

钩子是个相对较新的功能；实际上，它目前仍是一个功能提议。但是，如果你想玩它并仔细查看它提供的内容，它现在可以使用。Hooks 目前在React v16.7.0-alpha中提供。(*EastSummer:[事实上官方还是建议在16.8.0中使用](https://reactjs.org/docs/hooks-faq.html#which-versions-of-react-include-hooks)*)

值得注意的是，官方并没有计划放弃class类。React Hooks 只是给我们另一种编写React的方法。这是件好事！

鉴于Hooks仍是个较新的概念，许多开发人员尚未掌握其概念，或是不知如何将其应用于现有的React应用程序，甚至是用在新创建的React应用程序中。在这篇文章中，我们将演示使用React Hooks转换React类组件为功能组件的5种简单方法。

## 没有state或生命周期方法的组件

让我们从一个既没有state也没有生命周期组件的简单React组件开始。让我们创建一个只在用户点击按钮时提醒姓名的组件：

```javascript
import React, { Component } from 'react';

class App extends Component {

  alertName = () => {
    alert('John Doe');
  };

  render() {
    return (
      <div>
        ```<h3>``` This is a Class Component </h3>
        <button onClick={this.alertName}> Alert </button>
      </div>
    );
  }
}

export default App;
```

在这里，我们有一个普通的React组件，没什么新鲜的，也没有没有state或任何生命周期方法。(*EastSummer:一般我们会称他无状态组件*)它只是在单击按钮时提醒姓名。此组件的功能等价于如下所示：

```javascript
import React from 'react';

function App() {
  const alertName = () => {
    alert(' John Doe ');
  };

  return (
    <div>
      ```<h3>``` This is a Functional Component </h3>
      <button onClick={alertName}> Alert </button>
    </div>
  );
};

export default App;
```
就像我们之前使用的类组件一样，这里没有什么新的东西。我们甚至没有使用Hooks或任何新的东西。这是因为我们只考虑了一个我们不需要state或生命周期的例子。但现在让我们改变一下，看一下我们有一个基于类的拥有state状态的组件的情况，并看看如何使用Hook将其转换为功能组件。

## 拥有state状态的class组件

让我们考虑这么一种情况，我们有一个全局名称变量，在应用程序中通过input输入文本更新变量。在React中，我们通过在state对象中定义name变量来处理这样的情况，并使用setState()在我们有一个新值时来更新name：

```javascript
import React, { Component } from 'react';

class App extends Component {
  state = {
      name: ''
  }

  alertName = () => {
    alert(this.state.name);
  };

  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div>
        ```<h3>``` This is a Class Component </h3>
        <input
          type="text"
          onChange={this.handleNameInput}
          value={this.state.name}
          placeholder="Your name"
        />
        <button onClick={this.alertName}> Alert </button>
      </div>
    );
  }
}

export default App;
```

当用户在input中输入文本并单击 button 按钮时，它会以alert 弹窗的形式提示我们名称。当然，这是一个简单的React概念，但是，我们可以使用这样的Hook将整个类转换为功能性的React组件：

```javascript
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('John Doe');

  const alertName = () => {
    alert(name);
  };

  const handleNameInput = e => {
    setName(e.target.value);
  };

  return (
    <div>
      ```<h3>``` This is a Functional Component </h3>
      <input
        type="text"
        onChange={handleNameInput}
        value={name}
        placeholder="Your name"
      />
      <button onClick={alertName}> Alert </button>
    </div>
  );
};

export default App;
```
在这里，我们介绍了useState Hook。它可以作为在React功能组件中使用state的一种方式。使用```useState()``` Hook，我们已经能够在此功能组件中使用state。它使用与数组的解构赋值类似的语法。参考这一行：

```javascript
const [name, setName] = useState("John Doe")
```

这里，```name```是普通类组件中```this.state```的等价物，而```setName```是```this.setState```的等价物。```useState()```Hook接受一个参数作为state的初始值.简单地说，```useState()```参数是state的初始值。在我们的例子中，我们将其设置为"John Doe"，即state中name的初始state为"John Doe"。

这主要是如何使用Hooks, 将基于类的React组件与state转换为功能组件。我们将在后面的示例中看到，还有更多其他有用的方法。

## 具有多个state属性的class

使用useState轻松转换一个state属性是一回事，但是，如果你必须处理多个state属性时，相同的方法并不适用。例如，我们有两个或多个userName，firstName和lastName的input字段，那么我们将有一个基于类的组件，其中包含三个state属性，如下所示：

```javascript
import React, { Component } from 'react';

class App extends Component {

    state = {
      userName: '',
      firstName: '',
      lastName: ''
    };

  logName = () => {
    // do whatever with the names ... let's just log them here
    console.log(this.state.userName);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
  };

  handleUserNameInput = e => {
    this.setState({ userName: e.target.value });
  };
  handleFirstNameInput = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameInput = e => {
    this.setState({ lastName: e.target.value });
  };

  render() {
    return (
      <div>
        ```<h3>``` This is a Class Component </h3>
        <input
          type="text"
          onChange={this.handleUserNameInput}
          value={this.state.userName}
          placeholder="Your username"
        />
        <input
          type="text"
          onChange={this.handleFirstNameInput}
          value={this.state.firstName}
          placeholder="Your firstname"
        />
        <input
          type="text"
          onChange={this.handleLastNameInput}
          value={this.state.lastName}
          placeholder="Your lastname"
        />
        <button className="btn btn-large right" onClick={this.logName}>
          {' '}
          Log Names{' '}
        </button>
      </div>
    );
  }
}

export default App;
```

要将此类转换为带有Hook的功能组件，我们必须采取一些非常规的路线。使用```useState()```Hook，上面的例子可以写成：

```javascript
import React, { useState } from 'react';

function App() {

  const [userName, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');

  const logName = () => {
    // do whatever with the names... let's just log them here
    console.log(userName);
    console.log(firstName);
    console.log(lastName);
  };

  const handleUserNameInput = e => {
    setUsername(e.target.value);
  };
  const handleFirstNameInput = e => {
    setFirstname(e.target.value);
  };
  const handleLastNameInput = e => {
    setLastname(e.target.value);
  };

  return (
    <div>
      ```<h3>``` This is a functional Component </h3>

      <input
        type="text"
        onChange={handleUserNameInput}
        value={userName}
        placeholder="username..."
      />
      <input
        type="text"
        onChange={handleFirstNameInput}
        value={firstName}
        placeholder="firstname..."
      />
      <input
        type="text"
        onChange={handleLastNameInput}
        value={lastName}
        placeholder="lastname..."
      />
      <button className="btn btn-large right" onClick={logName}>
        {' '}
        Log Names{' '}
      </button>
    </div>
  );
};

export default App;
```

这演示了如何使用```useState()```Hook将具有多个state属性的基于类的组件转换为功能组件。

这个例子在[Codesandbox](https://codesandbox.io/s/ypjynxx16x)中.

## 具有state和componentDidMount的class

让我们考虑一个只有state和componentDidMount的类。为了演示这样一个类，让我们创建一个场景，我们为三个字段设置初始state，并让它们在5秒后更新为不同的值。

```javascript
import React, { Component, useEffect } from 'react';

class App extends Component {
    state = {
      // initial state
      userName: 'JD',
      firstName: 'John',
      lastName: 'Doe'
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        // update state
        userName: 'MJ',
        firstName: 'Mary',
        lastName: 'jane'
      });
    }, 5000);
  }

  logName = () => {
    // do whatever with the names ... let's just log them here
    console.log(this.state.userName);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
  };

  handleUserNameInput = e => {
    this.setState({ userName: e.target.value });
  };
  handleFirstNameInput = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameInput = e => {
    this.setState({ lastName: e.target.value });
  };

  render() {
    return (
      <div>
        ```<h3>``` The text fields will update in 5 seconds </h3>
        <input
          type="text"
          onChange={this.handleUserNameInput}
          value={this.state.userName}
          placeholder="Your username"
        />
        <input
          type="text"
          onChange={this.handleFirstNameInput}
          value={this.state.firstName}
          placeholder="Your firstname"
        />
        <input
          type="text"
          onChange={this.handleLastNameInput}
          value={this.state.lastName}
          placeholder="Your lastname"
        />
        <button className="btn btn-large right" onClick={this.logName}>
          {' '}
          Log Names{' '}
        </button>
      </div>
    );
  }
}

export default App;
```

当应用程序运行时，字段将具有我们在state对象中定义的初始值。然后，这些值将更新为我们在```componentDidMount()```方法中定义的5秒后的值。现在，让我们使用React中的```useState```和```useEffect```Hooks将此类转换为功能组件。

```javascript
import React, { useState, useEffect } from 'react';

function App() {

  const [userName, setUsername] = useState('JD');
  const [firstName, setFirstname] = useState('John');
  const [lastName, setLastname] = useState('Doe');

  useEffect(() => {
    setInterval(() => {
      setUsername('MJ');
      setFirstname('Mary');
      setLastname('Jane');
    }, 5000);
  });

  const logName = () => {
    // do whatever with the names ...
    console.log(this.state.userName);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
  };

  const handleUserNameInput = e => {
    setUsername({ userName: e.target.value });
  };
  const handleFirstNameInput = e => {
    setFirstname({ firstName: e.target.value });
  };
  const handleLastNameInput = e => {
    setLastname({ lastName: e.target.value });
  };

  return (
    <div>
      ```<h3>``` The text fields will update in 5 seconds </h3>
      <input
        type="text"
        onChange={handleUserNameInput}
        value={userName}
        placeholder="Your username"
      />
      <input
        type="text"
        onChange={handleFirstNameInput}
        value={firstName}
        placeholder="Your firstname"
      />
      <input
        type="text"
        onChange={handleLastNameInput}
        value={lastName}
        placeholder="Your lastname"
      />
      <button className="btn btn-large right" onClick={logName}>
        {' '}
        Log Names{' '}
      </button>
    </div>
  );
};

export default App;
```

该组件与前一个组件效果完全相同。唯一的区别是，我们使用了```useState```和```useEffect```Hooks，而不是像在类组件中那样使用传统的```state```对象和```componentDidMount()```生命周期方法。这个例子在[Codesanbox](https://codesandbox.io/s/jzoz2n97my)中。

## 具有state、componentDidMount和componentDidUpdate的class

接下来，让我们看一下具有state和两个生命周期方法的React类。到目前为止，你可能已经注意到我们大部分时间都在使用```useState``` Hook。在这个例子中，让我们关注```useEffect``` Hook

为了更好地演示这是如何工作的，让我们用代码来动态更新页面的```<h3 />```标题。首先```<h3 />```标题是```This is a Class Component```。然后我们将定义一个```componentDidMount()```方法来更新```<h3 />```标题，3秒后更新为```Welcome to React Hooks```：

```javascript
import React, { Component } from 'react';

class App extends Component {
  state = {
      header: 'Welcome to React Hooks'
  }

  componentDidMount() {
    const header = document.querySelectorAll('#header')[0];
    setTimeout(() => {
      header.innerHTML = this.state.header;
    }, 3000);
  }

  logName = () => {
    // do whatever with the names ...
  };

  // { ... }

  render() {
    return (
      <div>
        <h3 id="header"> This is a Class Component </h3>
        <input
          type="text"
          onChange={this.handleUserNameInput}
          value={this.state.userName}
          placeholder="Your username"
        />
        <input
          type="text"
          onChange={this.handleFirstNameInput}
          value={this.state.firstName}
          placeholder="Your firstname"
        />
        <input
          type="text"
          onChange={this.handleLastNameInput}
          value={this.state.lastName}
          placeholder="Your lastname"
        />
        <button className="btn btn-large right" onClick={this.logName}>
          {' '}
          Log Names{' '}
        </button>
      </div>
    );
  }
}

export default App;
```
此时，当程序运行时，它以初始值```header```开始。这是一个Class Component，并在3秒后更改为```Welcome to React Hooks```。这是componentDidMount()行为，因为它在成功执行render函数后运行。

如果我们想要从另一个输入字段动态更新```header```，那么当我们输入时，```header```会使用新文本进行更新。为此，我们还需要实现componentDidUpdate()生命周期方法，如下所示：

```javascript
import React, { Component } from 'react';

class App extends Component {
  state = {
      header: 'Welcome to React Hooks'
  }
  
  componentDidMount() {
    const header = document.querySelectorAll('#header')[0];
    setTimeout(() => {
      header.innerHTML = this.state.header;
    }, 3000);
  }

  componentDidUpdate() {
    const node = document.querySelectorAll('#header')[0];
    node.innerHTML = this.state.header;
  }

  logName = () => {
    // do whatever with the names ... let's just log them here
    console.log(this.state.username);
  };

  // { ... }

  handleHeaderInput = e => {
    this.setState({ header: e.target.value });
  };

  render() {
    return (
      <div>
        <h3 id="header"> This is a Class Component </h3>
        <input
          type="text"
          onChange={this.handleUserNameInput}
          value={this.state.userName}
          placeholder="Your username"
        />
        <input
          type="text"
          onChange={this.handleFirstNameInput}
          value={this.state.firstName}
          placeholder="Your firstname"
        />
        <input
          type="text"
          onChange={this.handleLastNameInput}
          value={this.state.lastName}
          placeholder="Your lastname"
        />
        <button className="btn btn-large right" onClick={this.logName}>
          {' '}
          Log Names{' '}
        </button>
        <input
          type="text"
          onChange={this.handleHeaderInput}
          value={this.state.header}
        />{' '}
      </div>
    );
  }
}

export default App;
```
这里，我们用```state```，```componentDidMount()```和```componentDidUpdate()```。到目前为止，当你运行应用程序时，标头会在3秒后更新为```Welcome to React Hooks```，因为我们已在```componentDidMount()```中定义。然后，当你开始在标题文本输入字段时，```<h3 />```文本将使用componentDidUpdate()方法中定义的输入文本进行更新。现在让我们使用```useEffect()```Hook将此类转换为功能组件。

```javascript
import React, { useState, useEffect } from 'react';

function App() {

  const [userName, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [header, setHeader] = useState('Welcome to React Hooks');

  const logName = () => {
    // do whatever with the names...
    console.log(userName);
  };

  useEffect(() => {
    const newheader = document.querySelectorAll('#header')[0];
    setTimeout(() => {
      newheader.innerHTML = header;
    }, 3000);
  });

  const handleUserNameInput = e => {
    setUsername(e.target.value);
  };
  const handleFirstNameInput = e => {
    setFirstname(e.target.value);
  };
  const handleLastNameInput = e => {
    setLastname(e.target.value);
  };
  const handleHeaderInput = e => {
    setHeader(e.target.value);
  };

  return (
    <div>
      <h3 id="header"> This is a functional Component </h3>

      <input
        type="text"
        onChange={handleUserNameInput}
        value={userName}
        placeholder="username..."
      />
      <input
        type="text"
        onChange={handleFirstNameInput}
        value={firstName}
        placeholder="firstname..."
      />
      <input
        type="text"
        onChange={handleLastNameInput}
        value={lastName}
        placeholder="lastname..."
      />
      <button className="btn btn-large right" onClick={logName}>
        {' '}
        Log Names{' '}
      </button>
      <input type="text" onChange={handleHeaderInput} value={header} />
    </div>
  );
};

export default App;
```
我们使用```useEffect()```Hook实现了完全相同的功能。有些人会说，它更好或更干净，因为在这里，我们不必为```componentDidMount()```和```componentDidUpdate()```编写单独的代码。使用```useEffect()```Hook，我们可以实现这两个功能。这是因为默认情况下，```useEffect()```在**初始渲染之后**和**每次后续更新之后**运行。可在[CodeSandbox](https://codesandbox.io/embed/ork242q3y)上查看此示例。

## 将PureComponent转换为React.memo

[React PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)的工作方式与[Component](https://reactjs.org/docs/react-api.html#reactcomponent)类似。它们之间的主要区别在于```React.Component```没有实现```shouldComponentUpdate()```生命周期方法，而```React.PureComponent```实现了它(React.Component需要显示的调用，而React.PureComponent已经集成了这个方法)。如果Application的```render()```函数在给定相同的```props```和```state```的情况下呈现相同的结果，则可以在某些情况下使用React.PureComponent来提高性能。

相关阅读：

[React 16.6: React.memo() for Functional Components Rendering Control](https://scotch.io/tutorials/react-166-reactmemo-for-functional-components-rendering-control)(React 16.6：React.memo()用于功能组件渲染控制)

同样的事情适用于```React.memo()```。虽然前者指的是基于类的组件，但```React moemo```是指功能组件,当你的函数组件在给定相同的```props```时呈现相同的结果时，你可以将其包装在调用中```React.memo()```以增强性能。使用PureComponent和React.memo()为React App提供了相当大的性能提升，因为它减少了应用程序中的渲染操作数量。

在这里，我们将演示如何将```PureComponent Class```组件转换为```React memo```组件。为了理解它们究竟是做什么的，首先，让我们模拟一个可怕的情况，即一个组件每2秒渲染一次，或者没有value或state发生变化。我们可以像这样快速创建这个场景：

```javascript
import React, { Component } from 'react';

function Unstable(props) {
  // monitor how many times this component is rendered
  console.log(' Rendered this component ');
  return (
    <div>
      <p> {props.value}</p>
    </div>
  );
};

class App extends Component {
  state = {
    value: 1
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: 1 };
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Unstable value={this.state.value} />
      </div>
    );
  }
}
export default App;
```

当你运行```app```并检查```logs```时，你会注意到它每2秒渲染一次该组件，而state或props没有任何变化。虽然很糟糕，但这正是我们想要创建的场景，因此我们可以向你展示如何使用```PureComponent```和```React.memo()```来修复它。

![png](https://didiheng.com/Img/axewcayr0gcyrtqf6kch.png)

大多数情况下，我们只想在state或props发生变化时重新渲染组件。既然我们已经经历了这种糟糕的情况，那么让我们用```PureComponent```来修复它，这样，只有在state或props发生变化时，组件才会重新呈现。我们通过导入```PureComponent```并像这样扩展它来实现这一点：

```javascript
import React, { PureComponent } from 'react';

function Unstable(props) {
  console.log(' Rendered Unstable component ');
  return (
    <div>
      <p> {props.value}</p>
    </div>
  );
};

class App extends PureComponent {
  state = {
    value: 1
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: 1 };
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Unstable value={this.state.value} />
      </div>
    );
  }
}
export default App;
```

现在，如果再次运行应用程序，则只能获得初始渲染。之后没有其他事情发生，为什么？好吧，而不是```class App extends Component{}```, 现在我们有```class App extends PureComponent{}```

![](https://didiheng.com/Img/qlnjj9e95jy7qb3c4spd.png)

这解决了我们重新渲染组件的问题，而不考虑当前状态。但是，如果我们更改此方法：

```javascript
  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: 1 };
      });
    }, 2000);
  }
```
修改为：

```javascript
  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: Math.random() };
      });
    }, 2000);
  }
```

每次值更新为下一个随机数时，组件将重新呈现。因此，```PureComponent```可以在state 或 props发生变化时仅重新渲染组件。现在让我们看看如何使用```React.memo()```来实现相同的修复。要使用```React memo```执行此操作，只需使用```React.memo()```包装组件，如下所示：

```javascript
import React, { Component } from "react";

const Unstable = React.memo(function Unstable (props) {
  console.log(" Rendered Unstable component ");
  return <div>{props.val} </div>;
});

class App extends Component {
  state = {
    val: 1
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ val: 1 });
    }, 2000);
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Unstable val={this.state.val} />
        </header>
      </div>
    );
  }
}

export default App;
```

这实现了与```PureComponent```相同的结果。因此，组件仅在初始渲染后呈现，并且在```state``` 或 ```props```发生更改之前不会再次重新渲染。这是此示例的[Codesandbox](https://codesandbox.io/s/100zmv7ljj)。


## 结论

在这篇文章中，我们演示了一些使用React Hooks将现有的基于类的组件转换为功能组件的方法。我们还研究了将```React PureComponent```类转换为```React.memo()```的特殊情况。这可能是显而易见的，但我仍然觉得有必要提一下，为了在您的应用程序中使用Hook，您需要将React更新为支持的版本：

```javascript
    "react": "^16.7.0-alpha",
    "react-dom": "^16.7.0-alpha",
```
[react@16.7.0-alpha](https://github.com/facebook/react/releases/tag/v16.7.0)

React Hooks仍然是一个功能提议，然而，我们希望它将成为下一个稳定版本的一部分，因为它使我们可以吃我们的蛋糕（在函数组件中使用状态），并且仍然保留它（保留编写函数组件的简单性）。


## 后记
有能力的话，我还是建议去看[官方文档](https://reactjs.org/docs/hooks-intro.html)，因为示例更为详尽。  
同时感谢HerryLo的翻译（<ゝω・）～☆。



