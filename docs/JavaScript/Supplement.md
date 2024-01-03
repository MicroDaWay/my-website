---
sidebar_position: 11
---

# 补充

## 严格模式与非严格模式中的 this

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // function fn() {
      //   console.log(this) // window
      // }

      // fn()

      // 'use strict'
      // function fn() {
      //   console.log(this) // undefined
      // }

      // fn()

      // const obj = {
      //   name: '孙悟空',
      //   eat() {
      //     console.log(this) // obj
      //   },
      // }

      // obj.eat()

      'use strict'
      const obj = {
        name: '孙悟空',
        eat() {
          console.log(this) // obj
        },
      }

      obj.eat()
    </script>
  </body>
</html>
```

## 指定 this 的值

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      function fn(num1, num2) {
        console.log(this)
        console.log(num1, num2)
      }

      const obj = {
        name: '孙悟空',
        age: 18,
      }

      // fn.call(obj, 1, 2)
      // fn.apply(obj, [3, 4])

      // const newFn = fn.bind(obj, 5)
      // newFn(6)

      const obj2 = {
        name: '猪八戒',
        // eat() {
        //   console.log(this) // obj2
        //   setTimeout(function () {
        //     console.log(this) // window
        //   })
        // },

        eat() {
          console.log(this) // obj2
          setTimeout(() => {
            console.log(this) // obj2
          })
        },
      }

      obj2.eat()
    </script>
  </body>
</html>
```

## 手写 call 方法

```js
Function.prototype.myCall = function (thisArg, ...args) {
  const key = Symbol()
  thisArg[key] = this
  const res = thisArg[key](...args)
  delete thisArg[key]
  return res
}

const person = {
  name: '孙悟空',
}

function fn(num1, num2) {
  console.log(this)
  console.log(num1, num2)
  return num1 + num2
}

const res = fn.myCall(person, 1, 2)
console.log(res)
```

## 手写 apply 方法

```js
Function.prototype.myApply = function (thisArg, args) {
  const key = Symbol()
  thisArg[key] = this
  const res = thisArg[key](...args)
  delete thisArg[key]
  return res
}

const person = {
  name: '孙悟空',
}

function fn(num1, num2) {
  console.log(this)
  console.log(num1, num2)
  return num1 + num2
}

const res = fn.myApply(person, [3, 4])
console.log(res)
```

## 手写 bind 方法

```js
Function.prototype.myBind = function (thisArg, ...args) {
  return (...arg) => {
    const key = Symbol()
    thisArg[key] = this
    const res = thisArg[key](...args, ...arg)
    delete thisArg[key]
    return res
  }
}

const person = {
  name: '孙悟空',
}

function fn(num1, num2) {
  console.log(this)
  console.log(num1, num2)
  return num1 + num2
}

const newFn = fn.myBind(person, 5)
const res = newFn(6)
console.log(res)
```

## 寄生组合式继承

- 组合式继承：借用构造函数，原型链
- 寄生：父类的原型中，有子类的构造函数

```js
// const obj = {
//   name: '孙悟空',
//   eat() {
//     console.log('我在吃饭')
//   },
// }

// const newObj = Object.create(obj, {
//   eat: {
//     value() {
//       console.log('我在玩')
//     },
//   },
// })

// console.log(newObj.name) // 孙悟空
// newObj.eat() // 我在玩
// console.log(obj === newObj) // false

function Person(name) {
  this.name = name
}

Person.prototype.sayHi = function () {
  console.log('Hi~')
}

function Student(name) {
  Person.call(this, name)
}

Student.prototype = Object.create(Person.prototype, {
  constructor: {
    value: Student,
  },
})

const s = new Student('孙悟空')
console.log(s)
```

## Generator

- Generator 函数是 ES6 提供的一种异步编程解决方案
- `{value: '孙悟空', done: false}`
- value：yield 之后的值
- done：是否执行完毕，false 可以继续执行，true 已经执行完毕

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      function* generator() {
        yield '孙悟空'
        yield 18
        yield '男'
      }

      const fn = generator()
      // console.log(fn.next()) // {value: '孙悟空', done: false}

      for (const value of fn) {
        console.log(value) // 孙悟空 18 男
      }
    </script>
  </body>
