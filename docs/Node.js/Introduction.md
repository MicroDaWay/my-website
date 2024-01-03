---
sidebar_position: 1
---

# Node.js 简介

## 简介

- Node.js
  - 运行在服务器端的 js
  - 用来编写服务器
  - 特点：
    - 单线程、异步、非阻塞
    - 统一 API
- 常用命令
  - node -v
    - 查看 node 的版本
- nvm 命令
  - nvm version
    - 查看 nvm 的版本
  - nvm list
    - 查看所有安装的 node 版本
  - nvm install 版本号
    - 安装指定版本的 node
  - nvm install latest
    - 安装最新版本的 node
  - nvm install lts
    - 安装 node 的长期维护版
  - nvm use 版本号
    - 指定要使用的 node 版本
  - 配置 nvm 的镜像服务器
    - nvm node_mirror https://npmmirror.com/mirrors/node/
- node.js 和 JavaScript 有什么区别
  - ECMAScript (node 有)，DOM (node 没有)，BOM (node 没有)

## 异步

- 进程和线程
  - 进程(厂房)
    - 程序的运行的环境
  - 线程(工人)
    - 线程是实际进行运算的东西
- 同步
  - 通常情况代码都是自上向下一行一行执行的
  - 前边的代码不执行后边的代码也不会执行
  - 同步的代码执行会出现阻塞的情况
  - 一行代码执行慢会影响到整个程序的执行
- 解决同步问题：
  - java python
    - 通过多线程来解决
  - node.js
    - 通过异步方式来解决
- 异步
  - 一段代码的执行不会影响到其他的程序
  - 异步的问题：
    - 异步的代码无法通过 return 来设置返回值
  - 特点：
    - 不会阻塞其他代码的执行
    - 需要通过回调函数来返回结果
  - 基于回调函数的异步带来的问题
    - 代码的可读性差
    - 可调试性差
  - 解决问题：
    - 需要一个东西，可以代替回调函数来给我们返回结果
    - Promise 横空出世
      - Promise 是一个可以用来存储数据的对象
      - Promise 存储数据的方式比较特殊，这种特殊方式使得 Promise 可以用来存储异步调用的数据

```js
function sum(a, b, cb) {
  // const begin = Date.now()
  // while (Date.now() - begin < 5000) {}

  setTimeout(() => {
    cb(a + b)
  }, 1000)
}

console.log(111)

// const result = sum(10, 20)
// console.log(result)

sum(10, 20, (res) => {
  sum(res, 1, (res2) => {
    sum(res2, 2, (res3) => {
      sum(res3, 3, (res4) => {
        sum(res4, 4, (res5) => {
          console.log(res5)
        })
      })
    })
  })
})

console.log(222)
```

## Promise

- 异步调用必须要通过回调函数来返回数据，当我们进行一些复杂的调用时，会出现“回调地狱”
- 问题：
  - 异步必须通过回调函数来返回结果，回调函数一多就很痛苦
- Promise
  - Promise 可以帮助我们解决异步中的回调函数的问题
  - Promise 就是一个用来存储数据的容器
  - 它拥有着一套特殊的存取数据的方式
  - 这个方式使得它里边可以存储异步调用的结果
- 创建 Promise
  - 创建 Promise 时，构造函数中需要一个函数作为参数
  - Promise 构造函数的回调函数，它会在创建 Promise 时调用，调用时会有两个参数传递进去
  - resolve 和 reject 是两个函数，通过这两个函数可以向 Promise 中存储数据
  - resolve 在执行正常时存储数据，reject 在执行错误时存储数据
  - 通过函数来向 Promise 中添加数据，好处就是可以用来添加异步调用的数据
- 从 Promise 中读取数据
  - 可以通过 Promise 的实例方法 then 来读取 Promise 中存储的数据
  - then 需要两个回调函数作为参数，回调函数用来获取 Promise 中的数据
  - 通过 resolve 存储的数据，会调用第一个函数返回，可以在第一个函数中编写处理数据的代码
  - 通过 reject 存储的数据或者出现异常时，会调用第二个函数返回，可以在第二个函数中编写处理异常的代码
