---
sidebar_position: 12
---

# React

## Hello World

React 就是用来代替 DOM 的

`React.createElement()`

- 用来创建一个 React 元素
- 参数：
  - 元素名(组件名)
  - 元素中的属性
  - 元素的子元素(内容)

`ReactDOM.createRoot()`

- 用来创建 React 根元素，需要一个 DOM 元素作为参数

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入React的核心库 -->
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <!-- 引入React的DOM库 -->
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      // 通过DOM向页面中添加一个div
      // const div = document.createElement('div')
      // div.innerText = '我是一个div'
      // const root = document.getElementById('root')
      // root.appendChild(div)

      // 通过React向页面中添加一个div
      // 创建一个React元素
      const div = React.createElement('div', {}, '我是React创建的div')
      // 创建React根元素
      const root = ReactDOM.createRoot(document.getElementById('root'))
      // 将div渲染到根元素中
      root.render(div)
    </script>
  </body>
</html>
```

## 三个 API

`React.createElement()`

- 用来创建一个 React 元素
- 参数：
  - 元素的名称(HTML 标签必须小写)
  - 标签中的属性
    - class 属性需要使用 className 来设置
    - 在设置事件时，属性名需要修改为驼峰命名法
  - 元素的内容(子元素)
- 注意点：
  - React 元素最终会通过虚拟 DOM 转换为真实的 DOM 元素
  - React 元素一旦创建就无法修改，只能通过新创建的元素进行替换

修改 React 元素后，必须重新对根元素进行渲染，当调用 render 渲染页面时，React 会自动比较两次渲染的元素，只在真实 DOM 中更新发生变化的部分，没发生变化的部分保持不变

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
  </head>
  <body>
    <button id="btn2">按钮</button>
    <div id="root"></div>

    <script>
      // 创建一个React元素
      const button = React.createElement(
        'button',
        {
          id: 'btn',
          type: 'button',
          className: 'hello',
          onClick: () => {
            alert(111)
          },
        },
        '点我一下'
      )
      const div = React.createElement('div', {}, '我是一个div', button)
      // 获取根元素
      const root = ReactDOM.createRoot(document.getElementById('root'))
      // 将元素在根元素中显示
      root.render(div)

      const button2 = document.getElementById('btn2')
      button2.addEventListener('click', () => {
        // 点击按钮后，修改div中button的文字为click me
        const button = React.createElement(
          'button',
          {
            id: 'btn',
            type: 'button',
            className: 'hello',
            onClick: () => {
              alert(111)
            },
          },
          'click me'
        )
        const div = React.createElement('div', {}, '我是一个div', button)
        root.render(div)
      })
    </script>
  </body>
</html>
```

`ReactDOM.createRoot()`

- 用来创建 React 的根容器，容器用来放置 React 元素

`root.render()`

- 用来将 React 元素渲染到根元素中
- 根元素中所有的内容都会被删除，被 React 元素所替换
- 当重复调用 render()时，React 会将两次的渲染结果进行比较，它会确保只修改那些发生变化的元素，对 DOM 做最少的修改

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      const button = React.createElement(
        'button',
        {
          id: 'btn',
          type: 'button',
          className: 'hello',
          onClick: () => {
            alert(111)
          },
        },
        '点我一下'
      )
      const div = React.createElement('div', {}, '我是一个div', button)

      // 老版本的React中使用的方法
      // ReactDOM.render(div, document.getElementById('root'))

      const root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(div)
    </script>
  </body>
