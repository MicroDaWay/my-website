---
sidebar_position: 6
---

# State

## 状态提升

- 状态管理
  - 状态(state)
    - 应用当中的数据就是状态
    - 状态即数据
  - 视图(view)
    - 视图用来呈现数据，用户通过视图访问数据
  - 交互(actions)
    - 用户的操作
    - 状态会根据用户在视图中的操作发生变化
- 提升状态
  - 当有多个组件需要使用到同一个 state 时，可以将 state 提升到这些组件共同的祖先组件中声明
  - 这样一来所有这些组件便都可以通过祖先元素来访问到这个 state

## pinia

- 使用 pinia 的步骤
  - 安装 pinia
    - `yarn add pinia`
  - 在 main.js 中引入 createPinia()
  - 通过 createPinia()创建 pinia 实例
  - 将 pinia 配置为 vue 的插件

**main.js**

```js
import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

// 将pinia设置为vue的插件
app.use(pinia)
app.mount('#app')
```

## 选项式 API 创建 store

- 通过函数来创建 store
- defineStore("store 的 id", 配置对象)
- 配置对象：state，是一个函数，将需要由 pinia 维护的数据以对象的形式返回

```js
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  // 数据
  state() {
    return {
      count: 0,
    }
  },
  // 计算属性
  getters: {
    doubleCount() {
      return this.count * 2
    },
  },
  // 方法
  actions: {
    increment() {
      this.count++
    },
  },
})
```

## 组合式 API 创建 store

```js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCountStore = defineStore('count', () => {
  const count = ref(100)

  const doubleCount = computed(() => {
    return count.value * 2
  })

  const increment = () => {
    count.value++
  }

  return {
    count,
    doubleCount,
    increment,
  }
})
```

## store 的解构

- store 实例本身就是一个 reactive 对象
  - 可以通过它直接访问 state 中的数据
- 但是如果直接将 state 中的数据解构出来，那么数据将会丧失响应性
- 可以通过 storeToRefs()来对 store 进行解构
  - 它可以将 state 和 getters 中的属性解构为 ref 属性，从而保留其响应性

**studentStore**

```js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStudentStore = defineStore('student', () => {
  const name = ref('孙悟空')
  const age = ref(18)
  const gender = ref('男')
  const address = ref('花果山')
  const skills = ['七十二变', '筋斗云', '金箍棒']

  const doubleAge = computed(() => {
    return age.value * 2
  })

  const addAge = () => {
    age.value++
  }

  return {
    name,
    age,
    gender,
    address,
    skills,
    doubleAge,
    addAge,
  }
})
```

**ComponentB.vue**

```js
<script setup>
import { useStudentStore } from '@/store/student'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const { name, age, gender, doubleAge } = storeToRefs(studentStore)
</script>

<template>
  <h2>ComponentB组件</h2>
  <h2>
    {{ studentStore.name }} {{ studentStore.age }} {{ studentStore.doubleAge }}
    {{ studentStore.gender }}
  </h2>
  <h2>{{ name }} {{ age }} {{ doubleAge }} {{ gender }}</h2>
  <button @click="studentStore.addAge">增加年龄</button>
</template>

<style scoped></style>
```

## state 的修改

- 直接修改
- 通过$patch 修改
- 通过$patch 传函数的形式的修改
- 直接替换 state
- 重置 state

**studentStore**

```js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStudentStore = defineStore('student', {
  state() {
    return {
      name: '孙悟空',
      age: 18,
      gender: '男',
      address: '花果山',
      skills: ['七十二变', '筋斗云', '金箍棒'],
    }
  },
  getters: {
    doubleAge() {
      return this.age * 2
    },
  },
  actions: {
    addAge() {
      this.age++
    },
  },
})
```

**ComponentB**

```js
<script setup>
import { useStudentStore } from '@/store/student'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const { name, age, gender, doubleAge } = storeToRefs(studentStore)

const clickHandler = () => {
  // studentStore.$patch({
  //   name: '齐天大圣',
  //   age: 20,
  //   skills: ['救命毫毛'],
  // })
  // studentStore.$patch((state) => {
  //   state.skills.push('救命毫毛')
  // })

  studentStore.$state = { name: '猪八戒' }
  // 等价于 studentStore.$patch({ name: '猪八戒' })
}
</script>

<template>
  <h2>ComponentB组件</h2>
  <h2>
    {{ studentStore.name }} {{ studentStore.age }} {{ studentStore.doubleAge }}
    {{ studentStore.gender }}
  </h2>
  <h2>{{ name }} {{ age }} {{ doubleAge }} {{ gender }} {{ studentStore.skills }}</h2>
  <button @click="studentStore.addAge">增加年龄</button>
  <hr />
  <button @click="name = '齐天大圣'">修改name</button>
  <button @click="clickHandler">$patch修改</button>
  <button @click="studentStore.$reset()">重置</button>
</template>

<style scoped></style>
```

