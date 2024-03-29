---
sidebar_position: 12
---

# React

## HelloWorld

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
- 当重复调用 render() 时，React 会将两次的渲染结果进行比较，它会确保只修改那些发生变化的元素，对 DOM 做最少的修改

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

声明式编程，结果导向的编程，在 React 中可以通过 JSX(JS 扩展)来创建 React 元素，JSX 需要被翻译为 JS 代码，才能被 React 执行，要在 React 中使用 JSX，必须引入 babel 来完成翻译工作，JSX 就是 React.createElement() 的语法糖，JSX 在执行之前都会被 babel 转换为 js 代码

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

每当我们调用 root.render() 时，页面就会发生重新渲染，React 会通过 diffing 算法，将新的元素和旧的元素进行比较，通过比较找到发生变化的元素，并且只对变化的元素进行修改，没有发生变化的不予处理

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

类组件中，必须添加一个 render() 方法，且方法的返回值要是一个 jsx

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

- state 实际就是一个被 React 管理的变量，当我们通过 setState() 修改变量的值时，会触发组件的自动重新渲染
- 只有 state 值发生变化时，组件才会重新渲染
- 当 state 的值是一个对象时，修改时是使用新的对象去替换已有对象
- 当通过 setState 去修改一个 state 时，并不表示修改当前的 state，它修改的是组件下一次渲染时的 state 值
- setState() 会触发组件的重新渲染，它是异步的，所以当调用 setState() 需要用旧 state 的值时，一定要注意，有可能出现计算错误的情况，为了避免这种情况，可以通过为 setState() 传递回调函数的形式来修改 state 值
- setState() 中回调函数的返回值将会成为新的 state 值，回调函数执行时，React 会将最新的 state 值作为参数传递

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

## DOM 对象和 useRef

获取原生的 DOM 对象

- 可以使用传统的 document 来对 DOM 进行操作
- 直接从 React 获取 DOM 对象
  - 步骤：
    - 创建一个存储 DOM 对象的容器，使用 useRef() 钩子函数
    - 钩子函数的注意事项：
      - React 中的钩子函数只能用于函数组件或自定义钩子
      - 钩子函数只能直接在函数组件中调用
    - 将容器设置为想要获取 DOM 对象元素的 ref 属性
    - React 会自动将当前元素的 DOM 对象，设置为容器的 current 属性

`useRef()`

- 返回的就是一个普通的 JS 对象：`{current: undefined}`
- 所以我们直接创建一个 js 对象，也可以代替 useRef()
- 区别：
  - 我们创建的对象，组件每次重新渲染都会创建一个新对象
  - useRef() 创建的对象，可以确保每次渲染获取到的都是同一个对象
- 当你需要一个对象不会因为组件的重新渲染而改变时，就可以使用 useRef()

```js
import { useRef, useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(1)

  const h1Ref = useRef()

  const subHandler = () => {
    setCount(count - 1)
  }

  const addHandler = () => {
    setCount((prevState) => prevState + 1)
  }

  const clickHandler = () => {
    // console.log(h1Ref.current)
    h1Ref.current.innerText = '哈哈'
  }

  return (
    <div className="app">
      <h1 ref={h1Ref}>我是标题一</h1>
      <div className="count">{count}</div>
      <div>
        <button onClick={subHandler}>-</button>
        <button onClick={addHandler}>+</button>
        <button onClick={clickHandler}>按钮</button>
      </div>
    </div>
  )
}

export default App
```

## 类组件

类组件的 props 是存储到类的实例对象中，可以直接通过实例对象访问，this.props

类组件中 state 统一存储到了实例对象的 state 属性中，可以通过 this.state 来访问，通过 this.setState() 对其进行修改，当我们通过 this.setState() 修改 state 时，React 只会修改设置了的属性

函数组件中，响应函数直接以函数的形式定义在组件中，但是在类组件中，响应函数是以类的方法来定义的，之前的属性都会保留，但是这仅限于直接存储于 state 中的属性

获取 DOM 对象

- 创建一个属性，用来存储 DOM 对象：`h2Ref = React.createRef()`
- 将这个属性设置为指定元素的 ref 值

**注意：为了省事，在类组件中响应函数都应该以箭头函数的形式定义**

**父组件**

```js
import React from 'react'
import User from './components/User'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <User name={'孙悟空'} age={18} gender={'男'} />
      </div>
    )
  }
}

export default App
```

**子组件**

```js
import React from 'react'

class User extends React.Component {
  state = {
    count: 0,
    test: '哈哈',
    obj: {
      name: '猪八戒',
      age: 28,
    },
  }

  h2Ref = React.createRef()

  addHandler = () => {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1,
        obj: {
          ...this.state.obj,
          name: '沙和尚',
        },
      }
    })
  }

  render() {
    return (
      <div className="user">
        <h2 ref={this.h2Ref}>
          {this.state.count} {this.state.test} {this.state.obj.name} {this.state.obj.age}
        </h2>
        <button onClick={this.addHandler}>点我一下</button>
        <ul>
          <li>姓名：{this.props.name}</li>
          <li>年龄：{this.props.age}</li>
          <li>性别：{this.props.gender}</li>
        </ul>
      </div>
    )
  }
}

export default User
```

## 添加 Card 组件

props.children 表示组件的标签体

**父组件**

```js
import Card from '../../Card/Card'
import './LogItem.css'
import MyDate from './MyDate/MyDate'

const LogItem = (props) => {
  return (
    <Card className="item">
      <MyDate date={props.date} />
      <div className="content">
        <div className="subject">{props.subject}</div>
        <div className="time">{props.time}分钟</div>
      </div>
    </Card>
  )
}

export default LogItem
```

**子组件**

```js
import './Card.css'

const Card = (props) => {
  return <div className={`card ${props.className}`}>{props.children}</div>
}

export default Card
```

## 获取表单数据

在 React 中，通常表单不需要自行提交，而是要通过 React 提交

事件对象中保存了当前事件触发时的所有信息，e.target 指向的是触发事件的对象(DOM 对象)

```js
import Card from '../Card/Card'
import './LogForm.css'

const LogForm = () => {
  const formData = {
    date: '',
    content: '',
    time: 0,
  }

  const dateChangeHandler = (e) => {
    formData.date = e.target.value
  }

  const contentInputHandler = (e) => {
    formData.content = e.target.value
  }

  const timeInputHandler = (e) => {
    formData.time = +e.target.value
  }

  const addHandler = () => {
    console.log(formData)
  }

  return (
    <Card className="log-form">
      <form>
        <div className="form-item">
          <label htmlFor="date">日期：</label>
          <input onChange={dateChangeHandler} id="date" type="date" />
        </div>
        <div className="form-item">
          <label htmlFor="content">内容：</label>
          <input onInput={contentInputHandler} id="content" type="text" />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长：</label>
          <input onInput={timeInputHandler} id="time" type="text" />
        </div>
        <div className="form-item">
          <button onClick={addHandler} type="button" className="add-btn">
            添加
          </button>
        </div>
      </form>
    </Card>
  )
}

export default LogForm
```

## 双向绑定

提交表单后如何清空表单中的旧数据，现在这种表单，在 React 我们称为非受控组件

