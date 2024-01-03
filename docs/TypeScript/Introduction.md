---
sidebar_position: 1
---

# 简介

全局安装 TypeScript

```
npm i typescript -g
```

查看 TS 编译器的版本

```
tsc - v
```

创建一个 tsconfig.json 文件

```
tsc --init
```

使用 tsc 编译文件

```
tsc 文件名 # 编译指定文件，可以指定多个文件名
tsc 文件名 --target JS版本 # 将TS编译为目标JS版本
tsc 文件名 --target JS版本 --module commonjs # 将TS编译为目标JS版本，并指定JS使用的模块化规范
```
