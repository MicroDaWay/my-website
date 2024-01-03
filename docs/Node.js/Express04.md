---
sidebar_position: 9
---

# express04

- HTTP 协议是一个无状态的协议
  - 服务器无法区分请求是否发送自同一个客户端
- cookie
  - cookie 是 HTTP 协议中用来解决无状态问题的技术
  - cookie 的本质就是一个头
    - 服务器以响应头的形式将 cookie 发送给客户端
    - 客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回
    - 这样服务器就可以根据 cookie 来识别出客户端了
- 需要安装中间件来使得 express 可以解析 cookie
  - 安装 cookie-parser
    - yarn add cookie-parser
  - 引入
    - const cookieParser = require("cookie-parser")
  - 设置为中间件
    - app.use(cookieParser())
  - req.cookies
    - 用来读取客户端发回的 cookie
  - res.cookie(键, 值)
    - 给客户端发送一个 cookie

```js
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    res.cookie('username', username)
    res.redirect('/students/list')
  } else {
    res.send('用户名或密码错误')
  }
})
```

```js
router.get('/list', (req, res) => {
  if (req.cookies.username) {
    res.render('students', { STUDENT })
  } else {
    res.redirect('/')
  }
})
```

- cookie 是有有效期的
  - 默认情况下 cookie 的有效期就是一次会话(session)
  - 会话就是一次从打开到关闭浏览器的过程
  - maxAge 用来设置 cookie 有效时间，单位是毫秒
  - cookie 一旦发送给浏览器我们就不能再修改了
  - 但是我们可以通过发送新的同名 cookie 来替换旧 cookie，从而达到修改的目的

```js
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    res.cookie('username', username, {
      // expires: new Date(2023, 10, 21)
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    res.redirect('/students/list')
  } else {
    res.send('用户名或密码错误')
  }
})
```

- cookie 的不足
  - cookie 是由服务器创建，浏览器保存
    - 每次浏览器访问服务器时都需要将 cookie 发回
    - 这就导致我们不能在 cookie 中存放较多的数据
    - 并且 cookie 是直接存储在客户端的，容易被篡改盗用
  - 注意：
    - 我们在使用 cookie 时一定不会在 cookie 中存储敏感数据
  - 所以为了解决 Cookie 的不足，我们希望可以这样
    - 将用户的数据统一存储在服务器中
    - 每一个用户的数据都有一个对应的 id
    - 我们只需通过 cookie 将 id 发送给浏览器
    - 浏览器只需每次访问时将 id 发回，即可读取到服务器中存储的数据
    - 这个技术我们称之为 session(会话)
- session
  - session 是服务器中的一个对象，这个对象用来存储用户的数据
  - 每一个 session 对象都有一个唯一的 id，id 会通过 cookie 的形式发送给客户端
  - 客户端每次访问时只需将存储有 id 的 cookie 发回即可获取它在服务器中存储的数据
  - 在 express 中可以通过 express-session 组件来实现 session 功能
  - 使用步骤：
    - 安装
      - yarn add express-session
    - 引入
      - const session = require('express-session')
    - 设置为中间件
      ```js
      app.use(
        session({
          secret: 'hello',
        })
      )
      ```
  - session 的默认有效期是一次会话

```js
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    req.session.loginUser = username
    res.redirect('/students/list')
  } else {
    res.send('用户名或密码错误')
  }
})
```

```js
// 权限验证
app.use((req, res, next) => {
  if (req.session.loginUser) {
    next()
  } else {
    res.redirect('/')
  }
})

// 使路由生效
app.use('/students', studentRouter)
```

- session 是服务器中的一个对象，这个对象用来存储用户的信息
  - 每一个 session 都会有一个唯一的 id，session 创建后，id 会以 cookie 的形式发送给浏览器
  - 浏览器收到以后，每次访问都会将 id 发回，服务器中就可以根据 id 找到对应的 session
- id(cookie) ----> session 对象
- session 什么时候会失效？
  - 第一种 浏览器的 cookie 没了
  - 第二种 服务器中的 session 对象没了
- express-session 默认是将 session 存储到内存中的，所以服务器一旦重启 session 会自动重置
  - 所以我们使用 session 通常会对 session 进行一个持久化的操作(写到文件或数据库)
- 如何将 session 存储到本地文件中：
  - 需要引入一个中间件 session-file-store
  - 使用步骤：
    - 安装
      - yarn add session-file-store
    - 引入
      - const FileStore = require("session-file-store")(session)
    - 设置为中间件
      ```js
      app.use(
        session({
          store: new FileStore({}),
          secret: 'hello',
        })
      )
      ```

```js
// 配置session中间件
app.use(
  session({
    store: new FileStore({
      // path用来指定session本地文件的路径
      path: path.resolve(__dirname, './sessions'),
      // 对session中的数据进行加密
      secret: 'world',
      // session的有效时间 单位: 秒 默认为1个小时
      // ttl: 10,
      // 默认情况下，fileStore会每间隔一小时，清除一次session对象
      // reapInterval 用来指定清除session的间隔，单位: 秒，默认为1小时
      // reapInterval: 10
    }),
    secret: 'hello',
    // cookie: {
    //   maxAge: 30 * 24 * 60 * 60 * 1000
    // }
  })
)
```

- 修改 bug

```js
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    // 登录成功后，将用户信息放入到session中
    // 这里仅仅是将loginUser添加到了内存中的session中
    // 而没有将值写入到文件中
    req.session.loginUser = username

    // 为了使得session可以立刻存储，需要手动调用save
    req.session.save(() => {
      res.redirect('/students/list')
    })
  } else {
    res.send('用户名或密码错误')
  }
})
```