## store 的订阅

- 当 store 中的 state 发生变化时，做一些响应的操作
- store.$subscribe(函数, 配置对象)
- 使用订阅时不要在回调函数中直接修改 state

```js
<script setup>
import { useStudentStore } from '@/store/student'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const studentStore = useStudentStore()
const { name, age, gender, doubleAge } = storeToRefs(studentStore)

const clickHandler = () => {
  // studentStore.$patch({
  //   name: '齐天大圣',
  //   age: 20,
  //   skills: ['救命毫毛'],
  // })
  studentStore.$patch((state) => {
    state.skills.push('救命毫毛')
  })

  // studentStore.$state = { name: '猪八戒' }
  // 等价于 studentStore.$patch({ name: '猪八戒' })
}

studentStore.$subscribe(
  (mutation, state) => {
    console.log(mutation)
  },
  { detached: true }
)
</script>

<template>
  <div>
    <h2>ComponentB组件</h2>
    <h2>
      {{ studentStore.name }} {{ studentStore.age }} {{ studentStore.doubleAge }}
      {{ studentStore.gender }}
    </h2>
    <h2>{{ name }} {{ age }} {{ doubleAge }} {{ gender }} {{ studentStore.skills }}</h2>
    <button @click="studentStore.addAge">增加年龄</button>
    <hr />
    <button @click="name = '齐天大圣'">修改name</button>
    <button @click="clickHandler">$patch修改</button>
    <button @click="studentStore.$reset()">重置</button>
  </div>
</template>

<style scoped></style>
```

## 订阅 action

- $onAction 用来订阅 action 的调用
- name 调用的 action 的名字
- store store 的实例
- args action 接收到的参数
- after() 可以设置一个回调函数，函数会在 action 成功调用后触发
- onError() 可以设置一个回调函数，函数会在 action 调用失败后触发

**studentStore**

```js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStudentStore = defineStore('student', {
  state() {
    return {
      name: '孙悟空',
      age: 18,
      gender: '男',
      address: '花果山',
      skills: ['七十二变', '筋斗云', '金箍棒'],
    }
  },
  getters: {
    doubleAge() {
      return this.age * 2
    },
  },
  actions: {
    addAge() {
      // throw new Error('抛出一个错误')
      this.age++
    },
  },
})
```

**ComponentB.vue**

```js
<script setup>
import { useStudentStore } from '@/store/student'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const studentStore = useStudentStore()
const { name, age, gender, doubleAge } = storeToRefs(studentStore)

const clickHandler = () => {
  studentStore.$patch({
    name: '齐天大圣',
    age: 20,
    skills: ['救命毫毛'],
  })
  // studentStore.$patch((state) => {
  //   state.skills.push('救命毫毛')
  // })

  // studentStore.$state = { name: '猪八戒' }
  // 等价于 studentStore.$patch({ name: '猪八戒' })
}

studentStore.$subscribe(
  (mutation, state) => {
    // console.log(mutation.payload)
  },
  { detached: true }
)

studentStore.$onAction(({ name, store, args, after, onError }) => {
  // console.log(name) // addAge
  // console.log(store)
  // console.log(args)

  after(() => {
    console.log('执行成功')
  })

  onError((err) => {
    console.log('出错了', err)
  })
})
</script>

<template>
  <div>
    <h2>ComponentB组件</h2>
    <h2>
      {{ studentStore.name }} {{ studentStore.age }} {{ studentStore.doubleAge }}
      {{ studentStore.gender }}
    </h2>
    <h2>{{ name }} {{ age }} {{ doubleAge }} {{ gender }} {{ studentStore.skills }}</h2>
    <button @click="studentStore.addAge">增加年龄</button>
    <hr />
    <button @click="name = '齐天大圣'">修改name</button>
    <button @click="clickHandler">$patch修改</button>
    <button @click="studentStore.$reset()">重置</button>
  </div>
</template>

<style scoped></style>
```
