---
sidebar_position: 5
---

# 对象

## 对象

- 数据类型：
  - 原始值
    - 数值 Number
    - 大整数 BigInt
    - 字符串 String
    - 布尔值 Boolean
    - 空值 Null
    - 未定义 Undefined
    - 符号 Symbol
  - 对象
    - 对象是 JS 中的一种复合数据类型，它相当于一个容器，在对象中可以存储各种不同类型数据
  - 原始值只能用来表示一些简单的数据，不能表示复杂数据
  - 比如：现在需要在程序中表示一个人的信息
- 对象中可以存储多个各种类型的数据，对象中存储的数据，我们称为属性
- 向对象中添加属性：对象.属性名 = 属性值
- 读取对象中的属性：对象.属性名
- 如果读取的是一个对象中没有的属性，不会报错而是返回 undefined

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // const obj = Object()
      const obj = new Object()

      // 添加属性
      obj.name = '孙悟空'
      obj.age = 18
      obj.gender = '男'

      // 修改属性
      obj.name = 'Sun'

      // 删除属性
      delete obj.name

      console.log(obj)
    </script>
  </head>
  <body></body>
</html>
```

## 对象的属性

- 属性名
  - 通常属性名就是一个字符串，所以属性名可以是任何值，没有什么特殊要求
  - 但是如果你的属性名太特殊了，不能直接使用，需要使用[]来设置
  - 虽然如此，但是我们还是强烈建议属性名也按照标识符的规范命名
  - 也可以使用符号(symbol)作为属性名，来添加属性，获取这种属性时，也必须使用 symbol
  - 使用 symbol 添加的属性，通常是那些不希望被外界访问的属性
  - 使用[]去操作属性时，可以使用变量
- 属性值
  - 对象的属性值可以是任意的数据类型，也可以是一个对象
- 使用 typeof 检查一个对象时，会返回 'object'
- 使用.的形式添加属性时，不能使用变量
- in 运算符
  - 用来检查对象中是否含有某个属性
  - 语法 属性名 in obj
  - 如果有返回 true，没有返回 false

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const obj = new Object()

      obj.name = '孙悟空'

      // 不建议
      // obj.if = '哈哈哈'
      // obj.let = '嘻嘻嘻'
      // obj['123#@!'] = 'aws'

      const mySymbol = Symbol()

      obj[mySymbol] = '通过Symbol添加的属性'

      obj.gender = '男'

      // console.log(obj.gender)
      // console.log(obj['gender'])

      const str = 'address'
      obj[str] = '花果山'

      obj.a = 1
      obj.b = '2'
      obj.c = true
      obj.d = 12n
      obj.f = new Object()
      obj.f.name = '猪八戒'

      // console.log(typeof obj) // 'object'

      console.log('name' in obj) // true
      console.log('ha' in obj) // false

      // console.log(obj)
    </script>
  </head>
  <body></body>
</html>
```

## 对象字面量

- 可以直接使用 {} 来创建对象
- 使用{}所创建的对象，可以直接向对象中添加属性
- 语法：
  ```js
  {
    属性名: 属性值,
    [属性名]: 属性值
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
      const obj = new Object()

      let mySymbol = Symbol()

      const obj2 = {
        name: '孙悟空',
        age: 18,
        ['gender']: '男',
        [mySymbol]: '特殊的属性',
        hello: {
          a: 1,
          b: true,
        },
      }

      console.log(obj2)
    </script>
  </head>
  <body></body>
</html>
```

## 枚举属性

- 枚举属性，指将对象中的所有的属性全部获取
- for-in 语句
  - 语法：
    ```js
    for(let propName in 对象){
      语句...
    }
    ```
- for-in 的循环体会执行多次，有几个属性就会执行几次
- 每次执行时，都会将一个属性名赋值给我们所定义的变量
- 注意：并不是所有的属性都可以枚举，比如 使用符号添加的属性

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const obj = {
        name: '孙悟空',
        age: 18,
        gender: '男',
        address: '花果山',
        [Symbol()]: '测试', // 符号添加的属性是不能枚举
      }

      for (let propName in obj) {
        console.log(propName, obj[propName])
      }

      console.log(obj)
    </script>
  </head>
  <body></body>
</html>
```

## 可变类型

- 原始值都属于不可变类型，一旦创建就无法修改
- 在内存中不会创建重复的原始值
- 当我们为一个变量重新赋值时，绝对不会影响其他变量
- 对象属于可变类型
  - 对象创建完成后，可以任意的添加删除修改对象中的属性
  - 注意：
    - 当对两个对象进行相等或全等比较时，比较的是对象的内存地址
    - 如果有两个变量同时指向一个对象，通过一个变量修改对象时，对另外一个变量也会产生影响

[JS004.png](../../static/img/JS004.png)
[JS005.png](../../static/img/JS005.png)
[JS006.png](../../static/img/JS006.png)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let obj = new Object()
      obj.name = '孙悟空'

      let obj2 = new Object()
      let obj3 = new Object()
      // console.log(obj2 === obj3) // false

      let obj4 = obj

      // console.log(obj4 === obj) // true

      obj4.name = '猪八戒'
      console.log(obj4)
      console.log(obj)
    </script>
  </head>
  <body></body>
</html>
```

## 改变量和改对象

- 修改对象
  - 修改对象时，如果有其他变量指向该对象
  - 则所有指向该对象的变量都会受到影响
- 修改变量
  - 修改变量时，只会影响当前的变量
- 在使用变量存储对象时，很容易因为改变变量指向的对象，提高代码的复杂度
- 所以通常情况下，声明存储对象的变量时会使用 const
- 注意：
  - const 只是禁止变量被重新赋值，对对象的修改没有任何影响

[JS007.png](../../static/img/JS007.png)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let obj = {
        name: '孙悟空',
      }

      let obj2 = obj

      obj2 = null // 修改变量
      obj.name = '沙和尚' // 修改对象

      console.log(obj)
      console.log(obj2)
    </script>
  </head>
  <body></body>
</html>
```

## 方法(method)

- 当一个对象的属性指向一个函数，那么我们就称这个函数是该对象的方法
- 调用函数就称为调用对象的方法

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const obj = {}
      obj.name = '孙悟空'
      obj.age = 18
      obj.sayHello = function () {
        console.log('Hello')
      }

      obj.sayHello()
    </script>
  </head>
  <body></body>
</html>
```
