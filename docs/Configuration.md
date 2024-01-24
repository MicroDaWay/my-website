---
sidebar_position: 13
---

# 配置

## 在 Vite 中配置 scss 全局变量

**vite.config.ts**

```js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variables.scss";',
      },
    },
  },
})
```

## 配置环境变量

**.env.development**

```
VITE_BASE_API = 开发环境API
```

**.env.production**

```
VITE_BASE_API = 生产环境API
```

**env.d.ts**

```ts
/// <reference types="vite/client" />

// 可以编写一些项目环境变量的类型描述
interface ImportMetaEnv {
  VITE_BASE_API: string
}
```

## 移动端点击 a 标签不显示蓝色方块

```css
a {
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
}
```

## 设置浏览器滚动条的样式

```css
/* 定义滚动条宽度 */
::-webkit-scrollbar {
  width: 12px;
}

/* 定义滚动条轨道样式 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

/* 定义滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #888;
}

/* 定义滚动条按钮样式 */
::-webkit-scrollbar-button {
  display: none; /* 隐藏滚动条按钮 */
}
```

## CSS 实现文字显示省略号

```css
/* 一行显示省略号 */
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

/* 两行显示省略号 */
.ellipsis-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

## 面包屑导航

```js
<el-breadcrumb separator-icon="ArrowRight">
  <el-breadcrumb-item
    v-for="item in route.matched"
    :key="item.path"
    :to="{ path: item.path }"
    v-show="item.meta.title"
  >
    <el-icon style="margin-right: 5px">
      <component :is="item.meta.icon"></component>
    </el-icon>
    <span>{{ item.meta.title }}</span>
  </el-breadcrumb-item>
</el-breadcrumb>
```

## 递归组件需要有 name 属性

## 全屏效果

```js
const fullScreenHandler = () => {
  // DOM对象的一个属性: 可以用来判断当前是不是全屏模式 全屏: html元素 不是全屏: null
  const isFull = document.fullscreenElement

  if (!isFull) {
    // 切换为全屏模式
    // 文档根节点的方法 requestFullscreen 实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}
```

## 批量注册全局组件

```js
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'

const obj: any = {
  SvgIcon,
  Category,
}

// 对外暴露插件对象
export default {
  install(app: any) {
    for (const [key, component] of Object.entries(obj)) {
      app.component(key, component)
    }
  },
}
```

## 数据大屏适配

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .container {
        width: 100vw;
        height: 100vh;
        background-color: red;
      }

      .box {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 1920px;
        height: 1080px;
        background-color: orange;
        transform-origin: left top;
      }

      .box01 {
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }

      .box02 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
        margin-top: 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box">
        <div class="box01">xiaomi 14</div>
        <div class="box02">xiaomi 14 pro</div>
      </div>
    </div>

    <script>
      const getScale = (width = 1920, height = 1080) => {
        const w = window.innerWidth / width
        const h = window.innerHeight / height
        return w < h ? w : h
      }

      const box = document.getElementsByClassName('box')[0]
      box.style.transform = `scale(${getScale()}) translate(-50%, -50%)`

      window.onresize = () => {
        box.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
      }
    </script>
  </body>
</html>
```

## axios 二次封装

```js
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    const userStore = useUserStore()
    const token = userStore.token

    if (token) {
      config.headers.token = token
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const status = error.response.status

    let message = ''

    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '没有权限'
        break
      case 404:
        message = '请求路径错误'
        break
      case 500:
        message = '服务器繁忙'
        break
      default:
        message = '网络异常'
        break
    }

    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  }
)

export default instance
```

## 滚动触底的判断条件

```js
xxx.scrollHeight - xxx.scrollTop === xxx.clientHeight
```

## 小程序和 uni-app 相关配置

### 小程序端 pinia 持久化存储

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    // 网页端的配置
    // persist: true,

    // 小程序端配置
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
```

### 封装请求函数

```js
import { useUserStore } from '@/store/modules/user'

// const baseURL = 'http://localhost:8080'
const baseURL = 'http://192.168.43.236:8080'

// 添加拦截器
const interceptorObj = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }

    // 请求超时 默认为 60s
    options.timeout = 5000

    options.header = {}

    // 添加token请求头标识
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', interceptorObj)
uni.addInterceptor('uploadFile', interceptorObj)

interface ResponseData<T> {
  code: number
  message: string
  data: T
}

const request = <T>(options: UniApp.RequestOptions) => {
  return new Promise<ResponseData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as ResponseData<T>)
        } else if (res.statusCode === 401) {
          // 401错误 清理用户信息 跳转到登录页
          const userStore = useUserStore()
          userStore.clearUserInfo()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          uni.showToast({
            icon: 'none',
            title: (res.data as ResponseData<T>).message,
          })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as ResponseData<T>).message || '请求错误',
          })
          reject(res)
        }
      },
      // 请求错误
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网路错误',
        })
        reject(err)
      },
    })
  })
}

export default request
```

### 自定义导航栏

**pages.json**

```json
"pages": [
  {
    "path": "pages/index/index",
    "style": {
      "navigationStyle": "custom", // 自定义导航栏
      "navigationBarTextStyle": "white"
    }
  },
],
```

### 获取屏幕边界到安全区域的距离

```js
const { safeAreaInsets } = uni.getSystemInfoSync()
const top = safeAreaInsets.top + 'px'
```

### uni-app 点击图片进行预览

```js
const previewImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: goodsData.value.mainPictures,
  })
}
```

### 修改用户头像

```js
// 修改头像的处理函数
const changeAvatar = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      const tempFilePath = res.tempFiles[0].tempFilePath

      uni.uploadFile({
        url: '/uploadAvatar',
        name: 'file',
        filePath: tempFilePath,
        success: (result) => {
          console.log(result)

          if (result.statusCode === 200) {
            formData.value.avatar = JSON.parse(result.data).data
            uni.showToast({
              icon: 'none',
              title: '修改头像成功',
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: JSON.parse(result.data).message,
            })
          }
        },
      })
    },
  })
}
```

### 定义全局组件的类型

**components.d.ts**

```js
import 'vue'
import XtxSwiper from '@/components/XtxSwiper.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}
```

### 获取组件实例的类型

**components.d.ts**

```js
import type XtxGuess from '@/components/XtxGuess.vue'

export type XtxGuessInstance = InstanceType<typeof XtxGuess>
```