我们可以将表单中的数据存储到 state 中，然后将 state 设置为表单项的 value 值，这样当表单项发生变化，state 会随之变化，反之，state 发生变化，表单项也会跟着改变，这种操作我们就称为双向绑定，这样一来，表单就成为了一个受控组件

```js
import { useState } from 'react'
import Card from '../Card/Card'
import './LogForm.css'

const LogForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    content: '',
    time: '',
  })

  const dateChangeHandler = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    })
  }

  const contentInputHandler = (e) => {
    setFormData({
      ...formData,
      content: e.target.value,
    })
  }

  const timeInputHandler = (e) => {
    setFormData({
      ...formData,
      time: +e.target.value,
    })
  }

  const addHandler = () => {
    console.log(formData)
    setFormData({
      date: '',
      content: '',
      time: '',
    })
  }

  return (
    <Card className="log-form">
      <form>
        <div className="form-item">
          <label htmlFor="date">日期：</label>
          <input onChange={dateChangeHandler} value={formData.date} id="date" type="date" />
        </div>
        <div className="form-item">
          <label htmlFor="content">内容：</label>
          <input onInput={contentInputHandler} value={formData.content} id="content" type="text" />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长：</label>
          <input onInput={timeInputHandler} value={formData.time} id="time" type="text" />
        </div>
        <div className="form-item">
          <button onClick={addHandler} type="button" className="add-btn">
            添加
          </button>
        </div>
      </form>
    </Card>
  )
}

export default LogForm
```

## 添加新日志

**父组件**

```js
import Log from './components/Log/Log'
import LogForm from './components/LogForm/LogForm'
import './App.css'
import { useState } from 'react'

const App = () => {
  const [logData, setLogData] = useState([
    {
      id: 1,
      date: new Date(2024, 0, 26),
      subject: '学习React',
      time: 40,
    },
    {
      id: 2,
      date: new Date(2024, 0, 27),
      subject: '学习Vue',
      time: 50,
    },
    {
      id: 3,
      date: new Date(2024, 0, 28),
      subject: '学习JavaScript',
      time: 60,
    },
  ])

  const addLogHandler = (newLog) => {
    newLog.id = Date.now()
    newLog.date = new Date(newLog.date)
    setLogData([newLog, ...logData])
  }

  return (
    <div className="app">
      <LogForm onAdd={addLogHandler} />
      <Log logData={logData} />
    </div>
  )
}

export default App
```

**子组件**

```js
import { useState } from 'react'
import Card from '../Card/Card'
import './LogForm.css'

const LogForm = (props) => {
  const [formData, setFormData] = useState({
    date: '',
    subject: '',
    time: '',
  })

  const dateChangeHandler = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    })
  }

  const contentInputHandler = (e) => {
    setFormData({
      ...formData,
      subject: e.target.value,
    })
  }

  const timeInputHandler = (e) => {
    setFormData({
      ...formData,
      time: +e.target.value,
    })
  }

  const addHandler = () => {
    props.onAdd(formData)
    setFormData({
      date: '',
      subject: '',
      time: '',
    })
  }

  return (
    <Card className="log-form">
      <form>
        <div className="form-item">
          <label htmlFor="date">日期：</label>
          <input onChange={dateChangeHandler} value={formData.date} id="date" type="date" />
        </div>
        <div className="form-item">
          <label htmlFor="subject">内容：</label>
          <input onInput={contentInputHandler} value={formData.subject} id="subject" type="text" />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长：</label>
          <input onInput={timeInputHandler} value={formData.time} id="time" type="text" />
        </div>
        <div className="form-item">
          <button onClick={addHandler} type="button" className="add-btn">
            添加
          </button>
        </div>
      </form>
    </Card>
  )
}

export default LogForm
```

## 空列表提示

```js
import LogItem from './LogItem/LogItem'
import './Log.css'
import Card from '../Card/Card'

const Log = (props) => {
  let newLogData = props.logData.map((item) => (
    <LogItem
      date={item.date}
      subject={item.subject}
      time={item.time}
      key={item.id}
      id={item.id}
      onDelete={props.onDelete}
    />
    // <LogItem {...item} key={item.id} />
  ))

  if (!newLogData.length) {
    newLogData = <div className="no-log">暂无日志</div>
  }

  return <Card className="container">{newLogData}</Card>
}

export default Log
```

## 使用 portal 修改项目

portal

- 组件默认会作为父组件的后代渲染到页面中，但是有些情况下，这种方式会带来一些问题
- 通过 portal 可以将组件渲染到页面中的指定位置
- 使用方法：
  - 在 index.html 中添加一个新的元素
  - 修改组件的渲染方式
    - 通过 `ReactDOM.createPortal()` 作为返回值创建元素
    - 参数：
      - jsx(修改前 return 后的代码)
      - 目标位置(DOM 元素)

**index.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>学习日志</title>
  </head>
  <body>
    <div id="root"></div>
    <div id="backdrop-root"></div>
  </body>
</html>
```

**BackDrop.js**

```js
import './BackDrop.css'
import ReactDOM from 'react-dom'

const backdropRoot = document.getElementById('backdrop-root')

const BackDrop = (props) => {
  return ReactDOM.createPortal(<div className="back-drop">{props.children}</div>, backdropRoot)
}

export default BackDrop
```

## 使用 create-react-app

自动创建项目：`npx create-react-app 项目名`

## 内联样式和样式表

```js
import { useState } from 'react'
import './App.css'

const App = () => {
  const [redBorder, setRedBorder] = useState(true)

  const pStyle = {
    border: redBorder ? '2px solid red' : '2px solid blue',
  }

  const clickHandler = () => {
    setRedBorder((prevState) => !prevState)
  }

  return (
    <div>
      <p style={pStyle} className="p1">
        我是一个段落
      </p>
      <button onClick={clickHandler}>点我切换</button>
    </div>
  )
}

export default App
```

## CSS Module

CSS 模块使用步骤：

- 创建一个 xxx.module.css
- 在组件中引入 CSS：`import classes from './App.module.css'`
- 通过 classes 来设置类：`className={classes.p1}`
- CSS 模块可以动态的设置唯一的 class 值：`App_p1__qKYtQ`

```js
import A from './A'
import classes from './App.module.css'

const App = () => {
  return (
    <div>
      <p className={classes.p1}>我是一个段落</p>
      <A />
    </div>
  )
}

export default App
```

## Fragment

React.Fragment

- 是一个专门用来作为父容器的组件，它只会将它里边的子元素直接返回，不会创建任何多余的元素
- 当我们希望有一个父容器，但同时又不希望父容器在网页中产生多余的结构时，就可以使用 Fragment

```js
import React from 'react'

const App = () => {
  return (
    // <React.Fragment>
    //   <div>A组件</div>
    //   <div>B组件</div>
    //   <div>C组件</div>
    // </React.Fragment>

    <>
      <div>A组件</div>
      <div>B组件</div>
      <div>C组件</div>
    </>
  )
}

