---
sidebar_position: 2
---

# 模块化

## CommonJS 模块化规范

- 早期的网页中，是没有一个实质的模块化规范的
  - 我们实现模块化的方式，就是最原始的通过 script 标签来引入多个 js 文件
  - 问题：
    - 无法选择要引入模块的哪些内容
    - 在复杂的模块场景下非常容易出错
    - 于是，我们就急需在 js 中引入一个模块化的解决方案
- 在 node 中，默认支持的模块化规范叫做 CommonJS，在 CommonJS 中，一个 js 文件就是一个模块
- CommonJS 规范
  - 引入模块
    - 使用 require("模块的路径")函数来引入模块
    - 引入自定义模块时
      - 模块名要以./ 或 ../开头
      - 扩展名可以省略
        - 在 CommonJS 中，如果省略了 js 文件的扩展名
        - node，会自动为文件补全扩展名
        - ./m1.js 如果没有 js 它会寻找 ./m1.json
        - js --> json --> node(特殊)
      - 引入核心模块时
        - 直接写核心模块的名字即可
        - 也可以在核心模块前添加 node:

```js
const m1 = require('./m1')
const m2 = require('./m2')

// const path = require('path')
const path = require('node:path')

const Hello = require('./Hello')

console.log(Hello)
```

- 在定义模块时，模块中的内容默认是不能被外部看到的
- 可以通过 exports 来设置要向外部暴露的内容
- 访问 exports 的方式有两种：
  - exports
  - module.exports
- 当我们在其他模块中引入当前模块时，require 函数返回的就是 exports
- 可以将希望暴露给外部模块的内容设置为 exports 的属性
- 可以通过 exports 一个一个的导出值
- 也可以直接通过 module.exports 同时导出多个值

```js
// 可以通过 exports 一个一个的导出值
// exports.name = '孙悟空'
// exports.age = 18
// exports.gender = '男'

// 也可以直接通过module.exports同时导出多个值
module.exports = {
  name: '猪八戒',
  age: 28,
  gender: '男',
}
```

- cjs 为扩展名，表示是一个 CommonJS 标准的模块
- 所有的 CommonJS 的模块都会被包装到一个函数中
- \_\_filename 表示当前模块的绝对路径
- \_\_dirname 表示当前模块所在目录的绝对路径

```js
// ;(function (exports, require, module, __filename, __dirname) {
//   // 模块代码会被放到这里
// })

// console.log(arguments)
console.log(__filename) // C:\Files\InClass\前端\Review\Node.js\02_模块化\02_原理.js
console.log(__dirname) // C:\Files\InClass\前端\Review\Node.js\02_模块化
```

## ES 模块化规范

- 默认情况下，node 中的模块化标准是 CommonJS
- 要想使用 ES 的模块化，可以采用以下两种方案
  - 使用 mjs 作为扩展名
  - 修改 package.json 将模块化规范设置为 ES 模块
    - 当我们设置 "type": "module" 当前项目下所有的 js 文件都默认为 ES module
- 导入模块时，ES 模块不能省略扩展名(官方标准)
- 通过 as 来指定别名
- 开发时要尽量避免 import \* 情况
- 默认导出的内容，可以随意命名
- 通过 ES 模块化，导入的内容都是常量
- ES 模块都是运行在严格模式下的
- ES 模块化，在浏览器中同样支持，但是通常我们不会直接使用
- 通常都会结合打包工具使用
- 设置默认导出， 一个模块中只有一个默认导出
- 默认导出必须是一个值

```js
// import { name, obj } from './m5.mjs'
// import { name, obj as user } from './m5.mjs'

// import * as m5 from './m5.mjs'

import sum, { name, obj } from './m5.mjs'

// console.log(m5.obj)
// console.log(sum, name)

// 无法修改
// name = '哈哈哈'

// 可以修改
obj.age = 100
console.log(obj)
```

```js
export const name = '孙悟空'
export const obj = {
  name: '猪八戒',
  age: 28,
  gender: '男',
}

export default function sum(a, b) {
  return a + b
}

// export default 10

// let a = 10
// export default a
```

## 核心模块

- 核心模块，是 node 中自带的模块，可以在 node 中直接使用
- window 是浏览器的宿主对象 node 中是没有的
- global 是 node 中的全局对象，作用类似于 window
- ES 标准下，全局对象的标准名应该是 globalThis
- 核心模块 process
  - 表示当前的 node 进程
  - 通过该对象可以获取进程的信息，或者对进程做各种操作
  - 如何使用
    - process 是一个全局变量，可以直接使用
    - 有哪些属性和方法：
      - process.exit()
        - 结束当前进程，终止 node
      - process.nextTick(callback[, …args])
        - 将函数插入到 tick 队列中
        - tick 队列中的代码，会在下一次事件循环之前执行
        - 会在微任务队列和宏任务队列中任务之前执行
      - 调用栈
      - tick 队列 (tick 队列是 node 中独有的，浏览器中没有)
      - 微任务队列
      - 宏任务队列

```js
// console.log(global)
// console.log(globalThis)
// console.log(global === globalThis) // true

// console.log(process)

// console.log(111)
// process.exit()
// process.exit(0)
// console.log(222)
// console.log(333)

setTimeout(() => {
  console.log(1) // 宏任务队列
})

queueMicrotask(() => {
  console.log(2) // 微任务队列
})

process.nextTick(() => {
  console.log(3) // tick队列是node中独有的, 浏览器中没有
})

console.log(4) // 调用栈
// 4 3 2 1
```
