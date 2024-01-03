---
sidebar_position: 11
---

# Vue3

## Hello World

- createApp()
  - 用来创建一个应用实例
  - 参数：
    - 需要一个根组件作为参数

```js
import { createApp } from 'vue'
import App from '@/App.vue'

// 创建应用实例
const app = createApp(App)
// 将应用实例挂载到页面中
app.mount('#app')
```

## 组件

- 组件是构成一个项目的基本单位，一个项目就是由多个组件混合而成的。编写项目实际上就是在定义组件！
- 在 Vue 中我们使用的是单文件组件，组件中的所有代码(包括结构、表现、行为)统一写在一个`.vue`文件中
- 一个 Vue 文件可以包含三个部分：
  - 结构：`<template></template>`
  - 表现：`<style></style>`
  - 行为：`<script></script>`

## 组件的本质

- 组件本质上就是一个 JS 的模块！组件中的所有代码最终都会转换为 JS。之所以将 template 和 style 都转换为 js 代码就是为了方便我们动态的去显示页面，简单说就是方便向其中添加变量
- 在 template 中，我们是以 html 的形式在编写 js 的代码。在 style 中，我们是以 css 的形式编写 js 的代码！
- 单文件组件(.vue)----编译----> JS 代码，由编译器负责！

**vite.config.js**

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // 这个就是vue的编译器，负责将单文件组件转换为js
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

## 虚拟 DOM

- 组件并没有被直接转换 DOM 代码，因为 DOM 操作是比较耗费性能的，非常容易触发浏览器的重绘重排。如果直接将组件转换为 DOM 代码，大概率不会有太好的性能
- 为了解决这个问题，可以将所有的需要操作 DOM 的代码给它汇总起来，然后进行统一处理，这样就可以避免重复的 DOM 操作，提高浏览器的渲染性能
- 用普通的 JS 对象来描述真实的 DOM 结构 —— 虚拟 DOM
- 虚拟 DOM ---渲染器---> 真实 DOM
- 单文件组件(.vue)----编译器----> 虚拟 DOM ---渲染器---> 真实 DOM

## 插值语法

- 在 vue 中使用`{{  }}`来向模板中插值
- 规则：
  - 插值时可以使用任意的表达式
    - 表达式：有返回值的语句
  - 插值的作用域并不是全局作用域
    - 只能访问部分的全局变量
    - 可以手动指定：
      - app.config.globalProperties.hello = "哈哈哈"
  - 它会自动对 html 进行转义(避免 xss 攻击)
- v-html 指令(慎用)
  - 对内容进行原样输出
  - 使用时要确保内容不是用户传递的

```js
<script setup>
const msg = '今天天气真不错'
const text = '<h2>这是一段文字</h2>'
</script>

<template>
  <h1>App</h1>
  <div>{{ msg }}</div>
  <div>{{ hello }}</div>
  <div>{{ text }}</div>
  <div v-html="text"></div>
</template>
```

```js
import { createApp } from 'vue'
import App from '@/App.vue'

// 创建应用实例
const app = createApp(App)
// 将应用实例挂载到页面中

app.config.globalProperties.hello = '你好'

app.mount('#app')
```

## 属性插值

- 使用 v-bind 指令来进行属性插值
- 特点：
  - v-bind 可以简写为:
  - v-bind 可以直接传递对象
  - 设置布尔值时，如果为 true 则添加属性，为 false 则移除属性

```js
<script setup>
const msg = '今天天气真不错'
const obj = {
  title: '你好',
  class: 'box01',
  id: 'box',
}
</script>

<template>
  <h1>App</h1>
  <div :title="msg">Hello Vue</div>
  <div :="obj">Hello Vue</div>
  <input type="text" :disabled="true" />
</template>
```

## 响应式对象简介

- v-on 指令
  - 用来为元素绑定事件
  - 可以使用@简写
- 我们这里创建的变量是一个普通的值
  - 它不会在值发生变化时触发页面的刷新
  - 换句话这个值只在初始化时和结构绑定一次，之后便再无关系
- 响应式对象
  - 响应式对象会和界面发生绑定，当对象发生变化时也会触发界面的刷新
    - 从而使其可以显示最新的结果
  - reactive()
    - 用来创建响应式对象

```js
<script setup>
import { reactive } from 'vue'

const stu = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
})
</script>

<template>
  <h1>App</h1>
  <ul>
    <li>{{ stu.name }}</li>
    <li>{{ stu.age }}</li>
    <li>{{ stu.gender }}</li>
  </ul>
  <button @click="stu.age++">点我一下</button>
</template>
```

## 响应式原理

- 响应式对象，当响应式对象发生变化时，与之绑定的界面也会随之刷新
- 当我们调用`reactive()`时，需要一个普通的 JS 对象作为参数，它会给我们返回一个代理对象作为返回值。通过代理对象可以对原本的对象进行各种操作，但是在操作的同时代理对象可以实现更多的功能！代理对象主要做了这么两件事：
  - 当有组件使用响应式属性时，代理对象会对其进行记录
  - 当响应式属性发生变化时，代理对象会通知所有使用该属性的组件进行重新渲染

```js
const obj = {
  name: '孙悟空',
  age: 18,
  gender: '男',
}

const objProxy = new Proxy(obj, {
  get(target, propName) {
    // 做一些其他操作，记录谁使用了该值
    console.log('xxx访问了' + propName)
    return target[propName]
  },
  set(target, propName, value) {
    console.log(propName + '发生变化了，所有使用该属性的组件重新渲染')
    target[propName] = value
    return true
  },
})

// 对代理对象所做的操作，最终都会在原对象上体现出来
objProxy.age = 100

console.log(objProxy.age)
console.log(obj) // {name: '孙悟空', age: 100, gender: '男'}
```

## 浅层响应式对象

- reactive()创建的对象是一个深层响应式对象
- shallowReactive() 用来创建一个浅层响应式对象

```js
<script setup>
import { reactive, shallowReactive } from 'vue'

const stu = shallowReactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
  friend: {
    name: '猪八戒',
    age: 28,
  },
})
</script>

<template>
  <h1>App</h1>
  <ul>
    <li>{{ stu.name }}</li>
    <li>{{ stu.age }}</li>
    <li>{{ stu.gender }}</li>
    <ul>
      <li>{{ stu.friend.name }}</li>
      <li>{{ stu.friend.age }}</li>
    </ul>
  </ul>
  <button @click="stu.friend.age++">点我一下</button>
</template>
```

## ref

- reactive 的问题
  - reactive 创建的响应式数据，只能对对象生效，无法应用于原始值
  - reactive 创建的响应式数据无法直接覆盖
  - reactive 创建的响应数据不能解构，解构完的数据就变成普通数据
- 为了解决 reactive 这些问题，vue 中还为我们提供了另外一种创建响应式数据的方式
  - ref()
    - ref 的本质其实就是为数据外部多套了一层：
      - `ref(0) --> {value:0}`
      - `ref({name: "孙悟空",age: 18,gender: "男"}) --> {value:{name: "孙悟空",age: 18,gender: "男"}}`
    - 为了方便我们使用，在模板中使用 ref 值时，值会自动解包
      - 并且注意只有顶层数据才会自动解
    - toRefs()
      - 可以将响应式数据解构为 ref，使其保持响应性
    - toRef()
      - 将指定数据从响应式对象中取出，保持其响应性
    - shallowRef()
      - 创建一个浅层的 ref 值

```js
<script setup>
import { reactive, ref, shallowRef, toRef, toRefs } from 'vue'

const stu = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
})

// const count = reactive(0)

// const { name, age, gender } = stu

const stu2 = ref({
  name: '孙悟空',
  age: 18,
  gender: '男',
})

const count2 = ref(0)

const { name, age, gender } = toRefs(stu2.value)
const age2 = toRef(stu2.value, 'age')

// 这种情况不能自动解包
const obj = {
  text: ref('hello'),
  prop: ref(10),
}

const obj2 = shallowRef({
  name: '沙和尚',
  age: 38,
})
</script>

<template>
  <ul>
    <li>{{ stu.name }}</li>
    <li>{{ stu.age }}</li>
    <li>{{ stu.gender }}</li>
  </ul>
  <button @click="stu.age++">点我一下</button>
  <button @click="stu = { name: '猪八戒', age: 28, gender: '男' }">直接覆盖</button>

  <hr />

  <ul>
    <li>{{ name }}</li>
    <li>{{ age }}</li>
    <li>{{ age2 }}</li>
    <li>{{ gender }}</li>
  </ul>
  <h2>{{ count2 }}</h2>
  <button @click="age++">点我一下</button>
  <button @click="count2++">增加</button>
  <button @click="stu2 = { name: '猪八戒', age: 28, gender: '男' }">直接覆盖</button>

  <hr />

  <div>{{ obj.text.value }}</div>
  <div>{{ obj.prop.value }}</div>
  <button @click="obj.prop.value++">点我一下</button>

  <hr />
  <ul>
    <li>{{ obj2.name }}</li>
    <li>{{ obj2.age }}</li>
  </ul>
  <button @click="obj2.age++">无效</button>
  <button @click="obj2 = { name: '唐僧', age: 16 }">有效</button>
</template>
```

## 计算属性

- computed() 用来设置计算属性，用来表示一些比较复杂的响应式数据值
  - 计算属性只有在依赖项发生变化时才会重新计算，其他属性变化会使用缓存值
- 函数是不考虑依赖项的，只要响应式对象发生变化，函数就会执行

```js
<script setup>
import { computed, ref } from 'vue'

const stu = ref({
  name: '孙悟空',
  age: 18,
  gender: '男',
})

const status = computed(() => {
  console.log('计算属性执行了')

  if (stu.value.age >= 60) {
    return '老年'
  } else if (stu.value.age >= 30) {
    return '中年'
  } else if (stu.value.age >= 18) {
    return '青年'
  } else {
    return '未成年'
  }
})

const test = () => {
  console.log('test函数执行了')

  if (stu.value.age >= 60) {
    return '老年'
  } else if (stu.value.age >= 30) {
    return '中年'
  } else if (stu.value.age >= 18) {
    return '青年'
  } else {
    return '未成年'
  }
}
</script>

<template>
  <ul>
    <li>{{ stu.name }}</li>
    <li>{{ stu.age }}</li>
    <li>{{ stu.gender }}</li>
    <li>{{ status }}</li>
    <li>{{ test() }}</li>
  </ul>
  <button @click="stu.age++">修改年龄</button>
  <button @click="stu.name = '猪八戒'">修改姓名</button>
</template>
```

## 可以修改的计算属性

- 也可以将计算属性设置为可以修改的属性
- 注意：
  - 不要在 getter 中执行有副作用的代码
  - 尽量不要创建可一个修改的计算属性

```js
<script setup>
import { computed, ref } from 'vue'

const stu = ref({
  name: '孙悟空',
  age: 18,
  gender: '男',
})

const status = computed({
  get() {
    if (stu.value.age >= 60) {
      return '老年'
    } else if (stu.value.age >= 30) {
      return '中年'
    } else if (stu.value.age >= 18) {
      return '青年'
    } else {
      return '未成年'
    }
  },
  set(value) {
    switch (value) {
      case '老年':
        stu.value.age = 60
        break
      case '中年':
        stu.value.age = 30
        break
    }
  },
})
</script>

<template>
  <ul>
    <li>{{ stu.name }}</li>
    <li>{{ stu.age }}</li>
    <li>{{ stu.gender }}</li>
    <li>{{ status }}</li>
  </ul>
  <button @click="stu.age++">修改年龄</button>
  <button @click="stu.name = '猪八戒'">修改姓名</button>
  <button @click="status = '老年'">修改状态</button>
</template>
```