export default App
```

## 引入 FontAwesome

文档：https://fontawesome.com/docs/web/use-with/react/

```js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Counter.module.css'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const Counter = () => {
  return (
    <div className={classes.counter}>
      <button className={classes.sub}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className={classes.count}>1</span>
      <button className={classes.add}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default Counter
```

## Context 的使用

Context 相当于一个公共的存储空间，我们可以将多个组件中都需要访问的数据统一存储到一个 Context 中，这样无需通过 props 逐层传递，即可使组件访问到这些数据，通过 `React.createContext()` 创建 Context

使用方式一：

- 引入 Context
- 使用 Xxx.Consumer 组件来创建元素，Consumer 的标签体需要一个回调函数，它会将 Context 设置为回调函数的参数，通过参数就可以访问到 Context 中存储的数据

使用 Context 方式二：

- 导入 Context
- 使用钩子函数 useContext() 获取到 Context，useContext() 需要一个 Context 作为参数，它会获取 Context 中的数据并作为返回值返回

Xxx.Provider

- 表示数据的生产者，可以使用它来指定 Context 中的数据
- 通过 value 来指定 Context 中存储的数据，这样一来，在该组件的所有子组件中都可以通过 Context 来访问它所指定的数据
- 当我们通过 Context 访问数据时，它会读取离它最近的 Provider 中的数据，如果没有 Provider，则读取 Context 中的默认数据

**TestContext.js**

```js
import React from 'react'

const TestContext = React.createContext({
  name: '孙悟空',
  age: 18,
})

export default TestContext
```

**使用方式一 A.js**

```js
import TestContext from '../../store/TestContext'

const A = () => {
  return (
    <TestContext.Consumer>
      {(ctx) => {
        return (
          <div>
            {ctx.name} {ctx.age}
          </div>
        )
      }}
    </TestContext.Consumer>
  )
}

export default A
```

**使用方式二 B.js**

```js
import { useContext } from 'react'
import TestContext from '../../store/TestContext'

const B = () => {
  const testCtx = useContext(TestContext)

  return (
    <div>
      {testCtx.name} {testCtx.age}
    </div>
  )
}

export default B
```

**Provider**

```js
import A from './components/Test/A'
import B from './components/Test/B'
import TestContext from './store/TestContext'

const App = () => {
  return (
    <>
      <TestContext.Provider value={{ name: '猪八戒', age: 28 }}>
        <A />
      </TestContext.Provider>
      <TestContext.Provider value={{ name: '沙和尚', age: 38 }}>
        <B />
      </TestContext.Provider>
    </>
  )
}

export default App
```

## setState 的执行流程

Too many re-renders

- 当我们直接在函数体中调用 setState 时，就会触发上述错误
- 问题：不是说过，当新的 state 值和旧值相同时，它是不会触发组件的重新渲染的
- setState() 的执行流程(函数组件)
  - setCount() --> dispatchSetDate()
  - 会先判断，组件当前处于什么阶段，如果是渲染阶段，不会检查 state 值是否相同
  - 如果不是渲染阶段，会检查 state 的值是否相同
    - 如果值不相同，则对组件进行重新渲染，如果值相同，则不对组件进行重新渲染
    - 如果值相同，React 在一些情况下会继续执行当前组件的渲染，但是这个渲染不会触发其子组件的渲染，这次渲染不会产生实际的效果，这种情况通常发生在值第一次相同时

**App.js**

```js
import React, { useState } from 'react'
import A from './Components/A'

const App = () => {
  console.log('App组件渲染了')
  const [count, setCount] = useState(0)
  const clickHandler = () => {
    setCount(1)
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={clickHandler}>点我一下</button>
      <A />
    </div>
  )
}

export default App
```

**A.js**

```js
const A = () => {
  console.log('A组件渲染了')

  return <div>A组件</div>
}

export default A
```

## useEffect 简介

useEffect()是一个钩子函数，需要一个函数作为参数，这个作为参数的函数，将会在组件渲染完毕后执行，在开发中，可以将那些会产生副作用的代码编写到 useEffect 的回调函数中，这样就可以避免这些代码影响到组件的渲染

```js
import React, { useEffect, useState } from 'react'
import A from './Components/A'

const App = () => {
  console.log('App组件渲染了')
  const [count, setCount] = useState(0)
  const clickHandler = () => {
    setCount(1)
  }

  // setTimeout(() => {
  //   setCount(1)
  // })

  useEffect(() => {
    setCount(1)
  })

  return (
    <div>
      <div>{count}</div>
      <button onClick={clickHandler}>点我一下</button>
      <A />
    </div>
  )
}

export default App
```

## useEffect 的依赖项

默认情况下，useEffect() 中的函数，会在组件渲染完成后调用，并且是每次渲染完成后都会调用

在 useEffect()中可以传递第二个参数，第二个参数是一个数组，在数组中可以指定 useEffect 的依赖项，指定后，只有当依赖发生变化时，useEffect 才会被触发，通常会将 useEffect 中使用的所有局部变量都设置为依赖项，这样一来可以确保这些值发生变化时，会触发 useEffect 的执行，像 setState()是由钩子函数 useState()生成的，useState()会确保组件的每次渲染都会获取到相同 setState()对象，所以 setState()方法可以不设置到依赖中，如果依赖项设置了一个空数组，则意味着 useEffect 只会在组件初始化时触发一次

```js
import classes from './BottomBar.module.css'
import Bag from '../../assets/bag.png'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/CartContext'
import CartDetails from '../CartDetails/CartDetails'

const BottomBar = (props) => {
  // 是否显示购物车详情
  const [showCartDetails, setShowCartDetails] = useState(false)
  const cartContext = useContext(CartContext)

  // 是否显示购物车详情
  const clickBottomBar = () => {
    if (!cartContext.totalAmount) {
      setShowCartDetails(false)
      return
    }
    setShowCartDetails((prevState) => !prevState)
  }

  // 点击去结算的处理函数
  const checkoutHandler = (e) => {
    e.stopPropagation()
    if (cartContext.totalAmount) {
      props.onShowCheckout()
    }
  }

  useEffect(() => {
    if (cartContext.totalAmount === 0) {
      setShowCartDetails(false)
    }
  }, [cartContext])

  return (
    <div onClick={clickBottomBar} className={classes['bottom-bar']}>
      <div className={classes['bag-box']}>
        <img src={Bag} alt="bag" />
        {cartContext.totalAmount ? (
          <div className={classes['total-amount-box']}>{cartContext.totalAmount}</div>
        ) : null}
      </div>
      {cartContext.totalPrice ? (
        <div className={classes['total-price']}>{cartContext.totalPrice}</div>
      ) : (
        <div className={classes['no-meal']}>未选购商品</div>
      )}
      <div
        onClick={checkoutHandler}
        className={cartContext.totalPrice ? classes['checkout'] : classes['no-checkout']}
      >
        去结算
      </div>
      {showCartDetails ? <CartDetails /> : null}
    </div>
  )
}

export default BottomBar
```

## useEffect 的清理函数

在 useEffect 的回调函数中，可以指定一个函数作为返回值，这个函数可以称其为清理函数，它会在下次 useEffect 执行前调用，可以在这个函数中，做一些工作来清除上次 useEffect 执行所带来的影响

```js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Search.module.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const Search = (props) => {
  const [keyword, setKeyword] = useState('')

  // input输入框输入的处理函数
  const inputHandler = (e) => {
    setKeyword(e.target.value.trim())
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.onFilter(keyword)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [keyword])

  return (
    <div className={classes.search}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={classes['search-icon']} />
      <input
        value={keyword}
        onInput={inputHandler}
        className={classes['search-input']}
        type="text"
        placeholder="请输入关键字"
      />
    </div>
  )
}

export default Search
```

## useReducer

- 参数：
  - reducer 整合函数
    - 对于当前 state 的所有操作都应该在该函数中定义，该函数的返回值会成为 state 的新值
    - reducer 在执行时会收到两个参数：
      - state 当前最新的 state
      - action 它需要一个对象，在对象中会存储 dispatch 所发送的指令
  - initialArg
    - state 的初始值，作用和 useState() 中的值是一样的
- 返回值：
  - 返回值是一个数组
  - 数组中的第一个值为 state：用来获取 state 的值
  - 数组中的第二个值为修改 state 的派发器，通过派发器可以发送操作 state 的命令，具体的修改行为将会由另外一个函数 reducer 执行
  - 为了避免 reducer 会重复创建，通常 reducer 会定义到组件的外部

```js
import { useReducer } from 'react'

const countReducer = (state, action) => {
  switch (action.type) {
    case 'SUB':
      return state - 1
    case 'ADD':
      return state + 1
    default:
      return state
  }
}

const App = () => {
  const [count, countDispatch] = useReducer(countReducer, 1)

  const subHandler = () => {
    countDispatch({ type: 'SUB' })
  }

  const addHandler = () => {
    countDispatch({ type: 'ADD' })
  }

  return (
    <div>
      <button onClick={subHandler}>减少</button>
      <span>{count}</span>
      <button onClick={addHandler}>增加</button>
    </div>
  )
}

export default App
```

## React.memo

`React.memo()`

- 是一个高阶组件，它接收另一个组件作为参数，并且会返回一个包装过的新组件
- 包装过的新组件具有缓存功能，包装过后，只有组件的 props 发生变化时才会触发组件的重新渲染，否则总是返回缓存中的结果

**App.js**

```js
import { useState } from 'react'
import A from './Components/A'

const App = () => {
  console.log('App组件')

  const [count, setCount] = useState(1)

  const addHandler = () => {
    setCount((prevState) => prevState + 1)
  }

  return (
    <div>
      <div>
        App组件 {count} <button onClick={addHandler}>点我一下</button>
      </div>
      <A />
    </div>
  )
}

export default App
```

**A.js**

```js
import { useState } from 'react'
import B from './B'

const A = () => {
  console.log('A组件')

  const [count, setCount] = useState(1)

  const addHandler = () => {
    setCount((prevState) => prevState + 1)
  }

  const flag = count % 5 === 0

  return (
    <div>
      A组件 {count} <button onClick={addHandler}>点我一下</button>
      <B flag={flag} />
    </div>
  )
}

export default A
```

**B.js**

```js
import React from 'react'

const B = (props) => {
  console.log('B组件')

  return (
    <div>
      <div>B组件</div>
      <div>{props.flag ? '哈哈' : null}</div>
    </div>
  )
}

export default React.memo(B)
```

## useCallback

useCallback 是一个钩子函数，用来创建 React 中的回调函数

useCallback 创建的回调函数不会总在组件重新渲染时重新创建

参数：

- 回调函数
- 依赖数组
  - 当依赖数组中的变量发生变化时，回调函数才会重新创建
  - 如果不指定依赖数组，回调函数每次都会重新创建
  - 一定要将回调函数中使用到的所有变量都设置到依赖数组中除了(setState)

**App.js**

```js
import { useCallback, useState } from 'react'
import A from './Components/A'

const App = () => {
  console.log('App组件')

  const [count, setCount] = useState(1)
  const [num, setNum] = useState(1)

  const addHandler = useCallback(() => {
    setCount((prevState) => prevState + num)
    setNum((prevState) => prevState + 1)
  }, [num])

  return (
    <div>
      <div>
        App组件 {count} <button onClick={addHandler}>点我一下</button>
      </div>
      <A onAdd={addHandler} />
    </div>
  )
}

export default App
```

**A.js**

```js
import { useState } from 'react'
import React from 'react'
import B from './B'

const A = (props) => {
  console.log('A组件')

  const [count, setCount] = useState(1)

  const addHandler = () => {
    setCount((prevState) => prevState + 1)
  }

  const flag = count % 5 === 0

  const clickHandler = () => {
    props.onAdd()
  }

  return (
    <div>
      A组件 {count} <button onClick={addHandler}>点我一下</button>{' '}
      <button onClick={clickHandler}>增加App组件</button>
      <B flag={flag} />
    </div>
  )
}

export default React.memo(A)
```

## 使用 fetch

```js
import { useState } from 'react'
import StudentList from './Components/StudentList/StudentList'
import { useEffect } from 'react'

const App = () => {
  const [studentData, setStudentData] = useState([])

  useEffect(() => {
    fetch('http://localhost:1337/api/students')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setStudentData(data.data)
      })
  }, [])

  return (
    <div>
      <StudentList studentData={studentData} />
    </div>
  )
}