- Promise 中维护了两个隐藏属性：
  - PromiseResult
    - 用来存储数据
  - PromiseState
    - 记录 Promise 的状态(三种状态)
      - pending (进行中)
      - fulfilled(完成) 通过 resolve 存储数据时
      - rejected(拒绝，出错了) 出错了或通过 reject 存储数据时
    - **state 只能修改一次，修改以后永远不会再变**
  - 流程：
    - 当 Promise 创建时，PromiseState 初始值为 pending
    - 当通过 resolve 存储数据时 PromiseState 变为 fulfilled(完成)
      - PromiseResult 变为存储的数据
    - 当通过 reject 存储数据或出错时 PromiseState 变为 rejected(拒绝，出错了)
      - PromiseResult 变为存储的数据 或 异常对象
    - 当我们通过 then 读取数据时，相当于为 Promise 设置了回调函数
      - 如果 PromiseState 变为 fulfilled，则调用 then 的第一个回调函数来返回数据
      - 如果 PromiseState 变为 rejected，则调用 then 的第二个回调函数来返回数据
- catch() 用法和 then 类似，但是只需要一个回调函数作为参数
  - catch()中的回调函数只会在 Promise 被拒绝时才调用
  - catch() 相当于 then(null, reason => {})
  - catch() 就是一个专门处理 Promise 异常的方法
- finally()
  - 无论是正常存储数据还是出现异常了，finally 总会执行
  - 但是 finally 的回调函数中不会接收到数据
  - finally()通常用来编写一些无论成功与否都要执行的代码

```js
const promise = new Promise((resolve, reject) => {
  resolve('哈哈哈')
  // reject('被拒绝了')
  // throw new Error('抛出一个异常')
  // setTimeout(() => {
  //   resolve('哈哈哈')
  // }, 2000)
})

console.log(promise)

// Promise.resolve(111)

promise.then(
  (result) => {
    console.log('result-->', result)
  },
  (reason) => {
    console.log('reason-->', reason)
  }
)

promise.catch((reason) => {
  console.log('catch-->', reason)
})

promise.finally(() => {
  console.log('finally执行了')
})
```

## Promise

- Promise 就是一个用来存储数据的对象
- 但是由于 Promise 存取的方式的特殊，所以可以直接将异步调用的结果存储到 Promise 中
- 对 Promise 进行链式调用时
  - 后边的方法(then 和 catch)读取的是上一步的执行结果
  - 如果上一步的执行结果不是当前想要的结果，则跳过当前的方法
- 当 Promise 出现异常时，而整个调用链中没有出现 catch，则异常会向外抛出
- promise 中的
  - then (return new Promise())
  - catch
    - 这三个方法都会返回一个新的 Promise
    - Promise 中会存储回调函数的返回值
  - finally
    - finally 的返回值，不会存储到新的 Promise 中
- 静态方法
  - Promise.resolve()
    - 创建一个立即完成的 Promise
  - Promise.reject()
    - 创建一个立即拒绝的 Promise
  - Promise.all([...])
    - 同时返回多个 Promise 的执行结果
    - 其中有一个报错，就返回错误
  - Promise.allSettled([...])
    - 同时返回多个 Promise 的执行结果(无论成功或失败)
    - `{status: 'fulfilled', value: 579}`
    - `{status: 'rejected', reason: '哈哈'}`
  - Promise.race([...])
    - 返回执行最快的 Promise(不考虑对错)
  - Promise.any([...])
    - 返回执行最快的完成的 Promise