## 条件渲染

- v-if 指令
  - 根据条件来决定是否显示元素
- v-else-if
- v-else
  - 可以写在 v-if 后，或者 v-else-if 后
- 处理方式：
  - 条件满足时，添加元素，不满足时，删除元素
- 判断时，可以使用 template 作为外部的容器，它不会在页面中添加多余的标签

```js
<script setup>
import { ref } from 'vue'

const age = ref(17)
</script>

<template>
  <div>年龄 {{ age }}</div>
  <button @click="age++">增加年龄</button>
  <div v-if="age >= 60">老年</div>
  <div v-else-if="age >= 30">中年</div>
  <div v-else-if="age >= 18">青年</div>
  <div v-else>未成年</div>

  <template v-if="age >= 18">
    <p>锄禾日当午</p>
    <p>汗滴禾下土</p>
  </template>
  <template v-else>
    <p>飞流直下三千尺</p>
    <p>疑是银河落九天</p>
  </template>
</template>
```

## v-show

- v-show
  - 也可以用来切换元素的显示
  - 使用 v-show 切换元素时，只是切换的元素的显示状态
    - 切换的是元素的 display 样式
- 对比：
  - v-if，条件满足元素就存在，不满足就不存在(结构上)
    - 初始化性能比较好，切换时性能差一些
    - 切换频率低的用 v-if
    - 可以在 template 标签上使用 v-if
  - v-show，条件满足就显示，不满足就隐藏(样式表现上)
    - 初始化性能差一些，切换性能较好
    - 切换频率高的用 v-show
    - 不能在 template 标签上使用 v-show

```js
<script setup>
import { ref } from 'vue'

const age = ref(17)
</script>

<template>
  <div>年龄 {{ age }}</div>
  <button @click="age++">增加年龄</button>

  <div v-show="age >= 18">
    <p>锄禾日当午</p>
    <p>汗滴禾下土</p>
  </div>
  <div v-show="age < 18">
    <p>飞流直下三千尺</p>
    <p>疑是银河落九天</p>
  </div>
</template>
```

## v-for 简介

- v-for
  - 用于在模板中遍历列表

```js
<script setup>
import { ref } from 'vue'

const studentList = ref([
  {
    name: '孙悟空',
    age: 18,
    gender: '男',
  },
  {
    name: '猪八戒',
    age: 28,
    gender: '男',
  },
  {
    name: '沙和尚',
    age: 38,
    gender: '男',
  },
])
</script>

<template>
  <ul>
    <li v-for="(item, index) in studentList">
      {{ index }} {{ item.name }} {{ item.age }} {{ item.gender }}
    </li>
  </ul>

  <ul>
    <li v-for="({ name, age, gender }, index) in studentList">
      {{ index }} {{ name }} {{ age }} {{ gender }}
    </li>
  </ul>
</template>
```

## 遍历对象

- v-for v-if 尽量不要在同一标签中使用
- v-if 比 v-for 的优先级更高。这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名

```js
<script setup>
import { ref } from 'vue'

const studentList = ref([
  {
    name: '孙悟空',
    age: 18,
    gender: '男',
  },
  {
    name: '猪八戒',
    age: 28,
    gender: '男',
  },
  {
    name: '沙和尚',
    age: 38,
    gender: '男',
  },
])

const student = ref({
  name: '孙悟空',
  age: 18,
  gender: '男',
})
</script>

<template>
  <ul>
    <li v-for="(value, propName, index) in student">{{ value }} {{ propName }} {{ index }}</li>
  </ul>

  <ul>
    <template v-for="item in studentList">
      <li v-if="item.age > 20">{{ item.name }} {{ item.age }} {{ item.gender }}</li>
    </template>
  </ul>
</template>
```

## 关于 key 的问题

- vue 的渲染机制
  - 当我们响应式数据(state)发生变化后，会触发界面的重新渲染
  - 每次重新渲染时并不是渲染整个页面
    - 而是只对发生变化的的部分进行重新渲染
  - 每次重新渲染时，vue 都会将新的虚拟 DOM 和旧的虚拟 DOM 进行比较
    - 只会对发生变化的元素进行重新渲染(diff)
  - 我们在使用 diff 算法比较一个列表时是按照顺序进行比较的
    - 所以当我们向列表前边插入元素时，会使得列表中的每个元素都会重新渲染
    - 性能变差
- key
  - 可以通过 key 属性来解决这个问题，可以为元素设置一个唯一的 key
  - 有了 key 后，在做 diff 比较时，便会按照相同的 key 进行比较，而不是按顺序比较
  - 建议遍历列表时，每次都要为元素指定一个唯一值作为 key

```js
<script setup>
import { ref } from 'vue'

const studentList = ref([
  {
    name: '孙悟空',
    age: 18,
    gender: '男',
  },
  {
    name: '猪八戒',
    age: 28,
    gender: '男',
  },
  {
    name: '沙和尚',
    age: 38,
    gender: '男',
  },
])
</script>

<template>
  <button @click="studentList.unshift({ name: '唐僧', age: 16, gender: '男' })">点我一下</button>
  <ul>
    <li v-for="item in studentList" :key="item.name">
      {{ item.name }} {{ item.age }} {{ item.gender }}
      <input type="text" />
    </li>
  </ul>
</template>
```

## 事件处理器

- 内联事件处理器
  - `<button @click="count++">增加</button>`
  - 特点：直接在事件写代码，事件触发时代码会执行
  - 适用：简单逻辑
  - 事件对象：通过$event 来访问
- 方法事件处理器
  - `<button @click="clickHandler">增加2</button>`
  - 特点：给属性传递一个回调函数，事件触发时会调用回调函数
  - 适用：复杂的逻辑
  - 区分：如果传递的是一个标识符(clickHandler)
    - 或一个访问路径(obj.fn)，此时会被判断为方法处理器
  - 事件对象：
    - 事件对象作为函数的第一个参数传递
- vue 的事件对象就是原生 DOM 中的事件对象！

```js
<script setup>
import { ref } from 'vue'

const count = ref(0)

const clickHandler = (e) => {
  count.value++
  console.log(e)
}

const clickHandler2 = (value, e) => {
  count.value = value
  console.log(e)
}
</script>

<template>
  <h2>{{ count }}</h2>
  <button @click="count++">增加</button>
  <button @click="clickHandler">增加2</button>
  <button @click="clickHandler2(100, $event)">增加3</button>
</template>
```

## 事件修饰符

- 通过修饰符可以单独为事件设置一些功能
  - .stop 停止事件传播
  - .prevent 取消默认行为
  - .self 只有元素自身才会触发事件
  - .capture 捕获阶段触发事件
  - .once 一次性事件
  - .passive 移动端优化滚动性能
- 按键修饰符
  - .enter
  - .tab(特殊，必须配合 keydown 使用)
  - .delete(捕获“Delete”和“Backspace”两个按键)
  - .esc
  - .space
  - .up
  - .down
  - .left
  - .right
  - .ctrl
  - .alt
  - .shift
  - .meta
  - .exact
- 鼠标按键
  - .left
  - .right
  - .middle

```js
<script setup>
const divHandler = () => {
  alert('div')
}

const buttonHandler = () => {
  alert('button')
}
</script>

<template>
  <div class="box01" @click.self="divHandler">
    <button @click.stop="buttonHandler">点我一下</button>
  </div>

  <input @keydown.alt.y.exact="console.log(111)" type="text" />
</template>

<style>
.box01 {
  width: 200px;
  height: 200px;
  background-color: #bfa;
}
</style>
```

## 表单输入

- 用户输入内容会影响到 text 变量
  - text 的变化也会影响到 input，这种我们称为双向绑定
- v-model 指令
  - 用来为将表单项和响应式数据进行双向绑定
  - 使用修饰符：
    - .lazy 使用 change 绑定事件
    - .number 值自动转换为数字
    - .trim 自动去除前后空格

```js
<script setup>
import { ref } from 'vue'

const text = ref('')
const gender = ref('')
const hobby = ref(['a', 'c'])
</script>

<template>
  <input type="text" :value="text" @input="text = $event.target.value" />
  <div>{{ text }}</div>
  <button @click="text = 'hello'">点我一下</button>
  <hr />
  <input type="text" v-model.lazy="text" />
  <hr />
  <input type="radio" name="gender" value="male" v-model="gender" />男
  <input type="radio" name="gender" value="female" v-model="gender" />女
  <div>{{ gender }}</div>
  <input type="checkbox" name="hobby" value="a" v-model="hobby" />a
  <input type="checkbox" name="hobby" value="b" v-model="hobby" />b
  <input type="checkbox" name="hobby" value="c" v-model="hobby" />c
  <input type="checkbox" name="hobby" value="d" v-model="hobby" />d
  <div>{{ hobby }}</div>
</template>
```

## 练习

```js
<script setup>
import { ref, watch } from 'vue'

// 控制是否显示搜索的下拉框
const isShowMovieList = ref(false)

// 搜索的关键字
const keyword = ref('')

// 电影列表
const movieList = ref([])

// 当前选中的电影
const currentMovie = ref({})

// http://api.lilichao.com/movies/filter?title=xxx

watch(keyword, async () => {
  isShowMovieList.value = true
  const res = await fetch(`http://localhost:5173/api/movies/filter?title=${keyword.value}`)
  const data = await res.json()
  movieList.value = data
  console.log(data)
})

// 选中搜索列表的某个电影的处理函数
const selectMovie = (item) => {
  currentMovie.value = item
  isShowMovieList.value = false
}
</script>

<template>
  <!-- 电影的搜索工具 -->
  <!-- 搜索框的容器 -->
  <div @click="isShowMovieList = false">
    <div class="filter-container">
      <input
        @click.stop="isShowMovieList = true"
        v-model.trim="keyword"
        class="search-inp"
        type="text"
        placeholder="请输入电影名称"
      />
      <ul v-show="isShowMovieList && keyword.length" class="movie-list">
        <div style="text-align: center" v-if="!movieList.length">查询不到此电影</div>
        <li @click="selectMovie(item)" v-for="item in movieList" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>

    <!-- 电影信息的容器 -->
    <div v-if="currentMovie.id" class="movie-container">
      <div class="cover">
        <img :src="currentMovie.poster_path" :alt="currentMovie.title" />
      </div>
      <div class="info">
        <h2>{{ currentMovie.title }}</h2>
        <div>
          <!-- <h3>电影简介</h3> -->
          <p>
            {{ currentMovie.overview }}
          </p>
        </div>
        <p><span>年份：</span> {{ new Date(currentMovie.release_date).getFullYear() }}</p>
        <p><span>评分：</span>{{ currentMovie.vote_average }}</p>
        <p><span>评分人数：</span> {{ currentMovie.vote_count }}</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f0f0f0;
}

.filter-container {
  width: 1000px;
  margin: auto;
}
.search-inp {
  box-sizing: border-box;
  width: 1000px;
  background-color: transparent;
  border: none;
  outline: none;
  height: 100px;
  font-size: 50px;
}

