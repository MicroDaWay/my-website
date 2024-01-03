---
sidebar_position: 7
---

# Teleport

## Teleport

- Teleport 可以将组件渲染到网页的指定位置

```js
<script setup>
const props = defineProps(['isShow'])
const emit = defineEmits(['hideMask'])

// 点击mask的处理函数
const clickMaskHandler = () => {
  emit('hideMask')
}
</script>

<template>
  <!-- Teleport可以将组件渲染到网页的指定位置 to里面可以传选择器 -->
  <Teleport to="body">
    <div class="mask" v-show="isShow" @click.self="clickMaskHandler">
      <slot></slot>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
</style>
```
