---
sidebar_position: 6
---

# express01

- express 是 node 中的服务器软件
  - 通过 express 可以快速的在 node 中搭建一个 web 服务器
- 使用步骤：
  - 创建并初始化项目
    - yarn init -y
  - 安装 express
    - yarn add express
  - 创建 index.js 并编写代码
- 如果希望服务器可以正常访问，则需要为服务器设置路由
  - 路由可以根据不同的请求方式和请求地址来处理用户的请求
  - app.METHOD(...)
    - METHOD 可以是 get 或 post ...
- 中间件
  - 在 express 我们使用 app.use 来定义一个中间件
    - 中间件作用和路由很像，用法很像
    - 但是中间件不区分请求的方式，只看路径
  - 和路由的区别
    - 会匹配所有请求
    - 路径设置父目录
    - 路由是精确匹配路径，中间件是匹配当前路径及其子路径
- 路由的回调函数执行时，会接收到三个参数
  - 第一个 request 第二个 response
  - next() 是回调函数的第三个参数，它是一个函数，调用函数后，可以触发后续的中间件
  - next() 不能在响应处理完毕后调用
- 在路由中，应该做两件事
  - 读取用户的请求(request)
    - req 表示的是用户的请求信息，通过 req 可以获取用户传递的数据
  - 根据用户的请求返回响应(response)
    - res 表示的服务器发送给客户端的响应信息
    - 可以通过 res 来向客户端返回数据
    - sendStatus() 向客户端发送响应状态码
    - status() 用来设置响应状态码，但是并不发送
    - send() 设置并发送响应体
- 启动服务器
  - app.listen(端口号) 用来启动服务器
  - 服务器启动后，我们便可以通过 3000 端口来访问了
  - 协议名://ip 地址:端口号/路径
  - http://localhost:3000
  - http://127.0.0.1:3000

```js
const express = require('express')

// 获取服务器的实例(对象)
const app = express()

app.use('/', (req, res, next) => {
  console.log(111)
  next()
})

app.use('/', (req, res, next) => {
  console.log(222)
  next()
})

app.use('/', (req, res, next) => {
  console.log(333)
  // res.send('你没有权限')
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>这是我的第一个服务器</h1>')
})

app.listen(3000, () => {
  console.log('服务器启动成功~')
})
```

- 目前，服务器代码修改后必须要重启
  - 我们希望有一种方式，可以自动监视代码的修改
  - 代码修改以后可以自动重启服务器
- 要实现这个功能，我们需要安装一个模块 nodemon
- 使用方式：
  - 全局安装
    - npm i nodemon -g
    - yarn global add nodemon
      - 通过 yarn 进行全局安装时，默认 yarn 的目录并不在环境变量中
      - 需要手动将路径添加到环境变量中
      - yarn global bin 查看 yarn 的安装路径
    - 启动：
      - nodemon 运行 index.js
      - nodemon xxx 运行指定的 js
  - 在项目中安装
    - npm i nodemon -D
    - yarn add nodemon -D
    - 启动：
      - npx nodemon 运行 index.js
      - npx nodemon xxx 运行指定的 js
- 服务器中的代码，对于外部来说都是不可见的
  - 所以我们写的 html 页面，浏览器无法直接访问
  - 如果希望浏览器可以访问，则需要将页面所在的目录设置静态资源目录
- 设置 static 中间件后，浏览器访问时，会自动去 public 目录寻找是否有匹配的静态资源
- req.query 表示查询字符串中的请求参数
- get 请求发送参数的第二种方式
  - /hello/:id 表示当用户访问 /hello/xxx 时就会触发
  - 在路径中以冒号命名的部分我们称为 param，在 get 请求它可以被解析为请求参数
  - param 传参一般不会传递特别复杂的参数
  - 可以通过 req.params 属性来获取这些参数

**index.js**

```js
const express = require('express')
const path = require('node:path')

const app = express()

// 设置static中间件后，浏览器访问时，会自动去public目录寻找是否有匹配的静态资源
app.use(express.static(path.resolve(__dirname, './public')))

app.get('/', (req, res) => {
  res.send('首页')
})

app.get('/login', (req, res) => {
  // console.log(req.query) // { username: 'admin', password: '123456' }

  const { username, password } = req.query

  if (username === 'admin' && password === '123456') {
    res.send('<h1>登录成功</h1>')
  } else {
    res.send('<h1>用户名或密码错误</h1>')
  }
})

app.get('/hello/:id', (req, res) => {
  console.log(req.params) // { id: '1' }
  res.send('Hello路由')
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```

**index.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>登录</h2>

    <form action="/login">
      <div>用户名：<input type="text" name="username" /></div>
      <div>密码：<input type="password" name="password" /></div>
      <button>提交</button>
    </form>

    <!-- <h1>静态资源网页</h1>
    <img src="./an.jpg" /> -->
  </body>
</html>
```

- 通过 req.body 来获取 post 请求的参数(请求体中的参数)
- 默认情况下 express 不会自动解析请求体，需要通过中间件来为其增加功能
- 引入解析请求体的中间件
  - app.use(express.urlencoded())

**index.js**

```js
const express = require('express')
const path = require('node:path')

const app = express()

// 设置static中间件后，浏览器访问时，会自动去public目录寻找是否有匹配的静态资源
app.use(express.static(path.resolve(__dirname, './public')))

// 引入解析请求体的中间件
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.send('首页')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  if (username === 'admin' && password === '123456') {
    res.send('登录成功')
  } else {
    res.send('用户名或密码错误')
  }
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```

**index.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>登录</h2>

    <form action="/login" method="post">
      <div>用户名：<input type="text" name="username" /></div>
      <div>密码：<input type="password" name="password" /></div>
      <button>提交</button>
    </form>
  </body>
</html>
```

**小练习**

**login.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>登录</h2>

    <form action="/login" method="post">
      <div>
        <input type="text" name="username" placeholder="请输入用户名" />
      </div>
      <div>
        <input type="password" name="password" placeholder="请输入密码" />
      </div>
      <button>提交</button>
    </form>
  </body>
</html>
```

**register.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>注册</h2>
    <form action="/register" method="post">
      <div>
        <input type="text" name="username" placeholder="请输入用户名" />
      </div>
      <div>
        <input type="password" name="password" placeholder="请输入密码" />
      </div>
      <div>
        <input type="password" name="repwd" placeholder="请确认密码" />
      </div>
      <div>
        <input type="text" name="nickname" placeholder="请输入昵称" />
      </div>
      <button>提交</button>
    </form>
  </body>
</html>
```

**index.js**

```js
const express = require('express')
const path = require('node:path')

const USER = [
  {
    username: 'admin',
    password: '123456',
    nickname: '超级管理员',
  },
  {
    username: 'sunwukong',
    password: '123456',
    nickname: '孙悟空',
  },
]

const app = express()

app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.send('首页')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = USER.find((item) => item.username === username && item.password === password)

  if (user) {
    res.send(`登录成功 ${user.nickname}`)
  } else {
    res.send('用户名或密码错误')
  }
})

app.post('/register', (req, res) => {
  const { username, password, repwd, nickname } = req.body

  const user = USER.find((item) => item.username === username || item.nickname === nickname)

  if (!user) {
    USER.push({
      username,
      password,
      nickname,
    })

    res.send('注册成功')
  } else {
    res.send('该用户已存在')
  }
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```