</html>
```

## Generator 管理异步

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      function* cityGenerator() {
        yield fetch('http://hmajax.itheima.net/api/city?pname=浙江省')
        yield fetch('http://hmajax.itheima.net/api/city?pname=山东省')
      }

      const city = cityGenerator()
      city
        .next()
        .value.then((res) => {
          return res.json()
        })
        .then((res) => {
          console.log(res)
          return city.next().value
        })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          console.log(res)
        })
    </script>
  </body>
</html>
```

## fetch 提交 FormData

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="file" />
    <img src="" alt="" />

    <script>
      const input = document.getElementsByTagName('input')[0]
      const img = document.getElementsByTagName('img')[0]

      input.addEventListener('change', async () => {
        const formData = new FormData()
        formData.append('img', input.files[0])

        const res = await fetch('https://hmajax.itheima.net/api/uploadimg', {
          method: 'post',
          body: formData,
        })

        const data = await res.json()
        img.src = data.data.url
      })
    </script>
  </body>
</html>
```

## 防抖(debounce)

- 单位时间内，频繁触发事件，只执行最后一次
- 例子：
  - 搜索框输入内容，等用户输入完了再发请求，而不是输入一个单词就发送一次请求

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>

    <script>
      const box = document.getElementsByClassName('box')[0]
      let i = 0
      let timer
      box.addEventListener('mousemove', () => {
        if (timer) {
          clearTimeout(timer)
        }

        timer = setTimeout(() => {
          box.innerText = ++i
        }, 1000)
      })
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  </head>
  <body>
    <input type="text" />

    <script>
      const getData = async (pname) => {
        const response = await fetch(`http://hmajax.itheima.net/api/city?pname=${pname}`)
        const res = await response.json()
        return res
      }

      const func = async function (e) {
        await getData(e.target.value)
      }

      function debounce(fun, time) {
        let timer
        return function (...args) {
          clearTimeout(timer)
          timer = setTimeout(() => {
            func(...args)
          }, time)
        }
      }

      const inp = document.getElementsByTagName('input')[0]
      // inp.addEventListener('input', _.debounce(func, 500))
      inp.addEventListener('input', debounce(func, 500))
    </script>
  </body>
</html>
```

## 节流(throttle)

- 单位时间内，频繁触发事件，只执行一次
- 例子：
  - 滚动条滚动

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>

    <script>
      const box = document.getElementsByClassName('box')[0]
      let i = 0
      let timer = null
      box.addEventListener('mousemove', () => {
        if (!timer) {
          timer = setTimeout(() => {
            box.innerText = ++i
            // 在 setTimeout 中是无法清除定时器的，因为定时器还在运作，所以使用 timer = null
            // 而不是 clearTimeout(timer)
            timer = null
          }, 1000)
        }
      })
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <style>
      video {
        width: 800px;
      }
    </style>
  </head>
  <body>
    <video src="C:\Users\MicroDaWay\Videos\TDF_2023_S1.mp4" controls></video>

    <script>
      const video = document.getElementsByTagName('video')[0]

      let timer = null

      const func = function () {
        localStorage.setItem('currentTime', video.currentTime)
      }

      const throttle = function (fun, time) {
        let timer
        return function () {
          if (!timer) {
            timer = setTimeout(() => {
              fun()
              timer = null
            }, time)
          }
        }
      }

      // video.addEventListener('timeupdate', _.throttle(func, 1000, { leading: false }))
      video.addEventListener('timeupdate', throttle(func, 1000))

      video.addEventListener('loadeddata', function () {
        video.currentTime = localStorage.getItem('currentTime') || 0
      })
    </script>
  </body>
</html>
```

## 函数柯里化

- 柯里化是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下参数而且返回结果的新函数的技术
- 将多个参数的函数转换为单个参数函数

