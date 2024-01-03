---
sidebar_position: 3
---

# 运算符

## 算术运算符

- 运算符(操作符)
  - 运算符可以用来对一个或多个操作数(值)进行运算
  - 算术运算符：
    - 加法运算符
    - 减法运算符
    - 乘法运算符
    - / 除法运算符
    - \*\* 幂运算
    - % 模运算，两个数相除取余数
  - 注意：
    - 算术运算时，除了字符串的加法
    - 其他运算的操作数是非数值时，都会转换为数值然后再运算
    - JS 是一门弱类型语言，当进行运算时会通过自动的类型转换来完成运算
    - 当任意一个值和字符串做加法运算时，它会先将其他值转换为字符串，然后再做拼串的操作
    - 可以利用这一特点来完成类型转换
    - 可以通过为任意类型 + 一个空串的形式来将其转换为字符串
    - 其原理和 String()函数相同，但使用起来更加简洁

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = 10 + 4
      a = 10 - 4
      a = 10 * 4
      a = 10 / 4 // 2.5
      a = 10 ** 4 // 10000
      a = 10 % 4 // 2

      a = 5 - '1' // 4
      a = 5 - null // 5
      a = 5 - '' //5
      a = 5 - undefined // 5 - NaN = NaN

      a = 1 + '2' // '12'
      a = 1 + '' // '1'
      console.log(a)
    </script>
  </head>
  <body></body>
</html>
```

## 赋值运算符

- 赋值运算符用来将一个值赋值给一个变量

```txt
=
  - 将符号右侧的值赋值给左侧的变量
??=
  - 空赋值
  - 只有当变量的值为null或undefined时才会对变量进行赋值
+=
  - a += n 等价于 a = a + n
-=
  - a -= n 等价于 a = a - n
*=
  - a *= n 等价于 a = a * n
/=
  - a /= n 等价于 a = a / n
%=
  - a %= n 等价于 a = a % n
**=
  - a **= n 等价于 a = a ** n


a = 5 // 将右边的值 赋值 给左边的变量
let b = a // 一个变量只有在 = 左边时才是变量，在  =右边时它是值

a = a + 11 // 大部分的运算符都不会改变变量的值，赋值运算符除外

a = 5
a = a + 5 // 10
a += 5 // 在a原来值的基础上增加5
```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = 10
      a = 20
      a ??= 100 // a = 20

      a = null
      a ??= 200 // a = 200

      a = undefined
      a ??= 300 // a = 300

      let b = a
      console.log(a)
      console.log(b)
    </script>
  </head>
  <body></body>
</html>
```

## 一元的 ±

- 正号
  - 不会改变数值的符号
- 负号
  - 可以对数值进行符号位取反
- 当我们对非数值类型进行正负运算时，会先将其转换为数值然后再运算
- 可以利用这一特点将字符串类型的数字转换为数值型的数字

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = '10'
      a = +a
      // 等价于 a = Number(a)
      console.log(typeof a, a)
    </script>
  </head>
  <body></body>
</html>
```

## 自增和自减

- ++ 自增运算符
  - ++ 使用后会使得原来的变量立刻增加 1
  - 自增分为前自增(++a)和后自增(a++)
  - 无论是++a 还是 a++都会使原变量立刻增加 1
  - 不同的是++a 和 a++所返回的值不同
    - a++ 是自增前的值 旧值
    - ++a 是自增后的值 新值
- -- 自减运算符
  - 使用后会使得原来的变量立刻减小 1
  - 自减分为前自减(--a)和后自减(a--)
  - 无论是--a 还是 a--都会使原变量立刻减少 1
  - 不同的是--a 和 a--的值不同
    - --a 是新值
    - a-- 是旧值

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = 10
      // let b = a++
      // console.log('a++ = ', b) // 10
      // console.log('a = ', a) // 11

      let b = --a
      console.log('--a = ', b) // 9
      console.log('a = ', a) // 9

      let n = 5
      const result = n++ + ++n + n
      /* 
        过程: 
          n++  n++ = 5  n = 6
          ++n  ++n = 7  n = 7
          n  n = 7
          result = 5 + 7 + 7 = 19 
      */
      console.log(result) //19
    </script>
  </head>
  <body></body>
</html>
```

## 逻辑运算符

### ! 逻辑非

- ! 可以用来对一个值进行非运算
- 它可以对一个布尔值进行取反操作
  - true --> false
  - false --> true
- 如果对一个非布尔值进行取反，它会先将其转换为布尔值然后再取反
- 可以利用这个特点将其他类型转换为布尔值
- 类型转换
  - 转换为字符串
    - 显式转换
      - String()
    - 隐式转换
      - ""
  - 转换为数值
    - 显式转换
      - Number()
    - 隐式转换
      - \+
  - 转换为布尔值
    - 显式转换
      - Boolean()
    - 隐式转换
      - !!

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = true
      a = !a
      console.log(a) // false

      let b = 123
      b = !!b
      console.log(b) // true
    </script>
  </head>
  <body></body>
