---
sidebar_position: 2
---

# Vue 基础

## App

- App.vue 是根组件
  - createApp(App) 将根组件关联到应用上
    - 会返回一个应用的实例
  - app.mount("#app") 将应用挂载到页面中
    - 会返回一个根组件的实例，组件的实例通常可以命名为 vm
    - 组件实例是一个 Proxy 对象(代理对象)
- 组件，一个组件可以创建多个组件实例
- 组件就是一个普通的 js 对象
- data 是一个函数
  - 在 data 中，this 就是当前的组件实例 vm
  - 如果使用箭头函数，则无法通过 this 来访问组件实例
  - 使用 vue 时，减少使用箭头函数
  - data 会返回一个对象作为返回值，vue 会对该对象进行代理
  - 从而将其转换为响应式数据，响应式数据可以直接通过组件实例访问
  - 直接向组件实例中添加的属性不会被 vue 所代理，不是响应数据，修改后页面不会发生变化

## 响应式原理

- 如果直接修改对象的属性，那么就是仅仅修改了属性，没有去做其他的事情，
  - 这种操作只会影响对象自身，不会导致元素的重新的渲染
- 希望在修改一个属性的同时，可以进行一些其他的操作，比如触发元素重新渲染！
- 要实现这个目的，必须要对对象进行改造，vue3 中使用的是代理模式来完成对象的改造
- 设置代理时不会对原对象产生影响！
- get 用来指定读取数据时的行为，它的返回值就是最终读取到的值
- 指定 get 后，在通过代理读取对象属性时，就会调用 get 方法来获取值
- 在 vue 中，data()返回的对象会被 vue 所代理
- vue 代理后，当我们通过代理去读取属性时，返回值之前，它会先做一个跟踪的操作
  - track() 追踪谁用了我这个属性
- 当我们通过代理去修改属性时，修改后，会通知之前所有用到该值的位置进行更新
  - trigger() 触发所有的使用该值的位置进行更新
- set 会在通过代理修改对象时调用
- 只有通过代理去修改属性时，这个属性才是响应式的
- vm.$data 是实际的代理对象
  - 通过 vm 可以直接访问到$data 中的属性
  - vm.$data.msg 等价于 vm.msg
  - 可以通过 vm.$data 动态的向组件中添加响应式数据，但是不建议这么做

**proxy.js**

```js
const obj = {
  name: '孙悟空',
  age: 18,
}

// handler 用来指定代理的行为
const handler = {
  /* 
    三个参数：
      target 被代理的对象
      prop 读取的属性
      receiver 代理对象
  */
  get(target, prop, receiver) {
    return target[prop]
  },
  // value 设置的值
  set(target, prop, value, receiver) {
    target[prop] = value
  },
}

// 创建代理
const proxy = new Proxy(obj, handler)

proxy.age = 28
console.log(proxy.age)
console.log(obj.age)
```

**App.vue**

```js
<script>
export default {
  data(vm) {
    // console.log('data', this)

    // 直接向组件实例中添加的属性不会被vue所代理，不是响应数据，修改后页面不会发生变化
    // this.name = '孙悟空'

    return {
      msg: 'Hello',
    }
  },

  // data: (vm) => {
  //   console.log('data', vm) // vm是当前的组件实例
  //   return {
  //     msg: 'Hello',
  //   }
  // },

  created() {
    // 会在组件创建完毕后调用
    // 可以通过vm.$data动态的向组件中添加响应式数据，但是不建议这么做
    this.$data.name = '孙悟空'
  },
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ name }}</h2>
</template>
```

## data

- data 返回的对象最终会被 Vue 所代理
- this.$data.xxx = "xxx" 动态添加响应数据(不建议这么做)
- 建议将那些暂时没有使用到的属性，也添加到 data 返回的对象中，值可以设置为 null
- vue 在构建响应式对象时，会同时将对象中的属性也做成响应式属性(深层响应式对象)
- 有些场景下，可以通过 shallowReactive()来创建一个浅层的响应式对象，只有第一层中的对象或属性是响应式的

