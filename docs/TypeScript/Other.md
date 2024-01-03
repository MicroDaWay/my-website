---
sidebar_position: 6
---

# 其他

## 命名空间 (namespace)

为了在模块化系统不完善时的一个补充

```ts
export {}

namespace MyModule {
  let a = 10
  export let b = 'hello'
  export function fn() {}
}

console.log(a)
console.log(MyModule.b)
console.log(MyModule.fn)
```

## 枚举 (Enum)

- 枚举就是常量的集合
- 使用 enum 关键字来定义一个枚举
  - 默认情况下，成员的值是自上向下为 0 开始的整数
  - 也可以根据需要自行指定成员的值
- 声明枚举时使用 const 关键字，会使得枚举变为常量枚举
  - 常量枚举使用时会直接转换为字面量而不会被编译到 js 中
  - 所以所有的运行时功能常量枚举都不支持

```ts
export {}

let status = 1

enum Status {
  PENDING, // 相当于 PENDING: 0
  Approved, // 相当于 Approved: 1
  REJECTED, // 相当于 REJECTED: 2
}

if (status === Status.PENDING) {
  console.log('加载中...')
} else if (status === Status.Approved) {
  console.log('加载成功')
} else if (status === Status.REJECTED) {
  console.log('加载失败')
}

console.log(Status.PENDING) // 0
console.log(Status[2]) // REJECTED

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

function setColor(color: Color) {}

setColor(Color.Blue)

const enum Num {
  One,
  Two,
  Three,
}

const name = 'One'
// const name = 'Blue'

let a = Num.One // 常量枚举
let b = Color.Blue // 普通枚举

// let c = Num[name] // 错误
// let d = Color[name]
```

## 声明 (declare)

- 在编译阶段声明一个变量、函数、类型、类或模块等，但是不对其进行实现
- 通过编写声明可以帮助 TS 来识别 JS 库的代码

```ts
export {}

// 声明了一个全局变量
declare let myGlobal: number
declare function printLog(msg: string): void

declare class JQueryInstance {
  test(): string
}

declare function jQuery(selector: string): JQueryInstance
declare var $: typeof jQuery

$('#box').test()
```

## 声明

- 三斜线指令用来将 d.ts 文件和当前文件进行关联，使用的比较少了
- 必须写在文件的最前面
- 声明文件(d.ts)
  - 声明文件就是专门用来存放声明的文件已.d.ts 结尾
  - 在声明文件中可以省略 declare

```ts
/* 
  /// <reference path="../../types/global.d.ts" />
*/

export {}

hello.at(-1)
sayHello()
```

**global.d.ts**

```ts
let hello: string
function sayHello(): void
```

## 声明文件

```ts
import Person, { abc } from '../../types/scope'

export {}

let a: typeof abc = 'hello'
console.log(a)

let p: Person = {
  name: '孙悟空',
  age: 18,
  gender: '男',
  address: '花果山',
}

console.log(p)
```

**scope.d.ts**

```ts
export let abc: string
export default interface Person {
  name: string
  age: number
  gender: string
  address: string
}
```

## 声明文件

- 声明文件的位置
  - 根目录/types 自己编写的声明文件
  - 模块源码目录 模块作者自己编写声明文件
  - node_modules/@types 第三方的声明文件
  - 在 TS 中使用 JS 模块,时，除了要下载模块本身外还需要下载模块的声明文件，以帮助 TS 识别类型

## 装饰器

- 装饰器本质就是一个高阶函数
- 通过装饰器可以在不修改原来代码的情况下，对类、属性、方法、访问器、参数进行修改
- 装饰器是可以直接修改类的，但是使用中尽量遵循 OCP(开闭原则)
- 使用装饰器
  - 装饰器在 TS 中是一个实验性功能，需要在配置文件中开启
  - "experimentalDecorators": true 用于开启 TS 中的装饰器

```ts
export {}

// 定义一个装饰器，装饰器本质就是一个高阶函数
// 需要根据装饰器类型的不同定义不同的参数
// 类装饰器需要一个参数，参数类型就是类
function render(target: Function) {
  const oldRender = target.prototype.render

  target.prototype.render = function () {
    return `<h1>${oldRender.apply(this)}</h1>`
  }
}

@render
class Person {
  constructor(public name: string) {}

  render() {
    return this.name
  }
}

@render
class News {
  constructor(public title: string) {}

  render() {
    return this.title
  }
}

const p = new Person('孙悟空')
const n = new News('孙悟空大闹天宫')

console.log(p.render())
console.log(n.render())
```

