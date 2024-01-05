---
sidebar_position: 4
---

# Props

## props

- 子组件中的数据通常不会在子组件中直接定义，这样会导致数据和视图发生耦合！
- 子组件中的数据通常会在创建组件实例时确定！
- 父组件可以通过 props 来将数据传递给子组件
- 使用 props
  - 先在子组件中定义 props
- 父组件可以通过 props 来向子组件传递数据
- 注意：
  - 父组件传递给子组件的 props 都是只读的，无法修改
  - 即使可以修改，我们也尽量不要在子组件中去修改父组件的数据
  - 如果非得要改，具体方法后边再讲(自定义事件)
- 属性名
  - 定义属性名时，属性名要遵循驼峰命名法

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import MyBox from './components/MyBox.vue'

const count = ref(0)
const obj = ref({
  count: 0,
})
</script>

<template>
  <div>
    <h2>App根组件</h2>
    <button @click="count++">点我一下</button>
    <MyBox :count="count" :obj="obj" max-length="20"></MyBox>
  </div>
</template>

<style scoped></style>
```

**MyBox.vue**

```js
<script setup>
const props = defineProps(['count', 'obj', 'maxLength'])
console.log(props)
</script>

<template>
  <h2>MyBox子组件 {{ props.count }} {{ props.obj.count }} {{ props.maxLength }}</h2>
  <!-- 不能修改 -->
  <!-- <button @click="props.count++">MB</button> -->

  <!-- 可以修改 -->
  <button @click="props.obj.count++">MB</button>
</template>

<style scoped></style>
```

## props 校验

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import MyBox from './components/MyBox.vue'

const count = ref(0)
const obj = ref({
  count: 0,
})
</script>

<template>
  <div>
    <h2>App根组件</h2>
    <button @click="count++">点我一下</button>
    <MyBox :count="count" :obj="obj" max-length="10"></MyBox>
  </div>
</template>

<style scoped></style>
```

**MyBox.vue**

```js
<script setup>
// const props = defineProps(['count', 'obj', 'maxLength'])

const props = defineProps({
  count: Number,
  obj: Object,
  isCheck: Boolean, // 父组件不传默认为false 传了为true
  maxLength: {
    type: String,
    required: true,
    default: '哈哈哈',
    validator(value) {
      // return true 通过校验 return false 未通过校验
      return value !== '嘻嘻嘻'
    },
  },
})

console.log(props)
</script>

<template>
  <h2>MyBox子组件 {{ props.count }} {{ props.obj.count }} {{ props.maxLength }}</h2>
  <!-- 不能修改 -->
  <!-- <button @click="props.count++">MB</button> -->

  <!-- 可以修改 -->
  <button @click="props.obj.count++">MB</button>
</template>

<style scoped></style>
```

## v-if 和 v-show

- v-show 可以根据值来决定元素是否显示(通过 display 来切换元素的显示状态)
- v-if 可以根据表达式的值来决定是否显示元素(会直接将元素删除)
- v-show 通过 css 来切换组件的显示与否，切换时不会涉及到组件的重新渲染
  - 切换的性能比较高
  - 但是初始化时，需要对所有组件进行初始化(即使组件暂时不显示)
  - 所以它的初始化的性能要差一些！
- v-if 通过删除添加元素的方式来切换元素的显示，切换时反复的渲染组件
  - 切换的性能比较差
  - v-if 只会初始化需要用到的组件，所以它的初始化性能比较好
  - v-if 可以和 v-else-if 和 v-else 结合使用
  - v-if 可以配合 template 使用

```js
<script setup>
import { ref } from 'vue'

const isShow = ref(true)
</script>

<template>
  <div>
    <h2>App组件</h2>
    <button @click="isShow = !isShow">切换</button>
    <div v-show="isShow">你猜我显示还是不显示</div>
    <div v-if="isShow">我是v-if中的内容</div>
    <div v-else>我是v-else中的内容</div>

    <div v-show="isShow">
      <h2>我是一个h2</h2>
      <h3>我是一个h3</h3>
    </div>

    <template v-if="isShow">
      <h2>我是一个h2</h2>
      <h3>我是一个h3</h3>
    </template>
  </div>
</template>

<style scoped></style>
```