export default App
```

## 自定义钩子

React 中的钩子函数只能在函数组件或自定义钩子中调用，当我们需要将 React 中的钩子函数提取到一个公共区域时，就可以使用自定义钩子

自定义钩子其实就是一个普通函数，只是它的名字需要使用 use 开头

```js
import { useCallback, useState } from 'react'

export const useFetch = () => {
  // 学生数据
  const [data, setData] = useState([])

  // 是否正在加载
  const [isLoading, setIsLoading] = useState(false)

  // 是否出错
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      // 重置错误
      setError(null)
      const res = await fetch('http://localhost:1337/api/students')
      if (res.ok) {
        const data = await res.json()
        setData(data.data)
      } else {
        throw new Error('数据加载失败')
      }
    } catch (err) {
      setError(err.message)
      console.log('出错了', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    data,
    isLoading,
    error,
    fetchData,
  }
}
```

## HelloRedux

在网页中使用 Redux 的步骤：

- 引入 Redux 核心包
- 创建 reducer 整合函数
- 通过 reducer 对象创建 store
- 对 store 中的 state 进行订阅
- 通过 dispatch 派发 state 的操作指令

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
  </head>
  <body>
    <button id="sub">减</button>
    <span id="count">1</span>
    <button id="add">加</button>

    <script>
      const countSpan = document.getElementById('count')
      const sub = document.getElementById('sub')
      const add = document.getElementById('add')

      let count = 1

      const reducer = (state, action) => {
        switch (action.type) {
          case 'ADD':
            return state + 1
          case 'SUB':
            return state - 1
          default:
            return state
        }
      }

      const store = Redux.createStore(reducer, 1)

      store.subscribe(() => {
        countSpan.innerText = store.getState()
      })

      add.addEventListener('click', () => {
        store.dispatch({
          type: 'ADD',
        })
      })

      sub.addEventListener('click', () => {
        store.dispatch({
          type: 'SUB',
        })
      })
    </script>
  </body>
</html>
```

## 解析 HelloRedux

reducer 函数