```js
// 原函数
// function sum(a, b) {
//   return a + b
// }

// const result = sum(1, 2)
// console.log(result) // 3

// 改写后
// function sum(a) {
//   return function (b) {
//     return a + b
//   }
// }

// const result = sum(2)(6)
// console.log(result) // 8

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c
    }
  }
}

const result = sum(2)(3)(5)
console.log(result) // 10
```

## 函数柯里化面试题

```js
// function sum(a, b, c, d, e) {
//   return a + b + c + d + e
// }

// 改写函数sum实现: 参数传递到5个即可实现累加
// sum(1)(2)(3)(4)(5)
// sum(1)(2,3)(4)(5)
// sum(1)(2,3,4)(5)
// sum(1,2,3)(4,5)

let arr = []
function sum(...args) {
  arr.push(...args)

  if (arr.length >= 5) {
    const result = arr.splice(0, 5).reduce((prev, current) => prev + current, 0)
    // arr = []
    return result
  } else {
    return sum
  }
}

const result = sum(1)(2)(3, 9)(15)
console.log(result)
```

## 函数柯里化面试题优化

```js
// 自定义参数个数
function sumMaker(num) {
  let arr = []
  return function sum(...args) {
    arr.push(...args)

    if (arr.length >= num) {
      const result = arr.splice(0, num).reduce((prev, current) => prev + current, 0)
      // arr = []
      return result
    } else {
      return sum
    }
  }
}

const sum6 = sumMaker(6)
// const result = sum6(1)(2)(3)(4)(5)(6)
const result = sum6(1, 2, 3)(4)(5)(7)
console.log(result)
```

## 函数柯里化实际应用

```js
// function isUndefined(thing) {
//   return typeof thing === 'undefined'
// }
// function isNumber(thing) {
//   return typeof thing === 'number'
// }
// function isString(thing) {
//   return typeof thing === 'string'
// }
// function isFunction(thing) {
//   return typeof thing === 'function'
// }

// 参数复用
function typeofTest(type) {
  return function (value) {
    return typeof value === type
  }
}

const isString = typeofTest('string')
const isNumber = typeofTest('number')
console.log(isString('111'))
console.log(isNumber('111'))
```

## 设计模式-工厂模式

- 在 JS 中，工厂模式的表现形式就是一个调用即可返回新对象的函数

```js
// 工厂模式
function FoodFactory(name, color) {
  return {
    name,
    color,
  }
}
const f1 = FoodFactory('西兰花', '黄绿色')
```

```js
// 构造函数
function Food(name, color) {
  this.name = name
  this.color = color
}
const f2 = new Food('西兰花', '黄绿色')
```

## 设计模式-单例模式

- 在使用这个模式时，单例对象整个系统需要保证只有一个存在

```js
class SingleTon {
  static #instance

  static getInstance() {
    if (this.#instance === undefined) {
      this.#instance = new SingleTon()
    }
    return this.#instance
  }
}

const s1 = SingleTon.getInstance()
const s2 = SingleTon.getInstance()
console.log(s1 === s2)
```

## 设计模式-观察者模式

- 在对之间定义一个一对多的依赖，当一个对象状态改变的时候，所有依赖的对象都会自动收到通知

```js
export default {
  data() {
    return {
      message: '',
    }
  },
  watch: {
    message(newValue, oldValue) {
      console.log('111')
    },
  },
}
```

## 设计模式-发布订阅模式