</html>
```

## JSX 简介

声明式编程，结果导向的编程，在 React 中可以通过 JSX(JS 扩展)来创建 React 元素，JSX 需要被翻译为 JS 代码，才能被 React 执行，要在 React 中使用 JSX，必须引入 babel 来完成翻译工作，JSX 就是 React.createElement()的语法糖，JSX 在执行之前都会被 babel 转换为 js 代码

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
    <!-- 引入babel -->
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.23.8/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <!-- 设置js代码被babel处理 -->
    <script type="text/babel">
      // 创建一个React元素 <button>点我一下</button>

      // 命令式编程
      // const button = React.createElement('button', {}, '点我一下')

      // 声明式编程
      const button = (
        <div>
          我是一个div
          <button>点我一下</button>
        </div>
      )
      const root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(button)
    </script>
  </body>
</html>
```

## JSX 的注意事项

- JSX 不是字符串，不要加引号
- JSX 中 HTML 标签应该小写，React 组件应该大写开头
- JSX 中有且只有一个根标签
- JSX 的标签必须正确结束(自结束标签必须写 / )
- 在 JSX 中可以使用{}嵌入表达式，有值的语句就是表达式
- 如果表达式是 null、布尔值、undefined，将不会显示
- 在 JSX 中，属性可以直接在标签中设置
- 注意：
  - class 需要使用 className 代替
  - style 中必须使用对象设置
  - 例如：`style={{ backgroundColor: '#bfa' }}`

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.23.8/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const name = '孙悟空'
      function fn() {
        return 'hello'
      }

      const div = (
        <div
          id="box01"
          onClick={() => {
            alert('哈哈')
          }}
          className="box02"
          style={{ backgroundColor: '#bfa' }}
        >
          我是一个div
          <div>
            <button>点我一下</button>
          </div>
          <div>
            <input type="text" />
          </div>
          <div>{name}</div>
          <div>{1 + 1}</div>
          <div>{fn()}</div>
        </div>
      )
      const root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(div)
    </script>
  </body>
</html>
```

## 渲染列表

\{\} 只能用来放 js 表达式，而不能放语句(if for)，但是在语句中是可以去操作 JSX 的

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.23.8/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const name = '孙悟空'
      const language = 'en'
      let div

      if (language === 'en') {
        div = <div>Hello {name}</div>
      } else if (language === 'zh') {
        div = <div>你好，{name}</div>
      }

      const data = ['孙悟空', '猪八戒', '沙和尚']
      const arr = data.map((item) => <li>{item}</li>)
      const ul = <ul>{arr}</ul>

      const root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(ul)
    </script>
  </body>
</html>
```

## 虚拟 DOM

在 React 中我们操作的元素被称为 React 元素，并不是真正的原生 DOM 元素，React 通过虚拟 DOM 将 React 元素和原生 DOM 进行映射，虽然操作的是 React 元素，但是这些操作最终都会在真实 DOM 中体现出来

虚拟 DOM 的好处：

- 降低 API 复杂度
- 解决兼容问题
- 提升性能(减少 DOM 的不必要操作)

每当我们调用 root.render()时，页面就会发生重新渲染，React 会通过 diffing 算法，将新的元素和旧的元素进行比较，通过比较找到发生变化的元素，并且只对变化的元素进行修改，没有发生变化的不予处理

比较两次数据时，React 会先比较父元素，父元素如果不同，直接替换所有元素，父元素一致，再去逐个比较子元素，直到找到所有发生变化的元素为止，上例中，新旧两组数据完全一致，所以没有任何 DOM 对象被修改

当我们在 JSX 中显示数组时，数组中每一个元素都需要设置一个唯一的 key，否则控制台会显示红色警告，重新渲染页面时，React 会按照顺序依次比较对应的元素，当渲染一个列表时如果不指定 key，同样也会按照顺序进行比较，如果列表的顺序永远不会发生变化，这么做当然没有问题，但是如果列表的顺序会发生变化，这可能会导致性能问题出现

在列表的最前边插入了一个新元素，其他元素内容并没有发生变化，但是由于新元素插入到了开始位置，其余元素的位置全都发生变化，而 React 默认是根据位置比较元素的，所以此时所有元素都会被修改

