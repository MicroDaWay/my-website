---
sidebar_position: 6
---

# 函数

## 函数

- 函数(Function)
  - 函数也是一个对象
  - 它具有其他对象所有的功能
  - 函数中可以存储代码，且可以在需要时调用这些代码
- 语法：

```js
function 函数名(){
  语句...
}
```

- 调用函数：
  - 调用函数就是执行函数中存储的代码
  - 语法：
    - 函数对象()
- 使用 typeof 检查函数对象时会返回 function

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function fn() {
        console.log('你好')
        console.log('Hello')
      }

      fn()
      console.log(fn)
      console.log(typeof fn) // 'function'
    </script>
  </head>
  <body></body>
</html>
```

## 函数的创建方式

- 函数的定义方式：

  - 函数声明

    ```js
    function 函数名(){
      语句...
    }
    ```

  - 函数表达式
    ```js
    function 函数名(){
      语句...
    }
    ```
  - 箭头函数
    ```js
    function 函数名(){
      语句...
    }
    ```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function fn() {
        console.log('函数声明所定义的函数')
      }

      const fn2 = function () {
        console.log('函数表达式')
      }

      const fn3 = () => {
        console.log('箭头函数')
      }

      const fn4 = () => console.log('箭头函数')
    </script>
  </head>
  <body></body>
</html>
```

## 参数

- 形式参数
  - 在定义函数时，可以在函数中指定数量不等的形式参数(形参)
  - 在函数中定义形参，就相当于在函数内部声明了对应的变量但是没有赋值
- 实际参数
  - 在调用函数时，可以在函数的()传递数量不等的实参
  - 实参会赋值给其对应的形参
  - 参数：
    - 如果实参和形参数量相同，则对应的实参赋值给对应的形参
    - 如果实参多余形参，则多余的实参不会使用
    - 如果形参多余实参，则多余的形参为 undefined
  - 参数的类型
    - JS 中不会检查参数的类型，可以传递任何类型的值作为参数
- 函数声明
  ```js
  function 函数名([参数]){
    语句...
  }
  ```
- 函数表达式
  ```js
  const 变量 = function([参数]){
    语句...
  }
  ```
- 箭头函数
  ```js
  ([参数]) => {
    语句...
  }
  ```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function fn(a, b) {
        console.log('a =', a)
        console.log('b =', b)
      }

      // fn(1)
      // fn(true, 'hello')
      // fn(null, 11n)
      // fn({ name: '孙悟空' }, 'hello')

      function sum(a, b) {
        console.log(a + b)
      }

      sum(10, 20)
    </script>
  </head>
  <body></body>
</html>
```

## 箭头函数的参数

- 当箭头函数中只有一个参数时，可以省略()
- 定义参数时，可以为参数指定默认值
- 默认值，会在没有对应实参时生效

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const fn = (a, b) => {
        console.log('a =', a)
        console.log('b =', b)
      }

      const fn2 = (a) => {
        console.log('a =', a)
      }

      const fn3 = (a = 10, b = 20, c = 30) => {
        console.log('a =', a)
        console.log('b =', b)
        console.log('c =', c)
      }

      // fn3() // 10 20 30
      fn3(1, 2) // 1 2 30
    </script>
  </head>
  <body></body>
</html>
```

## 对象作为参数

- 对象可以作为参数传递
- 传递实参时，传递并不是变量本身，而是变量中存储的值
- 函数每次调用，都会重新创建默认值

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const fn = (a) => {
        // console.log('a =', a)
        a = {}
        a.name = '猪八戒'
        console.log('a =', a)
      }

      const obj = {
        name: '孙悟空',
      }

      // fn(obj)
      // console.log('obj =', obj)

      // 函数每次调用，都会重新创建默认值
      const fn2 = (a = { name: '沙和尚' }) => {
        console.log('a =', a)
        a.name = '唐僧'
        console.log('a =', a)
      }

      // fn2() // '沙和尚' '唐僧'
      // fn2() // '沙和尚' '唐僧'

      const obj2 = { name: '沙和尚' }
      const fn3 = (a = obj2) => {
        console.log('a =', a)
        a.name = '唐僧'
        console.log('a =', a)
      }

      fn3() // '沙和尚' '唐僧'
      fn3() // '唐僧' '唐僧'
    </script>
  </head>
  <body></body>
