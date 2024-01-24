---
sidebar_position: 12
---

# React

## Hello World

React 就是用来代替 DOM 的

`React.createElement()`

- 用来创建一个 React 元素
- 参数：
  - 元素名(组件名)
  - 元素中的属性
  - 元素的子元素(内容)

`ReactDOM.createRoot()`

- 用来创建 React 根元素，需要一个 DOM 元素作为参数

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入React的核心库 -->
    <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <!-- 引入React的DOM库 -->
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      // 通过DOM向页面中添加一个div
      // const div = document.createElement('div')
      // div.innerText = '我是一个div'
      // const root = document.getElementById('root')
      // root.appendChild(div)

      // 通过React向页面中添加一个div
      // 创建一个React元素
      const div = React.createElement('div', {}, '我是React创建的div')
      // 创建React根元素
      const root = ReactDOM.createRoot(document.getElementById('root'))
      // 将div渲染到根元素中
      root.render(div)
    </script>
  </body>
</html>
```
