---
sidebar_position: 2
---

# Ajax

- 在 js 中向服务器发送请求加载数据的技术叫 AJAX
- AJAX
  - A 异步 J JavaScript A and X xml
  - 异步的 js 和 xml
  - 它的作用就是通过 js 向服务器发送请求来加载数据
  - xml 是早期 AJAX 使用的数据格式
  - 目前数据格式都使用 json
    - `{"name" :"孙悟空"}`
  - 可以选择的方案：
    - XMLHTTPRequest(xhr)
    - Fetch
    - Axios
- CORS (跨域资源共享)
  - 跨域请求
    - 如果两个网站的完整的域名不相同
      - a 网站：http://haha.com
      - b 网站：http://heihei.com
    - 跨域需要检查三个东西：
      - 协议 域名 端口号
        - http://localhost:5000
        - http://127.0.0.1:5000
      - 三个只要有一个不同，就算跨域
      - 当我们通过 AJAX 去发送跨域请求时，浏览器为了服务器的安全，会阻止 JS 读取到服务器的数据
    - 解决方案
      - 在服务器中设置一个允许跨域的头
        - Access-Control-Allow-Origin
        - 允许哪些客户端可以访问我们的服务器
        - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
      - res.setHeader('Access-Control-Allow-Origin', '\*')
      - res.setHeader('Access-Control-Allow-Methods', 'get,post')
      - res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      - Access-Control-Allow-Origin 设置指定值时只能设置一个
        - res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
      - Access-Control-Allow-Methods 允许的请求方式
      - Access-Control-Allow-Headers 允许传递的请求头

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>客户端</h1>
    <button id="btn">点击加载数据</button>

    <script>
      const btn = document.getElementById('btn')
      btn.addEventListener('click', () => {
        // 创建一个新的xhr对象，xhr表示请求信息
        const xhr = new XMLHttpRequest()
        // 设置请求的信息
        xhr.open('get', 'http://localhost:3000/students')
        // 发送请求
        xhr.send()
      })
    </script>
  </body>
</html>
```

```js
// 设置响应头
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'get,post')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
```

## xhr

- 设置响应体的类型，设置后会自动对数据进行类型转换
  - xhr.responseType = "json"
- xhr.status 表示响应状态码
- xhr.response 表示响应信息

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>客户端</h1>
    <button id="btn">点击加载数据</button>

    <div id="root"></div>

    <script>
      const btn = document.getElementById('btn')
      const root = document.getElementById('root')

      btn.addEventListener('click', () => {
        // 创建一个新的xhr对象，xhr表示请求信息
        const xhr = new XMLHttpRequest()

        // 设置响应体的类型，设置后会自动对数据进行类型转换
        xhr.responseType = 'json'

        // 设置请求的信息
        xhr.open('get', 'http://localhost:3000/students')
        // 发送请求
        xhr.send()

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            // const res = JSON.parse(xhr.response)

            // xhr.response 表示响应信息
            const res = xhr.response

            // xhr.status 表示响应状态码
            if (res.status === 'ok') {
              const studentList = res.data
              const ul = document.createElement('ul')
              root.appendChild(ul)

              for (let item of studentList) {
                ul.insertAdjacentHTML(
                  'beforeend',
                  `<li>${item.id} - ${item.name} - ${item.age} - ${item.gender} - ${item.address}</li>`
                )
              }
            }
          }
        })
      })
    </script>
  </body>
</html>
```

## fetch