.movie-list {
  padding: 20px 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  position: absolute;
  width: 1000px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 30px;
  color: #333;
}

.movie-list li {
  padding: 10px 20px;
  cursor: pointer;
}

.movie-list li:hover {
  background-color: #333;
  color: #fff;
}

.movie-container {
  width: 1000px;
  margin: auto;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.cover img {
  width: 400px;
  vertical-align: middle;
}

.info {
  padding: 0 30px;
  color: #333;
  display: flex;
  flex-flow: column;
}

.info div {
  flex: auto;
}

.info p span {
  font-weight: bold;
  font-size: 20px;
}
</style>
```

**vite.config.js**

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://api.lilichao.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

## 侦听器-数据源

- watch()
  - 侦听器
  - 用来监听响应式状态，当状态发生变化时其中的回调函数就会执行
  - 参数：
    - 数据源
      - 要监听的响应式状态
      - 可以接受的值：
        - ref 值
        - 响应式对象(reactive)
        - getter 函数
        - 使用这三种值作为元素的数组
      - 默认情况下，watch 创建的侦听器是一个浅层的侦听器，只侦听直接存储到对象中的属性
      - `{value:{ name: "孙悟空", age: 18 }}`
      - 当使用一个响应式对象(reactive)作为数据源时，它就隐式的创建了一个深层侦听器
    - 回调函数
      - 当数据源发生变化时，回调函数就会执行
      - 参数：
        - 新值(数组)
        - 旧值(数组)
        - 清理函数 onCleanup
          - 可以传递一个回调函数给它，这个回调函数将会在下次 watch 触发时调用
          - 用来清除上次 watch 的影响
    - 配置对象
      ```js
      {
        deep: true // 创建一个深层的侦听器
        immediate: true, // 组件初始化后就执行 watch
        flush:"pre" // 指定回调函数的触发时机
          pre 表示在做准备工作前，触发回调函数(获取到的 DOM 是旧值)
          post 表示在渲染后触发回调函数(获取到的 DOM 是最新的值)
          sync 表示响应式状态发生变化后立即触发，比 pre 还要早
      }
      ```
      - watch 默认是懒执行的，只有响应式状态发生变化时回调才会执行
      - 响应式状态变化 --> 准备工作 --> 创建虚拟 DOM，渲染真实 DOM

```js
<script setup>
import { reactive, ref, watch } from 'vue'

const keyword = ref('')

const obj = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
  friend: {
    age: 100,
  },
})

// watch(
//   obj,
//   () => {
//     console.log('watch执行了')
//   },
//   {
//     deep: true,
//   }
// )

// watch(obj, () => {
//   console.log('watch执行了')
// })

// watch(
//   () => {
//     return obj.age
//   },
//   () => {
//     console.log('watch执行了')
//   }
// )

watch([keyword, () => obj.age], () => {
  console.log('watch执行了')
})
</script>

<template>
  <div>{{ obj.name }} {{ obj.age }} {{ obj.gender }} {{ obj.friend.age }}</div>
  <input type="text" v-model.trim="keyword" />
  <div>
    <button @click="obj.name = '猪八戒'">点我一下name</button>
    <button @click="obj.age++">点我一下age</button>
    <button @click="obj.gender = '女'">点我一下gender</button>
  </div>
</template>
```

## 侦听器-回调函数

```js
<script setup>
import { reactive, ref, watch } from 'vue'

const keyword = ref('')

const obj = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
  friend: {
    age: 100,
  },
})

watch(keyword, (newValue, oldValue, onCleanup) => {
  console.log(newValue, oldValue)

  onCleanup(() => {
    console.log('清理函数执行了')
  })
})
</script>

<template>
  <div>{{ obj.name }} {{ obj.age }} {{ obj.gender }} {{ obj.friend.age }}</div>
  <input type="text" v-model.trim="keyword" />
  <div>
    <button @click="obj.name = '猪八戒'">点我一下name</button>
    <button @click="obj.age++">点我一下age</button>
    <button @click="obj.gender = '女'">点我一下gender</button>
  </div>
</template>
```

**修改练习**

```js
<script setup>
import { ref, watch } from 'vue'

// 控制是否显示搜索的下拉框
const isShowMovieList = ref(false)

// 搜索的关键字
const keyword = ref('')

// 电影列表
const movieList = ref([])

// 当前选中的电影
const currentMovie = ref({})

// http://api.lilichao.com/movies/filter?title=xxx

watch(keyword, async (newValue, oldValue, onCleanup) => {
  if (!keyword.value) return

  const timer = setTimeout(async () => {
    isShowMovieList.value = true
    const res = await fetch(`http://localhost:5173/api/movies/filter?title=${keyword.value}`)
    const data = await res.json()
    movieList.value = data
  }, 1000)

  onCleanup(() => {
    clearTimeout(timer)
  })
})

// 选中搜索列表的某个电影的处理函数
const selectMovie = (item) => {
  currentMovie.value = item
  isShowMovieList.value = false
}
</script>

<template>
  <!-- 电影的搜索工具 -->
  <!-- 搜索框的容器 -->
  <div @click="isShowMovieList = false">
    <div class="filter-container">
      <input
        @click.stop="isShowMovieList = true"
        v-model.trim="keyword"
        class="search-inp"
        type="text"
        placeholder="请输入电影名称"
      />
      <ul v-show="isShowMovieList && keyword.length" class="movie-list">
        <div style="text-align: center" v-if="!movieList.length">查询不到此电影</div>
        <li @click="selectMovie(item)" v-for="item in movieList" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>

    <!-- 电影信息的容器 -->
    <div v-if="currentMovie.id" class="movie-container">
      <div class="cover">
        <img :src="currentMovie.poster_path" :alt="currentMovie.title" />
      </div>
      <div class="info">
        <h2>{{ currentMovie.title }}</h2>
        <div>
          <!-- <h3>电影简介</h3> -->
          <p>
            {{ currentMovie.overview }}
          </p>
        </div>
        <p><span>年份：</span> {{ new Date(currentMovie.release_date).getFullYear() }}</p>
        <p><span>评分：</span>{{ currentMovie.vote_average }}</p>
        <p><span>评分人数：</span> {{ currentMovie.vote_count }}</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f0f0f0;
}

.filter-container {
  width: 1000px;
  margin: auto;
}
.search-inp {
  box-sizing: border-box;
  width: 1000px;
  background-color: transparent;
  border: none;
  outline: none;
  height: 100px;
  font-size: 50px;
}

.movie-list {
  padding: 20px 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  position: absolute;
  width: 1000px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 30px;
  color: #333;
}

.movie-list li {
  padding: 10px 20px;
  cursor: pointer;
}

.movie-list li:hover {
  background-color: #333;
  color: #fff;
}

.movie-container {
  width: 1000px;
  margin: auto;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.cover img {
  width: 400px;
  vertical-align: middle;
}

.info {
  padding: 0 30px;
  color: #333;
  display: flex;
  flex-flow: column;
}

.info div {
  flex: auto;
}

.info p span {
  font-weight: bold;
  font-size: 20px;
}
</style>
```

## 侦听器-配置对象

```js
<script setup>
import { reactive, ref, watch } from 'vue'

const keyword = ref('')

const obj = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
  friend: {
    age: 100,
  },
})

watch(
  keyword,
  () => {
    // 通过原生DOM，来查看p元素中的内容
    const p1 = document.getElementById('p1')
    alert(p1.innerHTML)
  },
  {
    flush: 'post',
  }
)
</script>

<template>
  <p id="p1">{{ keyword }}</p>
  <div>{{ obj.name }} {{ obj.age }} {{ obj.gender }} {{ obj.friend.age }}</div>
  <input type="text" v-model.trim="keyword" />
  <div>
    <button @click="obj.name = '猪八戒'">点我一下name</button>
    <button @click="obj.age++">点我一下age</button>
    <button @click="obj.gender = '女'">点我一下gender</button>
  </div>
</template>
```

## watchEffect

- 副作用就是指是否修改了响应式状态
  - 没有副作用使用计算属性，有副作用使用侦听器
  - watchEffect()也是用来创建侦听器的，可以自动判断数据源
    - 只有在回调函数中被使用到的响应式状态才会成为数据源(只修改的状态不是)
  - 参数：
    - 回调函数
      - 回调函数中不再有新值和旧值
      - 回调函数中只有一个参数 onCleanup
      - 回调函数会在组件初始化后立即执行(为了设置数据源)
    - 配置对象
      ```js
      {
        flush: 'pre'
      }
      ```
- 对比：
  - watch：
    - 懒执行
    - 明确指定数据源(响应式状态、依赖)
    - 可以访问新旧值
  - watchEffect
    - 立即执行
    - 自动设置依赖
    - 不能访问新旧值

```js
<script setup>
import { reactive, ref, watch, watchEffect } from 'vue'

const keyword = ref('')

const obj = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
  friend: {
    age: 100,
  },
})

watchEffect((onCleanup) => {
  console.log('watchEffect执行了', keyword.value)
  console.log(onCleanup)
})
</script>

<template>
  <p id="p1">{{ keyword }}</p>
  <div>{{ obj.name }} {{ obj.age }} {{ obj.gender }} {{ obj.friend.age }}</div>
  <input type="text" v-model.trim="keyword" />
  <div>
    <button @click="obj.name = '猪八戒'">点我一下name</button>
    <button @click="obj.age++">点我一下age</button>
    <button @click="obj.gender = '女'">点我一下gender</button>
  </div>
</template>
```

## 取消侦听器

- 每一个侦听器设置后都会将一个函数作为返回值，通过该函数可以停止侦听器

```js
<script setup>
import { reactive, ref, watch, watchEffect } from 'vue'

const keyword = ref('')

const obj = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
  friend: {
    age: 100,
  },
})

const unwatch = watchEffect((onCleanup) => {
  console.log('watchEffect执行了', keyword.value)
  console.log(onCleanup)
})
</script>

<template>
  <button @click="unwatch">取消侦听器</button>
  <p id="p1">{{ keyword }}</p>
  <div>{{ obj.name }} {{ obj.age }} {{ obj.gender }} {{ obj.friend.age }}</div>
  <input type="text" v-model.trim="keyword" />
  <div>
    <button @click="obj.name = '猪八戒'">点我一下name</button>
    <button @click="obj.age++">点我一下age</button>
    <button @click="obj.gender = '女'">点我一下gender</button>
  </div>
</template>
```

## 组件的生命周期

- 组件的生命周期就是从组件创建到组件销毁的过程
- createApp(App).mount("#app")开始组件的生命周期
- 生命周期:
  - 执行组件中的代码，构建组件实例(创建虚拟 DOM)
    - onBeforeMount(()=>{})
  - 执行初始化渲染 DOM -----响应式状态发生变化-----> onBeforeUpdate(()=>{}) 组件的重新渲染 onUpdated(() =>{})
    - onMounted(()=>{})
  - 卸载组件(组件不在页面中显示了)
    - onBeforeUnmount(()=>{})
    - onUnmounted(()=>{})
- vue 中为我们提供了几个生命周期的钩子函数，使得我们可以在生命周期的指定阶段调用回调函数

```js
<script setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue'

const keyword = ref('')

onBeforeMount(() => {
  console.log('onBeforeMount执行了', document.getElementById('box01'))
})

