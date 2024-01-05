---
sidebar_position: 5
---

# Form

## 双向数据绑定

```js
<script setup>
import { ref } from 'vue'

let text = ref('')

const inputHandler = (e) => {
  text.value = e.target.value
}

const submitHandler = () => {
  console.log(text.value)
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div>
      <input type="text" @input="inputHandler" :value="text" />
    </div>
    <div>
      <input type="text" @input="inputHandler" :value="text" />
    </div>
    <div>
      <button>提交</button>
    </div>
  </form>
</template>

<style scoped></style>
```

## v-model

- 在 vue 中，为我们提供了 v-model 指令可以快速完成表单的双向数据绑定

```js
<script setup>
import { ref } from 'vue'

const text = ref('')
const isCheck = ref(true)
const hobbies = ref([])
const gender = ref('男')
const friend = ref('')
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div>信息: <input type="text" v-model="text" /></div>
    <div>是否: <input type="checkbox" v-model="isCheck" true-value="是" false-value="否" /></div>
    <div>
      爱好:
      <input v-model="hobbies" type="checkbox" name="hobby" value="足球" />足球
      <input v-model="hobbies" type="checkbox" name="hobby" value="篮球" />篮球
      <input v-model="hobbies" type="checkbox" name="hobby" value="羽毛球" />羽毛球
      <input v-model="hobbies" type="checkbox" name="hobby" value="乒乓球" />乒乓球
    </div>
    <div>
      性别:
      <input v-model="gender" type="radio" name="gender" value="男" />男
      <input v-model="gender" type="radio" name="gender" value="女" />女
    </div>
    <div>
      朋友:
      <select v-model="friend">
        <option disabled value="">请选择你的好朋友</option>
        <option>孙悟空</option>
        <option>猪八戒</option>
        <option>沙和尚</option>
      </select>
    </div>
    <div>
      <button>提交</button>
    </div>
  </form>
</template>

<style scoped></style>
```

## v-mdoel 修饰符

- .lazy 使用 change 来处理数据
- .trim 去除前后的空格
- .number 将数据转换为数值

```js
<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div>信息: <input type="text" v-model.lazy.trim.number="text" /></div>
    <div>
      <button>提交</button>
    </div>
  </form>
</template>

<style scoped></style>
```

## 自定义事件

- 通过 defineProps 定义的属性在 attrs 中就不存在了
- 使用自定义属性时，最好通过 defineProps 来声明
- 在模板中可以通过$emit()来触发自定义事件

## 依赖注入

- 通过依赖注入，可以跨越多层组件向其他的组件传递数据
- 步骤：
  - 设置依赖(provide) provide(name, value)
  - 注入数据 (inject) const value = inject(name, default)

**App.vue**

```js
<script setup>
import { provide, ref } from 'vue'
import StudentList from './components/StudentList.vue'
import StudentForm from './components/StudentForm.vue'

const STU_ARR = ref([
  {
    id: 1,
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山',
  },
  {
    id: 2,
    name: '猪八戒',
    age: 28,
    gender: '男',
    address: '高老庄',
  },
  {
    id: 3,
    name: '沙和尚',
    age: 38,
    gender: '男',
    address: '流沙河',
  },
  {
    id: 4,
    name: '唐僧',
    age: 16,
    gender: '男',
    address: '女儿国',
  },
])

// 根据id删除学生
const deleteStudentById = (id) => {
  STU_ARR.value = STU_ARR.value.filter((item) => item.id !== id)
}

// 添加学生
const addStudent = (newStudent) => {
  const id = STU_ARR.value.length > 0 ? STU_ARR.value.at(-1).id + 1 : 1
  newStudent.id = id
  STU_ARR.value.push(newStudent)
}

provide('student', {
  students: STU_ARR,
  deleteStudentById,
})
</script>

<template>
  <!--
    <StudentList
      :students="STU_ARR"
      :deleteStudentById="deleteStudentById"
      @delStu="deleteStudentById"
    ></StudentList>
   -->
  <StudentList></StudentList>
  <hr />
  <StudentForm @addStu="addStudent"></StudentForm>
</template>

<style scoped lang="scss"></style>
```

**StudentList.vue**

```js
<script setup>
import StudentItem from './StudentItem.vue'

// const props = defineProps(['students', 'deleteStudentById'])
// const emit = defineEmits(['delStu'])
</script>

<template>
  <table>
    <caption>
      学生列表
    </caption>
    <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>地址</th>
        <th>操作</th>
      </tr>
    </thead>
    <!-- <StudentItem :students="$attrs.students" @delStu="(id) => $emit('delStu', id)"></StudentItem> -->
    <StudentItem></StudentItem>
  </table>
</template>

<style scoped>
table {
  width: 50%;
  border-collapse: collapse;
  text-align: center;
}

caption {
  font-size: 20px;
  font-weight: bold;
}

th {
  border: 1px solid #000;
}
</style>
```

**StudentItem.vue**

```js
<script setup>
import { inject } from 'vue'

const emit = defineEmits(['delStu'])

const { students, deleteStudentById } = inject('student')

const deleteHandler = (item) => {
  if (confirm(`你确认要删除[${item.name}]吗`)) {
    // props.deleteStudentById(id)
    // emit('delStu', item.id)
    deleteStudentById(item.id)
  }
}
</script>

<template>
  <tbody>
    <!-- 不建议这么写 -->
    <!-- <tr v-for="item in $attrs.students"> -->
    <tr v-for="item in students">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.age }}</td>
      <td>{{ item.gender }}</td>
      <td>{{ item.address }}</td>
      <td>
        <!-- <button @click="deleteHandler(item.id)">删除</button> -->
        <!-- <button @click="$emit('delStu', item.id)">删除</button> -->
        <button @click="deleteHandler(item)">删除</button>
      </td>
    </tr>
  </tbody>
</template>

<style scoped>
td {
  border: 1px solid #000;
}
</style>
```

**StudentForm.vue**

```js
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['addStu'])

const formData = ref({
  name: '',
  age: '',
  gender: '男',
  address: '',
})

const submitHandler = () => {
  emit('addStu', { ...formData.value })

  formData.value = {
    name: '',
    age: '',
    gender: '男',
    address: '',
  }
}
</script>

<template>
  <form>
    <div>姓名: <input type="text" v-model="formData.name" /></div>
    <div>年龄: <input type="text" v-model.number="formData.age" /></div>
    <div>
      性别:
      <input type="radio" name="gender" value="男" v-model="formData.gender" />男
      <input type="radio" name="gender" value="女" v-model="formData.gender" />女
    </div>
    <div>住址: <input type="text" v-model="formData.address" /></div>
    <div>
      <button type="button" @click="submitHandler">添加</button>
    </div>
  </form>
</template>

<style></style>
```