## 类装饰器

- 参数：
  - 被装饰的类
- 作用：
  - 修改类
- 修改方式：
  - 直接修改，通过类直接对其进行修改
    - 通过装饰器添加的属性无法直接访问
  - 返回一个新的类，替换旧的类
    - 新的类必须得是旧类的子类

```ts
export {}

function render(target: Function) {
  const oldRender = target.prototype.render

  target.prototype.render = function () {
    return `<h1>${oldRender.apply(this)}</h1>`
  }
}

function deco(target: Function) {
  target.prototype.age = 18
}

function deco2<T extends { new (...args: any[]): any }>(target: T) {
  return class extends target {
    render() {
      return `<h1>${super.render()}</h1>`
    }
  }
}

// @deco
@deco2
class Person {
  constructor(public name: string) {}

  render() {
    return this.name
  }
}

const p = new Person('孙悟空')
// console.log((p as any).age)

// console.log(Person)
console.log(p.render())

// function Component(target: Function) {
//   target.prototype.selector = 'my-news'
//   target.prototype.template = '<h1>今天天气真不错</h1>'
// }

// 装饰器工厂，一个返回装饰器的函数
function Component(options: { selector: string; template: string }) {
  return function (target: Function) {
    target.prototype.selector = options.selector
    target.prototype.template = options.template
  }
}

@Component({
  selector: 'my-news',
  template: '<h1>今天天气真不错</h1>',
})
class News {
  constructor(public title: string) {}

  render() {
    return this.title
  }
}
```

## 属性装饰器

- 属性装饰器定义在属性之上，不能修改属性！
- 主要用来在属性上附加一些元数据！
- 属性装饰器需要两个参数：
  - target
    - 如果是静态属性，target 是类 (Class)
    - 如果是实例属性，target 是原型 (Class.prototype)
  - propertyName
    - 属性名
- 属性装饰器，无法对实例属性进行任何实质的读取和修改
- 在属性装饰器中，只能对原型进行一些操作

```ts
export {}

function deco(target: any, propName: string) {
  // 实例属性 {} name target === Person.prototype
  // 静态属性 Person age
  console.log(target, propName, target[propName])
}

class Person {
  @deco
  name = '孙悟空'

  @deco
  static age = 18
}
```

## 元数据 (metadata)

- 元数据就是用来描述数据的数据
- 使用元数据
  - 通常会使用 reflect-metadata 来处理元数据
  - 这是一个对 ES 中原生 Reflect 扩展工具
  - 使用步骤：
    - 安装
      - `npm i reflect-metadata`
    - 引入
      - import "reflect-metadata"
- Reflect.defineMetadata (存储元数据)
  - metadataKey (字符串或符号)
  - metadataValue(任意值)
  - 对象(原型对象)
  - 属性名
- Reflect.getMetadata (读取元数据)
- Reflect.deleteMetadata (删除元数据)
  - metadataKey (字符串或符号)
  - 对象(原型对象)
  - 属性名

```ts
import 'reflect-metadata'

export {}

class User {
  username: string
  password: string
  nickname: string

  constructor(username: string, password: string, nickname: string) {
    this.username = username
    this.password = password
    this.nickname = nickname
  }
}

const user = new User('', '', '')

const reqKey = Symbol()

// Reflect.defineMetadata(reqKey, '哈哈', User.prototype)
// console.log(Reflect.getMetadata(reqKey, user))

Reflect.defineMetadata(reqKey, true, User.prototype, 'username')
console.log(Reflect.getMetadata(reqKey, user, 'username'))

function checkRequired(user: User) {
  for (const propName in user) {
    if (propName === 'username' || propName === 'password') {
      if (!user[propName]) {
        console.log(`${propName}是必须的`)
      }
    }
  }
}

// checkRequired(user)
```

## 属性装饰器

- Reflect.metadata()
  - 创建元数据的装饰器