onMounted(() => {
  console.log('onMounted执行了', document.getElementById('box01'))
})

console.log('组件中的代码')

onBeforeUpdate(() => {
  console.log('onBeforeUpdate执行了')
})

onUpdated(() => {
  console.log('onUpdated执行了')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount执行了')
})
onUnmounted(() => {
  console.log('onUnmounted执行了')
})
</script>

<template>
  <div id="box01"></div>
  <input type="text" v-model.trim="keyword" />
</template>
```

## ref 属性

- vue 会将当前元素 DOM 对象，赋值给 ref 对应的 ref 值
- 三种方式：
  - ref="ref 值"
  - :ref="ele => {}"
  - ref="ref 数组"
- 操作原生 DOM 时，是完全跳过 Vue，慎用
- 如果用尽量只是读取数据

```js
<script setup>
import { onMounted, ref } from 'vue'

const keyword = ref('')
const divRef = ref()
const div2Ref = ref()
const liRef = ref()

onMounted(() => {
  console.log('onBeforeMount执行了', divRef.value)
  console.log(liRef.value)
  console.log(div2Ref.value)
})
</script>

<template>
  <div ref="divRef">111</div>
  <div :ref="(el) => (div2Ref = el)">222</div>
  <ul>
    <li ref="liRef" v-for="item in 5" :key="item">{{ item }}</li>
  </ul>
  <input type="text" v-model.trim="keyword" />
</template>
```

## 组件

- 组件就是一个 vue 文件
- 一般情况根组件(App.vue)直接放在 src 目录下
  - 而其他的子组件则放到 components 目录下(或其他子目录)
- 组件一般都使用大驼峰命名法
- 注册组件：
  - 全局注册，在任意组件中都可以使用
    - app.component("Box", Box)
    - 将我们注册的名字作为标签名使用即可
    - 全局组件类似于全局变量，可以在任意位置使用
    - 慎用
  - 局部注册
    - 在组合式 API，直接通过 import 引入组件即可
    - 只能在引入处使用
    - 常用的方式

**main.js**

```js
import { createApp } from 'vue'
import App from '@/App.vue'
// import Box from '@/components/Box.vue'

// 创建应用实例
const app = createApp(App)

// app.component('Box', Box)

// 将应用实例挂载到页面中
app.mount('#app')
```

**App.vue**

```js
<script setup>
import Box from './components/Box.vue'
</script>

<template>
  <div>
    <h2>App组件</h2>
    <Box></Box>
  </div>
</template>
```

**Box.vue**

```js
<script setup></script>

<template>
  <div>box组件</div>
</template>
```

## 子组件的挂载

- 子组件会比父组件先挂载完成

**App.vue**

```js
<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import Box from './components/Box.vue'

// onBeforeMount(() => {
//   console.log('挂载前 App')
// })

// onMounted(() => {
//   console.log('挂载后 App')
// })

// onBeforeUnmount(() => {
//   console.log('卸载前 App')
// })

// onUnmounted(() => {
//   console.log('卸载后 App')
// })

const isShow = ref(false)
</script>

<template>
  <div>
    <button @click="isShow = !isShow">点我一下</button>
    <h2>App组件</h2>
    <Box v-if="isShow"></Box>
  </div>
</template>
```

**Box.vue**

```js
<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

onBeforeMount(() => {
  console.log('挂载前 Box')
})

onMounted(() => {
  console.log('挂载后 Box')
})

onBeforeUnmount(() => {
  console.log('卸载前 Box')
})

onUnmounted(() => {
  console.log('卸载后 Box')
})
</script>

<template>
  <div>box组件</div>
</template>
```

## props 简介

- 组件间的通信
  - 如何在组件间传递数据
  - 父组件如果给子组件传递数据：
    - 使用 props 属性
  - 传递属性：
    - 静态传
      - xxx="xxx" 传的都是字符串
    - 动态传
      - :xxx="xxx" 传的就是实际类型
  - 如何使用属性
    - 需要先通过 defineProps()宏命令来定义属性
      - 宏命令会被 Vue 编译器编译后执行
      - 所以宏命令必须直接写在 script setup 里边
      - 宏命令无法访问 script 中的变量
    - 通过 defineProps()可以为组件定义属性：
      - ["属性名","属性名","属性名"]
      - defineProps(["name", "age", "gender", "address"])
      - 属性名，需要使用驼峰命名法
      - 传递属性时可以使用驼峰命名法也可以使用-来连接单词
      - hello-world="哈哈哈哈"
      ```js
      defineProps({
        name: String,
        age: [Number, String],
        gender: String,
        address: String,
        disabled: Boolean,
      })
      ```
      - 这种方式可以限制参数的类型，如果父组件传递了错误的类型
        - 在控制台中会显示警告(只在开发模式下显示)
      - 返回一个存储了所有属性的对象
    - 属性可以直接在模板中访问
      - 也可以通过模板中的变量$props 来访问

**App.vue**

```js
<script setup>
import Box from './components/Box.vue'
</script>

<template>
  <div>
    <h2>App组件</h2>
    <Box name="孙悟空" :age="18" gender="男"></Box>
    <Box name="猪八戒" :age="28" gender="男"></Box>
    <Box name="沙和尚" :age="38" gender="男"></Box>
  </div>
</template>
```

**Box.vue**

```js
<script setup>
const props = defineProps(['name', 'age', 'gender'])
console.log(props)
</script>

<template>
  <div class="box">
    <div>{{ name }}</div>
    <div>{{ props.age }}</div>
    <div>{{ $props.gender }}</div>
  </div>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: tomato;
  font-size: 20px;
  color: #fff;
  margin: 20px 0;
}
</style>
```

## defineProps()传参的方式

**App.vue**

```js
<script setup>
import Box from './components/Box.vue'
</script>

<template>
  <div>
    <h2>App组件</h2>
    <!-- <Box name="孙悟空" :age="18" gender="男" hello-world="hello"></Box> -->
    <!-- <Box name="猪八戒" :age="28" gender="男" disabled></Box> -->
    <Box name="沙和尚" :age="38"></Box>
  </div>
</template>
```

**Box.vue**

```js
<script setup>
// const props = defineProps(['name', 'age', 'gender', 'helloWorld'])

// const props = defineProps({
//   name: String,
//   age: Number,
//   gender: String,
//   disabled: Boolean,
// })

const props = defineProps({
  name: {
    type: String,
    default: '默认值',
    // default(props) {
    //   console.log(props)
    //   return `${props.age}的帅哥`
    // },
    required: true,
    validator(value) {
      console.log(value)
      // 返回true表示校验通过
      return value === '沙和尚'
    },
  },
  age: Number,
})
console.log(props)
</script>

<template>
  <div class="box">
    <div>{{ name }}</div>
    <div>{{ props.age }}</div>
    <div>{{ $props.gender }}</div>
  </div>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: tomato;
  font-size: 20px;
  color: #fff;
  margin: 20px 0;
}
</style>
```

## 组件的事件

- 组件间的通信
  - 如何在组件间传递数据
  - 父组件如果给子组件传递数据：
    - 使用 props 属性
    - 单向数据流，父 -> 子
    - 子组件无法修改父组件传递的属性
    - 但是 Vue 对它的限制并不完全，我们还是有方法直接在子组件中修改父组件的响应式状态
    - 但是，现实的开发中不建议这么做！这样的操作过多会使得项目变得难以维护
    - 可以在根组件中提供修改函数，通过函数对响应式状态进行修改
  - 组件的事件
    - 可以通过组件的事件，为组件设置响应函数
    - 可以通过事件来完成子组件修改父组件中的响应式状态
    - 也可以通过事件来向父组件中传递数据
  - 在模板中，可以通过$emit()来触发事件
    - $emit()
      - 参数：
        - 事件名的字符串
        - 传递给回调函数的参数

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import Box from './components/Box.vue'

const count = ref(0)

const increase = () => {
  count.value++
}
</script>

<template>
  <div>
    <h2>App组件</h2>
    <Box :count="count" @increase="increase"></Box>
  </div>
</template>
```

**Box.vue**

```js
<script setup>
const props = defineProps(['count'])
</script>

<template>
  <div class="box" @click="$emit('increase')">
    <h2>{{ count }}</h2>
  </div>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: tomato;
  font-size: 20px;
  color: #fff;
  margin: 20px 0;
}
</style>
```

## defineEmits()

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import Box from './components/Box.vue'

const count = ref(0)

const increase = () => {
  count.value++
}

const getData = (data) => {
  console.log(data)
}
</script>

<template>
  <div>
    <h2>App组件</h2>
    <Box :count="count" @increase="increase" @getData="getData"></Box>
  </div>
</template>
```

**Box.vue**

```js
<script setup>
const props = defineProps(['count'])
const emit = defineEmits(['increase', 'getData'])

const clickHandler = () => {
  emit('getData', { name: '孙悟空' })
}
</script>

<template>
  <div class="box" @click="emit('increase')">
    <h2>{{ count }}</h2>
    <button @click="clickHandler">点我一下</button>
  </div>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: tomato;
  font-size: 20px;
  color: #fff;
  margin: 20px 0;
}
</style>
```

## 组件上的 v-model

- 直接在自定义的组件上设置 v-model 的不好用的！
- 如果希望自定义的组件可以支持 v-model 则必须要对组件进行一些设置
- 当我们在组件上使用 v-model 时，vue 实际上会为组件设置一个动态属性和一个事件
- 属性名：modelValue 事件名：update:modelValue
- 如何在组件上自定义 v-model 的修饰符：
  - 修饰符实际上就是一个属性
  - 需要在组件中定义属性，来读取 v-model 的修饰符
  - 修饰符默认值：modelModifiers
- 通过参数指定属性名
  - v-model:属性名
  - 属性名：属性名
  - 事件名：update:属性名
  - 修饰符属性名：属性名 Modifiers

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import MyInput from '@/components/MyInput.vue'

const msg = ref('今天天气真不错')
</script>

<template>
  <div>
    <h2>App组件</h2>
    <!-- <input type="text" v-model="msg" /> -->
    <!-- <input type="text" :value="msg" @input="msg = $event.target.value" /> -->

    <!-- <MyInput :modelValue="msg" @update:modelValue="(value) => (msg = value)"></MyInput> -->
    <MyInput v-model="msg"></MyInput>
    <div>
      {{ msg }}
    </div>
  </div>
</template>
```

**MyInput.vue**

```js
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <!-- <input type="text" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" /> -->
  <input type="text" v-model="value" />
</template>

<style>
input {
  color: tomato;
  border: none;
  outline: none;
  border-bottom: 1px solid #000;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
```

## v-model 补充

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import MyInput from '@/components/MyInput.vue'

const msg = ref('今天天气真不错')
</script>

<template>
  <div>
    <h2>App组件</h2>
    <!-- <input type="text" v-model="msg" /> -->
    <!-- <input type="text" :value="msg" @input="msg = $event.target.value" /> -->

    <!-- <MyInput :modelValue="msg" @update:modelValue="(value) => (msg = value)"></MyInput> -->
    <MyInput v-model.trim.upper="msg"></MyInput>
    <!-- <MyInput v-model:hello.trim.upper="msg"></MyInput> -->
    <div>
      {{ msg }}
    </div>
  </div>
</template>
```

**MyInput.vue**

```js
<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  modelModifiers: {
    default: () => ({}),
  },
})
const emit = defineEmits(['update:modelValue'])