- state 表示当前 state，可以根据这个 state 生成新的 state
- action 是一个 js 对象，它里边会保存操作的信息
- type 表示操作的类型
- 其他需要传递的参数，也可以在 action 中设置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
  </head>
  <body>
    <button id="sub">减</button>
    <span id="count">1</span>
    <span id="swk">孙悟空</span>
    <button id="add">加</button>
    <button id="add-five">加5</button>

    <script>
      const countSpan = document.getElementById('count')
      const nameSpan = document.getElementById('swk')
      const sub = document.getElementById('sub')
      const add = document.getElementById('add')
      const addFive = document.getElementById('add-five')

      let count = 1
      let name = '孙悟空'

      const reducer = (
        state = {
          count: 1,
          name: '孙悟空',
        },
        action
      ) => {
        switch (action.type) {
          case 'ADD':
            return {
              ...state,
              count: state.count + 1,
            }
          case 'ADD_N':
            return {
              ...state,
              count: state.count + action.payload,
              name: '猪八戒',
            }
          case 'SUB':
            return {
              ...state,
              count: state.count - 1,
            }
          default:
            return {
              ...state,
              count: state.count,
            }
        }
      }

      const store = Redux.createStore(reducer)

      store.subscribe(() => {
        countSpan.innerText = store.getState().count
        nameSpan.innerText = store.getState().name
      })

      add.addEventListener('click', () => {
        store.dispatch({
          type: 'ADD',
        })
      })

      addFive.addEventListener('click', () => {
        store.dispatch({
          type: 'ADD_N',
          payload: 5,
        })
      })

      sub.addEventListener('click', () => {
        store.dispatch({
          type: 'SUB',
        })
      })
    </script>
  </body>
</html>
```

## 使用 RTK 创建 store

- 安装依赖：`npm i react-redux @reduxjs/toolkit`
- createSlice
  - 创建 reducer 的切片
  - 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
  - name：用来自动生成 action 中的 type 属性
  - initialState：state 的初始值
  - reducers：指定 state 的各种操作，直接在对象中添加方法
- 注意：
  - 切片对象会自动的帮助我们生成 action
  - actions 中存储的是 slice 自动生成的 action 创建器(函数)，调用函数后会自动创建 action 对象
  - action 对象的结构 `{ type:name/函数名, payload:函数的参数 }`
- configureStore
  - 用来创建 store 对象，需要一个配置对象作为参数

```js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山',
  },
  reducers: {
    setName(state, action) {
      // 可以通过不同的方法来指定对state的不同操作
      // 两个参数：state是一个代理对象，可以直接修改
      state.name = '猪八戒'
    },
    setAge(state, action) {
      state.age = 28
    },
  },
})

export const { setName, setAge } = studentSlice.actions

const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  },
})

export default store
```

## 完成 RTK 代码

**index.js**

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

**App.js**

```js
import { useDispatch, useSelector } from 'react-redux'
import './store/index'
import { setAge, setName } from './store/index'

const App = () => {
  const student = useSelector((state) => state.student)
  const dispatch = useDispatch()

  const updateName = () => {
    dispatch(setName('沙和尚'))
  }

  const updateAge = () => {
    dispatch(setAge(38))
  }

  return (
    <div>
      <div>
        {student.name} {student.age} {student.gender} {student.address}
      </div>
      <button onClick={updateName}>修改name</button>
      <button onClick={updateAge}>修改age</button>
    </div>
  )
}

export default App
```

**store/index.js**

```js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山',
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setAge(state, action) {
      state.age = action.payload
    },
  },
})

export const { setName, setAge } = studentSlice.actions

const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  },
})

export default store
```

## 拆分 RTK 代码

**store/module/student.js**

```js
import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山',
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setAge(state, action) {
      state.age = action.payload
    },
  },
})

export const { setName, setAge } = studentSlice.actions
export const { reducer: studentReducer } = studentSlice
```

**store/module/school.js**

```js
import { createSlice } from '@reduxjs/toolkit'

const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    name: '花果山小学',
    address: '花果山大街1号',
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setAddress(state, action) {
      state.address = action.payload
    },
  },
})

export const { setName, setAddress } = schoolSlice.actions
export const { reducer: schoolReducer } = schoolSlice
```

**store/index.js**

```js
import { configureStore } from '@reduxjs/toolkit'
import { studentReducer } from './module/student'
import { schoolReducer } from './module/school'

const store = configureStore({
  reducer: {
    student: studentReducer,
    school: schoolReducer,
  },
})

export default store
```

**App.js**

```js
import { useDispatch, useSelector } from 'react-redux'
import './store/index'
import { setAge, setName } from './store/module/student'
import { setName as setSchoolName, setAddress } from './store/module/school'

const App = () => {
  const student = useSelector((state) => state.student)
  const school = useSelector((state) => state.school)

  // const { student, school } = useSelector((state) => state)

  const dispatch = useDispatch()

  const updateName = () => {
    dispatch(setName('沙和尚'))
  }

  const updateAge = () => {
    dispatch(setAge(38))
  }

  const updateSchoolName = () => {
    dispatch(setSchoolName('高老庄小学'))
  }

  const updateSchoolAddress = () => {
    dispatch(setAddress('高老庄大街1号'))
  }

  return (
    <div>
      <div>
        {student.name} {student.age} {student.gender} {student.address}
      </div>
      <button onClick={updateName}>修改name</button>
      <button onClick={updateAge}>修改age</button>
      <hr />
      <div>
        {school.name} {school.address}
      </div>
      <button onClick={updateSchoolName}>修改学校名字</button>
      <button onClick={updateSchoolAddress}>修改学校地址</button>
    </div>
  )
}

export default App
```

## RTKQ 简介

`createApi()`

- 用来创建 RTKQ 中的 API 对象
- RTKQ 的所有功能都需要通过该对象来进行
- 需要一个对象作为参数
- reducerPath
  - Api 的标识，不能和其他的 Api 或 reducer 重复
- baseQuery
  - 指定查询的基础信息，发送请求使用的工具
- endpoints
  - 用来指定 Api 中的各种功能，是一个方法，需要一个对象作为返回值
  - build 是请求的构建器，通过 build 来设置请求的相关信息

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  endpoints(build) {
    return {
      getAllStudent: build.query({
        query() {
          return 'students'
        },
      }),
    }
  },
})
```

## HelloRTKQ

**store/studentApi**

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  endpoints(build) {
    return {
      getAllStudent: build.query({
        query() {
          return 'students'
        },
      }),
    }
  },
})

export const { useGetAllStudentQuery } = studentApi
```

**store/index.js**

```js
import { configureStore } from '@reduxjs/toolkit'
import { studentApi } from './studentApi'

const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(studentApi.middleware),
})

export default store
```

**index.js**

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

**App.js**

```js
import { useGetAllStudentQuery } from './store/studentApi'

const App = () => {
  const { data, isSuccess, isLoading } = useGetAllStudentQuery()
  return (
    <div>
      {isLoading && <div>数据加载中...</div>}
      {isSuccess &&
        data.data.map((item) => (
          <div key={item.id}>
            {item.attributes.name}--{item.attributes.age}--{item.attributes.gender}--
            {item.attributes.address}
          </div>
        ))}
    </div>
  )
}

export default App
```

## 缓存演示

`keepUnusedDataFor`：设置数据缓存的时间，单位是秒，默认为 60s

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  endpoints(build) {
    return {
      getAllStudent: build.query({
        query() {
          return 'students'
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
      }),
      getStudentById: build.query({
        query(id) {
          return `students/${id}`
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        keepUnusedDataFor: 60,
      }),
    }
  },
})

export const { useGetAllStudentQuery, useGetStudentByIdQuery } = studentApi
```