```js
<script>
import { shallowReactive } from 'vue'
import MyButton from './components/MyButton.vue'

export default {
  data() {
    // vue在构建响应式对象时，会同时将对象中的属性也做成响应式属性
    // 深层响应式对象
    return {
      msg: '今天天气真不错',
      stu: {
        name: '孙悟空',
        age: 18,
        gender: '男',
        friend: {
          name: '猪八戒',
        },
      },
      hello: null,
    }
  },

  // data() {
  //   // 有些场景下，可以通过shallowReactive()来创建一个浅层的响应式对象
  //   return shallowReactive({
  //     msg: '今天天气真不错',
  //     stu: {
  //       name: '孙悟空',
  //       age: 18,
  //       gender: '男',
  //       friend: {
  //         name: '猪八戒',
  //       },
  //     },
  //   })
  // },
  components: { MyButton },
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ stu.name }} - {{ stu.age }} - {{ stu.gender }}</h2>
  <h2>{{ stu.friend.name }}</h2>
  <MyButton></MyButton>
  <MyButton></MyButton>
  <MyButton></MyButton>
</template>
```

## methods

- methods 用来指定实例对象中的方法
  - 它是一个对象，可以在它里边定义多个方法
  - 这些方法最终将会被挂载到组件实例上
  - 可以直接通过组件实例来调用这些方法
  - 所有组件实例上的属性都可以在模板中直接访问
  - methods 中函数的 this 会被自动绑定为组件实例
  - methods 中的方法每次组件重新渲染都会调用

```js
<script>
export default {
  data() {
    return {
      msg: 'Hello',
    }
  },
  methods: {
    sum(a, b) {
      console.log(this) // 组件实例 vm
      return a + b
    },
    changeMsg() {
      this.msg = '修改消息'
    },
  },
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ sum(1, 2) }}</h2>
  <button @click="changeMsg">点我一下</button>
</template>
```

## 计算属性

- computed 用来指定计算属性

```js
{
  属性名: getter
}
```

- 计算属性，只在其依赖的数据发生变化时才会重新执行
- 会对数据进行缓存
- 在计算属性的 getter 中，尽量只做读取相关的逻辑
- 不要执行那些会产生(副)作用的代码
- 可以为计算属性设置 setter，使得计算属性可写，但是不建议这么做
- set 在计算属性被修改时调用
- 数组也是响应式数据

```js
<script>
export default {
  data() {
    return {
      msg: 'Hello',
      stu: {
        name: '孙悟空',
        age: 18,
        gender: '男',
      },
      firstName: '悟空',
      lastName: '孙',
      // 数组也是响应式数据
      arr: ['孙悟空', '猪八戒', '沙和尚'],
    }
  },
  methods: {
    updateAge() {
      if (this.stu.age >= 18) {
        this.stu.age = 17
      } else {
        this.stu.age = 18
      }
    },
    updateMsg() {
      this.msg = '修改消息'
    },
    getInfo() {
      console.log('getInfo调用了')
      return this.stu.age >= 18 ? '你已经是一个成年人了' : '你还是一个未成年人'
    },
  },
  computed: {
    // 在计算属性的getter中，尽量只做读取相关的逻辑
    // 不要执行那些会产生(副)作用的代码
    info() {
      console.log('-> info调用了')
      return this.stu.age >= 18 ? '你已经是一个成年人了' : '你还是一个未成年人'
    },

    // 计算属性的简写(只有getter时)
    // name() {
    //   return this.lastName + this.firstName
    // },

    // 可以为计算属性设置setter，使得计算属性可写，但是不建议这么做
    name: {
      get() {
        return this.lastName + this.firstName
      },
      // set在计算属性被修改时调用
      set(value) {
        this.firstName = value.slice(1)
        this.lastName = value[0]
      },
    },
  },
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ stu.name }} - {{ stu.age }} - {{ stu.gender }}</h2>
  <h2>评语: {{ info }}</h2>
  <h2>methods: {{ getInfo() }}</h2>
  <h2>{{ name }}</h2>
  <h2>{{ arr[0] }} - {{ arr[1] }} - {{ arr[2] }}</h2>
  <button @click="updateAge">点我一下修改年龄</button>
  <button @click="updateMsg">点我一下修改msg</button>
</template>
```

## 组合式 API 简介

