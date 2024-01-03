---
sidebar_position: 6
---

# Git

配置 name 和 email

```
git config --global user.name "xxx"
git config --global user.email "xxx@xxx.xxx"
```

初始化 git 仓库

```
git init
```

查看当前仓库的状态

```
git status
```

查看 git 的提交日志

```
git log
```

文件状态：

1. 未跟踪
2. 已跟踪
   - 暂存
   - 未修改
   - 已修改

刚刚添加到项目中的文件处于未跟踪状态

未跟踪 --> 暂存

```
git add <文件名> # 将文件切换到暂存状态
git add * # 将所有未跟踪(已修改)的文件暂存
```

暂存 --> 未修改

```
git commit -m "xxx" # 将暂存的文件提交到仓库中
git commit -m -a "xxx" # 提交所有已修改的文件(未跟踪的文件不会提交)
```

未修改 --> 修改

- 修改代码后，文件会变为修改状态

**常用的命令**

- 重置文件

```
git restore <文件名> # 恢复文件
git restore --staged <文件名> # 取消暂存状态
```

- 删除文件

```
git rm <文件名> # 删除文件
git rm -f <文件名>  # 强制删除文件
```

- 移动文件

```
git mv <文件初始路径> <文件目标路径> # 移动文件 重命名文件
```

## 分支

git 在存储文件时，每一次代码的提交都会创建一个与之对应的节点，git 就是通过一个一个的节点来记录代码的状态的。节点会构成一个树状结构，树状结构就意味着这个树会存在分支，默认情况下仓库只有一个分支，命名为 master。在使用 git 时，可以创建多个分支，分支与分支之间相互独立，在一个分支上修改代码不会影响其他的分支

```
git branch # 查看当前分支
git branch <分支名> # 创建新的分支
git branch -d <分支名> # 删除分支
git switch <分支名> # 切换分支
git switch -c <分支名> # 创建并切换分支
git merge <分支名> # 合并分支 需要先切换到老的分支，再用当前分支去合并新的分支
git branch -M <分支名> # 修改当前的分支名
```

在开发中，都是在自己的分支上编写代码，代码编写完成后，再将自己的分支合并到主分支中

## 变基(rebase)

在开发中除了通过 merge 来合并分支外，还可以通过变基来完成分支的合并
我们通过 merge 合并分支时，在提交记录中会将所有的分支创建和分支合并的过程全部都显示出来，这样当项目比较复杂，开发过程比较波折时，我们必须要反复的创建、合并、删除分支。这样一来将会使得我们代码的提交记录变得极为混乱

**原理(变基时发生了什么)：**

1. 当我们发起变基时，git 会首先找到两条分支的最近的共同祖先
2. 对比当前分支相对于祖先的历史提交，并且将它们的不同提取出来存储到一个临时文件中
3. 将当前部分指向目标的基底
4. 以当前基底开始，重新执行历史操作

```
git rebase <分支名> # 变基 需要先切换到新的分支，再将当前分支变基到老的分支
```

变基和 merge 对于合并分支来说最终的结果是一样的！但是变基会使得代码的提交记录更整洁更清晰！注意！大部分情况下合并和变基是可以互换的，但是如果分支已经提交给了远程仓库，那么这时尽量不要使用变基。

## 远程仓库(remote)

目前我们对于 git 的所有操作都是在本地进行的。在开发中显然不能这样，这时我们就需要一个远程的 git 仓库。远程的 git 仓库和本地的本质没有什么区别，不同点在于远程的仓库可以被多人同时访问使用，方便我们协同开发。在实际工作中，git 的服务器通常由公司搭建内部使用或是购买一些公共的私有 git 服务器。我们学习阶段，直接使用一些开放的公共 git 仓库。目前我们常用的库有两个：GitHub 和 Gitee(码云)

- 将本地库上传 github：

