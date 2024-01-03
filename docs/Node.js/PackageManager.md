---
sidebar_position: 4
---

# 包管理器

## npm

- package.json
  - package.json 是包的描述文件
  - node 中通过该文件对项目进行描述
  - 每一个 node 项目必须有 package.json
- 命令
  - npm -v
    - 查看 npm 的版本
  - npm init
    - 初始化项目，创建 package.json 文件(需要回答问题)
  - npm init -y
    - 初始化项目，创建 package.json 文件(所有值都采用默认值)
  - npm install 包名
    - 将指定包下载到当前项目中
  - npm i 包名
    - 将指定包下载到当前项目中
  - install 时发生了什么？
    - 将包下载到当前项目的 node_modules 目录下
    - 会在 package.json 的 dependencies 属性中添加一个新属性，例如 "lodash": "^4.17.21"
    - 会自动添加 package-lock.json 文件，帮助加速 npm 下载的，不用动他
  - npm install
    - 自动安装所有依赖
  - npm install 包名@版本号
    - 安装指定版本的包
  - npm install 包名 -g
    - 全局安装包
    - 全局安装是将包安装到计算机中
    - 全局安装的通常都是一些工具
  - npm uninstall 包名
    - 卸载包
  - npm r 包名
    - 卸载包
- 引入从 npm 下载的包时，不需要书写路径，直接写包名即可
  - 例如 const \_ = require('lodash')
- package.json
  - scripts：
    - 可以自定义一些命令
    - 定义以后可以直接通过 npm 来执行这些命令
    - start 和 test 可以直接通过 npm start npm test 执行
    - 其他命令需要通过 npm run xxx 执行
- npm 镜像
  - npm 的仓库的服务器位于国外，有时候并不是那么的好使
  - 为了解决这个问题，可以在 npm 中配置一个镜像服务器
  - 镜像的配置：
    - 在系统中安装 cnpm(我自己不太推荐大家使用)
      - npm install -g cnpm --registry=https://registry.npmmirror.com
    - 彻底修改 npm 仓库地址(我个人习惯的使用方式)
      - npm set registry https://registry.npmmirror.com
      - 还原到原版仓库
        - npm config delete registry
      - 查看当前 npm 的仓库地址
        - npm config get registry

## yarn 和 pnpm

- 早期的 npm 存在有很多的问题
  - 所以有很多的厂商尝试着开发了一些代替 npm 的工具
  - 比如 yarn pnpm
  - 在之前，这些第三方的工具相较于 npm 具有的很多的优势
  - 但是随着时间的推进，npm 也在进行不断的迭代，所以到今天
  - npm 和其他工具的差距并不是非常的大
  - 和 npm 相比，yarn 下载包的速度会快一些
- yarn
  - 安装
    - corepack enable (默认会使用 yarn3 版本)
    - corepack prepare yarn@1 --activate 切换到 yarn1 版本
    - yarn init -2 创建一个由 yarn3 管理的项目，只是当前项目使用 yarn3，并不会影响全局的 yarn 版本
  - 镜像配置
    - yarn config set registry https://registry.npmmirror.com
  - 删除配置
    - yarn config delete registry
  - 注意事项
    - 通过 yarn 进行全局安装时，默认 yarn 的目录并不在环境变量中
    - 需要手动将路径添加到环境变量中
    - yarn global bin 查看 yarn 的安装路径
- pnpm
  - 安装：
    - npm install -g pnpm
  - 镜像配置：
    - pnpm config set registry https://registry.npmmirror.com
  - 删除配置：
    - pnpm config delete registry
