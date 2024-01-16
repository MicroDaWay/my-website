---
sidebar_position: 9
---

# 内建对象

## 解构赋值

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const arr = ['孙悟空', '猪八戒', '沙和尚']

      let a, b, c
      ;[a, b, c] = arr

      // 声明同时解构
      let [d, e, f, g] = ['唐僧', '白骨精', '蜘蛛精', '玉兔精']

      // ;[d, e, f, g] = [1, 2, 3] // g = undefined
      // ;[d, e, f = 10, g = 20] = [1, 2, 3] // 1 2 3 20
      ;[d, e, f, g = g] = [1, 2, 3] //  1 2 3 '玉兔精'

      // 解构数组时，可以使用...来设置获取多余的元素
      let [n1, n2, ...n3] = [4, 5, 6, 7] // 4 5 [6, 7]

      function fn() {
        return ['二郎神', '猪八戒']
      }

      let [name1, name2] = fn()

      // 可以通过解构赋值来快速交换两个变量的值
      let a1 = 10
      let a2 = 20

      // let temp = a1
      // a1 = a2
      // a2 = temp

      ;[a1, a2] = [a2, a1]

      const arr2 = ['孙悟空', '猪八戒']
      ;[arr2[0], arr2[1]] = [arr2[1], arr2[0]]

      // 数组中可以存储任意类型的数据, 也可以存数组
      // 如果一个数组中的元素还是数组, 则这个数组我们就称为是二维数组

      const arr3 = [
        ['孙悟空', 18, '男'],
        ['猪八戒', 28, '男'],
      ]

      // for (let item of arr3) {
      //   for (let value of item) {
      //     console.log(value)
      //   }
      // }

      let [[name, age, gender], array] = arr3

      console.log(name, age, gender)
      console.log(array)
    </script>
  </head>
  <body></body>
</html>
```

## 对象的解构

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const obj = { name: '孙悟空', age: 18, gender: '男' }

      // 声明变量同时解构对象
      // let { name, age, gender } = obj

      let name, age, gender
      ;({ name, age, gender } = obj)

      // 没有的属性返回 undefined
      // let { address } = obj // address = undefined

      // let { name: a, age: b, gender: c, address = '花果山' } = obj
      // console.log(a, b, c, address)

      let { name: a, age: b, gender: c, address: d = '花果山' } = obj
      console.log(a, b, c, d)
    </script>
  </head>
  <body></body>
</html>
```

## 对象的序列化

- JS 中的对象使用时都是存在于计算机的内存中的
- 序列化指将对象转换为一个可以存储的格式
- 在 JS 中对象的序列化通常是将一个对象转换为字符串(JSON 字符串)
- 序列化的用途(对象转换为字符串有什么用)：
  - 对象转换为字符串后，可以将字符串在不同的语言之间进行传递
  - 甚至人可以直接对字符串进行读写操作，使得 JS 对象可以在不同的语言之间传递
  - 用途：
    - 作为数据交换的格式
    - 用来编写配置文件
  - 如何进行序列化：
    - 在 JS 中有一个工具类 JSON (JavaScript Object Notation) JS 对象表示法
    - JS 对象序列化后会转换为一个字符串，这个字符串我们称其为 JSON 字符串
  - 也可以手动的编写 JSON 字符串，在很多程序的配置文件就是使用 JSON 编写的
    - 编写 JSON 的注意事项：
      - JSON 字符串有两种类型：
        - JSON 对象 {}
        - JSON 数组 []
      - JSON 字符串的属性名必须使用双引号引起来
      - JSON 中可以使用的属性值(元素)
        - 数字(Number)
        - 字符串(String) 必须使用双引号
        - 布尔值(Boolean)
        - 空值(Null)
        - 对象(Object {})
        - 数组(Array [])
      - JSON 的格式和 JS 对象的格式基本上是一致的
      - 注意：JSON 字符串如果属性是最后一个，则不要再加
    - JSON.stringify() 可以将一个对象转换为 JSON 字符串
    - JSON.parse() 可以将一个 JSON 格式的字符串转换为 JS 对象

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
      }

      // JSON.stringify() 可以将一个对象转换为JSON字符串
      const str = JSON.stringify(obj)

      // JSON.parse() 可以将一个JSON格式的字符串转换为JS对象
      const obj2 = JSON.parse(str)
      // console.log(obj === obj2) // false

      const str2 = '{"name": "猪八戒", "age": 28}'
      const str3 = '{}'
      const str4 = '[true, 18, null, []]'
    </script>
  </head>
  <body></body>