</html>
```

### && 逻辑与

- 可以对两个值进行与运算
- 当&&左右都为 true 时，则返回 true，否则返回 false
- 与运算是短路的与，如果第一个值为 false，则不看第二个值
- 与运算是找 false 的，如果找到 false 则直接返回，没有 false 才会返回 true
- 对于非布尔值进行与运算，它会转换为布尔值然后运算
  - 但是最终会返回原值
  - 如果第一个值为 false，则直接返回第一个值
  - 如果第一个值为 true，则返回第二个值

### || 逻辑或

- 可以对两个值进行或运算
- 当||左右有 true 时，则返回 true，否则返回 false
- 或运算也是短路的或，如果第一个值为 true，则不看第二个值
- 或运算是找 true，如果找到 true 则直接返回，没有 true 才会返回 false
- 对于非布尔值或运算，它会转换为布尔值然后运算
  - 但是最终会返回原值
  - 如果第一个值为 true，则返回第一个
  - 如果第一个值为 false，则返回第二个

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let result = true && true // true
      result = true && false // false
      result = false && true // false
      result = false && false // false

      // true && alert(123)
      false && alert(123)

      result = 1 && 2 // 2
      result = 1 && 0 // 0
      result = 0 && NaN // 0

      result = true || true // true
      result = true || false // true
      result = false || true // true
      result = false || false // false

      // false || alert(123)
      true || alert(123)

      result = 1 || 2 // 1
      result = 0 || 1 // 1
      result = NaN || null // null

      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

## 关系运算符

- 关系运算符用来检查两个值之间的关系是否成立
- 成立返回 true，不成立返回 false
  - \>
    - 用来检查左值是否大于右值
  - \>=
    - 用来检查左值是否大于或等于右值
  - `<`
    - 用来检查左值是否小于右值
  - `<=`
    - 用来检查左值是否小于或等于右值
- 注意：
  - 当对非数值进行关系运算时，它会先将其转换为数值然后再比较
  - 当关系运算符的两端是两个字符串，它不会将字符串转换为数值，而是逐位的比较字符的 Unicode 编码
  - 利用这个特点可以对字符串按照字母排序
  - 注意比较两个字符串格式的数字时一定要进行类型转换

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let result = 10 > 5
      result = 5 > 5
      result = 5 >= 5

      result = 5 < '10' // true
      result = 1 < false // false

      result = 'a' < 'b' // true
      result = 'abc' < 'b' // true
      result = '12' < '2' // true
      result = +'12' < '2'

      let num = 6
      result = num > 5 && num < 10

      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

## 相等运算符

- ==
  - 相等运算符，用来比较两个值是否相等
  - 使用相等运算符比较两个不同类型的值时，它会将其转换为相同的类型(通常转换为数值)然后再比较
  - 类型转换后值相同也会返回 true
  - null 和 undefined 进行相等比较时会返回 true
  - NaN 不和任何值相等，包括它自身
- ===
  - 全等运算符，用来比较两个值是否全等
  - 它不会进行自动的类型转换，如果两个值的类型不同直接返回 false
  - null 和 undefined 进行全等比较时会返回 false
- !=
  - 不等，用来检查两个值是否不相等
  - 会自动的进行类型转换
- !==
  - 不全等，比较两个值是否不全等
  - 不会自动的类型转换

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let result = 1 == 1 // true
      result = 1 == '1' // true
      result = 1 == true // true

      result = null == undefined // true
      result = NaN == NaN // false

      result = 1 === '1' // false
      result = null === undefined // false
      result = NaN === NaN // false

      result = 1 != 1 // false
      result = 1 != '1' // false
      result = 1 !== '1' // true

      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```

## 条件运算符

- 条件表达式 ? 表达式 1 : 表达式 2
- 执行顺序：
  - 条件运算符在执行时，会先对条件表达式进行求值判断
  - 如果结果为 true，则执行表达式 1
  - 如果结果为 false，则执行表达式 2

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const a = 10
      const b = 20

      const max = a > b ? a : b
      console.log(max)
    </script>
  </head>
  <body></body>
</html>
```

## 运算符的优先级

- 和数学一样，JS 中的运算符也有优先级，比如先乘除后加减
- 可以通过优先级的表格来查询运算符的优先级
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
- 在表格中位置越靠上的优先级越高，优先级越高越先执行，优先级一样自左向右执行
- 优先级我们不需要记忆，甚至表格都不需要看
- 因为()拥有最高的优先级，使用运算符时，如果遇到拿不准的，可以直接通过()来改变优先级即可

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const result = (1 && 2) || 3
      console.log(result)
    </script>
  </head>
  <body></body>
</html>
```