</html>
```

## 函数作为参数

- 在 JS 中，函数也是一个对象(一等函数)
- 别的对象能做的事情，函数也可以

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function fn(a) {
        console.log('a =', a)
        a()
      }

      // function fn2() {
      //   console.log('我是fn2')
      // }

      // fn(fn2)

      // fn(function () {
      //   console.log('我是匿名函数')
      // })

      fn(() => console.log('我是箭头函数'))
    </script>
  </head>
  <body></body>
</html>
```

## 函数的返回值

- 在函数中，可以通过 return 关键字来指定函数的返回值
- 返回值就是函数的执行结果，函数调用完毕返回值便会作为结果返回
- 任何值都可以作为返回值使用(包括对象和函数之类)
- 如果 return 后不跟任何值，则相当于返回 undefined
- 如果不写 return，那么函数的返回值依然是 undefined
- return 一执行函数立即结束

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function sum(a, b) {
        return a + b
      }

      const result = sum(1, 2)
      // console.log(result)

      function fn() {
        // return {
        //   name: '孙悟空'
        // }

        // return

        alert(123)
        return
        alert(456)
      }

      const res = fn()
      console.log(res)
    </script>
  </head>
  <body></body>
</html>
```

## 箭头函数的返回值

- 箭头函数的返回值可以直接写在箭头后
- 如果直接在箭头后设置对象字面量为返回值时，对象字面量必须使用()括起来

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const sum = (a, b) => a + b

      const result = sum(10, 20)
      // console.log(result)

      const fn = () => ({ name: '孙悟空' })

      const res = fn()
      console.log(res)
    </script>
  </head>
  <body></body>
</html>
```

## 作用域(scope)

- 作用域指的是一个变量的可见区域
- 作用域有两种：
  - 全局作用域
    - 全局作用域在网页运行时创建，在网页关闭时销毁
    - 所有直接编写到 script 标签中的代码都位于全局作用域中
    - 全局作用域中的变量是全局变量，可以在任意位置访问
  - 局部作用域
    - 块作用域
      - 块作用域是一种局部作用域
      - 块作用域在代码块执行时创建，代码块执行完毕它就销毁
      - 在块作用域中声明的变量是局部变量，只能在块内部访问，外部无法访问

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = '变量a'

      {
        let b = '变量b'

        {
          console.log(b)
        }
      }

      console.log(b)
    </script>
  </head>
  <body></body>
</html>
```

## 函数作用域

- 函数作用域也是一种局部作用域
- 函数作用域在函数调用时产生，调用结束后销毁
- 函数每次调用都会产生一个全新的函数作用域
- 在函数中定义的变量是局部变量，只能在函数内部访问，外部无法访问

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function fn() {
        const a = 'fn中的a'
        console.log(a)
      }

      fn()

      console.log(a)
    </script>
  </head>
  <body></body>
</html>
```

## 作用域链

- 当我们使用一个变量时，JS 解释器会优先在当前作用域中寻找变量
- 如果找到了则直接使用
- 如果没找到，则去上一层作用域中寻找，找到了则使用
- 如果没找到，则继续去上一层寻找，以此类推
- 如果一直到全局作用域都没找到，则报错 xxx is not defined

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = '全局中的a'

      {
        let a = '第一层代码块中的a'
        {
          let a = '第二层代码块中的a'
          // console.log(a)
        }
      }

      let b = 33

      function fn() {
        let b = 44

        function fn2() {
          let b = 55
          console.log(b)
        }

        fn2()
      }

      fn()
    </script>
  </head>
  <body></body>