- fetch 是 xhr 的升级版，采用的是 Promise API
- 作用和 AJAX 是一样的，但是使用起来更加友好
- fetch 是原生 js 就支持的一种 ajax 请求的方式
- res.json() 可以用来读取 json 格式的数据

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        border-collapse: collapse;
        text-align: center;
        width: 50%;
      }

      th,
      td {
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <h1>客户端</h1>
    <button id="btn">点击加载数据</button>

    <div id="root"></div>

    <script>
      const btn = document.getElementById('btn')
      const root = document.getElementById('root')

      btn.addEventListener('click', () => {
        fetch('http://localhost:3000/students')
          .then((res) => {
            if (res.status === 200) {
              // res.json() 可以用来读取json格式的数据
              return res.json()
            } else {
              throw new Error('数据加载失败')
            }
          })
          .then((res) => {
            if (res.status === 'ok') {
              const studentList = res.data

              const table = document.createElement('table')
              root.appendChild(table)
              table.insertAdjacentHTML(
                'beforeend',
                `
                  <thead>
                    <tr>
                      <th>学号</th>
                      <th>姓名</th>
                      <th>年龄</th>
                      <th>性别</th>
                      <th>地址</th>
                    </tr>
                  </thead>
                `
              )

              const tbody = document.createElement('tbody')
              table.appendChild(tbody)
              for (let item of studentList) {
                tbody.insertAdjacentHTML(
                  'beforeend',
                  `
                  <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.gender}</td>
                    <td>${item.address}</td>
                  </tr>
                `
                )
              }
            }
          })
          .catch((err) => {
            console.log('出错了', err)
          })
      })
    </script>
  </body>
</html>
```

- 通过 body 去发送数据时，必须通过请求头来指定数据的类型

```js
btn2.addEventListener('click', () => {
  fetch('http://localhost:3000/students', {
    method: 'post',
    // 通过body去发送数据时，必须通过请求头来指定数据的类型
    body: JSON.stringify({
      name: '蜘蛛精',
      age: 12,
      gender: '女',
      address: '盘丝洞',
    }),
    headers: {
      // application/x-www-form-urlencoded
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('出错了', err)
    })
})
```

- 登录成功以后，需要保持用户的登录的状态，需要将用户的信息存储到某个地方
- 发送 cookie 存在跨域的问题，session 是基于 cookie 的，因此都无法使用
- 需要将用户信息存储到本地存储
- 所谓的本地存储就是指浏览器自身的存储空间
  - 可以将用户的数据存储到浏览器内部
  - sessionStorage 中存储的数据 页面一关闭就会丢失
  - localStorage 存储的时间比较长
  - setItem() 用来存储数据
  - getItem() 用来获取数据
  - removeItem() 删除数据
  - clear() 清空数据

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        border-collapse: collapse;
        text-align: center;
        width: 50%;
      }

      th,
      td {
        border: 1px solid #000;
      }
    </style>
    <style>
      #error {
        color: red;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <h2>登录</h2>

      <form>
        <div>
          <input id="username" type="text" placeholder="请输入用户名" value="admin" />
        </div>
        <div>
          <input id="password" type="password" placeholder="请输入密码" value="123456" />
        </div>
        <div id="error"></div>
        <div>
          <button id="login-btn" type="button">登录</button>
        </div>
      </form>
    </div>

    <script>
      const root = document.getElementById('root')
      const error = document.getElementById('error')
      const loginBtn = document.getElementById('login-btn')

      function loadData() {
        fetch('http://localhost:3000/students')
          .then((res) => {
            if (res.status === 200) {
              // res.json() 可以用来读取json格式的数据
              return res.json()
            } else {
              throw new Error('数据加载失败')
            }
          })
          .then((res) => {
            if (res.status === 'ok') {
              const studentList = res.data

              const table = document.createElement('table')
              root.appendChild(table)
              table.insertAdjacentHTML(
                'beforeend',
                `
                  <thead>
                    <tr>
                      <th>学号</th>
                      <th>姓名</th>
                      <th>年龄</th>
                      <th>性别</th>
                      <th>地址</th>
                    </tr>
                  </thead>
                `
              )

              const tbody = document.createElement('tbody')
              table.appendChild(tbody)
              for (let item of studentList) {
                tbody.insertAdjacentHTML(
                  'beforeend',
                  `
                  <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.gender}</td>
                    <td>${item.address}</td>
                  </tr>
                `
                )
              }
            }
          })
          .catch((err) => {
            console.log('出错了', err)
          })
      }

      if (localStorage.getItem('username')) {
        root.innerHTML = `
          <h1>欢迎${localStorage.getItem('nickname')}</h1>
          <hr/>
          <button onclick="loadData()">加载数据</button>
          <hr/>
        `
      } else {
        loginBtn.addEventListener('click', () => {
          const username = document.getElementById('username').value.trim()
          const password = document.getElementById('password').value.trim()

          fetch('http://localhost:3000/login', {
            method: 'post',
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (res.status === 200) {
                return res.json()
              } else {
                throw new Error('用户名或密码错误')
              }
            })
            .then((res) => {
              if (res.status === 'ok') {
                root.innerHTML = `
                  <h1>欢迎${res.data.nickname}</h1>
                  <hr/>
                  <button onclick="loadData()">加载数据</button>
                  <hr/>
                `
                localStorage.setItem('userID', res.data.id)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('nickname', res.data.nickname)
              }
            })
            .catch((err) => {
              error.innerText = '用户名或密码错误'
              console.log('出错了', err)
            })
        })
      }
    </script>
  </body>
</html>
```

- 问题：
  - 现在是登录以后直接将用户信息存储到了 localStorage
  - 主要存在两个问题：
    - 数据安全问题
    - 服务器不知道你有没有登录
  - 解决问题：
    - 如何告诉服务器客户端的登录状态
      - rest 风格的服务器是无状态的服务器，所以注意不要在服务器中存储用户的数据
      - 服务器中不能存储用户信息，可以将用户信息发送给客户端保存
        - 比如：`{id:"xxx", username:"xxx", email:"xxx"}`
        - 客户端每次访问服务器时，直接将用户信息发回，服务器就可以根据用户信息来识别用户的身份
      - 但是如果将数据直接发送给客户端同样会有数据安全的问题
        - 所以我们必须对数据进行加密，加密以后在发送给客户端保存，这样即可避免数据的泄露
      - 在 node 中可以直接使用 jsonwebtoken 这个包来对数据进行加密
        - jsonwebtoken(jwt) --> 通过对 json 加密后，生成一个 web 中使用的令牌
        - 使用步骤：
          - 安装
            - yarn add jsonwebtoken
          - 引入
            - const jwt = require("jsonwebtoken")

```js
const jwt = require('jsonwebtoken')

const obj = {
  name: '孙悟空',
  age: 18,
  gender: '男',
  address: '花果山',
}

// 对数据进行加密
const token = jwt.sign(obj, 'hello', {
  // expiresIn 设置token的过期时间
  expiresIn: '1',
})

try {
  // 对数据进行解密
  const decodeData = jwt.verify(token, 'hello')
  console.log(decodeData)
} catch (err) {
  console.log('token无效')
}
```

- 当我们访问的是需要权限的 api 时，必须在请求中附加权限的信息
- token 一般都是通过请求头来发送

```js
// 权限验证
router.use((req, res, next) => {
  if (req.method !== 'OPTIONS') {
    try {
      const token = req.get('Authorization').split(' ')[1]
      const decodeData = jwt.verify(token, 'microdaway')
      console.log(decodeData)
      next()
    } catch (err) {
      res.status(403).send({
        status: 'error',
        data: 'token无效',
      })
      console.log(err)
    }
  }

  if (req.method === 'OPTIONS') {
    next()
  }
})
```

- 创建一个 AbortController
- 注意：将 promise 改写为 await 时，一定要写 try-catch

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn01">加载数据</button>
    <button id="btn02">取消请求</button>
    <button id="btn03">加载数据</button>

    <script>
      const btn01 = document.getElementById('btn01')
      const btn02 = document.getElementById('btn02')
      const btn03 = document.getElementById('btn03')
      let controller

      btn01.addEventListener('click', () => {
        controller = new AbortController()

        fetch('http://localhost:3000/test', {
          signal: controller.signal,
        })
          .then((res) => {})
          .catch((err) => {
            console.log('出错了', err)
          })

        setTimeout(() => {
          // 3s后终止请求
          controller.abort()
        }, 3000)
      })

      btn02.addEventListener('click', () => {
        // 手动终止请求
        controller && controller.abort()
      })

      btn03.addEventListener('click', async () => {
        try {
          const res = await fetch('http://localhost:3000/students')
          const data = await res.json()
          console.log(data)
        } catch (err) {
          console.log('出错了', err)
        }
      })
    </script>
  </body>
</html>
```

## axios

- axios 默认只会在响应状态码为 2xx 时才会调用 then
- result 是 axios 封装过的

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <button id="btn01">按钮1</button>
    <button id="btn02">按钮2</button>

    <script>
      const btn01 = document.getElementById('btn01')
      const btn02 = document.getElementById('btn02')

      btn01.addEventListener('click', () => {
        axios({
          url: 'http://localhost:3000/students',
        })
          .then((result) => {
            console.log(result.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })

      btn02.addEventListener('click', () => {
        axios({
          url: 'http://localhost:3000/students',
          method: 'post',
          data: {
            name: '蜘蛛精',
            age: 12,
            gender: '女',
            address: '盘丝洞',
          },
        })
          .then((result) => {
            console.log(result.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    </script>
  </body>
</html>
```

- axios 请求配置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <button id="btn01">按钮1</button>
    <button id="btn02">按钮2</button>

    <script>
      const btn01 = document.getElementById('btn01')
      const btn02 = document.getElementById('btn02')

      btn01.addEventListener('click', () => {
        axios({
          url: 'http://localhost:3000/students',
        })
          .then((result) => {
            console.log(result.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })

      btn02.addEventListener('click', () => {
        axios({
          // baseURL 指定服务器的根目录(路径的前缀)
          baseURL: 'http://localhost:3000',
          // 请求地址
          url: '/students',
          // 请求方法，默认是get
          method: 'post',
          // 请求体
          // data: 'name=唐僧&age=16',
          data: {
            name: '蜘蛛精',
            age: 12,
            gender: '女',
            address: '盘丝洞',
          },
          // params 用来指定路径中的查询字符串
          // params: {
          //   id: '12345'
          // },

          // timeout 过期时间
          timeout: 5000,

          // 用来终止请求
          // signal

          // 指定请求头
          // headers: { 'Content-Type': 'application/json' }

          // transformRequest 可以用来处理请求数据(data)
          // 它需要一个数组作为参数，数组可以接收多个函数，请求发送时多个函数会按照顺序执行
          // 函数在执行时，会接收到两个参数data和headers
          transformRequest: [
            function (data, headers) {
              // 可以在函数中对data和headers进行修改
              data.name = '猜猜我是谁'
              // Content-Type 默认为 'x-www-form-urlencoded'
              headers['Content-Type'] = 'application/json'
              return data
            },
            function (data, headers) {
              // 最后一个函数必须返回一个字符串，才能使得数据有效
              return JSON.stringify(data)
            },
          ],
        })
          .then((result) => {
            console.log(result.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    </script>
  </body>
</html>
```

- axios 默认配置
  - axios.defaults.baseURL = 'http://localhost:3000'
  - axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
- axios 实例
  - axios 实例相当于是 axios 的一个副本，它的功能和 axios 一样
  - axios 的默认配置在实例也同样会生效
  - 但是我们可以单独修改 axios 实例的默认配置
  - 例如：
    - const instance = axios.create()
    - instance.defaults.baseURL = 'http://localhost:3000'
    - 或
    ```js
    const instance = axios.create({
      baseURL: 'http://localhost:3000',
    })
    ```
    - 然后使用 axios 实例去发送请求
    ```js
    instance({
      url: '',
      method: '',
    })
    ```
- axios 拦截器
  - axios 的拦截器可以对请求或响应进行拦截，在请求发送前和响应读取前处理数据
  - 拦截器只对当前的实例有效
  - config 表示 axios 中的配置对象

```js
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    // config 表示axios中的配置对象
    // console.log(config)
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
```