```ts
import 'reflect-metadata'

export {}

const reqKey = Symbol()

function required(target: any, propName: string) {
  Reflect.defineMetadata(reqKey, true, target, propName)
}

// Reflect.metadata()
// 创建元数据的装饰器

class User {
  @required
  username: string
  @Reflect.metadata(reqKey, true)
  password: string
  nickname: string

  constructor(username: string, password: string, nickname: string) {
    this.username = username
    this.password = password
    this.nickname = nickname
  }
}

const user = new User('', '', '')

// Reflect.defineMetadata(reqKey, true, User.prototype, 'username')
// Reflect.defineMetadata(reqKey, true, User.prototype, 'password')

// 检查是否传递了必要的字段
function checkRequired(obj: { [key: string]: any }) {
  for (const propName in obj) {
    if (Reflect.getMetadata(reqKey, obj, propName)) {
      if (!(obj as any)[propName]) {
        console.log(`${propName}是必须的`)
      }
    }
  }
}

checkRequired(user)
```

## 方法装饰器

- 用于对方法进行扩展，修改
- 参数：
  - target 被装饰的对象
    - 静态方法 类
    - 实例方法 原型
  - methodName 方法名
  - descriptor 描述符
    - value: [Function: sayHello],
    - writable: true,
    - enumerable: false,
    - configurable: true
- 返回值：
  - 返回的对象会作为新的描述符使用

```ts
export {}

function deco(target: any, methodName: string, descriptor: PropertyDescriptor) {
  // console.log(target, methodName, descriptor)
  descriptor.value = () => {
    console.log('新函数')
  }
}

function logger(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const oldMethod: Function = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(`${methodName}执行了，${new Date()}`)
    const result = oldMethod.apply(this, args)
    console.log(`${methodName}执行结束了，${new Date()}`)
    return result
  }
}

class Person {
  sayHello() {
    console.log('sayHello()方法')
  }

  @logger
  sum(a: number, b: number) {
    return a + b
  }
}

const p = new Person()
const result = p.sum(10, 20)
console.log(result)
```

## 访问器装饰器

- 用于修饰访问器(getter 和 setter)
- 参数和方法装饰器一样

```ts
export {}

function setterLog(target: any, propName: string, descriptor: PropertyDescriptor) {
  // console.log(descriptor)

  const oldSet = descriptor.set
  const oldGet = descriptor.get

  descriptor.set = function (value: any) {
    console.log(`${propName}被修改了，${new Date()}`)
    oldSet?.call(this, value)
  }

  descriptor.get = function () {
    return `<h1>${oldGet?.apply(this)}</h1>`
  }
}

class Person {
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  get name() {
    return this._name
  }

  @setterLog
  set name(value) {
    this._name = value
  }
}

const p = new Person('孙悟空')
p.name = '猪八戒'
console.log(p.name)
```

## 参数装饰器

- 用来装饰参数，为其附加一些元数据
- 参数：
  - target 被装饰的对象
  - methodName 方法名
  - parameterIndex 参数索引

```ts
export {}

function deco(target: any, methodName: string, parameterIndex: number) {
  console.log(target, methodName, parameterIndex)
}

class Person {
  sum(a: number, @deco b: number) {
    return a + b
  }
}
```

## 装饰器的执行顺序

工厂顺序：实例 --> 静态 --> 类

```ts
export {}

function deco(name: string) {
  // console.log('工厂调用了', name)

  return function (...args: any[]) {
    // console.log('装饰器执行了', name)
  }
}

// 工厂顺序 实例 --> 静态 --> 类

@deco('类')
class Person {
  @deco('实例属性')
  name = '孙悟空'

  @deco('静态属性')
  static age = 18

  @deco('实例方法')
  sum(a: number, @deco('实例参数') b: number) {
    return a + b
  }

  @deco('静态方法')
  static sayHello(@deco('静态参数') value: string) {
    console.log(`Hello ${value}`)
  }
}

function fn(name: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const oldTest: Function = descriptor.value

    descriptor.value = function () {
      console.log(`${name}开始`)
      oldTest.apply(this)
      console.log(`${name}结束`)
    }
  }
}

/* 
  1开始
  2开始
  3开始
  test方法...
  3结束
  2结束
  1结束
*/

class Dog {
  @fn('1')
  @fn('2')
  @fn('3')
  test() {
    console.log('test方法...')
  }
}

const dog = new Dog()
dog.test()
```