</html>
```

## window 对象

- 在浏览器中，浏览器为我们提供了一个 window 对象，可以直接访问
- window 对象代表的是浏览器窗口，通过该对象可以对浏览器窗口进行各种操作
- 除此之外 window 对象还负责存储 JS 中的内置对象和浏览器的宿主对象
- window 对象的属性可以通过 window 对象访问，也可以直接访问
- 函数就可以认为是 window 对象的方法
- 向 window 对象中添加的属性会自动成为全局变量
- var 用来声明变量，作用和 let 相同，但是 var 不具有块作用域
  - 在全局中使用 var 声明的变量，都会作为 window 对象的属性保存
  - 使用 function 声明的函数，都会作为 window 的方法保存
  - 使用 let 声明的变量不会存储在 window 对象中，而存在一个秘密的小地方(无法访问)
  - var 虽然没有块作用域，但有函数作用域
  - 在局部作用域或全局作用域中，如果没有使用 var 或 let 声明变量，则变量会自动成为 window 对象的属性 也就是全局变量

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // window.alert(123)
      // window.console.log(123)

      window.a = 10
      // console.log(a)

      var b = 20 // 等价于 window.b = 20
      // console.log(window.b)

      function fn() {
        console.log('fn')
      }

      // window.fn()

      let c = 30
      // console.log(window.c) // undefined

      function fn2() {
        // var d = 40 // var虽然没有块作用域，但有函数作用域
        d = 40 // 在局部作用域中，如果没有使用var或let声明变量，则变量会自动成为window对象的属性 也就是全局变量
        // 等价于 window.d = 40
      }

      fn2()

      console.log(d)
      // console.log(window.d)
    </script>
  </head>
  <body></body>
</html>
```

## 提升

- 变量的提升
  - 使用 var 声明的变量，它会在所有代码执行前被声明
  - 所以我们可以在变量声明前就访问变量
- 函数的提升
  - 使用函数声明创建的函数，会在其他代码执行前被创建
  - 所以我们可以在函数声明前调用函数
- let 声明的变量实际也会提升，但是在赋值之前解释器禁止对该变量的访问

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      console.log(a)

      // a = 10 // 等价于 window.a = 10

      // var a = 10

      let a = 10

      fn()

      function fn() {
        console.log('fn函数')
      }
    </script>
  </head>
  <body></body>
</html>
```

## 练习

- 变量和函数的提升同样适用于函数作用域
- 定义形参就相当于在函数中声明了对应的变量，但是没有赋值

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // var a = 1
      // function fn() {
      //   a = 2
      //   console.log(a) // 2
      // }
      // fn()
      // console.log(a) // 2

      // 变量和函数的提升同样适用于函数作用域

      // var a = 1
      // function fn() {
      //   console.log(a) //undefined
      //   var a = 2
      //   console.log(a) // 2
      // }
      // fn()
      // console.log(a) // 1

      // 定义形参就相当于在函数中声明了对应的变量，但是没有赋值

      // var a = 1
      // function fn(a) {
      //   console.log(a) //undefined
      //   a = 2
      //   console.log(a) // 2
      // }
      // fn()
      // console.log(a) // 1

      // var a = 1
      // function fn(a) {
      //   console.log(a) //10
      //   a = 2
      //   console.log(a) // 2
      // }
      // fn(10)
      // console.log(a) // 1

      // var a = 1
      // function fn(a) {
      //   console.log(a) //1
      //   a = 2
      //   console.log(a) // 2
      // }
      // fn(a)
      // console.log(a) // 1

      console.log(a) // 2

      var a = 1

      console.log(a) // 1

      function a() {
        alert(2)
      }

      console.log(a) // 1

      var a = 3

      console.log(a) // 3

      var a = function () {
        alert(4)
      }

      console.log(a) // 4

      var a

      console.log(a) // 4
    </script>
  </head>
  <body></body>
</html>
```