</html>
```

## 深复制

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
        friend: {
          name: '猪八戒',
        },
      }

      // 浅复制
      const obj2 = Object.assign({}, obj)

      // 深复制
      const obj3 = structuredClone(obj)

      // 利用JSON来完成深复制
      const str = JSON.stringify(obj)
      const obj4 = JSON.parse(str)

      const obj5 = JSON.parse(JSON.stringify(obj))
    </script>
  </head>
  <body></body>
</html>
```

## Map

- Map 用来存储键值对结构的数据(key-value)
- Object 中存储的数据就可以认为是一种键值对结构
- Map 和 Object 的主要区别：
  - Object 中的属性名只能是字符串或符号，如果传递了一个其他类型的属性名，JS 解释器会自动将其转换为字符串
  - Map 中任何类型的值都可以成为数据的 key
- 创建：
  - new Map()
- 属性和方法：
  - map.size 获取 map 中键值对的数量
  - map.set(key, value) 向 map 中添加键值对
  - map.get(key) 根据 key 获取值
  - map.delete(key) 删除指定数据
  - map.has(key) 检查 map 中是否包含指定键
  - map.clear() 删除全部的键值对

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const obj = { address: '花果山' }

      const obj2 = {
        name: '孙悟空',
        age: 18,
        [Symbol()]: '符号',
        [obj]: '哈哈',
      }

      // 创建一个Map
      const map = new Map()

      map.set('name', '孙悟空')
      map.set(obj, '嘻嘻')
      map.set(NaN, '呵呵')

      console.log(map.size)
      console.log(map.get(NaN))
      console.log(map.get(obj))
      console.log(map.has('name')) // true
      map.delete(NaN)
      map.clear()

      console.log(map)
    </script>
  </head>
  <body></body>
</html>
```

- map.keys()
  - 获取 map 的所有的 key
- map.values()
  - 获取 map 的所有的 value
- map.entries()
  - 获取 map 的所有键值对

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const map = new Map()
      map.set('name', '孙悟空')
      map.set('age', 18)

      // 将map转换为数组
      // const arr = Array.from(map) // [['name', '孙悟空'], ['age', 18]]
      const arr = [...map]

      const map2 = new Map([
        ['name', '猪八戒'],
        ['age', 28],
        [{}, () => {}],
      ])

      // {'name' => '猪八戒', 'age' => 28, {…} => ƒ}
      // console.log(map2)

      // 遍历map
      for (let [key, value] of map) {
        // console.log(entry) // ['name', '孙悟空'] ['age', 18]
        // const [key, value] = entry
        // console.log(entry, key, value)
        // console.log(key, value)
      }

      map.forEach((value, key) => {
        // console.log(key, value)
      })

      // console.log(map.keys())
      // console.log(map.values())
      // console.log(map.entries())

      for (let key of map.keys()) {
        console.log(key)
      }
    </script>
  </head>
  <body></body>
</html>
```

## Set

- Set 用来创建一个集合
- 它的功能和数组类似，不同点在于 Set 中不能存储重复的数据
- 使用方式：
  - 创建
    - new Set()
    - new Set([...])
  - 方法
    - size 获取数量
    - add() 添加元素
    - has() 检查元素
    - delete() 删除元素

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 创建一个Set
      const set = new Set()

      // 向set中添加数据
      set.add(10)
      set.add('孙悟空')
      set.add(10)

      // console.log(set.has('孙悟空')) // true
      // console.log(set.has('猪八戒')) // false

      // console.log(set)

      // for (let item of set) {
      //   console.log(item)
      // }

      // const arr = [...set]

      // 使用set实现数组去重
      const arr2 = [1, 2, 3, 2, 1, 3, 4, 5, 4, 6, 7, 7, 8, 9, 10]
      const set2 = new Set(arr2)
      const arr3 = [...set2]

      // console.log(arr3)
      // console.log(set2.size)
      // set2.delete(10)
      console.log(set2)
    </script>
  </head>
  <body></body>
