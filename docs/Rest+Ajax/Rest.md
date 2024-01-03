---
sidebar_position: 1
---

# Rest

- 我们之前编写的服务器都是传统的服务器，服务器的结构是基于 MVC 模式
  - Model -- 数据模型
  - View -- 视图，用来呈现
  - Controller -- 控制器，复杂加载数据并选择视图来呈现数据
  - 传统的服务器是直接为客户端返回一个页面
  - 但是传统的服务器并不能适用于现在的应用场景
- 现在的应用场景，一个应用通常都会有多个客户端(client)存在
  - web 端 移动端(app) pc 端
  - 如果服务器直接返回 html 页面，那么服务器就只能为 web 端提供服务
  - 其他类型的客户端还需要单独开发服务器，这样就提高了开发和维护的成本
- 如何解决这个问题？
  - 传统的服务器需要做两件事情，第一个加载数据，第二个要将模型渲染进视图
  - 解决方案就是将渲染视图的功能从服务器中剥离出来
  - 服务器只负责向客户端返回数据，渲染视图的工作由客户端自行完成
  - 分离以后，服务器只提供数据，一个服务器可以同时为多种客户端提供服务
  - 同时将视图渲染的工作交给客户端以后，简化了服务器代码的编写
- Rest
  - REpresentational State Transfer
  - 表示层状态的传输
  - Rest 实际上就是一种服务器的设计风格
  - 它的主要特点就是，服务器只返回数据
  - 服务器和客户端传输数据时通常会使用 JSON 作为数据格式
  - 请求的方法：
    - GET 加载数据
    - POST 新建或添加数据
    - PUT 添加或修改数据
    - PATCH 修改数据
    - DELETE 删除数据
    - OPTION 由浏览器自动发送，检查请求的一些权限
  - API(接口) Endpoint(端点)
    - GET /user
    - POST /user
    - DELETE /user/:id
- 解析表单格式请求体的中间件 x-www-form-urlencoded
  - `app.use(express.urlencoded({ extended: true }))`
- 解析 json 格式请求体的中间件 raw -> JSON
  - app.use(express.json())

```js
const express = require('express')

let STUDENT = [
  {
    id: '1',
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山',
  },
  {
    id: '2',
    name: '猪八戒',
    age: 28,
    gender: '男',
    address: '高老庄',
  },
  {
    id: '3',
    name: '沙和尚',
    age: 38,
    gender: '男',
    address: '流沙河',
  },
]

const app = express()
// 解析表单格式请求体的中间件 x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// 解析json格式请求体的中间件 raw -> JSON
app.use(express.json())

// 获取所有学生信息的路由
app.get('/students', (req, res) => {
  res.send({
    status: 'ok',
    data: STUDENT,
  })
})

// 根据id获取某个学生信息的路由
app.get('/students/:id', (req, res) => {
  const id = req.params.id
  const student = STUDENT.find((item) => item.id === id)

  if (student) {
    res.send({
      status: 'ok',
      data: student,
    })
  } else {
    res.status(403).send({
      status: 'error',
      data: '学生id不存在',
    })
  }
})

// 添加学生的路由
app.post('/students', (req, res) => {
  const { name, age, gender, address } = req.body
  const id = STUDENT.length > 0 ? +STUDENT.at(-1).id + 1 + '' : '1'

  const student = {
    id,
    name,
    age: +age,
    gender,
    address,
  }

  STUDENT.push(student)

  res.send({
    status: 'ok',
    data: student,
  })
})

// 修改学生信息的路由
app.put('/students/:id', (req, res) => {
  const id = req.params.id
  const { name, age, gender, address } = req.body
  const student = STUDENT.find((item) => item.id === id)

  if (student) {
    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address

    res.send({
      status: 'ok',
      data: student,
    })
  } else {
    res.status(403).send({
      status: 'error',
      data: '学生id不存在',
    })
  }
})

// 根据id删除学生的路由
app.delete('/students/:id', (req, res) => {
  const id = req.params.id
  const student = STUDENT.find((item) => item.id === id)

  if (student) {
    STUDENT = STUDENT.filter((item) => item.id !== id)

    res.send({
      status: 'ok',
      data: student,
    })
  } else {
    res.status(403).send({
      status: 'error',
      data: '学生id不存在',
    })
  }
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
```
