---
sidebar_position: 7
---

# 构建工具

- 当我们习惯了在 node 中编写代码的方式后，再回到前端编写 HTML、CSS、JS 这些东西会感觉到各种的不便。比如：不能放心的使用模块化规范(浏览器兼容性问题)、即使可以使用模块化规范也会面临模块过多时的加载问题
- 我们就迫切的希望有一款工具可以对代码进行打包，将多个模块打包成一个文件。这样一来即解决了兼容性问题，又解决了模块过多的问题
- 构建工具就起到这样一个作用，通过构建工具可以将使用 ESM 规范编写的代码转换为旧的 JS 语法，这样可以使得所有的浏览器都可以支持代码

## webpack

使用步骤：

1. 初始化项目 `yarn init -y`
2. 安装开发依赖 `yarn add webpack webpack-cli -D`
3. 在项目中创建 `src` 目录，然后编写代码(index.js)
4. 执行 `yarn webpack` 来对代码进行打包(打包后观察 dist 目录)

配置文件(webpack.config.js)

使用哪种模块化方式简单记忆：

- src 内的文件遵循 ES 模块化规范，src 外的文件遵循 CommonJS 模块化规范

### loader

webpack 默认情况下，只会处理 js 文件，如果我们希望它可以处理其他类型的文件，则要为其引入 loader

- 以 css 为例：

  - 使用 css-loader 可以处理 js 中的样式
  - 使用步骤：

    - 安装：`yarn add css-loader style-loader -D`
    - 配置：webpack.config.js

```js
const path = require('node:path')

module.exports = {
  // mode 设置打包的模式，production表示生产模式，development表示开发模式
  mode: 'production',

  // entry 用来指定打包时的主文件 默认为 ./src/index.js
  // entry: './src/hello.js',
  // entry: ['./src/a.js', './src/b.js'],
  // entry: {
  //   test01: './src/a.js',
  //   test02: './src/b.js'
  // },

  // output 配置代码打包后的地址
  output: {
    // path 指定打包的目录，必须要绝对路径，默认为dist目录
    // path: path.resolve(__dirname, './hello'),
    // filename 指定打包后的文件名，默认为main.js
    // filename: 'abc.js',
    // filename: '[name]-[id]-[hash].js',
    // clean 自动清理打包目录
    // clean: true
  },

  module: {
    rules: [
      {
        test: /\.css/i,
        // 注意书写顺序，loader是从后往前执行，写在后面的loader先执行
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // 图片这些资源类型的数据，可以通过指定type来处理
        type: 'asset/resource',
      },
    ],
  },
}
```

- 在编写 js 代码时，经常需要使用一些 js 中的新特性，而新特性在旧的浏览器中兼容性并不好。此时就导致我们无法使用一些新的特性
- 但是我们现在希望能够使用新的特性，我们可以采用折中的方案。依然使用新特性编写代码，但是代码编写完成时我们可以通过一些工具将新代码转换为旧代码
- babel 就是这样一个工具，可以将新的 js 语法转换为旧的 js，以提高代码的兼容性
  我们如果希望在 webpack 支持 babel，则需要向 webpack 中引入 babel 的 loader

- 使用步骤

  - 安装 `npm install -D babel-loader @babel/core @babel/preset-env`
  - 配置：webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          // 使用babel进行语法降级
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
}
```

在 package.json 中设置兼容列表

```json
"browserslist": [
  "defaults"
]
```

https://github.com/browserslist/browserslist

### 插件(plugin)

- 插件用来为 webpack 扩展功能
- html-webpack-plugin

  - 这个插件可以在打包代码后，自动在打包目录生成 html 页面
  - 使用步骤：

    - 安装依赖 `yarn add html-webpack-plugin -D`
    - 配置插件：webpack.config.js

```js
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  // 配置插件
  plugins: [
    new HTMLPlugin({
      // title 设置HTML的title
      // title: 'Hello Webpack',

      // template 设置HTML的模板路径
      template: './src/index.html',
    }),
  ],
}
```

当文件发生变化时，自动重新构建

- `yarn webpack --watch`

### 开发服务器(webpack-dev-server)

- 安装：
  - `yarn add -D webpack-dev-server`
- 启动：
  - `yarn webpack serve` 启动开发服务器
  - `yarn webpack serve --open` 启动开发服务器，并自动在浏览器中打开
- 配置：webpack.config.js

```js
module.exports = {
  // 配置源码的映射
  // 运行的是打包后的代码
  // 调试时可以对源码进行调试
  devtool: 'inline-source-map',
}
```

### webpack.config.js 的完整配置

```js
const path = require('node:path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  // mode 设置打包的模式，production表示生产模式，development表示开发模式
  mode: 'development',

  // entry 用来指定打包时的主文件 默认为 ./src/index.js
  // entry: './src/hello.js',
  // entry: ['./src/a.js', './src/b.js'],
  // entry: {
  //   test01: './src/a.js',
  //   test02: './src/b.js'
  // },

  // output 配置代码打包后的地址
  output: {
    // path 指定打包的目录，必须要绝对路径，默认为dist目录
    // path: path.resolve(__dirname, './hello'),
    // filename 指定打包后的文件名，默认为main.js
    // filename: 'abc.js',
    // filename: '[name]-[id]-[hash].js',
    // clean 自动清理打包目录
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css/i,
        // 注意书写顺序，loader是从后往前执行，写在后面的loader先执行
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // 图片这些资源类型的数据，可以通过指定type来处理
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          // 使用babel进行语法降级
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },

  // 配置插件
  plugins: [
    new HTMLPlugin({
      // title 设置HTML的title
      // title: 'Hello Webpack',

      // template 设置HTML的模板路径
      template: './src/index.html',
    }),
  ],

  // 配置源码的映射
  // 运行的是打包后的代码
  // 调试时可以对源码进行调试
  devtool: 'inline-source-map',
}
```

## Vite

- Vite 也是前端的构建工具
- 相较于 webpack，vite 采用了不同的运行方式：
  - 开发时，并不对代码进行打包，而是直接采用 ES 模块的方式来运行项目
  - 在项目部署时，再对代码进行打包
- 除了速度外，vite 使用起来也更加方便
- 基本使用：
  - 安装开发依赖 `yarn add vite -D`
  - vite 的源码目录就是项目根目录
  - 开发命令：
    - `yarn vite` 启动开发服务器
    - `yarn vite --open` 启动开发服务器，并自动打开浏览器
    - `yarn vite build` 打包代码
    - `yarn vite preview` 预览打包后的代码
- 使用命令构建：
  - `npm create vite@latest`
  - `yarn create vite`
  - `pnpm create vite`
- 配置文件：`vite.config.js`

  - 语法降级：`yarn add -D @vitejs/plugin-legacy terser`
  - 配置：vite.config.js

```js
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

// defineConfig 用来提示代码的
export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'ie 11'],
    }),
  ],
})
```