```js
const promise = new Promise((resolve, reject) => {
  // resolve('哈哈哈')
  reject('哈哈哈')
})

promise
  .then((result) => {
    console.log('第一个then', result)
    return 111
  })
  .catch((reason) => {
    console.log('第一个catch', reason)
    // throw new Error('抛出一个异常')
    return 222
  })
  .then((result) => {
    console.log('第二个then', result)
  })
  .catch((reason) => {
    console.log('第二个catch', reason)
  })

// const p2 = promise.then(result => {
//   console.log(result)
//   return 111
// })

// setTimeout(() => {
//   console.log(p2)
// })

// promise
//   .then(result => {
//     console.log('第一个then', result)
//     return 111
//   })
//   .then(result => {
//     console.log('第二个then', result)
//     return 222
//   })
//   .then(result => {
//     console.log('第三个then', result)
//   })

function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}

// sum(10, 20)
//   .then(result => result)
//   .then(result => result + 1)
//   .then(result => result + 2)
//   .then(result => result + 3)
//   .then(result => console.log(result))

// sum(10, 20).then(result => {
//   sum(result, 1).then(result => {
//     sum(result, 2).then(result => {
//       sum(result, 3).then(result => {
//         console.log(result)
//       })
//     })
//   })
// })
```

```js
// Promise.resolve(111).then(result => {
//   console.log(result)
// })

// Promise.reject(222).catch(reason => {
//   console.log(reason)
// })

function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}

// Promise.all([sum(1, 2), sum(10, 20), sum(100, 200)]).then(result => {
//   console.log(result) // [3, 30, 300] 返回的是一个真数组
// })

// Promise.all([sum(1, 2), sum(10, 20), Promise.reject(111), sum(100, 200)])
//   .then(result => {
//     console.log(result)
//   })
//   .catch(reason => {
//     console.log('出错了', reason)
//   })

// Promise.allSettled([sum(1, 2), sum(10, 20), sum(100, 200)]).then(result => {
//   console.log(result)
// })

// Promise.allSettled([sum(1, 2), sum(10, 20), Promise.reject(111), sum(100, 200)]).then(result => {
//   console.log(result)
//   // {status: 'fulfilled', value: 30}
//   // {status: 'rejected', reason: 111}
// })

// Promise.race([sum(1, 2), sum(10, 20), Promise.resolve(111), sum(100, 200)]).then(result => {
//   console.log(result) // 111
// })

// Promise.race([
//   sum(1, 2),
//   sum(10, 20),
//   Promise.reject(222),
//   Promise.resolve(111),
//   sum(100, 200)
// ]).then(result => {
//   console.log(result) // Promise.reject(222) 先执行
// })

// Promise.any([
//   sum(1, 2),
//   sum(10, 20),
//   Promise.reject(222),
//   Promise.resolve(111),
//   sum(100, 200)
// ]).then(result => {
//   console.log(result) // 111
// })

Promise.any([Promise.reject(111), Promise.reject(222), Promise.reject(333)])
  .then((result) => {
    console.log(result)
  })
  .catch((reason) => {
    console.log(reason)
  })
```

## 宏任务和微任务

- JS 是单线程的，它的运行是基于事件循环机制(event loop)
  - 调用栈
    - 栈是一种数据结构，后进先出
    - 调用栈中，放的是要执行的代码
  - 任务队列
    - 队列是一种数据结构，先进先出
    - 任务队列放的是将要执行的代码
    - 当调用栈中的代码执行完毕后，队列中的代码才会按照顺序依次进入到栈中执行
    - 在 JS 中任务队列有两种
      - 宏任务队列 (大部分代码都去宏任务队列中排队)
      - 微任务队列 (Promise 的回调函数(then、catch、finally))
    - 整个流程
      - 执行调用栈中的代码
      - 执行微任务队列中的所有任务
      - 执行宏任务队列中的所有任务
- 定时器的作用是间隔一段时间后，将函数放入到任务队列中
- Promise 的执行原理
  - Promise 在执行时，then 就相当于给 Promise 绑定了回调函数
  - 当 Promise 的状态从 pending 变为 fulfilled 时，then 的回调函数会被放入到任务队列中
- queueMicrotask()
  - 用来向微任务队列中添加一个任务

```js
// setTimeout(() => {
//   console.log(1)
// })

// Promise.resolve().then(() => {
//   console.log(2)
// })

// queueMicrotask(() => {
//   console.log(3)
// })

// console.log(4)

// 4 2 3 1

Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log(1)
  })
})

queueMicrotask(() => {
  console.log(2)
})

// 2 1
```