## component

- component 是一个动态组件
- component 最终以什么标签呈现由 is 属性决定

**App.vue**

```js
<script setup>
import { ref } from 'vue'
import A from './components/A.vue'
import B from './components/B.vue'

const isShow = ref(true)
</script>

<template>
  <div>
    <h2>App组件</h2>
    <component is="div">111</component>
    <component is="p">222</component>
    <component is="h2">333</component>
    <component :is="isShow ? A : B"></component>
    <button @click="isShow = !isShow">切换</button>
  </div>
</template>

<style scoped></style>
```

**A.vue**

```js
<script setup></script>

<template>
  <h2>A组件</h2>
</template>

<style scoped></style>
```

**B.vue**

```js
<script setup></script>

<template>
  <h2>B组件</h2>
</template>

<style scoped></style>
```

## CSS 中的 v-bind

- 可以将 script 中的变量在 style 中使用

```js
<script setup>
import { computed } from 'vue'

const props = defineProps(['src', 'alt', 'rank'])

const color = computed(() => {
  if (props.rank === 1) {
    return '#fe2b47'
  } else if (props.rank === 2) {
    return '#f26702'
  } else {
    return '#f7a703'
  }
})
</script>

<template>
  <div class="avatar">
    <img :src="props.src" :alt="props.alt" />
    <div class="icon">{{ props.rank }}</div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100px;
    vertical-align: middle;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background-color: v-bind(color);
    border-radius: 10px 0 10px 0;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }
}
</style>
```

## 重绘、重排(回流)

- 浏览器在渲染页面时，做了哪些事：
  - 加载页面的 html 和 css(源码)
  - html 转换为 DOM，css 转换为 CSSOM
  - 将 DOM 和 CSSOM 构建成一课渲染树
  - 对渲染树进行 reflow(回流、重排)(计算元素的位置)
  - 对网页进行绘制 repaint(重绘)
- 渲染树(Render Tree)
  - 从根元素开始检查哪些元素可见，以及他们的样式
  - 忽略那些不可见的元素(display:none)
- 重排(回流)
  - 计算渲染树中元素的大小和位置
  - 当页面中的元素的大小或位置发生变化时，便会触发页面的重排(回流)
  - width、height、margin、font-size ......
  - 注意：每次修改这类样式都会触发一次重排！所以如果分次修改多个样式会触发重排多次，而重排是非常耗费系统资源的操作(昂贵)，重排次数过多后，会导致网页的显示性能变差，在开发时我们应该尽量的减少重排的次数
  - 在现代的前端框架中，这些东西都已经被框架优化过了！所以使用 vue、react 这些框架开发时，几乎不需要考虑这些问题，唯独需要注意的时，尽量减少在框架中直接操作 DOM
  - 可以通过修改 class 来间接的影响样式，来减少重排的次数
