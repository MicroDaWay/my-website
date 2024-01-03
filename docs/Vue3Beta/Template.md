---
sidebar_position: 3
---

# 模板

## 模板的基本语法

- 在模板中，可以直接访问到组件中声明的变量
- 除了组件中的变量外，vue 也为我们提供了一些全局对象可以访问：
  - 比如：Date、Math、RegExp ...
  - 除此之外，也可以通过 app 对象来向 vue 中添加一些全局变量
  - app.config.globalProperties
- 使用插值(双大括号)，只能使用表达式
  - 表达式，就是有返回值的语句
- 插值实际上就是在修改元素的 textContent，
  - 如果内容中含有标签，标签会被转义显示，不会作为标签生效
- 指令：
  - 指令是模板中为标签设置的一些特殊属性，它可以用来设置标签如何显示内容
  - 指令使用 v-开头
  - v-text
    - 将表达式的值作为元素的 textContent 插入，作用同`{{}}`
    - 使用指令时，不需要通过`{{}}`来指定表达式
  - v-html
    - 将表达式的值作为元素的 innerHTML 插入，有 xss 攻击的风险

**main.js**

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.hello = 'Hello Vue'
app.config.globalProperties.alert = alert.bind(this)
app.mount('#app')
```

**App.vue**

```js
<script setup>
const fn = () => {
  console.log(111)
}

const html = '<h2>我是一段html代码</h2>'
</script>

<template>
  <h2>{{ new Date() }}</h2>
  <h2>{{ hello }}</h2>
  <!-- <h2>{{ alert(111) }}</h2> -->

  <h2>{{ Math.random() }}</h2>
  <h2>{{ fn() }}</h2>
  <div>{{ html }}</div>
  <div v-text="html"></div>
  <div v-html="html"></div>
</template>
```

## v-bind

- 当我们需要为标签动态的设置属性时，需要使用 v-bind 指令
  - v-bind 可以简写为 :
- 当我们为一个布尔值设置属性时
  - 如果值为 true，则元素上有该属性(转换后为 true，也算 true)
  - 如果值为 false，则元素没有该属性(转换后为 false，也算 false)
  - 特殊情况："" 空串，在这里会被当成真值

```js
<script setup>
import { ref } from 'vue'

const imgPath = ref('/images/messi.png')

const attrs = ref({
  id: 'box01',
  class: 'box02',
})

const isDisabled = ref('')

const attrName = ref('title')
const attrValue = ref('动态设置属性名')

const changeImgHandler = () => {
  imgPath.value = '/images/neymar.png'
  // isDisabled.value = !isDisabled.value
}
</script>

<template>
  <!-- <img v-bind:src="imgPath" /> -->
  <img :[attrName]="attrValue" :src="imgPath" />
  <div :="attrs">Hello</div>
  <div>
    <button @click="changeImgHandler">点击切换图片</button>
  </div>
  <div>
    <input type="text" :disabled="isDisabled" />
  </div>
</template>
```

## scoped

- 可以直接通过 style 标签来编写样式
  - 如果直接通过 style 标签写样式，此时编写的样式是全局样式
  - 会影响到所有的组件
- 可以为 style 标签添加一个 scoped 属性
  - 这样样式将成为局部样式，只对当前组件生效
- 如何实现的？
  - 当我们在组件中使用 scoped 样式时，vue 会自动为组件中的所有元素生成一个随机的属性
    - 形如：data-v-7a7a37b1
    - 生成后，所有的选择器都会在最后添加一个 [data-v-7a7a37b1]
    - h1 -> h1[data-v-7a7a37b1]
    - .box1 -> .box1[data-v-7a7a37b1]
  - 注意：
    - 随机生成的属性，除了会添加到当前组件内的所有元素上
    - 也会添加到当前组件引入的其他组件的根元素上，这样设计是为了可以通过父组件来为子组件设置一些样式
- 将组件中所有的 h2 的字体颜色设置为黄色
  - :deep() 深度选择器
    - .app h2 --> .app h2[data-v-7a7a37b1]
    - .app h2[data-v-7a7a37b1] 没用 deep
    - .app[data-v-7a7a37b1] h2 用了 deep
  - :global() 全局选择器
    - 可以设置一些全局的样式

**App.vue**

```js
<script setup>
import MyBox from './components/MyBox.vue'
</script>

<template>
  <div class="app">
    <h2>今天天气真不错</h2>
    <div class="box">App中的box</div>
    <MyBox></MyBox>
  </div>
</template>

<style scoped>
h2 {
  background-color: #bfa;
}

/* 将组件中所有的 h2的字体颜色设置为黄色  */
.app :deep(h2) {
  color: red;
}

:global(div) {
  border: 1px solid red;
}
</style>

<!-- <style>
div {
  border: 1px solid red;
}
</style> -->
```

**MyBox.vue**

```js
<script setup></script>

<template>
  <div>
    <h2>MyBox</h2>
    <div class="box">MyBox中的box</div>
  </div>
</template>

<style></style>
```

## CSS Module

- CSS 模块
  - 自动的对模块中的类名进行 hash 化来确保类名的唯一性
  - 在模板中可以通过 $style.类名 使用
  - 也可以通过 module 的属性值来指定变量名

**App.vue**

```js
<script setup>
import MyBox from './components/MyBox.vue'
</script>

<template>
  <div class="app">
    <h2>今天天气真不错</h2>
    <div :class="$style.box">App中的box</div>
    <MyBox></MyBox>
  </div>
</template>

<style module>
.box {
  color: red;
}
</style>
```

**MyButton.vue**

```js
<script setup></script>

<template>
  <div>
    <h2>MyBox</h2>
    <div :class="classes.box">MyBox中的box</div>
  </div>
</template>

<style module="classes">
.box {
  color: orange;
}
</style>
```

## 类和内联样式

```js
<script setup>
const arr = ['box01', 'box02', 'box03']
const arr2 = [{ box01: true, box02: false, box03: true }]
const style = {
  color: 'red',
  backgroundColor: '#bfa',
}
</script>

<template>
  <div class="box">Hello</div>
  <div :class="arr">Vue</div>
  <div :class="arr2">World</div>
  <div :style="style">哈哈哈</div>
  <div :class="{ box01: true, box02: true }" :style="{ fontSize: '20px', color: 'skyblue' }">
    嘻嘻嘻
  </div>
</template>

<style scoped>
.box {
  color: red;
}
</style>
```

## v-show

- v-show 指令，用来设置一个内容是否显示
  - v-show 是通过 display 来设置一个元素是否显示的
