---
sidebar_position: 4
---

# 流程控制

## 代码块

- 使用 {} 来创建代码块，代码块可以用来对代码进行分组
- 同一个代码中的代码，就是同一组代码，一个代码块中的代码要么都执行要么都不执行
- let 和 var
  - 在 JS 中，使用 let 声明的变量具有块作用域
  - 在代码块中声明的变量无法在代码块的外部访问
  - 使用 var 声明的变量，不具有块作用域

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      {
        let a = 10
      }

      // console.log(a) 外部无法访问到代码块中的变量 a

      {
        var b = 20
      }

      // var 声明的变量不具有块作用域
      console.log(b) // 20
    </script>
  </head>
  <body></body>
</html>
```

## if 语句

- 流程控制语句可以用来改变程序执行的顺序
  - 条件判断语句
  - 条件分支语句
  - 循环语句
- if 语句
  - 语法：
    ```js
    if(条件表达式){
      语句...
    }
    ```
  - 执行流程
    - if 语句在执行会先对 if 后的条件表达式进行求值判断
      - 如果结果为 true，则执行 if 后的语句
      - 如果为 false 则不执行
    - if 语句只会控制紧随其后的那一行代码，如果希望可以控制多行代码，可以使用{}将语句扩起来
    - 最佳实践：即使 if 后只有 1 行代码，我们也应该编写代码块，这样结构会更加的清晰
    - 如果 if 后的条件表达式不是布尔值，会转换为布尔值然后再运算

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let a = 10

      if (a > 5) {
        console.log('a比5大')
      }

      if (100) {
        console.log('Hello')
      }
    </script>
  </head>
  <body></body>
</html>
```

## if-else 语句

- 语法：
  ```js
  if(条件表达式){
    语句...
  }else{
    语句...
  }
  ```
- 执行流程：
  - if-else 执行时，先对条件表达式进行求值判断
  - 如果结果为 true 则执行 if 后的语句
  - 如果结果为 false 则执行 else 后的语句

## if else-if else 语句

- 语法：
  ```js
  if(条件表达式){
    语句...
  }else if(条件表达式){
    语句...
  }else if(条件表达式){
    语句...
  }else{
    语句...
  }
  ```
- 执行流程：
  - if-else if-else 语句，会自上向下依次对 if 后的条件表达式进行求值判断
  - 如果条件表达式结果为 true，则执行当前 if 后的语句，执行完毕语句结束
  - 如果条件表达式结果为 false，则继续向下判断，直到找到 true 为止如果所有的条件表达式都是 false，则执行 else 后的语句
- 注意：
  - if-else if-else 语句中只会有一个代码块被执行
  - 一旦有执行的代码块，下边的条件都不会在继续判断了
  - 所以一定要注意，条件的编写顺序
