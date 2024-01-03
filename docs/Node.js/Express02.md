---
sidebar_position: 7
---

# express02

- html 页面属于静态页面，创建的时候什么样子，用户看到的就是什么样子
- 不会自动跟随服务器中数据的变化而变化
- 希望有这么一个东西，他呢长的像是个网页，但是他里边可以嵌入变量，这个东西在 node 中被称为 模板
- 在 node 中存在有很多个模板引擎，都各具特色，ejs
- ejs 是 node 中的一款模板引擎，使用步骤：
  - 安装 ejs
    - yarn add ejs
  - 配置 express 的模板引擎为 ejs
    - app.set("view engine", "ejs")
  - 配置模板路径
    - app.set("views", path.resolve(\_\_dirname, "views"))
  - 注意，模板引擎需要被 express 渲染后才能使用
  - res.render() 用来渲染一个模板引擎，并将其返回给浏览器
  - 可以将一个对象作为 render 的第二个参数传递，这样在模板中可以访问到对象中的数据
    - 例如：`res.render("students", { name: "孙悟空", age: 18, gender: "男" })`
  - `<%= %>` 在 ejs 中输出内容时，它会自动对字符串中的特殊符号进行转义 &lt;
    - 这个设计主要是为了避免 xss 攻击
  - `<%- %>` 直接将内容输出
  - `<% %>` 可以在 ejs 中直接编写 js 代码，js 代码会在服务器中执行
  - `<%# %>` 注释 例如：`<%#name%>`

```js
const express = require('express')
const path = require('node:path')

const STUDENT = [
  {
    name: '孙悟空',
    age: 18,
    gender: '男',
  },
  {
    name: '猪八戒',
    age: 28,
    gender: '男',
  },
  {
    name: '沙和尚',
    age: 38,
    gender: '男',
  },
]

let name = '孙悟空'

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

app.get('/students', (req, res) => {
  // render参数中的名字需要和views中的ejs的文件名相同
  // res.render('students', { name: '孙悟空', age: 18 })
  res.render('students', { name })
})

app.post('/set-name', (req, res) => {
  const { username } = req.body
  name = username
  res.send('修改成功')
})

// 配置错误路由
app.use((req, res, next) => {
  res.status(404)
  res.send('<h1>404 NOT FOUND</h1>')
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```

- 直接在添加路由中渲染 ejs，会面临表单重复提交的问题
- res.redirect() 用来发起请求重定向
- 重定向的作用是告诉浏览器你向另外一个地址再发起一次请求

```js
const express = require('express')
const path = require('node:path')
const fs = require('node:fs/promises')

const STUDENT = require('./data/students.json')

let name = '孙悟空'

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

app.get('/students', (req, res) => {
  // render参数中的名字需要和views中的ejs的文件名相同
  // res.render('students', { name: '孙悟空', age: 18 })
  res.render('students', { STUDENT })
})

// 添加学生的路由
app.post('/add-student', (req, res) => {
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
  fs.writeFile(path.resolve(__dirname, './data/students.json'), JSON.stringify(STUDENT))
    .then(() => {
      res.redirect('/students')
    })
    .catch((err) => {
      console.log('出错了', err)
    })

  // 直接在添加路由中渲染ejs，会面临表单重复提交的问题
  // res.render('students', { STUDENT })
})

app.post('/set-name', (req, res) => {
  const { username } = req.body
  name = username
  res.send('修改成功')
})

// 配置错误路由
app.use((req, res, next) => {
  res.status(404)
  res.send('<h1>404 NOT FOUND</h1>')
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```

- 完成修改和删除

```js
const express = require('express')
const path = require('node:path')
const fs = require('node:fs/promises')

let STUDENT = require('./data/students.json')

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

// 将数据写入json文件中
function saveData(res, data) {
  fs.writeFile(path.resolve(__dirname, './data/students.json'), JSON.stringify(data))
    .then(() => {
      res.redirect('/students')
    })
    .catch((err) => {
      console.log('出错了', err)
    })
}

// 获取学生信息的路由
app.get('/students', (req, res) => {
  // render参数中的名字需要和views中的ejs的文件名相同
  // res.render('students', { name: '孙悟空', age: 18 })
  res.render('students', { STUDENT })
})

// 添加学生的路由
app.post('/add-student', (req, res) => {
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
  saveData(res, STUDENT)
})

// 删除学生的路由
app.get('/delete-student/:id', (req, res) => {
  const id = +req.params.id

  STUDENT = STUDENT.filter((item) => item.id !== id)
  saveData(res, STUDENT)
})

// 点击修改，显示修改页面
app.get('/to-update/:id', (req, res) => {
  const id = +req.params.id
  const student = STUDENT.find((item) => item.id === id)
  res.render('update-student', student)
})

// 修改学生的路由
app.post('/update-student', (req, res) => {
  const { id, name, age, gender, address } = req.body
  const student = STUDENT.find((item) => item.id === +id)

  student.name = name
  student.age = +age
  student.gender = gender
  student.address = address

  saveData(res, STUDENT)
})

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
              href="/delete-student/<%=stu.id%>"
              >删除</a
            >
            <a href="/to-update/<%=stu.id %>">修改</a>
          </td>
        </tr>
        <% } %>
      </tbody>
    </table>
    <%}else{%>
    <h3>暂无数据</h3>
    <%}%>

    <form action="/add-student" method="post">
      <div>姓名：<input type="text" name="name" /></div>
      <div>年龄：<input type="text" name="age" /></div>
      <div>
        性别：<input type="radio" name="gender" value="男" />男
        <input type="radio" name="gender" value="女" />女
      </div>
      <div>地址：<input type="text" name="address" /></div>
      <div>
        <button>提交</button>
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
    <form action="/update-student" method="post">
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
        <button>提交</button>
      </div>
    </form>
  </body>
</html>
```
