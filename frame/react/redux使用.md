# redux

[redux文档 cn](http://www.redux.org.cn/docs/introduction/ThreePrinciples.html)

redux框架依靠 ```action --> reducer 函数 --> store```,从而达到状态控制的效果。使用redux时可以有多个action，多个reducer 函数，但是只能仅有一个store。

## redux 示例
下面还是以redux在react中的计数器为例子来解说:

在react中使用redux，还需要配合react-redux

#### action
```javascript
<!-- action.js -->
export const ADD_CON= 'ADD_CON';

export function addHome(number) {
    return {
        type: ADD_CON,
        number
    }
}
```
**action在这里就注册了一个动作**，动作的类型type叫做 'ADD_CON', 而且它还附带一个 number 数字属性。

#### reducer
```javascript
<!-- reducer.js  -->
import {
    ADD_CON
} from './action'

export function addCon(state = 0, action) {
    switch (action.type) {
        case ADD_CON:
            return state + 1;
        default:
            return state;
    }
}
```
每一个reducer都是由纯函数构成，而参数中的 **state**、**action**, 前者就是我们需要用到的数据state，后者就表示注册的action行为。 **当触发action动作时，它对应的会发生的行为就是reducer 函数，而reducer函数会对应一个state对象**，每个action都会对应一个reducer 函数。

#### react 中使用redux
```javascript
<!-- cont.js -->
import React from 'react';
import { connect } from 'react-redux';
import { addHome } from '../action'

class Cont extends React.Component {
    constructor(arg) {
        super(...arg);
    }

    render() {
        const { number, dispatch }  =this.props;
        return(
            <div>
                <div onClick={()=> {dispatch(addHome(number))}}>
                    number: {number}
                </div>
            </div>
        ) 
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        number: state.addCon
    }
}

export default connect(mapStateToProps)(Cont)
```
通过 connect 将Cont组件与redux连接起来，而mapStateToProps方法的作用是在当前组件中注入state，而后state将自动的绑定在props属性中，随意使用。如果希望触发action动作，dispatch即可完成，将action作为实参传入，redux会触发对应的ruducer函数。

#### react注入

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider}  from 'react-redux';
import Cont from './Cont'
import { addCon } from './reducer'

const reducer = combineReducers({
    addCon
})

let store = createStore(reducer)

const App = ()=> {
    return (
        <Provider store={store}>
            <Cont />
        </Provider>
    )
}

ReactDOM.hydrate(
    <App />,
    document.getElementById('app')
)
```
通过combineReducers 完成多个reducer函数的注入，createStore创建唯一的store对象，将它注入到react组件中。

action --> reducer 函数 -> state 数据 --> store

