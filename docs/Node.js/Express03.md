---
sidebar_position: 8
---

# express03

- Router 是 express 中创建的一个对象
- router 实际上是一个中间件，可以在该中间件上去绑定各种路由以及其他的中间件

```js
const express = require('express')
const path = require('node:path')
const fs = require('node:fs/promises')

// 创建服务器实例
const app = express()

// 配置静态资源目录
app.use(express.static(path.resolve(__dirname, './public')))

// 解析请求体
app.use(express.urlencoded({ extended: true }))

// 将ejs设置为默认的模板引擎
app.set('view engine', 'ejs')

// 配置模板的路径
app.set('views', path.resolve(__dirname, './views'))

// Router是express中创建的一个对象
const router = express.Router()

// router实际上是一个中间件，可以在该中间件上去绑定各种路由以及其他的中间件
router.get('/hello', (req, res) => {
  res.send('Hello')
})

// 使路由生效
app.use(router)

// 配置错误路由
app.use((req, res, next) => {
  res.status(404)
  res.send('<h1>404 NOT FOUND</h1>')
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```

- 最终形态

```js
const express = require('express')
const path = require('node:path')
const fs = require('node:fs/promises')
const userRouter = require('./routes/user')
const goodsRouter = require('./routes/goods')

// 创建服务器实例
const app = express()

// 配置静态资源目录
app.use(express.static(path.resolve(__dirname, './public')))

// 解析请求体
app.use(express.urlencoded({ extended: true }))

// 将ejs设置为默认的模板引擎
app.set('view engine', 'ejs')

// 配置模板的路径
app.set('views', path.resolve(__dirname, './views'))

// // Router是express中创建的一个对象
// const router = express.Router()

// // router实际上是一个中间件，可以在该中间件上去绑定各种路由以及其他的中间件
// router.get('/hello', (req, res) => {
//   res.send('Hello')
// })

// app.use(router)

app.use('/user', userRouter)
app.use('/goods', goodsRouter)

// 配置错误路由
app.use((req, res, next) => {
  res.status(404)
  res.send('<h1>404 NOT FOUND</h1>')
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```

```js
const express = require('express')

const router = express.Router()

router.get('/list', (req, res) => {
  res.send('user中的list')
})

module.exports = router
```

```js
const express = require('express')

const router = express.Router()

router.get('/list', (req, res) => {
  res.send('goods中的list')
})

module.exports = router
```

- 使用 router 修改代码

```js
const express = require('express')
const path = require('node:path')
const studentRouter = require('./routes/students')

// 创建服务器实例
const app = express()

// 配置静态资源目录
app.use(express.static(path.resolve(__dirname, './public')))

// 解析请求体
app.use(express.urlencoded({ extended: true }))

// 将ejs设置为默认的模板引擎
app.set('view engine', 'ejs')

// 配置模板的路径
app.set('views', path.resolve(__dirname, './views'))

// 使路由生效
app.use('/students', studentRouter)

// 配置错误路由
app.use((req, res, next) => {
  res.status(404)
  res.send('<h1>404 NOT FOUND</h1>')
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```

```js
const express = require('express')
const fs = require('fs/promises')
const path = require('node:path')
let STUDENT = require('../data/students.json')

const router = express.Router()

// 获取学生信息的路由
router.get('/list', (req, res) => {
  res.render('students', { STUDENT })
})

// 添加学生的路由
router.post('/add', (req, res, next) => {
  const { name, age, gender, address } = req.body
  const id = STUDENT.length > 0 ? STUDENT.at(-1).id + 1 : 1

  const newStudent = {
    id,
    name,
    age: +age,
    gender,
    address,
  }

  STUDENT.push(newStudent)
  next()
})

// 删除学生的路由
router.get('/delete/:id', (req, res, next) => {
  const id = +req.params.id

  STUDENT = STUDENT.filter((item) => item.id !== id)
  next()
})

// 点击修改，显示修改页面
router.get('/to-update/:id', (req, res) => {
  const id = +req.params.id
  const student = STUDENT.find((item) => item.id === id)
  res.render('update-student', student)
})

// 修改学生的路由
router.post('/update', (req, res, next) => {
  const { id, name, age, gender, address } = req.body
  const student = STUDENT.find((item) => item.id === +id)

  student.name = name
  student.age = +age
  student.gender = gender
  student.address = address

  next()
})

// 统一写入json文件
router.use((req, res) => {
  fs.writeFile(path.resolve(__dirname, '../data/students.json'), JSON.stringify(STUDENT))
    .then(() => {
      res.redirect('/students/list')
    })
    .catch((err) => {
      console.log('出错了', err)
    })
})

module.exports = router
```

```js
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        margin: 50px auto;
        border-collapse: collapse;
        width: 50%;
        text-align: center;
      }

      th,
      td {
        border: 1px solid #000;
      }

      form {
        width: 300px;
        margin: 0 auto;
      }

      h3 {
        margin: 50px auto;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <% if(STUDENT.length>0){ %>
    <table>
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <% for(let stu of STUDENT) { %>
        <tr>
          <td><%=stu.id %></td>
          <td><%=stu.name %></td>
          <td><%=stu.age %></td>
          <td><%=stu.gender %></td>
          <td><%=stu.address %></td>
          <td>
            <a
              onclick="return confirm(`确认要删除【<%=stu.name %>】吗`)"
              href="/students/delete/<%=stu.id%>"
              >删除</a
            >
            <a href="/students/to-update/<%=stu.id %>">修改</a>
          </td>
        </tr>
        <% } %>
      </tbody>
    </table>
    <%}else{%>
    <h3>暂无数据</h3>
    <%}%>

    <form action="/students/add" method="post">
      <div>姓名：<input type="text" name="name" /></div>
      <div>年龄：<input type="text" name="age" /></div>
      <div>
        性别：<input type="radio" name="gender" value="男" />男
        <input type="radio" name="gender" value="女" />女
      </div>
      <div>地址：<input type="text" name="address" /></div>
      <div>
        <button>添加</button>
      </div>
    </form>
  </body>
</html>
```

```js
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      form {
        width: 300px;
        margin: 50px auto;
      }

      h2 {
        margin: 50px auto;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h2>修改信息</h2>
    <form action="/students/update" method="post">
      <div>
        <!-- hidden是一个隐藏的表单项，可以通过它传递一些不希望被用户看见的数据 -->
        <input type="hidden" name="id" value="<%=id %>" />
      </div>
      <div>姓名：<input type="text" name="name" value="<%=name %>" /></div>
      <div>年龄：<input type="text" name="age" value="<%=age %>" /></div>
      <div>
        性别：<input type="radio" name="gender" value="男" <%=gender === '男' && 'checked' %> />男
        <input type="radio" name="gender" value="女" <%=gender === '女' && 'checked' %> />女
      </div>
      <div>地址：<input type="text" name="address" value="<%=address %>" /></div>
      <div>
        <button>修改</button>
      </div>
    </form>
  </body>
</html>
```