- prompt() 可以用来获取用户输入的内容
- 它会将用户输入的内容以字符串的形式返回，可以通过变量来接收
- Number.isNaN() 可以用来判断一个值是否是 NaN

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let age = 36

      // if (age >= 60) {
      //   console.log('你已经退休了！')
      // } else {
      //   console.log('你还没有退休！')
      // }

      if (age >= 100) {
        console.log('你真是一个长寿的人！')
      } else if (age >= 80) {
        console.log('你比楼上那位还年轻不小！')
      } else if (age >= 60) {
        console.log('你已经退休了！')
      } else if (age >= 30) {
        console.log('你已经步入中年了！')
      } else if (age >= 18) {
        console.log('你已经成年了！')
      } else {
        console.log('你还未成年！')
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习 1

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 编写一个程序，获取一个用户输入的整数。然后通过程序显示这个数是奇数还是偶数
      let num = +prompt('请输入一个整数')
      // let num = parseInt(prompt('请输入一个整数'))

      // 判断一个数是否是小数, 简易判断
      // num % 1 > 0 && num % 1 < 1

      if (Number.isNaN(num) || (num % 1 > 0 && num % 1 < 1)) {
        alert('请输入一个整数')
      } else {
        if (num % 2 === 0) {
          alert(`${num}是偶数`)
        } else {
          alert(`${num}是奇数`)
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习 2

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      /* 
        从键盘输入小明的期末成绩:
          当成绩为100时，'奖励一辆BMW'
          当成绩为[80-99]时，'奖励一台iphone'
          当成绩为[60-79]时，'奖励一本参考书'
          其他时，什么奖励也没有
      */

      let score = +prompt('请输入小明的期末成绩')

      if (Number.isNaN(score) || score < 0 || score > 100) {
        alert('请输入正确的期末成绩')
      } else {
        if (score === 100) {
          alert('奖励一辆BMW')
        } else if (score >= 80) {
          alert('奖励一台iphone')
        } else if (score >= 60) {
          alert('奖励一本参考书')
        } else {
          alert('没有奖励')
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习 3

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      /* 
        大家都知道，男大当婚，女大当嫁。那么女方家长要嫁女儿，当然要提出一定的条件：
          高：180cm以上; 富:1000万以上; 帅:500以上;
          如果这三个条件同时满足，则:'我一定要嫁给他'
          如果三个条件有为真的情况，则:'嫁吧，比上不足，比下有余。'
          如果三个条件都不满足，则:'不嫁！'
      */

      let height = +prompt('请输入你的身高(厘米)')
      let money = +prompt('请输入你的财富(万)')
      let handsome = +prompt('请输入你的颜值(像素)')

      if (height > 180 && money > 1000 && handsome > 500) {
        alert('我一定要嫁给他')
      } else if (height > 180 || money > 1000 || handsome > 500) {
        alert('嫁吧，比上不足，比下有余')
      } else {
        alert('不嫁！')
      }
    </script>
  </head>
  <body></body>
</html>
```

## switch 语句

- 语法：
  ```js
  switch(表达式){
    case 表达式:
      代码...
      break
    case 表达式:
      代码...
      break
    case 表达式...
      代码...
      break
    default:
      代码...
      break
  }
  ```
- 执行的流程
  - switch 语句在执行时，会依次将 switch 后的表达式和 case 后的表达式进行全等比较
  - 如果比较结果为 true，则自当前 case 处开始执行代码
  - 如果比较结果为 false，则继续比较其他 case 后的表达式，直到找到 true 为止
  - 如果所有的比较都是 false，则执行 default 后的语句
- 注意：
  - 当比较结果为 true 时，会从当前 case 处开始执行代码
  - 也就是说 case 是代码执行的起始位置
  - 这就意味着只要是当前 case 后的代码，都会执行
  - 可以使用 break 来避免执行其他的 case
- 总结
  - switch 语句和 if 语句的功能是重复，switch 能做的事 if 也能做，反之亦然
  - 它们最大的不同在于，switch 在多个全等判断时，结构比较清晰

## 循环语句

- 通过循环语句可以使指定的代码反复执行
- JS 中一共有三种循环语句
  - while 语句
  - do-while 语句
  - for 语句

## while 语句

- 语法：
  ```js
  while(条件表达式){
    语句...
  }
  ```
- 执行流程：
  - while 语句在执行时，会先对条件表达式进行判断
  - 如果结果为 true，则执行循环体，执行完毕，继续判断
  - 如果为 true，则再次执行循环体，执行完毕，继续判断，如此重复
  - 直到条件表达式结果为 false 时，循环结束
- 当一个循环的条件表达式恒为 true 时，这个循环就是一个死循环，会一直执行(慎用)
- 通常编写一个循环，要有三个要件
  - 初始化表达式(初始化变量)
  - 条件表达式(设置循环运行的条件)
  - 更新表达式(修改初始化变量)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let num = 0

      while (num < 5) {
        console.log(num)
        num++
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 练习: 假设银行存款的年利率为5%，问1000块存多少年可以变成5000块
      let money = 1000
      let year = 0

      while (money < 5000) {
        money *= 1.05
        year++
      }

      console.log(year)
    </script>
  </head>
  <body></body>
</html>
```

## do while 循环

- 语法：
  ```js
  do{
    语句...
  }while(条件表达式)
  ```
- 执行顺序：
  - do-while 语句在执行时，会先执行 do 后的循环体，执行完毕后，会对 while 后的条件表达式进行判断
  - 如果为 false，则循环终止
  - 如果为 true，则继续执行循环体，以此类推
- 和 while 的区别：
  - while 语句是先判断再执行
  - do-while 语句是先执行再判断
  - 实质的区别：
    - do-while 语句可以确保循环至少执行一次

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let i = 0

      do {
        console.log(i)
        i++
      } while (i < 5)
    </script>
  </head>
  <body></body>
</html>
```

## for 循环

- for 循环和 while 没有本质区别，都是用来反复执行代码
- 不同点就是语法结构，for 循环更加清晰
- 语法：
  ```js
  for(1.初始化表达式; 2.条件表达式; 4.更新表达式){
    3.语句...
  }
  ```
- 执行流程：
  - 执行初始化表达式，初始化变量
  - 执行条件表达式，判断循环是否执行(true 执行，false 终止)
  - 判断结果为 true，则执行循环体
  - 执行更新表达式，对初始化变量进行修改
  - 重复 ②，知道判断为 false 为止
- 注意点：
  - 初始化表达式，在循环的整个的生命周期中只会执行 1 次
  - for 循环中的三个表达式都可以省略
  - 使用 let 在 for 循环的()中声明的变量是局部变量，只能在 for 循环内部访问
  - 使用 var 在 for 循环的()中声明的变量可以在 for 循环的外部访问
- 创建死循环的方式：
  - while(1){}
  - for(;;){}

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      for (let i = 0; i < 5; i++) {
        console.log(i)
      }

      // console.log(i)

      // for (;;) {
      //   alert(1)
      // }

      // let i = 0
      // for (; i < 5; ) {
      //   console.log(i)
      //   i++
      // }
    </script>
  </head>
  <body></body>
</html>
```

### 练习 1

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 练习1: 求100以内所有3的倍数(求它们个数和总和)

      // let count = 0
      // let sum = 0

      // for (let i = 1; i <= 100; i++) {
      //   if (i % 3 === 0) {
      //     count++
      //     sum += i
      //   }
      // }

      let count = 0
      let sum = 0

      for (let i = 3; i <= 100; i += 3) {
        count++
        sum += i
      }

      console.log(count, sum)
    </script>
  </head>
  <body></body>
</html>
```

### 练习 2

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 求 1000 以内的水仙花数
      //   - 水仙花数
      //   - 一个n位数(n >= 3)，如果它各个位上数字的n次幂之和还等于这个数，那么这个数就是一个水仙花数
      //   - 153 --> 1  5  3 --> 1  125  27 --> 153

      // for (let i = 100; i < 1000; i++) {
      //   // 百位数
      //   let a = parseInt(i / 100)
      //   // 十位数
      //   let b = parseInt(i / 10) % 10
      //   // 个位数
      //   let c = i % 10

      //   if (a ** 3 + b ** 3 + c ** 3 === i) {
      //     console.log(i)
      //   }
      // }

      for (let i = 100; i < 1000; i++) {
        let strI = i + ''

        if (strI[0] ** 3 + strI[1] ** 3 + strI[2] ** 3 === i) {
          console.log(i)
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习 3

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      /* 
        获取用户输入的大于1的整数(暂时不考虑输错的情况)
            然后编写代码检查这个数字是否是质数，并打印结果

        质数
            - 一个数如果只能被1和它本身整除，那么这个数就是质数
            - 1既不是质数也不是合数
      */

      let num = +prompt('请输入一个大于1的整数')
      let flag = false

      for (let i = 2; i < num; i++) {
        if (num % i === 0) {
          flag = true
        }
      }

      if (flag) {
        alert('不是质数')
      } else {
        alert('是质数')
      }
    </script>
  </head>
  <body></body>
</html>
```

## 嵌套循环

- 在循环中也可以嵌套其他的循环
- 当循环发生嵌套时，外层循环每执行一次，内层循环就会执行一个完整的周期

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      //  ****
      //  ****
      //  ****
      //  ****
      //  ****

      // 外层循环控制高度
      for (let i = 0; i < 5; i++) {
        // 内层循环控制宽度
        for (let j = 0; j < 4; j++) {
          document.write('*&nbsp;&nbsp;')
        }
        document.write('<br>')
      }

      document.write('---------------<br>')

      // *      i = 0  j < 1
      // **     i = 1  j < 2
      // ***    i = 2  j < 3
      // ****   i = 3  j < 4
      // *****  i = 4  j < 5

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < i + 1; j++) {
          document.write('*')
        }
        document.write('<br>')
      }

      document.write('---------------<br>')

      // *****  i = 0  j < 5
      // ****   i = 1  j < 4
      // ***    i = 2  j < 3
      // **     i = 3  j < 2
      // *      i = 4  j < 1

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5 - i; j++) {
          document.write('*')
        }
        document.write('<br>')
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习 1

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      span {
        display: inline-block;
        width: 100px;
      }
    </style>
    <script>
      /*
        练习：
          在网页中打印99乘法表
          1x1=1
          1x2=2 2x2=4
          1x3=3 2x3=6 3x3=9
          ......
                              9x9=81
      */

      for (let i = 1; i < 10; i++) {
        for (let j = 1; j < i + 1; j++) {
          document.write(`<span>${j} x ${i} = ${j * i}</span>`)
        }
        document.write('<br>')
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习 2

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 练习: 编写代码，求100以内所有的质数

      for (let i = 2; i < 101; i++) {
        let flag = true

        for (let j = 2; j < i; j++) {
          if (i % j === 0) {
            flag = false
          }
        }

        if (flag) {
          console.log(i)
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

## break 和 continue

- break
  - break 用来终止 switch 和循环语句
  - break 执行后，当前的 switch 或循环会立刻停止
  - break 会终止离他最近的循环
- continue
  - continue 用来跳过当次循环

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // for (let i = 0; i < 5; i++) {
      //   if (i === 3) {
      //     break
      //   }
      //   console.log(i) // 0 1 2
      // }

      // for (let i = 0; i < 5; i++) {
      //   if (i === 3) {
      //     continue
      //   }
      //   console.log(i) // 0 1 2 4
      // }

      // for (let i = 0; i < 5; i++) {
      //   console.log(i)
      //   for (let j = 0; j < 5; j++) {
      //     if (j === 3) {
      //       break
      //     }
      //     console.log('内层循环-->', j)
      //   }
      // }

      for (let i = 0; i < 5; i++) {
        console.log(i)
        for (let j = 0; j < 5; j++) {
          if (j === 3) {
            continue
          }
          console.log('内层循环-->', j)
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

### 练习

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // 开启一个默认计时器
      // console.time()

      console.time('优化质数练习')

      /* 
        优化前:
          1. 10000    76ms
          2. 100000   10541ms

        第一次优化: 加 break
          1. 10000    8ms
          2. 100000   695ms
          3. 1000000  58286ms

        第一次优化: 加 break
          1. 10000    1ms
          2. 100000   6ms
          3. 1000000  123ms
          3. 10000000 3079ms
      */

      for (let i = 2; i < 10000000; i++) {
        let flag = true

        for (let j = 2; j <= i ** 0.5; j++) {
          if (i % j === 0) {
            flag = false
            break
          }
        }

        if (flag) {
          // console.log(i)
        }
      }

      // 关闭默认计时器
      // console.timeEnd()

      console.timeEnd('优化质数练习')
    </script>
  </head>
  <body></body>
</html>
```
