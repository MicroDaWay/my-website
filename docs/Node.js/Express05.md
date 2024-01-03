---
sidebar_position: 10
---

# express05

## csrf 攻击

- 跨站请求伪造
  - http://localhost:3000/students/delete/4
  - 现在大部分的浏览器都不会在跨域的情况下自动发送 cookie
  - 这个设计就是为了避免 csrf 的攻击
  - 如何解决？
    - 使用 referer 头来检查请求的来源
    - 使用验证码
    - 尽量使用 post 请求(结合 token)
  - token(令牌)
    - 可以在创建表单时随机生成一个令牌
    - 然后将令牌存储到 session 中，并通过 ejs 模板发送给用户
    - 用户提交表单时，必须将 token 发回，才可以进行后续操作 (可以使用 uuid 来生成 token)
    - 使用：
      - yarn add uuid
      - const uuid = require('uuid').v4
      - const token = uuid()

```js
// 权限验证
app.use((req, res, next) => {
  // const referer = req.get('referer')

  // if (!referer || !referer.startsWith('http://localhost:3000/')) {
  //   res.status(403).send('你没有权限')
  //   return
  // }

  if (req.session.loginUser) {
    next()
  } else {
    res.redirect('/')
  }
})
```

```js
// 获取学生信息的路由
router.get('/list', (req, res) => {
  const token = uuid()
  req.session.token = token
  req.session.save(() => {
    res.render('students', { STUDENT, username: req.session.loginUser, token })
  })
})
```

```js
<form action="/students/add" method="post">
  <div>
    <input type="hidden" name="token" value="<%=token%>" />
  </div>
  <div>
    姓名：
    <input type="text" name="name" />
  </div>
  <div>
    年龄：
    <input type="text" name="age" />
  </div>
  <div>
    性别：
    <input type="radio" name="gender" value="男" />男
    <input type="radio" name="gender" value="女" />女
  </div>
  <div>
    地址：
    <input type="text" name="address" />
  </div>
  <div>
    <button>添加</button>
  </div>
</form>
```

```js
// 添加学生的路由
router.post('/add', (req, res, next) => {
  const token = req.body.token

  if (token === req.session.token) {
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

    // 清空token
    req.session.token = null

    next()
  } else {
    res.status(403).send('token无效')
  }
})
```