## useQuery 的返回值

- currentData：当前参数的最新数据
- data：最新的数据，与参数无关
- isError：布尔值，是否有错误
- error：对象，有错时才存在
- isFetching：布尔值，数据是否在加载
- isLoading：布尔值，数据是否第一次加载
- isSuccess：布尔值，请求是否成功
- isUninitialized：布尔值，请求是否还没有开始发送
- refetch：一个函数，用来重新加载数据
- status：字符串，请求的状态

```js
import { useGetAllStudentQuery } from './store/studentApi'
import StudentList from './components/StudentList/StudentList'

let num = 1

const App = () => {
  const { data, isSuccess, isLoading, refetch, currentData } = useGetAllStudentQuery(num)

  console.log(data, currentData, data === currentData)

  return (
    <div>
      <button onClick={refetch}>刷新</button>
      <button onClick={() => num++}>num+1</button>
      {isLoading && <div>数据加载中...</div>}
      {isSuccess && <StudentList studentData={data} />}
    </div>
  )
}

export default App
```

## useQuery 的参数

useQuery 可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置

- selectFromResult：用来指定 useQuery 返回的结果
- pollingInterval：设置轮询的间隔，单位是毫秒，如果为 0 则表示不轮询
- skip：设置是否跳过当前请求，默认为 false
- refetchOnMountOrArgChange：设置是否每次都重新加载数据 false 表示正常使用缓存，true 表示每次都重新加载数据，也可以设置一个数字表示数据缓存的时间(秒)
- refetchOnFocus：是否在重新获取焦点时重新加载数据
- refetchOnReconnect：是否在重新连接网络后重新加载数据
- setupListeners(store.dispatch)：设置以后将会支持 refetchOnFocus 和 refetchOnReconnect

```js
import StudentList from './components/StudentList/StudentList'
import { useGetAllStudentQuery } from './store/studentApi'

const App = () => {
  const { data, isSuccess, isLoading, refetch } = useGetAllStudentQuery(null, {
    // selectFromResult: (result) => {
    //   if (result.data) {
    //     result.data = result.data.filter((item) => item.attributes.age < 18)
    //   }
    //   return result
    // },
    pollingInterval: 0,
    skip: false,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  return (
    <div>
      <button onClick={refetch}>刷新</button>
      {isLoading && <div>数据加载中...</div>}
      {isSuccess && <StudentList studentData={data} />}
    </div>
  )
}

export default App
```

**store/index.js**

```js
import { configureStore } from '@reduxjs/toolkit'
import { studentApi } from './studentApi'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(studentApi.middleware),
})

setupListeners(store.dispatch)

export default store
```

## 删除数据

如果发送的不是 get 请求，需要返回一个对象来设置请求的信息

获取删除的钩子，useMutation 的钩子返回的是一个数组，数组中有两个东西，第一个是操作的触发器，第二个是结果集

**store/studentApi.js**

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  endpoints(build) {
    return {
      getAllStudent: build.query({
        query() {
          return 'students'
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
      }),
      getStudentById: build.query({
        query(id) {
          return `students/${id}`
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        keepUnusedDataFor: 60,
      }),
      deleteStudentById: build.mutation({
        query(id) {
          return {
            url: `students/${id}`,
            method: 'delete',
          }
        },
      }),
    }
  },
})

export const { useGetAllStudentQuery, useGetStudentByIdQuery, useDeleteStudentByIdMutation } =
  studentApi
```

```js
import { useState } from 'react'
import StudentForm from '../StudentForm/StudentForm'
import classes from './StudentItem.module.css'
import { useDeleteStudentByIdMutation } from '../../store/studentApi'

const StudentItem = (props) => {
  const { name, age, gender, address } = props.item.attributes
  const [isEdit, setIsEdit] = useState(false)
  const [deleteStudentById, { isLoading, isError }] = useDeleteStudentByIdMutation()

  const deleteHandler = () => {
    deleteStudentById(props.id)
  }

  const cancelEdit = () => {
    setIsEdit(false)
  }

  return (
    <>
      {!isEdit && (
        <tr>
          <td>{name}</td>
          <td>{gender}</td>
          <td>{age}</td>
          <td>{address}</td>
          <td>
            <button onClick={deleteHandler}>删除</button>
            <button
              onClick={() => {
                setIsEdit(true)
              }}
            >
              编辑
            </button>
          </td>
        </tr>
      )}
      {isEdit && (
        <StudentForm id={props.item.id} data={props.item.attributes} onCancelEdit={cancelEdit} />
      )}

      {isLoading ? (
        <tr>
          <td colSpan={5}>数据删除中...</td>
        </tr>
      ) : null}
      {isError ? (
        <tr>
          <td colSpan={5} className={classes.error}>
            数据删除失败!
          </td>
        </tr>
      ) : null}
    </>
  )
}

export default StudentItem
```

## 数据标签

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  tagTypes: ['student'], // 用来指定Api中的标签类型
  endpoints(build) {
    return {
      getAllStudent: build.query({
        query() {
          return 'students'
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        providesTags: [{ type: 'student', id: 'LIST' }],
      }),
      getStudentById: build.query({
        query(id) {
          return `students/${id}`
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        keepUnusedDataFor: 60,
        providesTags: (result, error, id) => [{ type: 'student', id }],
      }),
      deleteStudentById: build.mutation({
        query(id) {
          return {
            url: `students/${id}`,
            method: 'delete',
          }
        },
        invalidatesTags: [{ type: 'student', id: 'LIST' }],
      }),
      addStudent: build.mutation({
        query(newStudent) {
          return {
            url: 'students',
            method: 'post',
            body: {
              data: newStudent,
            },
          }
        },
        invalidatesTags: [{ type: 'student', id: 'LIST' }],
      }),
      updateStudent: build.mutation({
        query(obj) {
          return {
            url: `students/${obj.id}`,
            method: 'put',
            body: {
              data: obj.newStudent,
            },
          }
        },
        invalidatesTags: (result, error, obj) => [
          { type: 'student', id: 'LIST' },
          { type: 'student', id: obj.id },
        ],
      }),
    }
  },
})

export const {
  useGetAllStudentQuery,
  useGetStudentByIdQuery,
  useDeleteStudentByIdMutation,
  useAddStudentMutation,
  useUpdateStudentMutation,
} = studentApi
```

## React Router5 HelloWorld

react-router 可以将 url 地址和组件进行映射，当用户访问某个地址时，与其对应的组件会自动的挂载

react-router 使用步骤

- 引入 react-router-dom 包：`npm i react-router-dom@5`
- 在 index.js 中引入 BrowserRouter 组件
- 将 BrowserRouter 设置为根组件

将路由和组件进行映射

- 使用 Route 来映射地址和组件
- 属性：
  - path 映射的 url 地址
  - component 要挂载的组件
  - exact 路径是否完整匹配，默认值为 false
- 当 Route 的路径被访问时，其对应组件就会自动挂载
- 注意：默认情况下 Route 并不是严格匹配，只要 url 地址的头部和 path 一致，组件就会挂载，不会检查子路径

**index.js**

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

**App.js**

```js
import { Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

const App = () => {
  return (
    <div>
      <div>App组件</div>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
    </div>
  )
}

export default App
```

