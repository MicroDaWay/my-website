---
sidebar_position: 3
---

# 核心模块

## path

- 表示的是路径
- 通过 path 可以用来获取各种路径
- 要使用 path，需要先对其进行引入
- 方法：
  - path.resolve(\[…paths])
    - 用来生成一个绝对路径
      - 相对路径：./xxx ../xxx xxx
      - 绝对路径：
        - 在计算机本地
          - c:\\xxx
          - /User/xxxx
        - 在网络中
          - http://www.xxx/...
          - https://www.xxx/...
    - 如果直接调用 resolve，则返回当前的工作目录
    - 注意，我们通过不同的方式执行代码时，它的工作目录是有可能发生变化的
    - 如果将一个相对路径作为参数，则 resolve 会自动将其转换为绝对路径，此时根据工作目录的不同，它所产生的绝对路径也不同
    - 一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数，这样它会自动计算出最终的路径
    - 在使用路径时，尽量通过 path.resolve()来生成路径

```js
const path = require('node:path')
// const fs = require('node:fs')
const fs = require('node:fs/promises')

const result = path.resolve()

/* 
  F5 执行结果
    C:\Files\InClass\前端\Review\Node.js 根目录
*/

/* 
  node .\01_path.js 执行结果
    C:\Files\InClass\前端\Review\Node.js\03_核心模块 文件所在文件夹的目录
*/

const result2 = path.resolve('./hello.js')

// F5 C:\Files\InClass\前端\Review\Node.js\hello.js
// node C:\Files\InClass\前端\Review\Node.js\03_核心模块\hello.js

const result3 = path.resolve('C:\\Files\\InClass\\前端\\Review\\Node.js\\03_核心模块', './hello.js')

// F5 C:\Files\InClass\前端\Review\Node.js\03_核心模块\hello.js
// node C:\Files\InClass\前端\Review\Node.js\03_核心模块\hello.js

// 最终形态
const result4 = path.resolve(__dirname, './hello.js')
// console.log(result4)

// const buffer = fs.readFileSync(path.resolve(__dirname, './hello.txt'))
// console.log(buffer.toString())

// 非promise版本
// fs.readFile(path.resolve(__dirname, './hello.txt'), (err, buffer) => {
//   if (err) {
//     console.log('出错了', err)
//   } else {
//     console.log(buffer.toString())
//   }
// })

// promise版本
// fs.readFile(path.resolve(__dirname, './hello.txt'))
//   .then(buffer => {
//     console.log(buffer.toString())
//   })
//   .catch(err => {
//     console.log('出错了', err)
//   })

;(async () => {
  try {
    const buffer = await fs.readFile(path.resolve(__dirname, './hello.txt'))
    console.log(buffer.toString())
  } catch (err) {
    console.log('出错了', err)
  }
})()
```

## fs

- fs 用来帮助 node 来操作磁盘中的文件
- 文件操作也就是所谓的 I/O，input output
- 使用 fs 模块，同样需要引入
- readFileSync() 同步的读取文件的方法，会阻塞后边代码的执行
- 当我们通过 fs 模块读取磁盘中的数据时，读取到的数据总会以 Buffer 对象的形式返回
- Buffer 是一个临时用来存储数据的缓冲区
- readFile() 异步的读取文件的方法

```js
const path = require('node:path')
const fs = require('node:fs/promises')

// 向文件中添加内容
// fs.appendFile(path.resolve(__dirname, './hello.txt'), '新增内容').then(() => {
//   console.log('添加成功')
// })

// 创建一个新文件
// fs.appendFile(path.resolve(__dirname, './hello123.txt'), '创建一个新文件').then(() => {
//   console.log('创建成功')
// })

// 复制文件
// fs.readFile('C:\\Users\\MicroDaWay\\Pictures\\an.jpg')
//   .then(buffer => {
//     return fs.appendFile(path.resolve(__dirname, './an.jpg'), buffer)
//   })
//   .then(() => {
//     console.log('复制文件成功')
//   })

;(async () => {
  try {
    const buffer = await fs.readFile('C:\\Users\\MicroDaWay\\Pictures\\an.jpg')
    fs.appendFile(path.resolve(__dirname, './an.jpg'), buffer)
  } catch (err) {
    console.log('出错了', err)
  }
})()
```

- fs.readFile() 读取文件
- fs.appendFile() 创建新文件，或将数据添加到已有文件中
- fs.mkdir() 创建目录
- fs.rmdir() 删除目录
- fs.rm() 删除文件
- fs.rename() 重命名 (剪切)
- fs.copyFile() 复制文件(复制)
- mkdir 可以接收一个 配置对象作为第二个参数
  - 通过该对象可以对方法的功能进行配置
  - recursive 默认值为 false
  - 设置 true 以后，会自动创建不存在的上一级目录

```js
const path = require('node:path')
const fs = require('node:fs/promises')

// fs.mkdir(path.resolve(__dirname, './hello/abc'), {
//   recursive: true
// }).then(() => {
//   console.log('创建目录成功')
// })

// fs.rmdir(path.resolve(__dirname, './hello'), {
//   recursive: true
// }).then(() => {
//   console.log('删除目录成功')
// })

// fs.rm(path.resolve(__dirname, './hello'), {
//   recursive: true
// }).then(() => {
//   console.log('删除目录成功')
// })

// fs.rm(path.resolve(__dirname, './abc.txt')).then(() => {
//   console.log('删除成功')
// })

// fs.rename(path.resolve(__dirname, './an.jpg'), path.resolve(__dirname, './new.jpg')).then(() => {
//   console.log('重命名成功')
// })

// fs.rename(path.resolve(__dirname, '../new.jpg'), path.resolve(__dirname, './new.jpg')).then(() => {
//   console.log('重命名成功')
// })

fs.copyFile(path.resolve(__dirname, './new.jpg'), path.resolve(__dirname, '../new.jpg')).then(
  () => {
    console.log('复制成功')
  }
)
```