```
git remote add origin https://github.com/lilichao/git-demo.git
git remote add <远程库名> <远程库地址>

git branch -M main
# 修改分支的名字为main

git push -u origin main
# git push 将代码上传到远程库上
```

- 将本地库上传 gitee：

```
git remote add gitee https://gitee.com/ymhold/vue-course.git
git push -u gitee main
```

**远程库的操作命令**

```
git remote # 列出当前关联的远程库
git remote -v # 列出当前关联的远程库的详细信息
git remote add <远程库名> <远程库地址> # 关联远程仓库
git remote remove <远程库名> # 删除远程库
git push -u <远程库名> <本地库分支名> # 向远程库推送代码，并和当前本地分支关联
git push <远程库名> <本地库分支名>:<远程库分支名> # 将本地库分支名xxx推送给远程库分支名yyy，不建议这么做
git clone <远程库地址> # 从远程库下载代码
git push # 将本地库代码推送到远程库，如果本地库的版本低于远程库，push默认是推不上去的
git fetch # 要想推送成功，必须先确保本地库和远程库的版本一致，fetch它会从远程仓库下载所有代码，但是它不会将代码和当前分支自动合并
git merge 远程库名/远程库分支名 # 使用fetch拉取代码后，必须要手动对代码进行合并
git pull # 从服务器上拉取代码并自动合并
```

注意：推送代码之前，一定要先从远程库中拉取最新的代码

## tag 标签

当头指针没有指向某个分支的头部时，这种状态我们称为分离头指针(HEAD detached)，分离头指针的状态下也可以操作操作代码，但是这些操作不会出现在任何的分支上，所以注意不要在分离头指针的状态下来操作仓库。
如果非得要回到之前的节点对代码进行操作，则可以选择创建分支后再操作

```
git switch <提交id> --detach # 退回到指定节点，不推荐使用会分离头指针
git switch -c <分支名> <提交id> # 退回到指定节点，并创建一个新分支，推荐使用
```

可以为提交记录设置标签，设置标签以后，可以通过标签快速的识别出不同的开发节点：

```
git tag # 列出所有的标签
git tag 版本 # 给当前节点打标签
git tag 版本 提交id # 给指定节点打标签
git push 远程库名 标签名 # 将指定标签推送到远程仓库
git push 远程库名 --tags # 将所有标签推送到远程仓库
git tag -d 标签名 # 删除本地库标签
git push 远程库 --delete 标签名 # 删除远程库标签
```

## gitignore

默认情况下，git 会监视项目中的所有内容，但是有些内容比如`node_modules`目录中的内容，我们不希望它被 git 所管理。我们可以在项目目录中添加一个`.gitignore`文件，来设置那些需要 git 忽略的文件

## github 的静态页面

在 github 中，可以将自己的静态页面直接部署到 github 中，它会给我们提供一个地址使得我们的页面变成一个真正的网站，可以供用户访问
要求：
静态页面的分支必须叫做：gh-pages
如果希望页面可以通过 xxx.github.io 访问，则需要将 github 的仓库名配置为 xxx.github.io

## docusaurus

facebook 推出的开源的静态的内容管理系统，通过它可以快速的部署一个静态网站

- 使用：
  - 网址：
    - https://docusaurus.io
  - 安装：
    - `npx create-docusaurus@latest my-website classic`
  - 启动项目：
    - `npm start`或`yarn start`
  - 构建项目：
    - `npm run build`或`yarn build`
  - 部署项目到 github：
    - `npm run deploy`或`yarn deploy`
    - 上传代码时，两个注意事项：
      - 使用 deploymentBranch 来指定分支
        - deploymentBranch: 'gh-pages'
      - 还需要配置一个环境变量：
        - GIT_USER: github 的用户名
  - 配置项目：
    - docusaurus.config.js 项目的配置文件
  - 添加页面：
    - 在 docusaurus 框架中，页面分成三种：1.page，2.blog，3.doc
  - 案例地址：
    - https://github.com/lilichao/lilichao.github.io