</html>
```

## Math

- Math 是一个工具类
- Math 中为我们提供了数学运算相关的一些常量和方法
- 常量：
  - Math.PI 圆周率
- 方法：
  - Math.abs() 求一个数的绝对值
  - Math.min() 求多个值中的最小值
  - Math.max() 求多个值中的最大值
  - Math.pow() 求 x 的 y 次幂
  - Math.sqrt() 求一个数的平方根
  - Math.floor() 向下取整
  - Math.ceil() 向上取整
  - Math.round() 四舍五入取整
  - Math.trunc() 直接去除小数位
  - Math.random() 生成一个 0-1 之间的随机数
    - 官方文档的取值为 \[0, 1)，实际测试结果为 (0, 1)
- 生成 0-x 之间的随机数 (包括 0 和 x)
  - Math.round(Math.random() \* x)
  - Math.floor(Math.random() \* (x + 1))
- 生成 x-y 之间的随机数 (包括 x 和 y)
  - Math.round(Math.random() \* (y-x) + x)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // console.log(Math.PI)

      let result = Math.abs(10)
      result = Math.abs(-5)
      result = Math.min(10, 20, 30, 44, 55, -1)
      result = Math.max(10, 20, 30, 44, 55, -1)
      result = Math.pow(4, 2) // 4 ** 2
      result = Math.sqrt(4) // 4 ** .5

      result = Math.floor(1.6) // 1
      result = Math.floor(-1.6) // -2
      result = Math.ceil(1.2) // 2
      result = Math.ceil(-2.2) // -2
      result = Math.round(1.4) // 1
      result = Math.round(1.6) // 2
      result = Math.round(-1.6) // -2
      result = Math.round(-1.4) // -1
      result = Math.trunc(1.5) // 1
      result = Math.trunc(1.4) // 1
      result = Math.trunc(-1.4) // -1
      result = Math.trunc(-1.5) // -1

      // console.log(result)

      // for (let i = 0; i < 1000000000; i++) {
      //   result = Math.random()
      //   if (result === 0) {
      //     console.log(result)
      //   }
      // }

      // console.log('循环完毕~')

      for (let i = 0; i < 100; i++) {
        // 24-30
        result = Math.round(Math.random() * 6 + 24)
        console.log(result)
      }
    </script>
  </head>
  <body></body>
</html>
```

## Date

- 在 JS 中所有的和时间相关的数据都由 Date 对象来表示
- 对象的方法：
  - getFullYear() 获取 4 位年份
  - getMonth() 返回当前日期的月份(0-11)
  - getDate() 返回当前是几日
  - getDay() 返回当前日期是周几(0-6) 0 表示周日
  - getTime() 返回当前日期对象的时间戳
    - 时间戳：自 1970 年 1 月 1 日 0 时 0 分 0 秒到当前时间所经历的毫秒数
    - 计算机底层存储时间时，使用的都是时间戳
  - Date.now() 获取当前的时间戳
- 直接通过 new Date()创建时间对象时，它创建的是当前的时间的对象
- 可以在 Date()的构造函数中，传递一个表示时间的字符串
- 字符串的格式：
  - 月/日/年 时:分:秒
  - 年-月-日 T 时:分:秒
- new Date(年份, 月, 日, 时, 分, 秒, 毫秒)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 直接通过new Date()创建时间对象时，它创建的是当前的时间的对象
      let date = new Date()

      // 可以在Date()的构造函数中，传递一个表示时间的字符串
      // 字符串的格式：
      //   月/日/年 时:分:秒
      //   年-月-日T时:分:秒
      date = new Date('12/20/2023 08:23:45')
      date = new Date('2023-10-01T12:23:52')

      // new Date(年份, 月, 日, 时, 分, 秒, 毫秒)
      date = new Date(2023, 6, 7, 13, 45, 34)

      date = new Date()

      result = date.getFullYear()
      result = date.getMonth()
      result = date.getDate()
      result = date.getDay()

      // result = date.getHours()
      // result = date.getMinutes()
      // result = date.getSeconds()
      // result = date.getMilliseconds()

      result = date.getTime()

      console.log(Date.now())
      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

## 日期的格式化

