---
sidebar_position: 2
---

# 数据类型

## 数值

- 数值(Number)
  - 在 JS 中所有的整数和浮点数都是 Number 类型
  - JS 中的数值并不是无限大的，当数值超过一定范围后会显示近似值
  - Infinity 是一个特殊的数值表示无穷
  - 所以在 JS 中进行一些精度比较高的运算时要十分注意
  - NaN 也是一个特殊的数值，表示非法的数值
- 大整数(BigInt)
  - 大整数用来表示一些比较大的整数
  - 大整数使用 n 结尾，它可以表示的数字范围是无限大
- 其他进制的数字：
  - 二进制 0b
  - 八进制 0o
  - 十六进制 0x

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let num = 3.14

      num = 99999 ** 99999 // Infinity
      num = 0.1 + 0.2 // 0.30000000000000004
      num = 1 - 'a' // NaN

      num = 9999999999999999999999999n // 9999999999999999999999999n

      num = 0b1010 // 10
      num = 0o10 // 8
      num = 0x11 // 17

      console.log(num)
    </script>
  </head>
  <body></body>
</html>
```

## 类型检查

- typeof 运算符
  - typeof 用来检查不同的值的类型
  - 它会根据不同的值返回不同的结果

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const num1 = 10
      const num2 = 10n

      console.log(typeof num1) // 'number'
      console.log(typeof num2) // 'bigint'
    </script>
  </head>
  <body></body>
</html>
```

## 字符串

- 字符串(String)
- 在 JS 中使用单引号或双引号来表示字符串
- 转义字符 \
  - \" --> "
  - \' --> '
  - \\\ --> \
  - \t --> 制表符
  - \n --> 换行
- 模板字符串
  - 使用反单引号来表示模板字符串
  - 模板字符串中可以嵌入变量
- 使用 typeof 检查一个字符串时会返回 string

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let str = '这是一个"字符串\\' // 这是一个"字符串\
      str = '嘻嘻\t哈哈哈'

      const name = '孙悟空'
      str = `你好, ${name}` // 你好, 孙悟空

      console.log(str)
      console.log(typeof str) // 'string'
    </script>
  </head>
  <body></body>
</html>
```

## 其他数据类型

### 布尔值(Boolean)

- 布尔值主要用来进行逻辑判断
- 布尔值只有两个值 true 和 false
- 使用 typeof 检查一个布尔值时会返回 "boolean"

### 空值 (Null)

- 空值用来表示空对象
- 空值只有一个值 null
- 使用 typeof 检查一个空值时会返回 "object"
- 使用 typeof 无法检查空值

### 未定义(Undefined)

- 当声明一个变量而没有赋值时，它的值就是 undefined
- undefined 类型的值只有一个就是 undefined
- 使用 typeof 检查一个 Undefined 类型的值时，会返回 "undefined"

### 符号(Symbol)

- 用来创建一个唯一的标识
- 使用 typeof 检查符号时会返回 "symbol"

### JS 中原始值一共有七种

- Number
- BigInt
- String
- Boolean
- Null
- Undefined
- Symbol
- 七种原始值是构成各种数据的基石
- 原始值在 JS 中是不可变类型，一旦创建就不能修改

[JS002.png](../../static/img/JS002.png)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let flag = false
      console.log(typeof flag) // 'boolean'

      flag = null
      console.log(typeof flag) // 'object'

      flag = undefined
      console.log(typeof flag) // 'undefined'

      flag = Symbol()
      console.log(typeof flag) // 'symbol'
    </script>
  </head>
  <body></body>
</html>
```

## 类型转换-字符串

- 类型转换指将一种数据类型转换为其他类型
- 主要是将其他类型转换为(字符串、数值和布尔值)
- 转换为字符串
  - 调用 toString() 方法将其他类型转换为字符串
    - 调用 xxx 的 yyy 方法 --> xxx.yyy()
    - 由于 null 和 undefined 中没有 toString()，所以对这两个东西调用 toString()时会报错
  - 调用 String()函数将其他类型转换为字符串
    - 调用 xxx 函数 --> xxx()
    - 原理：
      - 对于拥有 toString()方法的值调用 String()函数时，实际上就是在调用 toString()方法
      - 对于 null，则直接转换为"null"
      - 对于 undefined，直接转换为"undefined"

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = 10
      a = true
      a = 20n
      a = null
      a = undefined
      console.log(typeof a, a)
      // 'number' 10
      // 'boolean' true
      // 'bigint' 20n
      // 'object' bull
      // 'undefined' undefined

      // a = a.toString()
      a = String(a)
      console.log(typeof a, a)
      // 'string' 10
      // 'string' true
      // 'string' 20
      // 'string' null
      // 'string' undefined
      // toString() 方法无法将 null undefined 转换为字符串
    </script>
  </head>
  <body></body>
</html>
```

[JS003.png](../../static/img/JS003.png)

## 类型转换-数值

- 将其他的数据类型转换为数值
  - 使用 Number()函数来将其他类型转换为数值
    - 转换的情况：
      - 字符串：
        - 如果字符串是一个合法的数字，则会自动转换为对应的数字
        - 如果字符串不是合法数字，则转换为 NaN
        - 如果字符串是空串或纯空格的字符串，则转换为 0
      - 布尔值：
        - true 转换为 1，false 转换为 0
      - null 转换为 0
      - undefined 转换为 NaN
  - 专门用来将字符串转换为数值的两个方法
    - parseInt()：将一个字符串转换为一个整数
      - 解析时，会自左向右读取一个字符串，直到读取到字符串中所有的有效的整数
      - 也可以使用 parseInt()来对一个数字进行取整
    - parseFloat()：将一个字符串转换为浮点数
      - 解析时，会自左向右读取一个字符串，直到读取到字符串中所有的有效的小数

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = '123' // 123
      a = 'abc' // NaN
      a = '12px' // NaN
      a = '3.14' // 3.14
      a = '' // 0
      a = '   ' // 0
      a = null // 0
      a = undefined // NaN
      a = true // 1
      a = false // 0
      // console.log(typeof a, a)

      // a = Number(a)
      // console.log(typeof a, a)

      let b = '123' // 123
      b = '123px' // 123
      b = '123.45px' // 123
      b = 'a123' // NaN
      // console.log(typeof b, b)

      b = parseInt(b)
      // console.log(typeof b, b)

      let c = '123.45' // 123.45
      c = '123.45px' // 123.45
      c = '123' // 123
      c = 'a123.45' // NaN
      console.log(typeof c, c)

      c = parseFloat(c)
      console.log(typeof c, c)
    </script>
  </head>
  <body></body>
</html>
```

## 类型转换-布尔值

- 使用 Boolean()函数来将其他类型转换为布尔值
- 转换的情况：
  - 数字：
    - 0 和 NaN 转换为 false
    - 其余是 true
  - 字符串：
    - 空串 转换为 false
    - 其余是 true
  - null 和 undefined 都转换为 false
  - 对象：对象会转换为 true
- 总结：
  - 所有表示空性的没有的错误的值都会转换为 false
  - 0、NaN、空串、null、undefined、false

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = 1 // true
      a = 0 // false
      a = -1 // true
      a = NaN // false
      a = Infinity // true
      a = null // false
      a = undefined // false
      a = '' // false
      a = '   ' // true
      a = {} // true

      console.log(typeof a, a)

      a = Boolean(a)
      console.log(typeof a, a)
    </script>
  </head>
  <body></body>
</html>
```
