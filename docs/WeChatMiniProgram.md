---
sidebar_position: 13
---

# 微信小程序

## 使用 sass

**project.config.json**

```json
{
  "setting": {
    "useCompilerPlugins": ["sass"]
  }
}
```

## scroll-view

**scroll-x**

```html
<scroll-view class="scroll-x" scroll-x>
  <view>1</view>
  <view>2</view>
  <view>3</view>
</scroll-view>
```

```scss
.scroll-x {
  white-space: nowrap;
  background-color: #bfa;

  view {
    display: inline-block;
    width: 300rpx;
    height: 100rpx;

    &:first-child {
      background-color: deepskyblue;
    }

    &:last-child {
      background-color: tomato;
    }
  }
}
```

**scroll-y**

```html
<scroll-view class="scroll-y" scroll-y>
  <view>1</view>
  <view>2</view>
  <view>3</view>
</scroll-view>
```

```scss
.scroll-y {
  height: 400rpx;
  margin-top: 20rpx;
  background-color: #bfa;

  view {
    height: 400rpx;

    &:first-child {
      background-color: deepskyblue;
    }

    &:last-child {
      background-color: tomato;
    }
  }
}
```

## 背景图片的使用

当编写小程序的样式文件时，我们可以使用 background-image 来设置元素的背景图片

注意事项：小程序的 background-image 不支持本地路径，需要使用网络图片，或者 base64 格式的图片，或者使用 image 组件

## 阻止事件冒泡

使用 bind 绑定的事件，会触发事件冒泡，如果想阻止事件冒泡，可以使用 catch 来绑定事件

```html
<view class="outer" bind:tap="clickOuterHandler">
  <view class="inner" catch:tap="clickInnerHandler">子元素</view>
</view>
```

```js
Page({
  clickOuterHandler() {
    console.log('父元素')
  },
  clickInnerHandler() {
    console.log('子元素')
  },
})
```

## 事件传参 data-\* 自定义数据

在组件上通过 data-\* 的方式定义需要传递的数据，其中 \* 是自定义的属性，例如：`<button bind:tap="clickBtnHandler" data-id="1" data-name="孙悟空" type="primary">点我一下</button>`，然后通过事件对象进行数据获取自定义数据

注意事项：

- e.target 是指触发事件的对象，e.currentTarget 是指绑定事件的对象
- 使用 data-\* 方法传递参数时，多个单词由连字符 - 连接，连字符写法会转换成小驼峰写法
- 使用 data-\* 方法传递参数时，大写字符会自动转换成小写字符

```html
<view class="outer" bind:tap="clickOuterHandler" data-outer-id="2" data-outer-name="猪八戒">
  <button bind:tap="clickBtnHandler" data-id="1" data-name="孙悟空" type="primary">点我一下</button>
</view>
```

```js
Page({
  clickBtnHandler(e) {
    console.log(e.target.dataset.id, e.target.dataset.name)
  },
  clickOuterHandler(e) {
    console.log(e.currentTarget.dataset.outerId, e.currentTarget.dataset.outerName)
  },
})
```

## 事件传参 mark 自定义数据

在组件上使用 mark:自定义属性的方式将数据传递给事件处理函数，例如：`<button bind:tap="clickBtnHandler" mark:id="1" mark:name="孙悟空" type="primary">点我一下</button>`，然后通过事件对象进行获取自定义数据

mark 和 data-\* 很相似，主要区别在于：

- mark 包含从事件触发的节点到根节点上所有的 mark 属性值
- currentTarget.dataset 或者 target.dataset 只包含事件绑定者或者事件触发者那一个节点的 data-\* 值

```html
<view class="outer" bind:tap="clickOuterHandler" mark:outerId="2" mark:outerName="猪八戒">
  <button bind:tap="clickBtnHandler" mark:id="1" mark:name="孙悟空" type="primary">点我一下</button>
</view>
```

```js
Page({
  clickBtnHandler(e) {
    console.log(e.mark.id, e.mark.name, e.mark.outerId, e.mark.outerName)
  },
  clickOuterHandler(e) {
    console.log(e.mark.outerId, e.mark.outerName)
  },
})
```
