---
sidebar_position: 1
---

# 入门

## 输出语句

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      alert('111')
      console.log('222')
      document.write('333')
    </script>
  </head>
  <body></body>
</html>
```

## 编写位置

- 可以将 js 编写到网页内部的 script 标签
- 可以将 js 编写到外部的 js 文件中，然后通过 script 标签进行引入
- 可以将 js 代码编写到指定属性中

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <script>
      alert('111')
    </script>

    <script type="text/javascript">
      alert('222')
    </script>

    <script src="./script/script.js"></script>
  </head>
  <body>
    <button onclick="alert('333')">点我一下</button>

    <a href="javascript:alert('444');">超链接1</a>

    <a href="javascript:;">超链接2</a>
  </body>
</html>
```

## 基本语法

- 多行注释(Ctrl+Alt+A)
  - 注释中的内容会被解释器忽略
  - 可以通过注释来对代码进行解释说明
  - 也可以通过注释来注释掉不想执行的代码
- 单行注释(Ctrl+/)
- JS 严格区分大小写
- 在 JS 中多个空格和换行会被忽略
  - 可以利用这个特点来对代码进行格式化
- JS 中每条语句都应该以分号结尾
  - JS 中具有自动添加分号的机制，所以如果不写分号解释器会自动添加

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      /* 
        多行注释
        多行注释
        多行注释
      */

      // 单行注释

      console.log('111')
      console.log('222')
    </script>
  </head>
  <body></body>
</html>
```

## 字面量和变量

### 字面量

- 字面量其实就是一个值，它所代表的含义就是它字面的意思
- 比如：1 "hello" true null ......
- 在 js 中所有的字面量都可以直接使用，但是直接使用字面量并不方便

### 变量

- 变量可以用来“存储”字面量
- 并且变量中存储的字面量可以随意的修改
- 通过变量可以对字面量进行描述，并且变量比较方便修改
- 变量的使用：
  - 声明变量：let 变量名 / var 变量名
  - 变量赋值：a = xx
  - 声明和赋值同时进行：let 变量 = 值

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let name = '孙悟空'
      let age = 18
    </script>
  </head>
  <body></body>
</html>
```

## 变量的内存结构

- 变量中并不存储任何值，而是存储值的内存地址！

[JS001.png](../../static/img/JS001.png)

## 常量

- 在 JS 中，使用 const 声明常量，常量只能赋值一次，重复赋值会报错
- 在 JS 中除了常规的常量外，有一些对象类型的数据我们也会声明为常量

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const PI = 3.1415926
    </script>
  </head>
  <body></body>
</html>
```

## 标识符

- 在 JS 中，所有可以由我们自主命名的内容，都可以认为是一个标识符
- 像 变量名 函数名 类名 ......
- 使用标识符需要遵循如下的命名规范：
  - 标识符只能含有字母、数字、下划线、$，且不能以数字开头
  - 标识符不能是 JS 中的关键字和保留字，也不建议使用内置的函数或类名作为变量名
  - 命名规范：
    - 通常会使用驼峰命名法
      - 首字母小写，每个单词开头大写
      - maxlength --> maxLength
      - borderleftwidth --> borderLeftWidth
    - 类名会使用大驼峰命名法
    - 首字母大写, 每个单词开头大写
    - maxlength --> MaxLength
    - 常量的字母会全部大写
      - MAX_LENGTH

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      const $name = '孙悟空'
      const age_ = 18
    </script>
  </head>
  <body></body>
</html>
```