// console.log(props.modelModifiers) // {trim: true, upper: true}

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    if (props.modelModifiers.upper) {
      value = value.toUpperCase()
    }
    emit('update:modelValue', value)
  },
})

// const props = defineProps({
//   hello: String,
//   helloModifiers: {
//     default: () => ({}),
//   },
// })
// const emit = defineEmits(['update:hello'])

// // console.log(props.helloModifiers) // {trim: true, upper: true}

// const value = computed({
//   get() {
//     return props.hello
//   },
//   set(value) {
//     if (props.helloModifiers.upper) {
//       value = value.toUpperCase()
//     }
//     emit('update:hello', value)
//   },
// })
</script>

<template>
  <!-- <input type="text" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" /> -->
  <input type="text" v-model="value" />
</template>

<style>
input {
  color: tomato;
  border: none;
  outline: none;
  border-bottom: 1px solid #000;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
```

## 属性的透传

- 自定义属性 props
- 自定义事件 emits
  - 其他 attrs (attributes)
- 既没有在 props 中定义，也没有在 emits 中定义的属性，称为 attrs
  - attrs 默认由 Vue 自行处理，vue 会优先对这些属性进行透传(继承)
- 属性的透传：
  - 就是指将 attrs 自动设置到组件的根元素上
  - 如果根元素也是一个组件，则属性会逐级透传
  - 透传只发生在单根组件上
- 如果不希望将属性透传给元素
  ```js
  defineOptions({
    inheritAttrs: false,
  })
  ```
- 如果组件是一个多根组件怎么办
  - 在模板中有一个叫$attrs，它存储了所有的透传过来的属性
    - 可以通过它来手动的指定透传的属性
  - 在 script 中可以通过钩子函数来获取 attrs
    - const attrs = useAttrs()
- 透传过去的属性，属性名可以直接使用
- 透传过去的事件，需要通过 on 来访问

**App.vue**

```js
<script setup>
import MyButton from './components/MyButton.vue'
</script>

<template>
  <div>
    <MyButton class="my-button" id="hello" @click="console.log('hello')"></MyButton>
  </div>
</template>

<style>
.my-button {
  color: red;
}
</style>
```

**MyButton.vue**

```js
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
// console.log(attrs)
// attrs.onClick()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="box">
    <div class="box02" :class="attrs.class">box02</div>
  </div>
  <!-- <button :="$attrs">点我一下</button> -->
</template>

<style>
.box {
  width: 200px;
  height: 200px;
  background-color: #bfa;
}

.box02 {
  width: 100px;
  height: 100px;
  background-color: skyblue;
}
</style>
```

## 插槽 slot

- 如何在子组件中访问到父组件为其设置标签体
- 插槽(slot)
  - 通过插槽，子组件可以获取到父组件传递的标签体
  - 父组件设置标签体，称为“插槽内容”
  - 子组件中设置的 slot，称为“插槽出口”
  - 模板中的标签在哪定义，作用域就在哪
  - 当前组件模板中的表达式只能访问当前组件中的数据
- slot
  - slot 也可以设置标签体，它的标签体将会成为默认内容
  - 属性：
    - name 插槽的名字
    - 可以为一个组件设置多个插槽，设置内容时可以通过 template 标签来指定内容的出口
  - 示例：
    - `<slot name="xxx"></slot>`
    - `<template v-slot:xxx></template>`
    - 如果不指定 name，则 slot 的默认 name 为 default
    - 直接写在组件标签体中的内容，默认会使用 default 为出口
    - v-slot 可以简写为#

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'
import MyButton from './components/MyButton.vue'

const studentList = ref(['孙悟空', '猪八戒', '沙和尚'])
</script>

<template>
  <div>
    <MyButton>哈哈哈</MyButton>
    <Card>
      <ul>
        <li v-for="item in studentList" :key="item">{{ item }}</li>
      </ul>
    </Card>
    <Card>hello</Card>
  </div>
</template>

<style></style>
```

**Card.vue**

```js
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style>
.card {
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
```

## 插槽补充

**App.vue**

```js
<script setup>
import Layout from '@/components/Layout.vue'
</script>

<template>
  <div>
    <Layout>
      <template #header="{ a }">
        <span>头部内容{{ a }}</span>
      </template>

      <template #main="{ a }">
        <span>主体内容{{ a }}</span>
      </template>

      <template #footer="{ a }">
        <span>底部内容{{ a }}</span>
      </template>
      <template #default>111</template>
    </Layout>
  </div>
</template>

<style></style>
```

**Layout.vue**

```js
<script setup></script>

<template>
  <div class="header">
    <slot name="header" :a="10"></slot>
  </div>
  <div class="main">
    <slot name="main" :a="20"></slot>
  </div>
  <div class="footer">
    <slot name="footer" :a="30"></slot>
  </div>
  <slot>我是默认内容</slot>
</template>

<style scoped>
.header {
  height: 100px;
  background-color: #baf;
}

.main {
  height: 300px;
  background-color: #bfa;
}

.footer {
  height: 100px;
  background-color: skyblue;
}
</style>
```

## 依赖注入

- 应用实例(app)-> App -> A 组件 -> B 组件
  - 祖先和后代间要如何通信
  - 可以通过之前的手段来处理这个问题，但是方便吗
  - 并不方便，尤其是在组件过多的场景下
- 依赖注入
  - 将组件所依赖的值注入到组件中
  - 使用步骤：
    - 在祖先组件中提供依赖
      - provide(key, value)
        - key 字符串 和 符号
        - 开发中推荐使用 符号
        - value 可以是任意值
    - 在后代组件中注入依赖
      - inject(key)
      - inject(key, value)
  - 依赖注入的数据是在祖先和后代之间传递的！

**App.vue**

```js
<script setup>
import { provide, ref } from 'vue'
import A from './components/A.vue'
import { MSG_KEY } from './keys'
import C from './components/C.vue'

const msg = ref('今天天气真不错')

provide(MSG_KEY, msg)
</script>

<template>
  <div class="app">
    <h2>App组件</h2>
    <div class="box">
      <A></A>
      <C></C>
    </div>
  </div>
</template>

<style scoped>
.box {
  border: 1px solid red;
}
</style>
```

**A.vue**

```js
<script setup>
import { provide } from 'vue'
import B from './B.vue'

provide('hello', 'A组件中的数据')
</script>

<template>
  <div>
    <h2>A组件</h2>
    <B></B>
  </div>
</template>

<style scoped></style>
```

**B.vue**

```js
<script setup>
import { MSG_KEY } from '@/keys'
import { inject } from 'vue'

// 第二个参数表示默认值 如果祖先组件没有注入将会使用这个默认值
// const msg = inject(MSG_KEY, '默认值')
const msg = inject(MSG_KEY, () => '默认值', true)
const hello = inject('hello')
</script>

<template>
  <div class="b">
    <h2>B组件 {{ msg }} {{ hello }}</h2>
  </div>
</template>

<style scoped>
.b {
  border: 1px solid orange;
  margin: 20px;
}
</style>
```

**C.vue**

```js
<script setup>
import { inject } from 'vue'

const hello = inject('hello')
</script>

<template>
  <div class="c">
    <h2>C组件 {{ hello }}</h2>
  </div>
</template>

<style scoped></style>
```

**main.js**

```js
import { createApp } from 'vue'
import App from '@/App.vue'
// import Box from '@/components/Box.vue'

// 创建应用实例
const app = createApp(App)

// app.component('Box', Box)

app.provide('hello', '应用实例中的数据')

// 将应用实例挂载到页面中
app.mount('#app')
```

## 使用响应式对象共享状态

- 依赖注入只适用于祖先后代之间的状态共享，其他关系的组件无法使用
- 任意组件间的通信
  - 可以将响应式状态定义到一个 JS 文件中并导出
  - 这样任何组件都可以访问到这个状态
  - 示例：
    ```js
    import { reactive } from 'vue'
    export const globalState = reactive({
      msg: '这是在 store 中设置的数据',
    })
    ```
  - 这种方式非常灵活便利，适合小型的项目
  - 缺点：
    - 响应式状态过多时不便于维护
    - 不利于统一开发标准
    - 和开发工具整合的不好(不便于调试)
    - 不支持服务器端渲染

**store.js**

```js
import { reactive } from 'vue'

export const globalState = reactive({
  msg: '这是在store中设置的数据',
})
```

**A.vue**

```js
<script setup>
import { provide } from 'vue'
import B from './B.vue'
import { MSG_KEY } from '../keys'
import { globalState } from '../store'
// const props = defineProps(["msg"])

provide('hello', 'A组件中的数据')
provide(MSG_KEY, '哈哈哈')
</script>
<template>
  <h2>A组件 - {{ globalState.msg }}</h2>
  <div class="box">
    <B></B>
  </div>
  <button @click="globalState.msg = 'A修改了state'">修改globalState</button>
</template>

<style scoped>
.box {
  margin: 10px;
  border: 2px solid orange;
}
</style>
```

**C.vue**

```js
<script setup>
import { inject } from 'vue'
import { globalState } from '../store'

const hello = inject('hello')
</script>

<template>
  <h2>C组件 -- {{ globalState.msg }}</h2>
</template>

<style scoped></style>
```

## pinia 简介

- Pinia 的使用
  - 安装 npm i pinia
  - 在应用实例中注册 pinia
    - const pinia = createPinia()
    - app.use(pinia)
  - 创建 store
    - store 的名字
      - useXxxStore
      - student -> useStudentStore
      - cart -> useCartStore
    - defineStore()
      - 参数：
        - id store 的唯一表示，不能重复
        - {} store 配置
      - 返回值：函数
  - 使用 store - const studentStore = useStudentStore()

**main.js**

```js
import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'

// 创建应用实例
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// 将应用实例挂载到页面中
app.mount('#app')
```

**student.js**

```js
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      name: '孙悟空',
      age: 18,
      gender: '男',
    }
  },
})
```

**App.vue**

```js
<script setup>
import { useStudentStore } from '@/store/student'

const studentStore = useStudentStore()
</script>

<template>
  <div>{{ studentStore.name }} {{ studentStore.age }} {{ studentStore.gender }}</div>
  <button @click="studentStore.age++">点我一下</button>
</template>

<style scoped></style>
```

## 定义 store

- 概念：
  - pinia 实例 createPinia()
  - useXxx 函数 defineStore()
  - store 实例(响应式对象) use 函数
- defineStore 的配置对象：
  - 选项式 API(推荐)
    - 配置对象
    - 选项：
      - state
        - state 用来配置 store 中存储的数据
        - 这些数据可以直接通过 store 实例访问
        - 需要一个函数作为值，函数需要返回一个对象
        - 对象中的属性就会成为 store 实例中存储的状态
      - getters
        - getters 就相当于 Vue 中的计算属性
        - 需要一个对象作为值，对象中通过方法来设置计算属性
        - 方法中可以通过 this 来访问当前的 store 实例
        - 计算属性也可以直接通过 store 实例来访问
      - actions
        - actions 相当于组件中定义的方法，可以在方法中定义一些操作的逻辑
        - actions 中的定义的方法，可以通过 store 实例直接调用
        - 它也需要一个对象做为值，对象中的方法就是最终的函数
        - 在方法中可以通过 this 来访问 store 实例

**student.js**

```js
import { defineStore } from 'pinia'

// 选项式API
export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      name: '孙悟空',
      age: 18,
      gender: '男',
    }
  },
  getters: {
    doubleAge() {
      return this.age * 2
    },
    titleName: (state) => {
      return 'Mr.' + state.name
    },
  },
  actions: {
    increase() {
      this.age++
    },
    setAge(age) {
      this.age = age
    },
  },
})

// 组合式API
// export const useStudentStore = defineStore('student', () => {
//   const name = ref('猪八戒')
//   const age = ref(28)
//   const gender = ref('男')

//   const doubleAge = computed(() => {
//     return age.value * 2
//   })

//   const titleName = computed(() => {
//     return 'Mr.' + name.value
//   })

//   const increase = () => {
//     age.value++
//   }

//   const setAge = (value) => {
//     age.value = value
//   }

//   return {
//     name,
//     age,
//     gender,
//     doubleAge,
//     titleName,
//     increase,
//     setAge,
//   }
// })
```

```js
<script setup>
import { useStudentStore } from '@/store/student'

const studentStore = useStudentStore()
</script>

<template>
  <h2>{{ studentStore.name }} {{ studentStore.age }} {{ studentStore.gender }}</h2>
  <h2>{{ studentStore.doubleAge }} {{ studentStore.titleName }}</h2>
  <button @click="studentStore.increase()">点我一下</button>
  <button @click="studentStore.setAge(100)">修改年龄</button>
</template>

<style scoped></style>
```

## store 实例的属性和方法

- store 实例
  - 通过 use 函数返回的对象就是 store 实例
  - 通过 store 实例可以完成对其中的响应式状态的各种操作
  - store 实例就是一个响应式对象
  - 作用：
    - 可以访问其中的 state、getters、actions
    - 可以通过 storeToRefs()来完成对 store 实例的解构
    - 可以直接通过它来修改 state
    - 也可以通过$patch()来修改 state
    - 可以通过$reset()来重置 state
    - \$id、$state
    - 订阅 state、action
      - studentStore.$subscribe() -> 订阅 state，订阅是和组件绑定的
      - stu.$onAction() -> 订阅 action

**student.js**

```js
import { defineStore } from 'pinia'

// 选项式API
export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      name: '孙悟空',
      age: 18,
      gender: '男',
      weapons: ['金箍棒', '三根毫毛'],
    }
  },
  getters: {
    doubleAge() {
      return this.age * 2
    },
    titleName: (state) => {
      return 'Mr.' + state.name
    },
  },
  actions: {
    increase() {
      this.age++
    },
    setAge(age) {
      this.age = age
    },
  },
})
```

**Box.vue**

```js
<script setup>
import { useStudentStore } from '@/store/student'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const { name, age, gender, weapons } = storeToRefs(studentStore)

console.log(studentStore.$id) // student
console.log(studentStore.$state) // {name: '孙悟空', age: 18, gender: '男', weapons: Array(2)}
</script>

<template>
  <div>
    <h2>Box</h2>
    <h2>{{ studentStore.name }} {{ studentStore.age }} {{ studentStore.gender }}</h2>
    <h2>{{ name }} {{ age }} {{ gender }} {{ weapons }}</h2>
    <button @click="studentStore.name = '猪八戒'">修改1</button>
    <button @click="studentStore.$patch({ age: 28 })">修改2</button>
    <button @click="studentStore.weapons.push('火眼金睛')">修改3</button>
    <button @click="studentStore.$patch({ weapons: [...studentStore.weapons, '筋斗云'] })">
      修改4
    </button>
    <button @click="studentStore.$patch((state) => state.weapons.push('大师剑'))">修改5</button>
    <button @click="studentStore.$state = { name: '沙和尚' }">修改6</button>
    <button @click="studentStore.$reset()">重置</button>
  </div>
</template>

<style scoped></style>
```

## state 的订阅

- mutation
  - 修改的详细信息
    - storeId
      - 当前 store 的 id
    - type
      - 修改方式
        - 'direct' 直接修改
          - xxx.name = "xxx"
          - xxx.age = 111
          - xxx.$state.gender = "xxx"
        - 'patch object' 通过补丁对象修改
          - `xxx.$patch({xxx})`
          - payload 对象参数
        - 'patch function' 通过补丁函数修改
          - xxx.$patch(state => state.xxx=xxx)
          - xxx.$state = {}
    - events
      - 事件对象，存储了本次操作的详细信息
      - 如果 type 是'direct'，则它是一个对象
      - 如果 type 是'patch xxx'，则它是一个数组
- state
  - 最新的状态

**App.vue**

```js
<script setup>
import { useStudentStore } from '@/store/student'
import Box from './components/Box.vue'
import { ref } from 'vue'

const studentStore = useStudentStore()

const isShow = ref(true)
</script>

<template>
  <h2>{{ studentStore.name }} {{ studentStore.age }} {{ studentStore.gender }}</h2>
  <h2>{{ studentStore.doubleAge }} {{ studentStore.titleName }}</h2>
  <button @click="studentStore.increase()">点我一下</button>
  <button @click="studentStore.setAge(100)">修改年龄</button>
  <button @click="isShow = !isShow">切换</button>
  <Box v-if="isShow"></Box>
</template>

<style scoped></style>
```

**Box.vue**

```js
<script setup>
import { useStudentStore } from '@/store/student'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const { name, age, gender, weapons } = storeToRefs(studentStore)

// console.log(studentStore.$id) // student
// console.log(studentStore.$state) // {name: '孙悟空', age: 18, gender: '男', weapons: Array(2)}

const stop = studentStore.$subscribe(
  (mutation, state) => {
    // console.log(state)
    // console.log(mutation)
    // console.log(mutation.events.key, mutation.events.newValue, mutation.events.oldValue)
    console.log('store发生改变')
    // 在state发生变化后，做一些操作
    // localStorage.setItem(...)
  }
  // {
  //   detached: true, // 在组件卸载后依旧会触发
  // }
)
</script>

<template>
  <div>
    <h2>Box</h2>
    <h2>{{ studentStore.name }} {{ studentStore.age }} {{ studentStore.gender }}</h2>
    <h2>{{ name }} {{ age }} {{ gender }} {{ weapons }}</h2>
    <button @click="studentStore.name = '猪八戒'">修改1</button>
    <button @click="studentStore.$patch({ age: 28 })">修改2</button>
    <button @click="studentStore.weapons.push('火眼金睛')">修改3</button>
    <button @click="studentStore.$patch({ weapons: [...studentStore.weapons, '筋斗云'] })">
      修改4
    </button>
    <button @click="studentStore.$patch((state) => state.weapons.push('大师剑'))">修改5</button>
    <button @click="studentStore.$state = { name: '沙和尚' }">修改6</button>
    <button @click="studentStore.$reset()">重置</button>
    <button @click="stop">取消订阅</button>
  </div>
</template>

<style scoped></style>
```

**student.js**

```js
import { defineStore } from 'pinia'

// 选项式API
export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      name: '孙悟空',
      age: 18,
      gender: '男',
      weapons: ['金箍棒', '三根毫毛'],
    }
  },
  getters: {
    doubleAge() {
      return this.age * 2
    },
    titleName: (state) => {
      return 'Mr.' + state.name
    },
  },
  actions: {
    increase() {
      this.age++
    },
    setAge(age) {
      this.age = age
    },
  },
})
```

## action 的订阅

- name 触发的 action
- store store 实例
- args action 的参数
- after 设置回调函数
- onError action 出错时调用的回调函数

**Box.vue**

```js
<script setup>
import { useStudentStore } from '@/store/student'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const { name, age, gender, weapons } = storeToRefs(studentStore)

// console.log(studentStore.$id) // student
// console.log(studentStore.$state) // {name: '孙悟空', age: 18, gender: '男', weapons: Array(2)}

const stop = studentStore.$subscribe(
  (mutation, state) => {
    // console.log(state)
    // console.log(mutation)
    // console.log(mutation.events.key, mutation.events.newValue, mutation.events.oldValue)
    // console.log('store发生改变')
    // 在state发生变化后，做一些操作
    // localStorage.setItem(...)
  }
  // {
  //   detached: true, // 在组件卸载后依旧保留
  // }
)

studentStore.$onAction(({ name, store, args, after, onError }) => {
  /*
    name 触发的action
    store store实例
    args action的参数
    after 设置回调函数
    onError action出错时调用的回调函数
  */

  // 回调函数，会在action前执行
  console.log('action执行前调用')
  after((result) => {
    // result为action的返回值
    console.log('action执行后调用', result)
  })
}, true) // true表示组件卸载后依旧会触发
</script>

<template>
  <div>
    <h2>Box</h2>
    <h2>{{ studentStore.name }} {{ studentStore.age }} {{ studentStore.gender }}</h2>
    <h2>{{ name }} {{ age }} {{ gender }} {{ weapons }}</h2>
    <button @click="studentStore.name = '猪八戒'">修改1</button>
    <button @click="studentStore.$patch({ age: 28 })">修改2</button>
    <button @click="studentStore.weapons.push('火眼金睛')">修改3</button>
    <button @click="studentStore.$patch({ weapons: [...studentStore.weapons, '筋斗云'] })">
      修改4
    </button>
    <button @click="studentStore.$patch((state) => state.weapons.push('大师剑'))">修改5</button>
    <button @click="studentStore.$state = { name: '沙和尚' }">修改6</button>
    <button @click="studentStore.$reset()">重置</button>
    <button @click="stop">取消订阅</button>
  </div>
</template>

<style scoped></style>
```

**student.js**

```js
import { defineStore } from 'pinia'

// 选项式API
export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      name: '孙悟空',
      age: 18,
      gender: '男',
      weapons: ['金箍棒', '三根毫毛'],
    }
  },
  getters: {
    doubleAge() {
      return this.age * 2
    },
    titleName: (state) => {
      return 'Mr.' + state.name
    },
  },
  actions: {
    increase() {
      console.log('increase执行了')
      this.age++
      return 'increase'
    },
    setAge(age) {
      console.log('setAge执行了')
      this.age = age
      return 'setAge'
    },
  },
})
```

## pinia 插件

- 插件实际就是一个函数，可以用来统一对 store 做一些操作
- 插件会在 store 实例第一次初始化时调用
- 通过插件可以统一为 store 进行配置
- 插件本身就是一个函数，函数可以设置一个对象作为返回值
  - 对象中的属性将会自动的添加到 store 实例
  - 回调函数的参数：
    - 对象：
      - store
        - store 实例
      - app
        - 应用实例
      - pinia
        - pinia 实例
      - options
        - 选项，配置对象

```js
import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'

// 创建应用实例
const app = createApp(App)
const pinia = createPinia()

pinia.use(({ app, store, pinia, options }) => {
  console.log(options)

  if (store.$id === 'student') {
    store.$subscribe(() => {
      console.log('student发生变化了')
    })
  }

  return {
    key: '哈哈哈',
  }
})

app.use(pinia)

// 将应用实例挂载到页面中
app.mount('#app')
```

## SPA 概述

- 传统的项目
  - 多页的应用
  - 一个应用由多个页面组成：
    - index.html
    - about.html
    - shop.html
    - cart.html
  - 将编写的网页放到服务器中，用户在浏览器地址栏输入地址
    - 服务器会根据不同的地址返回不同的页面
  - 在服务器中，路由(router)负责根据网址来返回页面
- 单页应用(SPA)
  - 只有一个页面，包含多个组件
  - 根据响应式状态切换到不同的组件
  - 所有的页面和组件的渲染都在客户端进行，服务器只提供数据接口
  - 相较于传统应用，单页应用会有更好的用户体验
  - 不足：
    - 目前，组件的切换都是通过响应式状态，浏览器的地址栏不会发生任何变化
    - 这样导致浏览器无法生成历史记录，无法通过浏览器的回退前进按钮来切换状态
    - 无法快速的回到应用的某个状态，无法对应用进行分享
  - 解决：
    - 希望切换组件时，url 地址栏也会变化，但是不会向服务器发请求，而是由前端来处理
  - 前端路由
    - 前端路由不会经过服务器，完全由 js 处理，根据不同的 url 地址，显示不同的组件

## vue-router 简介

- 在 vue 中运行的前端路由，可以根据不同的 url 地址来呈现不同的组件
- 使用：
  - 安装：npm i vue-router
  - 创建 router 实例(路由)
  - 将实例在应用中注册
  - 在 App 组件中，添加 RouterView
- createRouter()
  - 用来创建路由实例，需要一个对象作为参数
  - history 用来指定路由的风格(路由的模式)
    - createWebHistory() 传统模式，和传统项目的地址类似(推荐的方式)
      - 项目部署到生产环境时，必须要对服务器进行配置
      - 所有的向服务器发送的请求，都要重写到/index.html
    - createWebHashHistory() 使用 hash 值来设置路由
      - 无需对服务器进行配置
  - routes 路由表
    - 需要一个数组作为参数，每一个路由的信息就是一个对象
    - 对象：
      - path
        - 路由的路径
        - 规则：
          - 静态路径
            - 静态路径要求访问路径和路由完全匹配
              - /path --> /path
              - /path --> /path/ strict: true 可以禁止结尾/
              - /path --> /Path sensitive: true 可以严格区分大小写
            - 参数：
              - 查询字符串
          - 动态路径
            - 动态路径是不固定的
            - 语法：/path/:param --> /path/xxx
            - 支持：
              - ? 0-1 次
              - \* 0-n 次
              - \+ 1 次以上
          - 正则表达式
            - 在动态路径中可以通过正则表达式对路径做更详细的限制

**main.js**

```js
import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

**App.vue**

```js
<script setup></script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
```

## 静态路径

- 可以通过 useRoute()引入一个响应式对象
- route 中存储了当前路由地址信息

**App.vue**

```js
<script setup></script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <RouterView></RouterView>
</template>

<style scoped></style>
```

**Home.vue**

```js
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
</script>

<template>
  <h2>首页 {{ route.query.name }}</h2>
</template>

<style scoped></style>
```

## 动态路径

- 如果需要通过 to 的对象来设置路由信息，params 必须配合 name 使用

**main.js**

```js
import App from '@/App.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home,
      strict: true,
      sensitive: true,
    },
    {
      path: '/:arg+',
      component: About,
    },
    {
      path: '/user/:id/abc/:name',
      component: User,
      name: 'user',
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

**App.vue**

```js
<script setup></script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <RouterLink :to="{ name: 'user', params: { id: '123', name: '孙悟空' } }">user</RouterLink>
  <RouterView></RouterView>
</template>

<style scoped></style>
```

**User.vue**

```js
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h2>用户 {{ route.params.id }} {{ route.params.name }}</h2>
</template>

<style scoped></style>
```

**About.vue**

```js
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h2>关于 {{ route.params.arg }}</h2>
</template>

<style scoped></style>
```

## 正则路径

**main.js**

```js
import App from '@/App.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page404 from '@/views/Page404.vue'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home,
      strict: true,
      sensitive: true,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/user/:id(\\d+)',
      component: User,
      name: 'user',
    },
    {
      path: '/:pathMatch(.*)*',
      component: Page404,
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

## 路径优先级

- 路由的地址在 vue-router 中都会有一个分数
  - 分数越高的越优先，分数一样的看顺序
- 分数大小：
  - 根目录 > 静态路径 > 动态路径(带正则)> 动态路径
  - strict 和 sensitive 会少量加分
  - \* + ? 会减分
  - . 会减分

```js
import App from '@/App.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page404 from '@/views/Page404.vue'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: Page404,
    },
    {
      path: '/home',
      component: Home,
      strict: true,
      sensitive: true,
    },
    {
      path: '/:about',
      component: About,
    },
    {
      path: '/user/:id',
      component: User,
      name: 'user',
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

## 映射组件

- component:
  - 路径所映射的组件，当路径被访问时组件会被渲染
  - 接收的值：
    - 可以直接接收一个组件
      - 这样所有的组件都会在项目初始化时被导入
      - 这样会导致初次加载项目时过慢
    - 可以设置一个函数为值
      - () => import("@/pages/Home.vue")
      - 这样组件只会在需要时才加载，提升页面加载速度
- components
  - 路径所映射的组件，可以为命名视图来指定组件
  - `<RouterView name="footer"></RouterView>`
  - `<RouterView></RouterView>`
  ```js
  components: {
    default: () => import("@/pages/About.vue"),
    footer: () => import("@/pages/Home.vue"),
  }
  ```

**main.js**

```js
import App from '@/App.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page404 from '@/views/Page404.vue'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Page404.vue'),
    },
    {
      path: '/home',
      // component: () => import('@/views/Home.vue'),
      components: {
        default: () => import('@/views/Home.vue'),
        footer: () => import('@/views/Home.vue'),
      },
      strict: true,
      sensitive: true,
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/user/:id',
      component: () => import('@/views/User.vue'),
      name: 'user',
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

**App.vue**

```js
<script setup></script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <!-- <RouterLink :to="{ name: 'user', params: { id: '123' } }">user</RouterLink> -->
  <RouterLink to="/user/111">user</RouterLink>
  <hr />
  <RouterView></RouterView>
  <hr />
  <RouterView name="footer"></RouterView>
</template>

<style scoped></style>
```

## 嵌套路由

- children
  - 嵌套路由，需要一个数组作为参数
  - 注意：
    - 子路由的 path 不需要/ 它会自动和父路由的 path 拼接
    - 子路由的 path 设置为空串，则会成为默认的子路由
    - 子路由会在父路由的路由视图中呈现
    - 也可以为子路由指定 name 属性
    - 如果通过父路由的 name 属性跳转，则不会触发默认子路由

**main.js**

```js
import App from '@/App.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page404 from '@/views/Page404.vue'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Page404.vue'),
    },
    {
      path: '/home',
      // component: () => import('@/views/Home.vue'),
      components: {
        default: () => import('@/views/Home.vue'),
        footer: () => import('@/views/Home.vue'),
      },
      strict: true,
      sensitive: true,
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/user',
      component: () => import('@/views/User.vue'),
      children: [
        {
          path: 'info',
          // 嵌套路由，嵌套路由会在父路由的路由视图中显示
          component: () => import('@/views/user/UserInfo.vue'),
          name: 'info',
        },
        {
          path: '',
          component: () => import('@/views/user/UserList.vue'),
        },
      ],
      // name: 'user',
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

**App.vue**

```js
<script setup></script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <!-- <RouterLink :to="{ name: 'user', params: { id: '123' } }">user</RouterLink> -->
  <RouterLink to="/user">user</RouterLink>
  <!-- <RouterLink :to="{ name: 'user' }">user</RouterLink> -->
  <br />
  <RouterLink :to="{ name: 'info' }">用户info</RouterLink>
  <hr />
  <RouterView></RouterView>
  <!-- <RouterView name="footer"></RouterView> -->
</template>

<style scoped></style>
```

## 重定向和别名

- redirect
  - 重定向
  - 将一个请求地址重定向到另外的地址
  - 取值：
    - 路径
      - redirect: "/home",
    - 对象
      ```js
      redirect: {
        name: "home",
        query: {
          name: "猪八戒",
        },
      },
      ```
    - 函数
      ```js
      redirect: (to) => {
        回调函数中会得到一个参数 to
        to 表示当前目标路径
        return {
          path: "/home",
          query: to.params,
        }
      },
      ```
- alias
  - 路由的别名
  - alias: ["/", "/a", "/b"],
  - 通过别名同样可以匹配到当前的路由

**main.js**

```js
import App from '@/App.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page404 from '@/views/Page404.vue'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/home',
    // },
    {
      path: '/hello/:name',

      // 路径
      // redirect: '/home',

      // 对象
      // redirect: {
      //   name: 'home',
      //   query: {
      //     age: 18,
      //   },
      // },

      // 函数
      redirect: (to) => {
        // return '/home'

        // 回调函数中会得到一个参数to
        // to表示当前目标路径
        console.log(to)
        return {
          path: '/home',
          query: to.params,
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Page404.vue'),
    },
    {
      path: '/home',
      component: () => import('@/views/Home.vue'),
      strict: true,
      sensitive: true,
      name: 'home',
      // alias: '/',
      alias: ['/', '/a', '/b'],
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/user',
      component: () => import('@/views/User.vue'),
      redirect: '/user/info',
      children: [
        {
          path: 'info',
          // 嵌套路由，嵌套路由会在父路由的路由视图中显示
          component: () => import('@/views/user/UserInfo.vue'),
          name: 'info',
        },
        {
          path: 'list',
          component: () => import('@/views/user/UserList.vue'),
        },
      ],
      // name: 'user',
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

**App.vue**

```js
<script setup></script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <!-- <RouterLink :to="{ name: 'user', params: { id: '123' } }">user</RouterLink> -->
  <RouterLink to="/user">user</RouterLink>
  <!-- <RouterLink :to="{ name: 'user' }">user</RouterLink> -->
  <br />
  <RouterLink :to="{ name: 'info' }">用户info</RouterLink>
  <br />
  <RouterLink to="/hello/沙和尚">重定向</RouterLink>
  <hr />
  <RouterView></RouterView>
  <!-- <RouterView name="footer"></RouterView> -->
</template>

<style scoped></style>
```

## 参数转 props

- props
  - 可以将动态路径作为 props 传递给组件
  - 取值：
    - props: true
      - 自动将动态路径转换为 props
      - 如果使用了命名视图，可以分别指定每个视图
      ```js
      props: {
        default: true,
        footer: true,
      }
      ```
    - `props: { id: 180 }`
      - 渲染组件时，自动将对象中的属性作为 props 传递
    - 通过函数返回 props
      ```js
      props: (to) => {
        return { id: to.params.id }
      }
      ```

**main.js**

```js
import App from '@/App.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page404 from '@/views/Page404.vue'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/hello/:name',
      redirect: (to) => {
        return {
          path: '/home',
          query: to.params,
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Page404.vue'),
    },
    {
      path: '/home',
      component: () => import('@/views/Home.vue'),
      strict: true,
      sensitive: true,
      name: 'home',
      alias: '/',
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/user/:id',
      components: {
        default: () => import('@/views/User.vue'),
        footer: () => import('@/views/user/UserList.vue'),
      },
      // component: () => import('@/views/User.vue'),
      // 将动态路径设置为组件的props
      // props: true,
      // props: {
      //   default: true,
      //   footer: false,
      // },
      props: {
        default: {
          gender: '男',
        },
        footer: false,
      },
      // props: {
      //   id: 666,
      // },
      // props: (to) => {
      //   console.log(to)
      //   return {
      //     id: to.params.id,
      //   }
      // },
    },
  ],
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

**User.vue**

```js
<script setup>
import { useRoute } from 'vue-router'

const props = defineProps(['id', 'gender'])

const route = useRoute()
// route.test = '哈哈哈'
// console.log(route)
</script>

<template>
  <!-- <button @click="route.test = '嘻嘻嘻'">点我一下</button> -->
  <button @click="route.params.id = '111'">点我一下</button>
  <h2>用户 {{ gender }}</h2>
  <RouterView></RouterView>
</template>

<style scoped></style>
```

## router-link 的样式

- router-link-active
  - 当 url 地址，和 router-link 执行的地址匹配时
  - vue-router 会自动为元素设置 class router-link-active
  - 所以我们可以通过该类来为匹配的元素设置样式
  - 通过 active-class 可以手动指定类名
  - 当子路由路径匹配时，也会添加这个 class
- router-link-exact-active
  - 必须是完全匹配时才会为元素添加该类
  - 可以通过 exact-active-class 来指定类名

```js
<script setup></script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <!-- <RouterLink :to="{ name: 'user', params: { id: '123' } }">user</RouterLink> -->
  <!-- <RouterLink to="/user/456" active-class="my-active">user</RouterLink> -->
  <RouterLink to="/user">user</RouterLink>
  <br />
  <RouterLink to="/user/info">userInfo</RouterLink>
  <br />
  <RouterLink to="/user/list" exact-active-class="my-exact-active">userList</RouterLink>
  <!-- <RouterLink :to="{ name: 'user' }">user</RouterLink> -->
  <br />
  <!-- <RouterLink :to="{ name: 'info' }">用户info</RouterLink> -->
  <br />
  <RouterLink to="/hello/沙和尚">重定向</RouterLink>
  <hr />
  <RouterView></RouterView>
  <RouterView name="footer"></RouterView>
</template>

<style scoped>
/* .router-link-active {
  background-color: #bfa;
} */

/* .my-active {
  background-color: #bfa;
} */

.router-link-exact-active {
  background-color: #bfa;
}

.my-exact-active {
  background-color: red;
}
</style>
```

## 定制 router-link

- 默认 router-link 会生成一个 a 标签
- 可以通过为其添加 custom 属性来禁止生成标签
- 然后通过手动指定，来设置最终生成什么标签
- router-link 可以通过 v-slot 获取到它的参数
  - route 路由路径信息
  - href 路径信息
  - isActive 路由是否和当前路径匹配
  - isExactActive 路由是否和当前路径完全匹配
  - navigate 函数，跳转的函数

**App.vue**

```js
<script setup>
import MyLink from './components/MyLink.vue'
</script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <!-- <RouterLink :to="{ name: 'user', params: { id: '123' } }">user</RouterLink> -->
  <!-- <RouterLink to="/user/456" active-class="my-active">user</RouterLink> -->
  <RouterLink to="/user">user</RouterLink>
  <br />
  <RouterLink to="/user/info">userInfo</RouterLink>
  <br />
  <RouterLink to="/user/list" exact-active-class="my-exact-active">userList</RouterLink>
  <!-- <RouterLink :to="{ name: 'user' }">user</RouterLink> -->
  <br />
  <!-- <RouterLink :to="{ name: 'info' }">用户info</RouterLink> -->
  <br />
  <RouterLink to="/hello/沙和尚">重定向</RouterLink>
  <br />
  <MyLink to="/about">自定义link</MyLink>
  <hr />
  <RouterView></RouterView>
  <RouterView name="footer"></RouterView>
</template>

<style scoped>
/* .router-link-active {
  background-color: #bfa;
} */

/* .my-active {
  background-color: #bfa;
} */

.router-link-exact-active {
  background-color: #bfa;
}

.my-exact-active {
  background-color: red;
}
</style>
```

**MyLink.vue**

```js
<script setup></script>

<template>
  <router-link custom #="{ navigate, isExactActive }">
    <button @click="navigate" :class="{ 'exact-active': isExactActive }">
      <slot></slot>
    </button>
  </router-link>
</template>

<style scoped>
.exact-active {
  color: orange;
}
</style>
```

## 修改 MyLink

**MyLink.vue**

```js
<script setup>
import { computed, useAttrs } from 'vue'

const props = defineProps({
  tag: {
    default: 'a',
  },
})

const attr = useAttrs()
console.log(attr.to)

const isExternalLink = computed(() => {
  if (attr.to.startsWith('http')) {
    return true
  }

  return false
})
</script>

<template>
  <a v-if="isExternalLink" :href="attr.to" target="_blank">
    <slot></slot>
  </a>

  <router-link v-else custom #="{ navigate, isExactActive, href }">
    <component :is="tag" :href="href" @click="navigate" :class="{ 'exact-active': isExactActive }">
      <slot></slot>
    </component>
  </router-link>
</template>

<style scoped>
.exact-active {
  color: orange;
}
</style>
```

**App.vue**

```js
<script setup>
import MyLink from './components/MyLink.vue'
</script>

<template>
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <!-- <RouterLink :to="{ name: 'user', params: { id: '123' } }">user</RouterLink> -->
  <!-- <RouterLink to="/user/456" active-class="my-active">user</RouterLink> -->
  <RouterLink to="/user">user</RouterLink>
  <br />
  <RouterLink to="/user/info">userInfo</RouterLink>
  <br />
  <RouterLink to="/user/list" exact-active-class="my-exact-active">userList</RouterLink>
  <!-- <RouterLink :to="{ name: 'user' }">user</RouterLink> -->
  <br />
  <!-- <RouterLink :to="{ name: 'info' }">用户info</RouterLink> -->
  <br />
  <RouterLink to="/hello/沙和尚">重定向</RouterLink>
  <br />
  <MyLink to="/about" tag="button">自定义link</MyLink>
  <br />
  <MyLink to="https://www.lilichao.com">外部链接</MyLink>
  <hr />
  <RouterView></RouterView>
  <RouterView name="footer"></RouterView>
</template>

<style scoped>
/* .router-link-active {
  background-color: #bfa;
} */

/* .my-active {
  background-color: #bfa;
} */

.router-link-exact-active {
  background-color: #bfa;
}

.my-exact-active {
  background-color: red;
}
</style>
```

## 编程式导航

- 编程式导航
  - 通过 js 代码，完成路由的跳转
  - const router = useRouter() // 获取路由的实例
- router.push()
  - 跳转路由
  - RouterLink 底层就是调用调用的 push
  - push()的参数和 RouterLink 的 to 是一样
- router.replace()
  - 跳转路由
  - 无法通过回退按钮回退
- router.go()
  - 跳转历史记录

**App.vue**

```js
<script setup>
import { useRouter } from 'vue-router'
import MyLink from './components/MyLink.vue'

const router = useRouter()

const clickHandler = () => {
  // router.push('/home')
  // router.push({
  //   path: '/home',
  //   query: {
  //     name: '唐僧',
  //   },
  // })
  // router.replace({
  //   path: '/home',
  // })

  // router.go(1)
  router.go(-1)
}
</script>

<template>
  <button @click="clickHandler">点我一下</button>
  <br />
  <!-- <RouterLink to="/home?name=孙悟空">home</RouterLink> -->
  <RouterLink :to="{ path: '/home', query: { name: '猪八戒' } }">home</RouterLink>
  <br />
  <RouterLink to="/about">about</RouterLink>
  <br />
  <!-- 如果需要通过to的对象来设置路由信息，params必须配合name使用 -->
  <!-- <RouterLink :to="{ name: 'user', params: { id: '123' } }">user</RouterLink> -->
  <!-- <RouterLink to="/user/456" active-class="my-active">user</RouterLink> -->
  <RouterLink to="/user">user</RouterLink>
  <br />
  <RouterLink to="/user/info">userInfo</RouterLink>
  <br />
  <RouterLink to="/user/list" exact-active-class="my-exact-active">userList</RouterLink>
  <!-- <RouterLink :to="{ name: 'user' }">user</RouterLink> -->
  <br />
  <!-- <RouterLink :to="{ name: 'info' }">用户info</RouterLink> -->
  <br />
  <RouterLink to="/hello/沙和尚">重定向</RouterLink>
  <br />
  <MyLink to="/about" tag="button">自定义link</MyLink>
  <br />
  <MyLink to="https://www.lilichao.com">外部链接</MyLink>
  <hr />
  <RouterView></RouterView>
  <RouterView name="footer"></RouterView>
</template>

<style scoped>
/* .router-link-active {
  background-color: #bfa;
} */

/* .my-active {
  background-color: #bfa;
} */

.router-link-exact-active {
  background-color: #bfa;
}

.my-exact-active {
  background-color: red;
}
</style>
```

## 路由守卫

- 路由守卫可以在路由跳转前对请求进行验证
- 类型：
  - 全局路由守卫
    - 对所有的路由生效
    - router.beforeEach() 每个路由跳转前都会执行
    - router.afterEach() 路由跳转完成后执行，无法阻止路由的跳转
    - router.beforeResolve() 组件渲染前
  - 独享路由守卫
    - beforeEnter: (to, from) => {}, 进入路由前触发，主要用于设置一些特殊的权限认证
  - 组件内的守卫
    - beforeRouteUpdate 路由组件的重新渲染(参数变了)
    - beforeRouteLeave 路由组件卸载前触发，防止清空未保存的表单
- 参数
  - to 表示目标信息 from 来源信息
- 在路由守卫中，可以通过返回值来控制跳转
- return false 终止跳转
- meta 可以为路由设置一些元数据，通过 route 可以访问到 meta 中的数据
- meta 是集合当前路由和其父路由的 meta

**main.js**

```js
import App from '@/App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 创建应用实例
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/hello/:name',
      redirect: (to) => {
        return {
          path: '/home',
          query: to.params,
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Page404.vue'),
    },
    {
      path: '/home',
      component: () => import('@/views/Home.vue'),
      strict: true,
      sensitive: true,
      name: 'home',
      alias: '/',
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
      beforeEnter: (to, from) => {
        console.log(to, from)
      },
    },
    {
      path: '/user',
      component: () => import('@/views/User.vue'),
      children: [
        {
          path: 'info',
          component: () => import('@/views/user/UserInfo.vue'),
        },
        {
          path: 'list',
          component: () => import('@/views/user/UserList.vue'),
        },
      ],
      meta: {
        needAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from) => {
  console.log('beforeEach')

  if (to.meta.needAuth) return false
  // console.log(to.meta)

  // if (to.path === '/about') {
  //   return {
  //     path: '/home',
  //     query: {
  //       name: '哈哈哈',
  //     },
  //   }
  // }
})

router.afterEach(() => {
  console.log('afterEach')
})

router.beforeResolve(() => {
  console.log('beforeResolve')
})

app.use(router)

// 将应用实例挂载到页面中
app.mount('#app')
```

**About.vue**

```js
<script setup>
import { onBeforeUpdate } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'

const route = useRoute()

onBeforeRouteUpdate(() => {
  console.log('onBeforeRouteUpdate')
})

onBeforeRouteLeave(() => {
  console.log('onBeforeRouteLeave')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})
</script>

<template>
  <h2>关于 {{ route.params.arg }}</h2>
</template>

<style scoped></style>
```