- 重绘
  - 绘制页面
  - 当页面发生变化时，浏览器就会对页面进行重新的绘制

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }

      .box02 {
        background-color: orange;
      }

      .box03 {
        width: 300px;
        height: 400px;
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <button id="btn">点我一下</button>
    <div class="box01"></div>

    <script>
      const btn = document.getElementById('btn')
      const box01 = document.getElementsByClassName('box01')[0]

      btn.onclick = () => {
        // box01.classList.add('box02')
        // box01.style.width = '300px'
        // box01.style.height = '400px'
        // box01.style.backgroundColor = 'skyblue'
        // box01.classList.add('box03')

        box01.style.display = 'none'
        box01.style.width = '300px'
        box01.style.height = '400px'
        box01.style.backgroundColor = 'skyblue'
        box01.style.display = 'block'
      }
    </script>
  </body>
</html>
```

## v-for

- 我们在使用 v-for 遍历时，旧的结构和新的结构是按照顺序进行对比的
- 在使用 v-for 时，可以为元素指定一个唯一的 key
  - 有了 key 以后，元素再比较时就会按照相同的 key 去比较而不是顺序

```js
<script setup>
import { ref } from 'vue'

const arr = ref(['孙悟空', '猪八戒', '沙和尚'])

const arr2 = ref([
  {
    id: 1,
    name: '孙悟空',
    age: 18,
  },
  {
    id: 2,
    name: '猪八戒',
    age: 28,
  },
  {
    id: 3,
    name: '沙和尚',
    age: 38,
  },
])
</script>

<template>
  <div>
    <button @click="arr.push('唐僧')">点我一下</button>
    <button @click="arr2.unshift({ id: 4, name: '唐僧', age: 16 })">点我一下2</button>

    <ul>
      <li v-for="item in arr">{{ item }}</li>
    </ul>

    <div v-for="({ id, name, age }, index) in arr2" :key="id">
      {{ name }} - {{ age }}
      <input type="text" />
    </div>
  </div>
</template>

<style></style>
```

## 插槽(slot)

- 希望在父组件中指定子组件中的内容
- 我们可以通过插槽(slot)来实现该需求
- slot 标签，会被组件的标签体所替换
- 通过插槽引入组件，位于父组件的作用域中
- 直接写在组件中的内容是默认插槽的内容，只会出现在默认插槽中(没有 name 属性的插槽)
- 可以在 slot 中指定一个默认内容，默认内容会在组件中没有内容时显示
- 不指定 name 属性的插槽是默认插槽(default)

**App.vue**

```js
<script setup>
import SlotDemo from './components/SlotDemo.vue'
import A from './components/A.vue'

const name = '孙悟空'
</script>

<template>
  <div>
    <h2>App组件</h2>
    <SlotDemo>
      默认插槽
      <template #s1>s1插槽</template>
      <!--
        <template #s2>
          <A :name="name"></A>
        </template>
       -->
      <!--
        <template #s2="slotProps">
          <A :name="slotProps.stu.username"></A>
        </template>
       -->
      <template #s2="{ stu, address }">
        <A :name="stu.username"></A>
      </template>
    </SlotDemo>
  </div>
</template>

<style scoped></style>
```

**SlotDemo.vue**

```js
<script setup>
import { ref } from 'vue'

const stu = ref({
  username: '猪八戒',
  age: 28,
  gender: '男',
})

const address = '高老庄'
</script>

<template>
  <h2>slotDemo</h2>
  <h3>
    <slot name="s1"></slot>
  </h3>
  <h3>
    <slot name="s2" :stu="stu" :address="address"></slot>
  </h3>
  <h3>
    <slot>插槽的默认内容</slot>
  </h3>
</template>

<style></style>
```

**A.vue**

```js
<script setup>
const props = defineProps(['name'])
</script>

<template>
  <h2>A组件 {{ name }}</h2>
</template>

<style scoped></style>
```

## 事件

- 为元素绑定事件：
  - 绑定事件使用 v-on 指令
    - v-on:事件名
    - @事件名
  - 绑定事件的两种方式
    - 内联事件处理器(自己调用函数)
      - 事件触发时，直接执行 js 语句
      - 内联事件处理器，回调函数的参数由我们自己传递
      - 内联事件处理器，回调函数由我们自己调用，参数也是我们自己传递的
      - 在内联事件处理器中，可以使用$event 来访问事件对象
    - 方法事件处理器(vue 帮我们调用函数)
      - 事件触发时，vue 会对事件的函数进行调用
      - 方法事件处理器，回调函数的参数由 vue 帮我们传
      - 参数就是事件对象
      - 方法事件处理器的回调函数，vue 会将事件对象作为参数传递
      - 这个事件对象就是 DOM 中原生的事件对象，它里边包含了事件触发时的相关信息
      - 通过该对象，可以获取：触发事件的对象、触发事件时一些情况 ...
      - 同时通过该对象，也可以对事件进行一些配置：取消事件的传播、取消事件的默认行为...
    - vue 如何区分两种处理器：
      - 检查事件的值是否是合法的 js 标识符或属性访问路径
      - 如果是，则表示它是方法事件处理器
      - 否则，表示它是内联事件处理器
      - foo(方法)
      - foo.bar(方法)
      - foo++(内联)
      - foo()(内联)

```js
<script setup>
import { ref } from 'vue'

const count = ref(0)

const clickHandler = (...args) => {
  console.log(args)
}

const clickHandler2 = (...args) => {
  console.log(args)
}

const clickBoxHandler = (e, text) => {
  // 可以通过事件对象来取消事件的传播
  e.stopPropagation()
  alert(text)
}

const clickBoxHandler2 = (text) => {
  alert(text)
}
</script>

<template>
  <button @click="count++">点我一下 {{ count }}</button>
  <button @click="clickHandler">点我一下2</button>
  <button @click="clickHandler2($event, 1, 2)">点我一下3</button>

  <hr />

  <!--
    <div class="box01" @click="clickBoxHandler($event, 'box01')">
      box01
      <div class="box02" @click="clickBoxHandler($event, 'box02')">
        box02
        <div class="box03" @click="clickBoxHandler($event, 'box03')">box03</div>
      </div>
    </div>
   -->

  <div class="box01" @click="clickBoxHandler2('box01')">
    box01
    <div class="box02" @click.stop="clickBoxHandler2('box02')">
      box02
      <div class="box03" @click.stop="clickBoxHandler2('box03')">box03</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box01 {
  width: 200px;
  height: 200px;
  background-color: #bfa;

  .box02 {
    width: 150px;
    height: 150px;
    background-color: orange;

    .box03 {
      width: 100px;
      height: 100px;
      background-color: skyblue;
    }
  }
}
</style>
```

## 事件修饰符

- .stop 停止事件的传播
- .capture 在捕获阶段触发事件
- .prevent 取消默认行为
- .self 只有事件由自身触发时才会有效
- .once 绑定一个一次性的事件
- .passive 主要用于提升滚动事件的性能

```js
<script setup>
const clickBoxHandler = (text) => {
  alert(text)
}
</script>

<template>
  <div class="box01" @click.capture.self.once="clickBoxHandler('box01')">
    box01
    <div class="box02" @click.capture.stop="clickBoxHandler('box02')">
      box02
      <div class="box03" @click="clickBoxHandler('box03')">box03</div>
    </div>
  </div>

  <a @click.prevent="" href="https://www.lilichao.com/">超链接</a>
</template>

<style scoped lang="scss">
.box01 {
  width: 200px;
  height: 200px;
  background-color: #bfa;

  .box02 {
    width: 150px;
    height: 150px;
    background-color: orange;

    .box03 {
      width: 100px;
      height: 100px;
      background-color: skyblue;
    }
  }
}
</style>
```

## 透传属性

- 在组件上设置属性，会自动传递给组件的根元素
- 这样一来可以方便我们在父组件中为子组件来设置属性
- 透传会发生在没有被声明为 props 和 emit 的属性上
- 自动的透传只适用单根组件
- 在模板中，可以通过$attrs 来访问透传过来的属性
  - 可以手动指定透传过来的属性要添加到哪些元素
- 在 script 中，可以通过 useAttrs()来获取透传过来的属性
- 关闭自动透传

```js
<script>
export default {
  inheritAttrs: false,
}
</script>
```

**App.vue**

```js
<script setup>
import C from './components/C.vue'
</script>

<template>
  <h2>App组件</h2>
  <h2>属性的透传</h2>
  <C class="box01" style="color: red"></C>
</template>

<style scoped></style>
```

**C.vue**

```js
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
console.log(attrs)
</script>

<script>
// 关闭自动透传
export default {
  inheritAttrs: false,
}
</script>

<template>
  <h2 :="attrs">我是C组件</h2>
  <!--
    <h2 class="box02" :class="$attrs.class" :style="attrs.style">我是C组件</h2>
    <h2 class="box03" :style="$attrs.style">Hello</h2>
    <h2 :="$attrs">World</h2>
   -->
</template>

<style scoped></style>
```