## debug

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // debugger // 在代码中打了一个断点

      console.log(a) // 2

      var a = 1

      console.log(a) // 1

      function a() {
        alert(2)
      }

      console.log(a) // 1

      var a = 3

      console.log(a) // 3

      var a = function () {
        alert(4)
      }

      console.log(a) // 4

      var a

      console.log(a) // 4
    </script>
  </head>
  <body></body>
</html>
```

## 立即执行函数

- 在开发中应该尽量减少直接在全局作用域中编写代码！
- 所以我们的代码要尽量编写的局部作用域
- 如果使用 let 声明的变量，可以使用{}来创建块作用域
- 立即执行函数(IIFE)
  - 立即执行函数是一个匿名的函数，并且它只会调用一次
  - 可以利用 IIFE 来创建一个一次性的函数作用域，避免变量冲突的问题

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      ;(function () {
        let a = 10
        console.log(a)
      })()
      ;(function () {
        let b = 20
        console.log(b)
      })()
    </script>
  </head>
  <body></body>
</html>
```

## this

- 函数在执行时，JS 解析器每次都会传递进一个隐含的参数
- 这个参数就叫做 this
- this 会指向一个对象
- this 所指向的对象会根据函数调用方式的不同而不同
  - 以函数形式调用时，this 指向的是 window
  - 以方法的形式调用时，this 指向的是调用方法的对象
- 通过 this 可以在方法中引用调用方法的对象

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function fn() {
        console.log(this)
      }

      // fn() // 等价于 window.fn()

      const obj = { name: '孙悟空' }
      obj.test = fn
      // obj.test() // { name: '孙悟空' }

      const obj2 = {
        name: '猪八戒',
        test: fn,
      }

      // obj2.test() // {name: '猪八戒'}

      const obj3 = {
        name: '沙和尚',
        sayHello: function () {
          console.log(this.name)
        },
      }

      const obj4 = {
        name: '唐僧',
        sayHello: function () {
          console.log(this.name)
        },
      }

      obj3.sayHello()
      obj4.sayHello()
    </script>
  </head>
  <body></body>
</html>
```

## 箭头函数的 this

- 箭头函数：
  - ([参数]) => 返回值
- 例子：
  - 无参箭头函数：() => 返回值
  - 一个参数的：a => 返回值
  - 多个参数的：(a, b) => 返回值
  - 只有一个语句的函数：() => 返回值
  - 只返回一个对象的函数：`() => ({...})`
  - 有多行语句的函数：
    ```js
    () => {
      ...
      return 返回值
    }
    ```
  - 箭头函数没有自己的 this，它的 this 由外层作用域决定
  - 箭头函数的 this 和它的调用方式无关

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function fn() {
        console.log('fn-->', this)
      }

      const fn2 = () => {
        console.log('fn2-->', this)
      }

      // fn() // window
      // fn2() // window

      const obj = {
        name: '孙悟空',
        fn,
        fn2,
        // sayHello: function () {...},
        // 等价于
        sayHello() {
          console.log(this.name)

          function t() {
            console.log('t -->', this)
          }
          // t() // window

          const t2 = () => {
            console.log('t2-->', this)
          }
          t2() // obj
        },
      }

      // obj.fn() // obj
      // obj.fn2() // window

      obj.sayHello()
    </script>
  </head>
  <body></body>
</html>
```

## 严格模式

- JS 运行代码的模式有两种：
  - 正常模式
    - 默认情况下代码都运行在正常模式中，在正常模式，语法检查并不严格
    - 它的原则是：能不报错的地方尽量不报错
    - 这种处理方式导致代码的运行性能较差
  - 严格模式
    - 在严格模式下，语法检查变得严格
    - 禁止一些语法
    - 更容易报错
    - 提升了性能
- 在开发中，应该尽量使用严格模式，这样可以将一些隐藏的问题消灭在萌芽阶段，同时也能提升代码的运行性能

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 全局的严格模式
      'use strict'

      a = 10
      console.log(a)

      function fn() {
        // 函数的严格的模式
        'use strict'
      }
    </script>
  </head>
  <body></body>
</html>
```