为了解决这个问题，React 为列表设计了一个 key 属性，key 的作用相当于 ID，只是无法在页面中查看，当设置 key 以后，再比较元素时，就会比较相同 key 的元素，而不是按照顺序进行比较，在渲染一个列表时，通常会给列表项设置一个唯一的 key 来避免上述问题(这个 key 在当前列表中唯一即可)

注意：

- 开发中一般会采用数据的 id 作为 key
- 尽量不要使用元素的 index 作为 key
- 索引会跟着元素顺序的改变而改变，所以使用索引做 key 跟没有 key 是一样的，唯一的不同就是，控制台的警告没了，当元素的顺序不会发生变化时，用索引做 key 也没有什么问题

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.23.8/babel.min.js"></script>
  </head>
  <body>
    <button id="btn">点我一下</button>
    <div id="root"></div>

    <script type="text/babel">
      const data = ['孙悟空', '猪八戒', '沙和尚']
      const arr = data.map((item) => <li key={item}>{item}</li>)
      const ul = <ul>{arr}</ul>

      const root = ReactDOM.createRoot(document.getElementById('root'))
      root.render(ul)

      const button = document.getElementById('btn')
      button.addEventListener('click', () => {
        const data = ['唐僧', '孙悟空', '猪八戒', '沙和尚']
        const ul = (
          <ul>
            {data.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )
        root.render(ul)
      })
    </script>
  </body>
</html>
```

## 手动创建 React 项目

public/index.html 是首页的模板，webpack 在编译文件时，会以 index.html 为模板生成 index.html

src/index.js 是 js 的入口文件

安装依赖：`npm i react react-dom react-scripts`

## 运行 React 项目

启动项目：`npx react-scripts start`

打包项目：`npx react-scripts build`

**index.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React项目</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**index.js**

```js
// 引入ReactDOM
import ReactDOM from 'react-dom/client'

// 创建一个JSX
const App = (
  <div>
    <h1>这是我的第一个React项目</h1>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(App)
```

## 组件简介

组件

- React 中组件有两种创建方式
- 函数式组件
  - 函数组件就是一个返回 JSX 的普通函数
  - 组件的首字母必须是大写
- 类组件

**index.js**

```js
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
// React组件可以直接通过JSX渲染
root.render(<App />)
```

**App.js**

```js
const App = () => {
  return <div>App组件</div>
}

export default App
```

## 类组件

类组件必须要继承 React.Component，相较于函数组件，类组件的编写要麻烦一下，但是他俩的功能是一样的

类组件中，必须添加一个 render()方法，且方法的返回值要是一个 jsx

```js
import React from 'react'

class App extends React.Component {
  render() {
    return <div>我是一个类组件</div>
  }
}

export default App
```

## 事件

在 React 中事件需要通过元素的属性来设置，和原生 JS 不同，在 React 中事件的属性需要使用驼峰命名法，属性值不能直接执行代码，而是需要一个回调函数

事件对象

- React 事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象
- React 中的事件对象同样不是原生的事件对象，是经过 React 包装后的事件对象
- 由于对象进行过包装，所以使用过程中我们无需再去考虑兼容性问题
- 在 React 中，无法通过 return false 来取消默认行为

```js
const App = () => {
  const clickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    alert('点击超链接')
  }

  return (
    <div
      onClick={() => {
        alert('div')
      }}
    >
      <button
        onClick={() => {
          alert(111)
        }}
      >
        点我一下
      </button>
      <a href="https://microdaway.github.io/" onClick={clickHandler}>
        超链接
      </a>
    </div>
  )
}

export default App
```

## props 简介

如果将组件中的数据全部写死，将会导致组件无法动态设置，不具有实用价值，我们希望组件数据可以由外部设置，在组件间，父组件可以通过 props(属性)向子组件传递数据

在父组件中可以直接在子组件中设置属性

在函数组件中，属性就相当于是函数的参数，可以通过参数来访问，可以在函数组件的形参中定义一个 props，props 指向的是一个对象，它包含了父组件中传递的所有参数

**注意：props 是只读的不能修改**

**父组件**

```js
import LogItem from './LogItem/LogItem'
import './Log.css'

const Log = () => {
  return (
    <div className="container">
      <LogItem subject={'学习React'} time={40} />
      <LogItem subject={'学习Vue'} time={50} />
    </div>
  )
}

export default Log
```

**子组件**

```js
import MyDate from './MyDate/MyDate'
import './LogItem.css'

const LogItem = (props) => {
  return (
    <div className="item">
      <MyDate />
      <div className="content">
        <div className="subject">{props.subject}</div>
        <div className="time">{props.time}分钟</div>
      </div>
    </div>
  )
}

export default LogItem
```

## state 简介

在 React 中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染，要使得组件可以受到变量的影响，必须在变量修改后对组件进行重新渲染，这里我们就需要一个特殊变量，当这个变量被修改时，组件会自动重新渲染

state 相当于一个变量，只是这个变量在 React 中进行了注册，React 会监控这个变量的变化，当 state 发生变化时，会自动触发组件的重新渲染，使得我们的修改可以在页面中呈现出来

在函数组件中，我们需要通过钩子函数来获取 state

使用钩子函数 useState() 来创建 state：`import { useState } from 'react'`

它需要一个值作为参数，这个值就是 state 的初始值，该函数会返回一个数组，数组中第一个元素，是初始值，初始值只用来显示数据，直接修改不会触发组件的重新渲染，数组中的第二个元素是一个函数，通常会命名为 setXxx，这个函数用来修改 state，调用其修改 state 后会触发组件的重新渲染，并且使用函数中的值作为新的 state 值

```js
import { useState } from 'react'
import './App.css'

const App = () => {
  console.log('函数执行了')
  const [count, setCount] = useState(1)

  const subHandler = () => {
    setCount(count - 1)
  }

  const addHandler = () => {
    setCount(count + 1)
  }

  return (
    <div className="app">
      <div className="count">{count}</div>
      <div>
        <button onClick={subHandler}>-</button>
        <button onClick={addHandler}>+</button>
      </div>
    </div>
  )
}

export default App
```

## state 的注意事项

- state 实际就是一个被 React 管理的变量，当我们通过 setState()修改变量的值时，会触发组件的自动重新渲染
- 只有 state 值发生变化时，组件才会重新渲染
- 当 state 的值是一个对象时，修改时是使用新的对象去替换已有对象
- 当通过 setState 去修改一个 state 时，并不表示修改当前的 state，它修改的是组件下一次渲染时的 state 值
- setState()会触发组件的重新渲染，它是异步的，所以当调用 setState()需要用旧 state 的值时，一定要注意，有可能出现计算错误的情况，为了避免这种情况，可以通过为 setState()传递回调函数的形式来修改 state 值
- setState()中回调函数的返回值将会成为新的 state 值，回调函数执行时，React 会将最新的 state 值作为参数传递

```js
import { useState } from 'react'
import './App.css'

const App = () => {
  console.log('函数执行了')
  const [count, setCount] = useState(1)
  const [user, setUser] = useState({
    name: '孙悟空',
    age: 18,
  })

  const subHandler = () => {
    setCount(count - 1)
  }

  const addHandler = () => {
    setTimeout(() => {
      // setCount((preCount) => {
      //   return preCount + 1
      // })
      setCount((prevState) => prevState + 1)
    }, 1000)
  }

  const updateUserHandler = () => {
    setUser({
      ...user,
      name: '猪八戒',
      age: 28,
    })
  }

  return (
    <div className="app">
      <div className="count">
        {count} {user.name} {user.age}
      </div>
      <div>
        <button onClick={subHandler}>-</button>
        <button onClick={addHandler}>+</button>
        <button onClick={updateUserHandler}>按钮</button>
      </div>
    </div>
  )
}

export default App
```