## 手写 Promise

```js
const PROMISE_STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
}

class MyPromise {
  #result
  #state = PROMISE_STATE.PENDING
  #callbacks = []

  constructor(executor) {
    executor(this.#resolve.bind(this), this.#reject.bind(this))
  }

  #resolve(value) {
    if (this.#state !== PROMISE_STATE.PENDING) return
    this.#result = value
    this.#state = PROMISE_STATE.FULFILLED

    queueMicrotask(() => {
      // this.#callback && this.#callback(this.#result)
      this.#callbacks.forEach((cb) => {
        cb()
      })
    })
  }

  // #resolve = value => {
  //   this.#result = value
  // }

  #reject(value) {}

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === PROMISE_STATE.PENDING) {
        this.#callbacks.push(() => {
          resolve(onFulfilled(this.#result))
        })
      } else if (this.#state === PROMISE_STATE.FULFILLED) {
        queueMicrotask(() => {
          resolve(onFulfilled(this.#result))
        })
      }
    })
  }
}

const mp = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('孙悟空')
  }, 1000)
  // resolve('猪八戒')
})

mp.then((result) => {
  console.log('第一次读取', result)
  return '猪八戒'
})
  .then((res) => {
    console.log('第二次读取', res)
    return '沙和尚'
  })
  .then((res) => {
    console.log('第三次读取', res)
  })

// mp.then(result => {
//   console.log('第一次读取', result)
// })

// mp.then(result => {
//   console.log('第二次读取', result)
// })

// mp.then(result => {
//   console.log('第三次读取', result)
// })

// console.log(mp)
```

## async 和 await

- 通过 async 可以来创建一个异步函数
- 异步函数的返回值会自动封装到一个 Promise 中返回
- 在 async 声明的异步函数中可以使用 await 关键字来调用异步函数
- Promise 解决了异步调用中回调函数问题
  - 虽然通过链式调用解决了回调地狱，但是链式调用太多以后还是不好看
  - 我多想以同步的方式去调用异步的代码
- 当我们通过 await 去调用异步函数时，它会暂停代码的运行
- 直到异步代码执行有结果时，才会将结果返回
- 注意 await 只能用于 async 声明的异步函数中，或 es 模块的顶级作用域中
- await 阻塞的只是异步函数内部的代码，不会影响外部代码
- 通过 await 调用异步代码时，需要通过 try-catch 来处理异常
- 如果 async 声明的函数中没有写 await，那么它里边的代码就会依次执行
- 当我们使用 await 调用函数后，当前函数后边的所有代码，会在当前函数执行完毕后，被放入到微任务队里中
- await 后边的所有代码，都会放入到微任务队列中执行

```js
// function fn() {
//   return Promise.resolve(10)
// }

// 等价于上面的代码
// async function fn() {
//   return 10
// }

// fn().then(res => {
//   console.log(res)
// })

function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

// sum(10, 20)
//   .then(res => res + 1)
//   .then(res => res + 2)
//   .then(res => console.log(res))

// async function fn() {
//   try {
//     console.log(111)
//     let res = await sum(10, 20)
//     res = await sum(res, 1)
//     res = await sum(res, 2)
//     console.log(res)
//   } catch (e) {
//     console.log('出错了', e)
//   }
// }

// fn()

// console.log('全局中的输出')

// async function fn() {
//   console.log(1)
//   await console.log(2)
//   console.log(3)
// }

// fn()

// console.log(4)
// 1 2 4 3

// 等价于上述代码
// function fn() {
//   return new Promise((resolve, reject) => {
//     console.log(1)
//     console.log(2) // 加了 await
//     resolve()
//   }).then(res => {
//     console.log(3)
//   })
// }

// fn()

// console.log(4)

// async function fn() {
//   await console.log(111)
// }

// fn()
;(async () => {
  await console.log(222)
})()
```

- 在 HTML 中使用 await

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module">
      await console.log(111)
    </script>
  </head>
  <body></body>
</html>
```

- 在后缀名为 .mjs 的文件中使用 await

```js
await console.log(111)
```