- 发布订阅模式和观察者模式类似，区别是：一个有中间商(发布订阅模式)，一个没有中间商(观察者模式)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="on">注册事件</button>
    <button id="emit">触发事件</button>
    <button id="off">移除事件</button>
    <button id="once-on">一次性事件注册</button>
    <button id="once-emit">一次性事件触发</button>

    <script>
      class Mitt {
        #handler = {}

        $on(event, callback) {
          if (!this.#handler[event]) {
            this.#handler[event] = []
          }

          this.#handler[event].push(callback)
        }

        $emit(event, ...args) {
          const arr = this.#handler[event] || []
          arr.forEach((callback) => {
            callback(...args)
          })
        }

        $off(event) {
          if (this.#handler[event]) {
            delete this.#handler[event]
          }
        }

        $once(event, callback) {
          this.$on(event, (...args) => {
            callback(...args)
            this.$off(event)
          })
        }
      }

      const button01 = document.getElementById('on')
      const button02 = document.getElementById('emit')
      const button03 = document.getElementById('off')
      const button04 = document.getElementById('once-on')
      const button05 = document.getElementById('once-emit')

      const bus = new Mitt()

      button01.addEventListener('click', () => {
        bus.$on('event1', () => {
          console.log('event1')
        })

        bus.$on('event2', (name, age) => {
          console.log('event2', name, age)
        })

        bus.$on('event2', (name, age) => {
          console.log('event2的第二个回调函数', name, age)
        })
      })

      button02.addEventListener('click', () => {
        bus.$emit('event1')
        bus.$emit('event2', '孙悟空', 18)
      })

      button03.addEventListener('click', () => {
        bus.$off('event1')
        bus.$off('event2')
      })

      button04.addEventListener('click', () => {
        bus.$once('event3', (name, age) => {
          console.log('event3一次性事件')
        })
      })

      button05.addEventListener('click', () => {
        bus.$emit('event3', '猪八戒', 28)
      })
    </script>
  </body>
</html>
```

## 设计模式-原型模式

- 原型模式是创建型模式的一种，其特点在于通过复制一个已经存在的实例来返回新的实例，而不是新建实例

```js
const user = {
  name: '孙悟空',
  eat() {
    console.log('我正在吃饭')
  },
}

const newUser = Object.create(user)
console.log(newUser.name) // 孙悟空
newUser.eat() // 我正在吃饭
console.log(newUser === user) // false
```

## 设计模式-代理模式

- 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问

```html
// 代理模式-缓存代理 // 需求：第一次查询的数据通过接口获取，重复查询通过缓存获取
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" />

    <script>
      const cache = {}

      const getData = async (pname) => {
        if (!cache[pname]) {
          const response = await fetch(`http://hmajax.itheima.net/api/city?pname=${pname}`)
          const res = await response.json()
          cache[pname] = res.list
        }

        return cache[pname]
      }

      const input = document.getElementsByTagName('input')[0]
      input.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
          const res = await getData(e.target.value)
          console.log(res)
        }
      })
    </script>
  </body>
</html>
```

## 设计模式-迭代器模式

- 可以让用户透过特定的接口巡访容器中的每一个元素而不用了解底层的实现(遍历)

```js
Object.prototype.objFunc = function () {}
Array.prototype.arrFunc = function () {}

const arr = ['孙悟空', '猪八戒', '沙和尚']
const obj = {
  name: '孙悟空',
  age: 18,
  gender: '男',
}

for (const key in arr) {
  // console.log('key: ', key)
  // key: 0
  // key: 1
  // key: 2
  // key: arrFunc
  // key: objFunc
}

for (const key in obj) {
  // console.log('key: ', key)
  // key: name
  // key: age
  // key: gender
  // key: objFunc
}

for (const value of arr) {
  // console.log(value)
  // 孙悟空 猪八戒 沙和尚
}

// for (const value of obj) {
// console.log(value) 会报错
// }
```

## 迭代器模式-可迭代对象

```js
// const obj = {
//   [Symbol.iterator]() {
//     function* userGenerator() {
//       yield '孙悟空'
//       yield 18
//       yield '男'
//     }

//     const user = userGenerator()
//     return user
//   },
// }

// for (const value of obj) {
//   console.log(value)
// }

const obj = {
  [Symbol.iterator]() {
    const arr = ['孙悟空', '猪八戒', '沙和尚']

    let index = 0

    return {
      next() {
        if (index < arr.length) {
          return {
            done: false,
            value: arr[index++],
          }
        }
        return {
          done: true,
        }
      },
    }
  },
}

for (const value of obj) {
  console.log(value)
}
```