- 在组合式 api 中直接声明的变量，就是一个普通的变量，不是响应式属性
- 修改这些属性时，不会在视图中产生效果
- 可以通过 reactive()来创建一个响应式的对象
- 在 setup()中可以通过返回值来指定那些内容要暴露给外部
- 暴露后的内容，可以在模板中直接使用

```js
<script>
import { reactive } from 'vue'

export default {
  setup() {
    const msg = 'Hello'
    const count = 0

    const stu = reactive({
      name: '孙悟空',
      age: 18,
      gender: '男',
    })

    const changeAge = () => {
      stu.age++
    }

    return {
      msg,
      count,
      stu,
      changeAge,
    }
  },
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ count }}</h2>
  <h2>{{ stu.name }} - {{ stu.age }} - {{ stu.gender }}</h2>
  <button @click="changeAge">点我一下</button>
</template>
```

```js
<script setup>
import { reactive } from 'vue'

const msg = 'Hello'
const count = 0

const stu = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
})
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ count }}</h2>
  <h2>{{ stu.name }} - {{ stu.age }} - {{ stu.gender }}</h2>
</template>
```

## 响应式对象

- reactive()
  - 返回一个对象的响应式代理
  - 返回的是一个深层响应式对象
  - 也可以使用 shallowReactive()创建一个浅层响应式对象
  - 缺点：
    - 只能返回对象的响应式代理！不能处理原始值
- ref()
  - 接收一个任意值，并返回它的响应式代理
  - ref 在生成响应式代理时，它是将值包装为了一个对象 0 --> `{value:0}`
  - 访问 ref 对象时，必须通过 对象.value 来访问其中的值
  - 在模板中，ref 对象会被自动解包
  - vue 给我们提供了一个语法糖，使得 ref 对象在 script 标签中也可以自动解包
  - $是一个实验性的，需要在 vite 插件中做一些配置 reactivityTransform: true，已经被废弃了

**vite.config.js**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
})
```

**App.vue**

```js
<script setup>
import { reactive, ref } from 'vue'

const stu = reactive({
  name: '孙悟空',
  age: 18,
  gender: '男',
})

// count = 10
// 改变量只会影响到变量自己，在js中，无法实现对一个变量的代理

const count = ref(0)
let count2 = $ref(100)

console.log(count.value)

const addHandler = () => {
  count.value++
  count2++
}
</script>

<template>
  <h2>{{ stu.name }} - {{ stu.age }} - {{ stu.gender }}</h2>
  <button @click="addHandler">点我一下 {{ count }} {{ count2 }}</button>
</template>
```

**reactive.mjs**

```js
import { reactive, ref } from 'vue'

const stu = reactive({ name: '孙悟空' })

const count = ref(0) // { value: 0 }

const person = ref({
  name: '猪八戒',
  age: 28,
  gender: '男',
})

/* 
  {
    value: {
      name: '猪八戒',
      age: 28,
      gender: '男',
    }
  }
*/

console.log(stu)
console.log(person)
console.log(count)
```

## 组合式 API 补充

- 修改 ref 对象时，必须通过 value
- computed 用来生成计算属性
- ref 对象在模板中可以自动解包(要求 ref 对象必须是顶层对象)

```js
<script setup>
import { computed, ref } from 'vue'

const msg = ref('Hello')

// {value: obj}
// obj.value.name
const obj = ref({
  name: '孙悟空',
  age: 18,
})

// obj2.name.value
const obj2 = {
  name: ref('孙悟空'), // {value: "孙悟空"}
  age: ref(18), // {value: 18}
}

// console.log(obj2.name.value)

// 解构之后依然具有响应式
const { name, age } = obj2

const changeAgeHandler = () => {
  // 修改ref对象时，必须通过value
  msg.value = '哈哈哈'
  obj2.age.value = 28
}

const newMsg = computed(() => {
  return msg.value + '嘻嘻嘻'
})
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ newMsg }}</h2>
  <h2>{{ obj.name }} - {{ obj.age + 1 }}</h2>

  <!-- name不是顶层响应式对象，所以不能自动解包 -->
  <h2>{{ obj2.name.value }} - {{ obj2.age.value + 1 }}</h2>

  <h2>{{ name }} - {{ age }}</h2>
  <button @click="changeAgeHandler">点我一下</button>
</template>
```