**components/home.js**

```js
const Home = () => {
  return (
    <div>
      <h1>这是主页</h1>
    </div>
  )
}

export default Home
```

**components/about.js**

```js
const About = () => {
  return (
    <div>
      <h2>关于我们，其实是师徒四人</h2>
      <ul>
        <li>孙悟空</li>
        <li>猪八戒</li>
        <li>沙和尚</li>
        <li>唐僧</li>
      </ul>
    </div>
  )
}

export default About
```

## Link 和 NavLink

在使用 react-router 时，一定不要使用 a 标签来创建超链接，因为 a 标签创建的超链接会自动向服务器发送请求重新加载页面，而我们不希望这种情况发生，可以使用 Link 组件来创建超链接，NavLink 和 Link 作用相似，只是可以指定链接激活后的样式

**Menu.js**

```js
import { NavLink } from 'react-router-dom'
import classes from './Menu.module.css'

const Menu = () => {
  return (
    <div>
      <ul>
        <li>
          {/* <Link to="/">主页</Link> */}
          <NavLink to="/" exact activeClassName={classes.active} activeStyle={{ fontSize: '20px' }}>
            主页
          </NavLink>
        </li>
        <li>
          {/* <Link to="/about">关于</Link> */}
          <NavLink
            to="/about"
            exact
            activeClassName={classes.active}
            activeStyle={{ fontSize: '20px' }}
          >
            关于
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Menu
```

**Menu.module.css**

```css
a:visited,
a:link {
  color: orange;
  text-decoration: none;
}

a.active {
  color: deepskyblue;
  text-decoration: underline;
}
```

## 两种 Router

关闭 nginx 服务器：`.\nginx.exe -s stop`

HashRouter 会通过 url 地址中的 hash 值来对地址进行匹配

BrowserRouter 直接通过 url 地址进行组件的跳转，使用过程中和普通的 url 地址没有区别

react-router 可以将 url 地址和组件进行映射，当用户访问某个地址时，与其对应的组件会自动的挂载，当我们通过点击 Link 构建的链接进行跳转时，跳转并没有经过服务器，所以没有问题，但是当我们刷新页面，或通过普通链接进行跳转时，会向服务器发送请求加载数据，这时的请求并没有经过 react-router 所以会返回 404

解决方案：

- 使用 HashRouter，服务器不会去判断 hash 值，所以使用 HashRouter 后请求将会由 React Router 处理
- 修改服务器的配置，将所有请求都转发到 index.html
  ```
  location / {
      root   html;
      #index  index.html index.htm;
      try_files $uri /index.html;
  }
  ```
- 修改服务器的配置后，需要重新加载配置文件：`.\nginx.exe -s reload`

## Route 组件

component 用来指定路由匹配后被挂载的组件，component 需要直接传递组件的类，通过 component 构建的组件，它会自动创建组件并且会自动传递参数

- match：匹配的信息
  - isExact 检查路径是否完全匹配，与 exact 属性无关
  - params 请求的 params 参数
- location：地址信息
- history：控制页面的跳转
  - push() 跳转页面，push() 需要一个 location 作为参数
  - replace() 替换页面

**App.js**

```js
import { Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Menu from './components/Menu'
import Student from './components/Student'

const App = () => {
  return (
    <div>
      <Menu />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/student/:id" component={Student} />
    </div>
  )
}

export default App
```

**About.js**

```js
const About = (props) => {
  const clickHandler = () => {
    // props.history.push({
    //   pathname: 'student/3',
    // })

    props.history.replace({
      pathname: 'student/3',
      state: {
        name: '哈哈哈',
      },
    })
  }

  return (
    <div>
      <button onClick={clickHandler}>点我一下</button>
      <h2>关于我们，其实是师徒四人</h2>
      <ul>
        <li>孙悟空</li>
        <li>猪八戒</li>
        <li>沙和尚</li>
        <li>唐僧</li>
      </ul>
    </div>
  )
}

export default About
```

**Student.js**

```js
const STU_DATA = [
  {
    id: 1,
    name: '孙悟空',
  },
  {
    id: 2,
    name: '猪八戒',
  },
  {
    id: 3,
    name: '沙和尚',
  },
  {
    id: 4,
    name: '唐僧',
  },
]

const Student = (props) => {
  console.log(props.location.state.name)

  const stu = STU_DATA.find((item) => +props.match.params.id === item.id)
  return (
    <div>
      {stu.id} {stu.name}
    </div>
  )
}

export default Student
```

## Route 组件

render 也可以用来指定要挂载的组件，render 需要一个回调函数作为参数，回调函数的返回值会被最终挂载，render 不会自动传递 match、location、history 三个属性

children 也可以用来指定被挂载的组件，用法有两种：

- 和 render 类似，传递回调函数，当 children 设置一个回调函数时，该组件无论路径是否匹配都会挂载
- 传递一个组件

除了可以通过 props 获取 match、location、history 三个属性外，也可以通过钩子函数来获取

**App.js**

```js
import { Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Menu from './components/Menu'
import Student from './components/Student'

const App = () => {
  return (
    <div>
      <Menu />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/student/:id" component={Student} />
      {/* <Route path="/student/:id" render={(routeProps) => <Student {...routeProps} />} /> */}
      {/* <Route path="/student/:id" children={(routeProps) => <Student {...routeProps} />} /> */}
      {/* <Route path="/student/:id" children={<Student />} /> */}
      {/* <Route path="/student/:id">
        <Student />
      </Route> */}
      {/* <Route path="/student/:id">{(routeProps) => <Student {...routeProps} />}</Route> */}
    </div>
  )
}

export default App
```

**Student.js**

```js
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'

const STU_DATA = [
  {
    id: 1,
    name: '孙悟空',
  },
  {
    id: 2,
    name: '猪八戒',
  },
  {
    id: 3,
    name: '沙和尚',
  },
  {
    id: 4,
    name: '唐僧',
  },
]

const Student = (props) => {
  const match = useRouteMatch()
  const location = useLocation()
  const history = useHistory()
  const params = useParams()

  const stu = STU_DATA.find((item) => +match.params.id === item.id)

  return (
    <div>
      {stu.id} {stu.name}
    </div>
  )
}

export default Student
```

## 路由的嵌套

**App.js**

```js
import { Route } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Menu from './components/Menu'
import Student from './components/Student'

const App = () => {
  return (
    <div>
      <Menu />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/student/:id" component={Student} />
    </div>
  )
}

export default App
```

**About.js**

```js
import { Route } from 'react-router-dom'
import Hello from './Hello'
import { useRouteMatch } from 'react-router-dom'

const About = () => {
  const match = useRouteMatch()

  return (
    <div>
      <h2>关于我们，其实是师徒四人</h2>
      <ul>
        <li>孙悟空</li>
        <li>猪八戒</li>
        <li>沙和尚</li>
        <li>唐僧</li>
      </ul>
      <Route path={`${match.path}/hello`}>
        <Hello />
      </Route>
    </div>
  )
}

export default About
```

## Prompt 组件

