---
sidebar_position: 1
---

# 简介

## 简介

- vue 是一个前端的框架，主要负责帮助我们构建用户的界面
- MVVM：Model - View - View Model
- vue 负责 vm 的工作(视图模型)，通过 vue 可以将视图和模型相关联
  - 当模型发生变化时，视图会自动更新
  - 也可以通过视图去操作模型
- vue 思想：
  - 组件化开发
  - 声明式的编程(结果导向)
  - 扩展
    - 与声明式编程对应的是命令式编程，命令式编程是过程导向的

## 直接在网页中使用

### HelloWorld

- 创建一个根组件，在 vue3 中组件就是一个普通的 js 对象
- 组件用来创建组件实例，组件是组件实例的模板
- 组件 --> 组件生成组件实例 --> 虚拟 DOM --> DOM(在页面中呈现)
- 模板：希望组件在页面中呈现的样子

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>

    <script>
      // 编写vue代码
      // 创建一个根组件，在vue3中组件就是一个普通的js对象
      // 组件用来创建组件实例，组件是组件实例的模板
      // 组件 --> 组件生成组件实例 --> 虚拟DOM --> DOM(在页面中呈现)
      const Root = {
        template: '<h1>Vue</h1>', // 模板：希望组件在页面中呈现的样子
      }

      // 创建app实例
      const app = Vue.createApp(Root)

      // 将实例在页面中挂载
      app.mount('#app')
    </script>
  </body>
</html>
```

### 组件中的 data

- data 是一个函数，需要一个对象作为返回值
- data 方法返回的对象，其中的属性会自动添加到组件实例中
- 在模板中可以直接访问组件实例中的属性
- 在模板中可以通过 `{{属性名}}` 来访问到组件实例中的属性

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>

    <script>
      const Root = {
        // data是一个函数，需要一个对象作为返回值
        // data方法返回的对象，其中的属性会自动添加到组件实例中
        data() {
          return {
            message: 'Vue',
          }
        },
        // 在模板中可以直接访问组件实例中的属性
        // 在模板中可以通过 {{属性名}} 来访问到组件实例中的属性
        template: '<h1>Hello {{message}}</h1>',
      }

      const app = Vue.createApp(Root)
      app.mount('#app')
    </script>
  </body>
</html>
```

### 按钮的案例

- 组件是用来创建组件实例的(vm)
- data 中的数据会自动和使用它的视图绑定，数据发生变化视图会自动刷新

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>

    <script>
      // 组件是用来创建组件实例的(vm)
      // data中的数据会自动和使用它的视图绑定，数据发生变化视图会自动刷新
      const Root = {
        data() {
          return {
            count: 0,
          }
        },
        template: '<button @click="count++">点我一下</button> 点了{{count}}次',
      }

      const app = Vue.createApp(Root)
      app.mount('#app')
    </script>
  </body>
</html>
```

### 模板

- template 是模板，它决定了组件最终的样子
- 定义模板的方式有三种：
  - 在组件中通过 template 属性去指定
    - 如果在组件中定义 template，则会优先使用 template 作为模板，同时根元素中的所有内容，都会被替换
    - 如果在组件中没有定义 template，则会使用根元素的 innerHTML 作为模板使用
  - 直接在网页的根元素中指定
    - 如果直接将模板定义到网页中，此时模板必须符合 html 的规范(大写会自动转为小写) My-Button -> my-button
  - 组件中通过 render()直接渲染

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入Vue -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- <button @click="count++">点我一下</button> 点了{{count}}次 -->
      <p>111</p>
    </div>

    <script>
      const Root = {
        data() {
          return {
            count: 0,
          }
        },
        template: '<button @click="count++">点我一下</button> 点了{{count}}次',
      }

      const app = Vue.createApp(Root)
      app.mount('#app')
    </script>
  </body>
</html>
```

## 使用 Vite

### HelloVue

- 这里引入的 vue，默认不支持通过 template 属性来设置模板

**index.js**

```js
// 这里如果引入vue，默认不支持通过template属性来设置模板，需要改为vue/dist/vue.esm-bundler.js
import { createApp } from 'vue/dist/vue.esm-bundler.js'

// 创建一个根组件
const App = {
  data() {
    return {
      message: 'Hello Vue',
    }
  },
  template: '<h1>{{message}}</h1>',
}

const app = createApp(App)
app.mount('#app')
```

### HelloVue

- mount()的返回值是根组件的实例
- 模版直接写到网页中，组件名称必须全部小写(不推荐)

**index.js**

```js
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App'

const app = createApp(App)

// mount()的返回值是根组件的实例
const vm = app.mount('#app')
// console.log(vm)
```

**App.js**

```js
import MyButton from './components/MyButton'

export default {
  data() {
    return {
      message: 'Hello',
      count: 0,
    }
  },
  // 在组件中注册子组件
  components: {
    MyButton,
    // 模版直接写到网页中，组件名称必须全部小写
    // 'my-button': MyButton,
  },
  template: `
    <h1>{{message}}</h1>
    <MyButton></MyButton>
    <MyButton></MyButton>
    <MyButton></MyButton>
  `,
}
```

**MyButton.js**

```js
export default {
  data() {
    return {
      count: 0,
    }
  },
  template: `
    <h2>MyButton</h2>
    <button @click="count++">点我一下</button>
    <span>点了{{count}}次</span>
  `,
}
```

**index.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" src="./src/index.js"></script>
  </head>
  <body>
    <div id="app">
      <my-button></my-button>
    </div>
  </body>
</html>
```

- template 是用字符串的形式在编写模板
  - 这些字符串会在项目运行时，在浏览器中被编译为 js 的函数(性能不太好)
  - 在字符串中编写代码，体验很差
- 为了解决这个问题，Vue 为我们提供了一种单文件组件(SFC)
  - 单文件组件的格式是 vue(vscode 需要安装插件 Vue Language Features (Volar))
  - vue 文件用来编写单文件组件，vue 文件本身并不能被浏览器所识别
    - 所以它必须要被构建工具打包后，才可使用
  - 同时 vue 文件在打包时，构建工具会直接将 template 转换为函数
    - 无需在浏览器中再去编译，这样一来性能也会有所提升
  - 需要安装@vitejs/plugin-vue
  - 配置 vite.config.js

```js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()],
}
```

**App.vue**

```js
<script>
import MyButton from './components/MyButton.vue'

export default {
  data() {
    return {
      message: 'Hello',
      count: 0,
    }
  },
  components: { MyButton },
}
</script>

<template>
  <h1>{{ message }}</h1>
  <MyButton></MyButton>
</template>
```

**MyButton.vue**

```js
<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
}
</script>

<template>
  <h2>MyButton</h2>
  <button @click="count++">点我一下</button>
  <span>点了{{ count }}次</span>
</template>
```

### 自动创建项目

`yarn create vue`
