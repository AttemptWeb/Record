# React Hooks 译：5种方法将React类组件转换为具有React Hooks的功能组件

原文链接：[5 Ways to Convert React...](https://scotch.io/tutorials/5-ways-to-convert-react-class-components-to-functional-components-w-react-hooks#toc-class-with-multiple-state-properties)

本文链接：[5种方法将React类组件...]()


在React的最新alpha版本中，引入了一个新概念，它被称为Hooks。Hook被引入React以解决许多问题，如[Hooks 介绍](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)中所解释的那样，它主要用作类的替代方案。使用Hooks，我们可以创建使用状态和生命周期方法的功能组件。

相关阅读：

[Getting Started with React Hooks](https://scotch.io/tutorials/getting-started-with-react-hooks)

[Build a React To-Do App with React Hooks](https://scotch.io/tutorials/build-a-react-to-do-app-with-react-hooks-no-class-components)

## 目录

* [没有状态或生命周期方法的类](##没有状态或生命周期方法的类)

* [class 和 state](##class和state)

* [具有多个状态属性的class](##具有多个状态属性的class)

* [具有state和componentDidMount的class](##具有state和componentDidMount的class)

* [具有state、componentDidMount和componentDidUpdate的class](##具有state、componentDidMount和componentDidUpdate的class)

* 将PureComponent转换为React备忘录

* 结论

钩子是相对较新的，事实上，它仍然是一个功能提议。但是，如果你想玩它并仔细查看它提供的内容，它现在可以使用。Hooks 目前在React v16.7.0-alpha中提供。

值得注意的是，没有计划放弃class类。React Hooks 只是给我们另一种编写React的方法。这是件好事！

鉴于Hooks仍然是新的，许多开发人员尚未掌握其概念或了解如何将其应用于现有的React应用程序，甚至是创建新的React应用程序。在这篇文章中，我们将演示使用React Hooks将React类组件转换为功能组件的5种简单方法。

## 没有状态或生命周期方法的class

让我们从一个既没有状态也没有生命周期组件的简单React类开始。让我们使用一个只在用户点击按钮时提醒姓名的类：

```javascript
import React, { Component } from 'react';

class App extends Component {

  alertName = () => {
    alert('John Doe');
  };

  render() {
    return (
      <div>
        <h3> This is a Class Component </h3>
        <button onClick={this.alertName}> Alert </button>
      </div>
    );
  }
}

export default App;
```

在这里，我们有一个普通的React类，没什么新鲜的，也没有没有状态或任何生命周期方法。它只是在单击按钮时提醒姓名。此类的功能等价于如下所示：

```javascript
import React from 'react';

function App() {
  const alertName = () => {
    alert(' John Doe ');
  };

  return (
    <div>
      <h3> This is a Functional Component </h3>
      <button onClick={alertName}> Alert </button>
    </div>
  );
};

export default App;
```
就像我们之前使用的类组件一样，这里没有什么新的东西。我们甚至没有使用Hooks或任何新的东西。这是因为我们只考虑了一个我们不需要状态或生命周期的例子。但现在让我们改变一下，看一下我们有一个基于类的组件与状态的情况，并看看如何使用Hook将其转换为功能组件。

## class和state

让我们考虑一种情况，我们有一个全局名称变量，在应用程序中通过input输入文本更新变量。在React中，我们通过在state对象中定义name变量来处理这样的情况，并使用setState()在我们有一个新值时来更新name：

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
        <h3> This is a Class Component </h3>
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
      <h3> This is a Functional Component </h3>
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
在这里，我们介绍了useState Hook。它可以作为在React功能组件中使用状态的一种方式。使用```useState()``` Hook，我们已经能够在此功能组件中使用state。它使用与数组的解构赋值类似的语法。考虑这一行：

```javascript
const [name, setName] = useState("John Doe")
```

这里，```name```是普通类组件中```this.state```的等价物，而```setName```是```this.setState```的等价物。```useState()```Hook接受一个参数作为状态的初始值.简单地说，```useState()```参数是状态的初始值。在我们的例子中，我们将其设置为"John Doe"，以便状态中名称的初始状态为"John Doe"。

这主要是如何使用Hooks, 将基于类的React组件与状态转换为功能组件。我们将在后面的示例中看到，还有更多其他有用的方法。

## 具有多个状态属性的class

使用useState轻松转换一个状态属性是一回事，但是，当你必须处理多个状态属性时，相同的方法并不适用。例如，我们有两个或多个userName，firstName和lastName的input字段，那么我们将有一个基于类的组件，其中包含三个状态属性，如下所示：

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
        <h3> This is a Class Component </h3>
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
      <h3> This is a functional Component </h3>

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

这演示了如何使用```useState()```Hook将具有多个状态属性的基于类的组件转换为功能组件。

这个例子在[Codesandbox](https://codesandbox.io/s/ypjynxx16x)中.

## 具有state和componentDidMount的class

让我们考虑一个只有state和componentDidMount的类。为了演示这样一个类，让我们创建一个场景，我们为三个字段设置初始状态，并让它们在5秒后更新为不同的值。

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
        <h3> The text fields will update in 5 seconds </h3>
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

当应用程序运行时，字段将具有我们在状态对象中定义的初始值。然后，这些值将更新为我们在5秒后在```componentDidMount（）```方法中定义的值。现在，让我们使用React ```useState```和```useEffect``` Hooks将此类转换为功能组件。

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
      <h3> The text fields will update in 5 seconds </h3>
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

该组件与前一个组件完全相同。唯一的区别是，我们使用```useState```和```useEffect Hooks```，而不是像在类组件中那样使用传统的```state```对象和```componentDidMount（）```生命周期方法。这个例子在[Codesanbox](https://codesandbox.io/s/jzoz2n97my)中。

## 具有state、componentDidMount和componentDidUpdate的class

接下来，让我们看一下具有状态和两个生命周期方法的React类。到目前为止，您可能已经注意到我们大部分时间都在使用```useState``` Hook。在这个例子中，让我们关注```useEffect`` Hook

为了最好地演示这是如何工作的，让我们用代码来动态更新页面的<h3>标题。首先<h3>标题是```This is a Class Component```。然后我们将定义一个```componentDidMount（）```方法来更新<h3>标题，3秒后更新为```Welcome to React Hooks```：

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