- toLocaleString()
  - 可以将一个日期转换为本地时间格式的字符串
  - 参数：
    - 描述语言和国家信息的字符串
      - zh-CN 中文中国
      - zh-HK 中文香港
      - en-US 英文美国
    - 需要一个对象作为参数，在对象中可以通过对象的属性来对日期的格式进行配置
      - dateStyle 日期的风格
      - timeStyle 时间的风格
        - full
        - long
        - medium
        - short
      - hour12 是否采用 12 小时制
        - true
        - false
      - weekday 星期的显示方式
        - long
        - short
        - narrow
      - year
        - numeric
        - 2-digit

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let date = new Date()

      // 将日期转换为本地的字符串
      let result = date.toLocaleDateString() // 2023/10/5

      // 将时间转换为本地的字符串
      result = date.toLocaleTimeString() // 15:40:27

      result = date.toLocaleString() // 2023/10/5 15:40:48

      result = date.toLocaleString('zh-CN', {
        // dateStyle: 'long',
        // timeStyle: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

## 包装类

- 在 JS 中，除了直接创建原始值外，也可以创建原始值的对象
  - 通过 new String() 可以创建 String 类型的对象
  - 通过 new Number() 可以创建 Number 类型的对象
  - 通过 new Boolean() 可以创建 Boolean 类型的对象
  - 但是千万不要这么做
- 包装类：
  - JS 中一共有 5 个包装类
    - String --> 字符串包装为 String 对象
    - Number --> 数值包装为 Number 对象
    - Boolean --> 布尔值包装为 Boolean 对象
    - BigInt --> 大整数包装为 BigInt 对象
    - Symbol --> 符号包装为 Symbol 对象
  - 通过包装类可以将一个原始值包装为一个对象，当我们对一个原始值调用方法或属性时，JS 解释器会临时将原始值包装为对应的对象，然后调用这个对象的属性或方法
  - 由于原始值会被临时转换为对应的对象，这就意味着对象中的方法都可以直接通过原始值来调用

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let str = new String('Hello')
      let num = new Number(10)
      let bool = new Boolean(true)
      let bool2 = new Boolean(true)

      // console.log(bool === bool2) // false

      let str2 = 'Hello'
      str2.name = '哈哈'

      let num2 = 20
      num2 = num2.toString()
      // console.log(num2)

      // null 不是包装类, 无法临时转换为一个对象
      // null.toString()
    </script>
  </head>
  <body></body>
</html>
```

## 字符串的方法

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- 字符串：
  - 字符串其本质就是一个字符数组
  - "hello" --> ["h", "e", "l", "l", "o"]
  - 字符串的很多方法都和数组是非常类似的

```txt
属性和方法：
  length 获取字符串的长度
  字符串[索引] 获取指定位置的字符
  str.at()
      - 根据索引获取字符，可以接受负索引
  str.charAt()
      - 根据索引获取字符
  str.concat()
      - 用来连接两个或多个字符串
  str.includes()
      - 用来检查字符串中是否包含某个内容
          有返回true
          没有返回false
      - 参数
          1. 要查询的字符
          2. 查询的起始索引
  str.indexOf()
  str.lastIndexOf()
      - 查询字符串中是否包含某个内容
  str.startsWith()
      - 检查一个字符串是否以指定内容开头
  str.endsWith()
      - 检查一个字符串是否以指定内容结尾
  str.padStart()
  str.padEnd()
      - 通过添加指定的内容，使字符串保持某个长度
  str.replace()
      - 使用一个新字符串替换一个指定内容
  str.replaceAll()
      - 使用一个新字符串替换所有指定内容
  str.slice()
      - 对字符串进行切片
  str.substring()
      - 截取字符串
  str.split()
      - 用来将一个字符串拆分为一个数组
  str.toLowerCase()
      - 将字符串转换为小写
  str.toUpperCase()
      - 将字符串转换为大写
  str.trim()
      - 去除前后空格
  str.trimStart()
      - 去除开始空格
  str.trimEnd()
      - 去除结束空格
```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let str = 'Hello JavaScript'

      let result = str.length
      result = str[0]
      result = str.at(-1)
      result = str.charAt(2)
      result = str.concat(' World')
      result = str.includes('a', 10) // false
      result = str.indexOf('a')
      result = str.lastIndexOf('a')
      result = str.startsWith('H') // true
      result = str.endsWith('a') // false

      str = '100'
      result = str.padStart(8, '6') // 66666100
      result = str.padEnd(8, '7') // 10077777

      str = 'Hello Hello How Are You'
      result = str.replace('Hello', 'Hi') // Hi Hello How Are You
      result = str.replaceAll('Hello', 'Hi') // Hi Hi How Are You
      result = str.slice(1, 3) // el
      result = str.substring(1, 3) // el
      result = str.substring(3, 1) // el
      result = str.substr(1, 3) //ell

      str = 'asd@efs@sfg'
      result = str.split('@') // ['asd', 'efs', 'sfg']
      // result = result.join('-') // asd-efs-sfg
      result = str.split('') // ['a', 's', 'd', '@', 'e', 'f', 's', '@', 's', 'f', 'g']

      str = 'Hello World'
      result = str.toLowerCase() //hello world
      result = str.toUpperCase() // HELLO WORLD

      str = '   ab  c   '
      result = str.trim()
      result = str.trimStart()
      result = str.trimEnd()

      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

- split()
  - 可以根据正则表达式来对一个字符串进行拆分
- search()
  - 可以去搜索符合正则表达式的内容第一次在字符串中出现的位置
  - 作用和 indexOf 类似, indexOf 不能使用正则表达式, 而 search 可以
- replace()
  - 根据正则表达式替换字符串中的指定内容
- match()
  - 根据正则表达式去匹配字符串中符合要求的内容
- matchAll()
  - 根据正则表达式去匹配字符串中符合要求的内容(必须设置 g 全局匹配)
  - 它返回的是一个迭代器
  - 和 reg.exec() 类似

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let str = 'a@b@c@d'

      let result = str.split('@')

      str = '孙悟空abc猪八戒adc沙和尚'

      result = str.split(/a[bd]c/)

      str = 'dajsdh13715678903jasdlakdkjg13457890657djashdjka13811678908sdadadasd'

      result = str.search(/1[3-9]\d{9}/) // 6

      result = str.replace(/1[3-9]\d{9}/g, '哈哈哈')

      result = str.match(/1[3-9]\d{9}/g) // ['13715678903', '13457890657', '13811678908']

      result = str.matchAll(/1[3-9](\d{9})/g)

      for (let item of result) {
        console.log(item)
      }

      // console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

## 正则表达式

- 正则表达式用来定义一个规则
- 通过这个规则计算机可以检查一个字符串是否符合规则，或者将字符串中符合规则的内容提取出来
- 正则表达式也是 JS 中的一个对象，所以要使用正则表达式，需要先创建正则表达式的对象
- new RegExp() 可以接收两个参数(字符串)
  - 正则表达式
  - 匹配模式
- 使用字面量来创建正则表达式：
  - /正则/匹配模式

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // new RegExp() 可以接收两个参数(字符串) 1.正则表达式 2.匹配模式
      // 通过构造函数来创建一个正则表达式的对象
      let reg = new RegExp('a', 'i')

      // 使用字面量来创建正则表达式：/正则/匹配模式
      reg = /a/i

      reg = /\w/

      reg = new RegExp('\\w')

      reg = new RegExp('a')

      let result = reg.test('a') // true
      result = reg.test('b') // false
      result = reg.test('abc') // true
      result = reg.test('cba') // true

      // /a/ 表示，检查一个字符串中是否有a
      reg = /a/

      console.log(reg)
    </script>
  </head>
  <body></body>
</html>
```

## 正则表达式的语法

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
- 在正则表达式中大部分字符都可以直接写
- | 在正则表达式中表示或
- [] 表示或(字符集)
  - \[a-z] 任意的小写字母
  - \[A-Z] 任意的大写字母
  - \[a-zA-Z] 任意的字母
  - \[0-9]任意数字
- \[^] 表示除了
  - \[^x] 除了 x
- . 表示除了换行外的任意字符
- 在正则表达式中使用\作为转义字符
- 其他的字符集
  - \\w 任意的单词字符 \[A-Za-z0-9\_]
  - \\W 除了单词字符 \[^A-Za-z0-9\_]
  - \\d 任意数字 \[0-9]
  - \\D 除了数字 \[^0-9]
  - \\s 空格
  - \\S 除了空格
  - \\b 单词边界
  - \\B 除了单词边界
- 开头和结尾
  - ^ 表示字符串的开头
  - $ 表示字符串的结尾
- 匹配模式 i 表示忽略大小写

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let reg = /ab/ // 匹配是否含有 ab
      let result = reg.test('abc') // true

      reg = /abc|def/ // 匹配是否含有 abc 或 def
      result = reg.test('abcd') // true
      result = reg.test('cdef') // true
      result = reg.test('bcde') // false

      reg = /[a-z]/
      reg = /[A-Z]/
      reg = /[a-zA-Z]/
      reg = /[a-z]/i // 匹配模式i表示忽略大小写

      reg = /[^a-z]/ // 匹配是否含有除了小写字母以外的字符串
      result = reg.test('c') // false
      result = reg.test('H') // true
      result = reg.test('aH') // true

      reg = /./ // 表示是否含有除了换行外的任意字符
      result = reg.test('\n') // false
      result = reg.test('\r') // false
      result = reg.test('#') // true

      reg = /\./ // 匹配是否含有 .
      result = reg.test('.') // true
      result = reg.test('.a') // true

      reg = /\w/ // 匹配是否含有任意的单词字符 [A-Za-z0-9_]
      result = reg.test('_') // true
      result = reg.test('-') // false
      result = reg.test('_-') // true

      reg = /^a/ // 匹配开始位置的a
      result = reg.test('abc') // true
      result = reg.test('cba') // false

      reg = /a$/ // 匹配结束位置的a
      result = reg.test('abc') // false
      result = reg.test('cba') // true

      reg = /^a$/ // 只匹配字母a，完全匹配，要求字符串必须和正则完全一致
      result = reg.test('aa') // false
      result = reg.test('a') // true

      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

## 正则表达式

- 量词
  - `{m}` 正好 m 个
  - `{m,}` 至少 m 个
  - `{m,n}` m-n 个
  - \+ 一个以上，相当于 `{1,}`
  - \* 任意数量，相当于 `{0,}`
  - ? 0-1 次，相当于 `{0,1}`

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let reg = /a{3}/

      let result = reg.test('aaa') // true
      result = reg.test('aa') // false

      reg = /ab{3}/

      result = reg.test('abbb') // true
      result = reg.test('ababab') // false

      reg = /(ab){3}/

      result = reg.test('ababab') // true

      reg = /^[a-z]{3}$/

      result = reg.test('abc') // true

      reg = /^[a-z]{1,}$/

      result = reg.test('') // false
      result = reg.test('a') // true
      result = reg.test('ab') // true

      reg = /^[a-z]{1,3}$/

      result = reg.test('') // false
      result = reg.test('a') // true
      result = reg.test('ab') // true
      result = reg.test('abc') // true
      result = reg.test('abcd') // false

      reg = /^[a-z]+$/
      reg = /^[a-z]*$/
      reg = /^[a-z]?$/

      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

- reg.exec()
  - 获取字符串中符合正则表达式的内容
- g 表示全局匹配

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let str = 'abcaecafcacc'

      // g 表示全局匹配
      // 使用 () 可以进行对字符串进行分组
      let reg = /a(([a-z])c)/gi

      let result = reg.exec(str)
      // console.log(result)

      while (result) {
        console.log(result[0], result[1], result[2])
        result = reg.exec(str)
      }
    </script>
  </head>
  <body></body>
</html>
```

## 练习

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // dajsdh13715678903jasdlakdkjg13457890657djashdjka13811678908sdadadasd

      let str = 'dajsdh13715678903jasdlakdkjg13457890657djashdjka13811678908sdadadasd'

      // let reg = /1[3-9]\d{9}/g
      // let reg = /1[3-9][0-9](\d{4})\d{4}/g
      let reg = /(1[3-9]\d)\d{4}(\d{4})/g

      let result = reg.exec(str)

      while (result) {
        // console.log(result[0].replace(result[0].substring(3, 7), '****'))
        // console.log(result[0], result[1])
        // console.log(result[0].replace(result[1], '****'))

        console.log(result[1] + '****' + result[2])

        result = reg.exec(str)
      }

      reg = /^1[3-9]\d{9}$/
    </script>
  </head>
  <body></body>
</html>
```

## 垃圾回收 (Garbage Collection)

- 和生活一样，生活时间长了以后会产生生活垃圾
- 程序运行一段时间后也会产生垃圾
- 在程序的世界中，什么是垃圾？
  - 如果一个对象没有任何的变量对其进行引用，那么这个对象就是一个垃圾
  - 垃圾对象的存在，会严重的影响程序的性能
  - 在 JS 中有自动的垃圾回收机制，这些垃圾对象会被解释器自动回收，我们无需手动处理
  - 对于垃圾回收来说，我们唯一能做的事情就是将不再使用的变量设置为 null

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let obj = { name: '孙悟空' }
      let obj2 = obj

      obj = null
      obj2 = null
    </script>
  </head>
  <body></body>
</html>
```