```js
import { useState } from 'react'
import { Prompt } from 'react-router-dom'

const MyForm = () => {
  const [isPrompt, setIsPrompt] = useState(false)
  const [inputData, setInputData] = useState('')

  const inputHandler = (e) => {
    if (e.target.value.trim().length) {
      setInputData(e.target.value.trim())
      setIsPrompt(true)
    }
  }

  return (
    <div>
      <Prompt when={isPrompt} message="你确认要离开页面吗" />
      <input onInput={inputHandler} value={inputData} type="text" />
    </div>
  )
}

export default MyForm
```

## Switch 组件

可以将 Route 统一放到一个 Switch 中，一个 Switch 中只会有一个路由显示

```js
import { Route } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Menu from './components/Menu'
import Student from './components/Student'
import MyForm from './components/MyForm'
import { Switch } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/student/:id" component={Student} />
        <Route path="/form">
          <MyForm />
        </Route>
        <Route path="*">
          <h2>404 NOT FOUND</h2>
        </Route>
      </Switch>
    </div>
  )
}

export default App
```

## Redirect 组件

Redirect 用于跳转页面

```js
import { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Login from './components/Login'
import Menu from './components/Menu'
import MyForm from './components/MyForm'
import Student from './components/Student'

const App = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/student/:id" component={Student} />
        <Route path="/login" component={Login} />
        <Route path="/form">{isLogin ? <MyForm /> : <Redirect to="/login" />}</Route>
        <Redirect from="/abc" to="/form" />
        <Route path="*">
          <h2>404 NOT FOUND</h2>
        </Route>
      </Switch>
    </div>
  )
}

export default App
```

## React Router6 HelloWorld

Routes

- v6 中新增加的组件
- 作用和 Switch 类似，都是用于 Route 的容器
- Routes 中 Route 只有一个会被匹配

v6 中，Route 的 component、render、children 都变了，需要通过 element 来指定要挂载的组件

**App.js**

```js
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Menu from './components/Menu'

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
```

## 参数和钩子

- 可以使用 useParams() 来获取参数
- useLocation()：获取当前的地址信息
- useMatch()：用来检查当前 url 是否匹配某个路由，如果路径匹配，则返回一个对象，不匹配则返回 null
- useNavigate()：获取一个用于跳转页面的函数

```js
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'

const STU_DATA = [
  {
    id: 1,
    name: '刘备',
  },
  {
    id: 2,
    name: '关羽',
  },
  {
    id: 3,
    name: '张飞',
  },
]

const Student = () => {
  const params = useParams()
  const location = useLocation()
  const match = useMatch('/student/:id')
  const student = STU_DATA.find((item) => item.id === +params.id)

  const nav = useNavigate()
  const clickHandler = () => {
    // nav('/about')
    nav('/about', {
      replace: true,
    })
  }

  return (
    <div>
      <button onClick={clickHandler}>点我一下</button>
      <div>
        {student.id} {student.name}
      </div>
    </div>
  )
}

export default Student
```

## 嵌套路由和 Outlet

`Outlet`

- 用来表示嵌套路由中的组件
- 当嵌套路由中的路径匹配成功了，Outlet 则表示嵌套路由中的组件
- 当嵌套路由中的路径没有匹配成功，Outlet 就什么都不显示

**App.js**

```js
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import Hello from './components/Hello'
import Home from './components/Home'
import Menu from './components/Menu'
import Student from './components/Student'

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="hello" element={<Hello />} />
        </Route>
        <Route path="/student/:id" element={<Student />} />
      </Routes>
    </div>
  )
}

export default App
```

**About.js**

```js
import { Outlet } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <h2>关于我们，其实是三个人</h2>
      <ul>
        <li>刘备</li>
        <li>关羽</li>
        <li>张飞</li>
      </ul>
      <Outlet />
    </div>
  )
}

export default About
```

## Navigate 组件

Navigate 组件用来跳转到指定的位置，默认使用 push 跳转

```js
import { Navigate, Outlet } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <Navigate to="/student/2" replace />
      <h2>关于我们，其实是三个人</h2>
      <ul>
        <li>刘备</li>
        <li>关羽</li>
        <li>张飞</li>
      </ul>
      <Outlet />
    </div>
  )
}

export default About
```

## NavLink

```js
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return isActive
                ? {
                    color: 'red',
                  }
                : {
                    textDecoration: 'none',
                  }
            }}
          >
            主页
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => {
              return isActive
                ? {
                    color: 'red',
                  }
                : {
                    textDecoration: 'none',
                  }
            }}
          >
            关于
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/3"
            style={({ isActive }) => {
              return isActive
                ? {
                    color: 'red',
                  }
                : {
                    textDecoration: 'none',
                  }
            }}
          >
            学生
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Menu
```

## 添加服务器验证

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
    prepareHeaders: (headers, api) => {
      const token = api.getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['student'], // 用来指定Api中的标签类型
  endpoints(build) {
    return {
      getAllStudent: build.query({
        query() {
          return {
            url: 'students',
          }
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        providesTags: [{ type: 'student', id: 'LIST' }],
      }),
      getStudentById: build.query({
        query(id) {
          return `students/${id}`
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        keepUnusedDataFor: 60,
        providesTags: (result, error, id) => [{ type: 'student', id }],
      }),
      deleteStudentById: build.mutation({
        query(id) {
          return {
            url: `students/${id}`,
            method: 'delete',
          }
        },
        invalidatesTags: [{ type: 'student', id: 'LIST' }],
      }),
      addStudent: build.mutation({
        query(newStudent) {
          return {
            url: 'students',
            method: 'post',
            body: {
              data: newStudent,
            },
          }
        },
        invalidatesTags: [{ type: 'student', id: 'LIST' }],
      }),
      updateStudent: build.mutation({
        query(obj) {
          return {
            url: `students/${obj.id}`,
            method: 'put',
            body: {
              data: obj.newStudent,
            },
          }
        },
        invalidatesTags: (result, error, obj) => [
          { type: 'student', id: 'LIST' },
          { type: 'student', id: obj.id },
        ],
      }),
    }
  },
})

export const {
  useGetAllStudentQuery,
  useGetStudentByIdQuery,
  useDeleteStudentByIdMutation,
  useAddStudentMutation,
  useUpdateStudentMutation,
} = studentApi
```

## useMemo

useMemo 用来存储函数的执行结果

**App.js**

```js
import { useMemo, useState } from 'react'
import Some from './components/Some'

const sum = (a, b) => {
  const begin = Date.now()
  while (1) {
    if (Date.now() - begin > 3000) {
      break
    }
  }
  console.log('函数执行了')
  return a + b
}

const App = () => {
  const [count, setCount] = useState(1)

  let a = 1
  let b = 2

  if (count % 10 === 0) {
    a++
  }

  // const result = useMemo(() => {
  //   return sum(a, b)
  // }, [a, b])

  const SomeComponent = useMemo(() => {
    return <Some a={a} b={b} />
  }, [a, b])

  const clickHandler = () => {
    setCount((prevState) => prevState + 1)
  }
  return (
    <div>
      <div>App result= count={count}</div>
      {SomeComponent}
      <button onClick={clickHandler}>点我一下</button>
    </div>
  )
}

export default App
```

**Some.js**

```js
const Some = (props) => {
  const begin = Date.now()
  while (1) {
    if (Date.now() - begin > 3000) {
      break
    }
  }

  return <div>Some {props.a + props.b}</div>
}

export default Some
```
