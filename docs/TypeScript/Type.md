---
sidebar_position: 2
---

# 常用类型

## 类型注解

- TS 是 JS 的超集，所有 JS 代码都是合法的 TS 代码
- 类型注解
  - 作用：通过类型注解可以为变量设置类型

```ts
let a: number = 10
let b: string = 'Hello'
let c: boolean = true

function fn(name: string, times: number): number {
  const str = `你好, ${name}`

  for (let i = 0; i < times; i++) {
    console.log(str)
  }

  return 123
}

const result = fn('孙悟空', 5)
console.log(result)

export {}
```

## 类型推断

- 当我们没有明确指定一个变量的类型时，TS 会自动对变量的类型进行推断
- 所以，通常情况下我们不需要为变量设置类型注解，都交给 TS 自动推断
- 但是有些场景下，TS 无法正确推断出变量的类型，此时我们必须要为变量添加注解

```ts
export {}

let a = 'Hello'
let b: number = 10 // 写的几率很小

let c // 这种情况下，无法推断出正确的类型，必须手动注解！！！
c = '哈哈'
c = 111
```

## 原始值

1. number
2. string
3. boolean
4. bigint 大整数
5. symbol 符号

```ts
export {}

let a: number = 10
a = 0x11
a = 0b111
a = 0o45
a = NaN
a = Infinity

let b: string = 'hello'
b = `Hello ${a}`

let c: boolean = true
c = false

let d: symbol = Symbol()
let e: bigint = 10n
```

## 数组

1. `Array<类型>`
2. 类型[]

```ts
let a: Array<number>
a = [1, 2, 3]

let b: string[]
b = ['a', 'b', 'c']
```

## any

- 表示任意值
- 当我们为一个变量设置 any 后，它可以接收任何值
- 同时它也可以赋值给任意类型的变量
- 当我们为一个变量设置 any 类型后，那么它将跳过所有的 TS 的检查
- 可以对它调用任意属性或方法，但是这将导致运行时出现异常的概率大大增加
- 基于以上特点，在开发时尽量不要使用它
- 声明变量，没有注解也没有赋值，类型会被推断为 any

```ts
export {}

let a: any
a = 10
a = 'Hello'
a = [1, 2, 3]

a.length

let b: boolean = a

let c // 声明变量，没有注解也没有赋值，类型会被推断为any

function sum(a: number, b: number): number {
  return a + b
}
```

## unknown

- 未知类型
  - 它的作用和 any 很像，可以为一个 unknown 类型的变量赋任意类型的值
  - 但是却不能任意的使用 unknown 类型
  - 要使用 unknown 类型的变量，需要结合类型断言或类型守卫

```ts
export {}

let a: unknown
a = 123
a = 'Hello'
a = [1, 2, 3]

// ;(<number[]>a).length
// ;(a as number[]).length

console.log((a as number[]).length)

a = 'Hello'

if (typeof a === 'string') {
  a.toUpperCase()
}
```

## 对象类型

- object 表示一个对象(除了原始值以外的任何值)
  - object 所表示的对象的范围太过宽泛
  - 所以调用 object 的属性或方法时，必须要进行类型检查
  - 开发时不推荐使用 object
- {} 使用对象字面量可以直接声明一个类型(不便于重复使用)
- 语法：
  ```js
  {
    属性名:类型;
    可选属性?:类型;
  }
  ```
- class 直接使用 class 来声明对象的类型
  - 使用 class 进行类型注解时，类本身也会被编译到 js 文件中
- interface TS 中独有的，JS 并不支持
  - 它的定义方式和类相似
  - 注意：interface 只能用来做类型注解，无法用来创建对象，同时不会被编译到 JS 文件中

```ts
let obj: object = { name: '孙悟空' }
obj = new Date()
obj = function () {}

if ('name' in obj) {
  console.log(obj.name)
}

let obj2: { name: string; age?: number } = { name: '孙悟空' }

function sum(a: number, b: number): number {
  return a + b
}

if (typeof obj2.age === 'number') {
  sum(10, obj2.age)
}

class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

let p1: Person = { name: '孙悟空', age: 18 }
let p2: Person = { name: '猪八戒', age: 28 }

let d: Date = new Date()
let r: RegExp = /abc/

interface Dog {
  name: string
  age: number
}

let d1: Dog = { name: '旺财', age: 5 }
```

## 联合类型

- 联合类型允许某个值可以是多种类型中的一种
- 使用联合类型时只能访问联合类型中共有的属性和方法
- 如果想访问某个类型独有的属性或方法，需要使用类型守卫或类型的断言

```ts
export {}

let a: number | string | boolean
a = 123
a = 'Hello'
a = true

interface Person {
  name: string
  age: number
}

interface Dog {
  age: number
}

let someOne: Person | Dog = { name: '孙悟空', age: 18 }
someOne = { age: 20 }

function fn(personOrDog: Person | Dog) {
  console.log(personOrDog.age)

  if ('name' in personOrDog) {
    console.log(personOrDog.name)
  }
}
```

## 交叉类型

交叉类型使用&连接，要求值必须满足多种类型的要求

```ts
export {}

interface Named {
  name: string
}

interface Aged {
  age: number
}

let a: Named & Aged = { name: '孙悟空', age: 18 }
console.log(a.name)
console.log(a.age)
```

## 类型别名

- 就是为类型起的别名，使用 type 关键字来创建
- 注意：类型别名不能重名

```ts
export {}

type str = string
type num = number
type bool = boolean
type strOrNumOrBool = string | number | boolean

let a: str = '123'
let b: strOrNumOrBool = true

interface Named {
  name: string
}

interface Aged {
  age: number
}

type Person = Named & Aged
let c: Person = { name: '孙悟空', age: 18 }
```

## 接口 (interface)

- 接口和类的作用很像，接口是用来定义对象的结构的，而类是用来创建对象的
- 定义接口后，在编译后的 js 文件中是看不到接口的
- 定义接口时，我们无需关心属性和方法的具体实现
- 可以在接口中定义一个对象中含有哪些方法和属性
- 属性修饰符：
  - ? 可选属性
    - 属性名? : 类型
  - readonly 只读属性
    - readonly 属性名 : 类型
- 方法：
  - 方法名(): 返回值
- implements，接口除了可以限制对象外，也可以用来限制类的定义
  - 通过让一个类来实现某个接口，来对该类进行限制
  - 类去实现接口时，必须包含接口中所有的属性
- extends，接口自身也可以继承接口

```ts
export {}

// interface Person {
//   name: string
// }

// interface Person {
//   age: number
// }

// const p: Person = { name: '孙悟空', age: 18 }

interface Person {
  name: string
  readonly age: number
  sayHello?(): void
}

const p: Person = {
  name: '孙悟空',
  age: 18,
  sayHello() {
    console.log('Hello~')
  },
}

console.log(p.age)

// 无法修改
// p.age = 12

interface Animal {
  name: string
  age: number
}

interface Snake extends Animal {
  length: number
}

const snake: Snake = {
  name: '小青',
  age: 5,
  length: 2,
}

// 创建一个类来实现Animal接口
class Dog implements Animal {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  bark() {
    console.log('汪汪汪')
  }
}

class Cat implements Animal {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  miao() {
    console.log('喵喵喵')
  }
}

function fn(animal: Animal) {
  console.log(animal.name)
  console.log(animal.age)

  if (animal instanceof Dog) {
    animal.bark()
  } else if (animal instanceof Cat) {
    animal.miao()
  }
}

fn(new Dog('旺财', 3))
fn(new Cat('咪咪', 2))
```

## 类型断言

- 通过断言可以手动指定类型，从而让变量的类型更加具体
- 断言的语法：
  - `(<类型> 变量).xxxx`
    - 不支持 TSX
  - `(变量 as 类型).xxxx`
- 断言只在编译时有效，使用断言时一定要确保类型正确

```ts
export {}

let str: unknown = 'Hello World'
;(<string>str).length
;(str as string).length
```

## 字面量类型

- 就是将一个值指定为类型
- TS 中常用的字面量类型 string、number
- 通常来讲，字面量都会结合联合类型使用，用来限制某个值的范围
- 类型推断
  - 当我们为一个常量直接赋值一个字面量时，它的类型会自动被推断为当前的字面量
  - 推断对象类型时，let 和 const 没有区别
- as const (常量断言)
  - 将一个值或对象断言为常量
  - 对对象进行常量断言时，对象会变成只读对象

```ts
export {}

let a: 1 = 1 // a只能为1

type Direction = 'left' | 'right' | 'up' | 'down'
type Value = 1 | 2 | 3 | 4 | 5 | 6

let dir: Direction = 'left'
let value: Value = 6 // Ctrl + I 智能提示

let b = 'Hello' // string
const c = 'Hello' // 'Hello'

let d = { x: 1, y: 2 } // { x: number, y: number }
let e = { x: 1, y: 2 } // { x: number, y: number }

let f = 'hi' as const // let f: 'hi' = 'hi'
let g = { x: 1, y: 2 } as const

/* 
  let g = { x: 1, y: 2 } as const
  相当于
  let g: {
    readonly x: 1
    readonly y: 2
  }
*/
```

## 空类型

- null
- undefined
  - null 和 undefined 在 TS 中默认是所有类型的子类型，默认情况下 null 和 undefined 可以赋值给任意类型
  - 但是这样一来会带来很多的隐患，建议在开发时将 strictNullChecks 开启，开启后 null 和 undefined 只能赋值给对应的类型
- void
  - void 表示空类型
  - 默认情况下 void 类型的变量可以接受 undefined 和 null
  - 如果开启了 strictNullChecks，则只能接受 undefined
  - void 用来指定没有返回值的函数的返回值类型

```ts
export {}

let a: string | null = null

function greet(name: string | null) {
  if (typeof name === 'string') {
    console.log(name.length)
  }
}

function fn(): void {}
```

## never

- 用来表示永远不可能出现的类型
- 任何值都不能赋值给 never
- 使用场景
  - 用来设置不可能执行完毕的函数的返回值类型
  - 可以用来对类型进行安全检查

```ts
export {}

function fn(): never {
  throw new Error('出错了')
}

// function fn2(): never {
//   while (true) {}
// }

type Direction = 'left' | 'right' | 'top'

function fn3(dir: Direction) {
  switch (dir) {
    case 'left':
      console.log('左')
      break
    case 'right':
      console.log('右')
      break
    case 'top':
      console.log('上')
      break
    default:
      const unreachable: never = dir
      break
  }
}
```

## 非空断言

!

```ts
export {}

function fn(str: string | null) {
  if (typeof str === 'string') {
    console.log(str.length)
  }

  ;(str as string).length

  // 非空断言，str不为空
  // result: number
  let result = str!.length

  // 可选链
  // result2: number | undefined
  let result2 = str?.length

  if (typeof result2 === 'number') {
  }
}
```

## 控制流分析

- 类型收窄
  - 将一种宽泛的类型限制为更具体的类型
- 控制流分析
  - 通过控制流分析，我们能够在不同的代码路径中获得变量更精确的类型
  - 代码执行时，TS 会对代码的执行过程进行分析
  - 通过对代码流程的分析，从而使得变量的类型变得更加的具体精确

```ts
export {}

// function doSomething(value: string | number) {
//   if (typeof value === 'string') {
//     return value.toUpperCase()
//   }

//   value += 10
// }

function doSomething(value: string | number) {
  if (typeof value === 'string') {
    value.toUpperCase()
  } else {
    value += 10
  }
}
```

## typeof

- 在 JS 中可以通过 typeof 来检查值的类型，会返回一个字符串作为结果
  - string、boolean、number、undefined、object、function、bigint、symbol...
- 在 TS 中如果将 typeof 用在流程控制语句中，TS 会根据 typeof 的结果自动对类型进行收窄

```ts
export {}

function doSomething(value: string | number) {
  if (typeof value === 'string') {
    value.toUpperCase()
  } else {
    value += 10
  }
}
```

## 相等性收窄

- 利用相等运算符来对类型进行收窄
- 由于相等和不等在 JS 中会导致自动的类型转换，所以建议使用全等和不全等来进行收窄

```ts
export {}

function fn(str: string | undefined) {
  if (str !== undefined) {
    str.toUpperCase()
  }
}

// 圆形
interface Circle {
  kind: 'circle'
  radius: number
}

// 正方形
interface Square {
  kind: 'square'
  sideLength: number
}

type Shape = Circle | Square

// 求面积
function getArea(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
  return shape.sideLength ** 2
}
```

## in 运算符

- in 收窄
  - 通过检查类型中是否含有某个属性来收窄类型

```ts
export {}

// 圆形
interface Circle {
  radius: number
}

// 正方形
interface Square {
  sideLength: number
}

type Shape = Circle | Square

// 求面积
function getArea(shape: Shape): number {
  if ('radius' in shape) {
    return Math.PI * shape.radius ** 2
  }
  return shape.sideLength ** 2
}
```

## instanceof

- 用来检查某个类的原型是否出现在了某对象的原型链
- instanceof 只适用检查类和实例的关系

```ts
export {}

function fn(value: string[] | Date) {
  // if (value instanceof Object) {
  //   value
  // } else {
  //   value
  // }

  if (Array.isArray(value)) {
    console.log(value.length)
  }
}
```

## 赋值收窄

当我们为一个联合类型的变量赋一个准确的值时，TS 会自动根据所赋的值对变量的类型进行收窄

```ts
export {}

let a: string | number | boolean

a = 'Hello'

a = 123

a = true

a = Math.random() > 0.5 ? 'Hello' : 111

a
```

## 类型谓词

- 在对值的类型进行判断时，如果有一些类型需要经常判断，或有些类型的判断比较复杂
  - 此时我们就习惯性希望可以将这些验证封装到一个函数中，然后通过函数的返回值来判断类型
- 但是如果我们直接创建一个返回布尔值的函数，对于 TS 来说这就是一个普通的函数，无法用来进行类型收窄
- 类型谓词
  - 类型谓词是一个特殊返回值的类型，设置后 TS 会根据这个函数的返回值来对值的类型进行收窄
  - p is T

```ts
export {}

// 圆形
interface Circle {
  kind: 'circle'
  radius: number
}

// 正方形
interface Square {
  kind: 'square'
  sideLength: number
}

type Shape = Circle | Square

// 创建一个函数，用来验证一个Shape是否是圆形
function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle'
}

// 求面积
function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2
  }
  return shape.sideLength ** 2
}
```

## 断言函数

- 断言
  - 断定一个事真伪，并在判断错误时抛出异常
- 断言函数
  - 创建一个起到断言作用的函数
  - asserts 条件
  - 条件就是一个类型谓词
  - 断言函数用来为一个类型进行断言，断言后变量的类型就会被 TS 收窄
  - 如果断言正确，则什么也不需要做，如果断言错误，通常会在断言函数中抛出异常终止程序！
  - 断言函数通常不需要返回值，通常会在断言失败时报错

```ts
export {}

interface Circle {
  kind: 'circle'
  radius: number
}

function isCircle(value: any): asserts value is Circle {
  // 断言函数通常不需要返回值，通常会在断言失败时报错
  if (value.kind !== 'circle') {
    throw new Error('value的类型不是Circle')
  }
}

// let a: unknown = { kind: 'circle' }
let a: unknown = {}

// ;(a as Circle).kind

// 调用了断言函数，那么在函数后边所有的a的类型都会被确认为Circle
isCircle(a)

console.log(a.kind)
```

## 断言函数

- ts-node
  - 安装：
    - npm i ts-node -g
  - 执行：
    - ts-node .\src\24\_断言函数.ts
  - 作用：
    - 可以直接执行 ts 代码，不用将 ts 代码编译为 js 代码
- 断言函数实际上是 TS 中一种运行时的类型检查方式
- 代码即使写的再好，依然不能完全避免运行时的错误
- 比如：当我们去调用后台接口去加载数据时，后台所返回的数据需要经过前端的渲染然后显示
- 但是我们作为前端是无法保证后台的数据结构的准确的，这时就会引起运行时的异常

```ts
export {}

interface Data {
  message: string
}

function isData(data: any): asserts data is Data {
  if (data.message === undefined) {
    throw new Error('data的结构有误')
  }
}

// 创建一个函数，模拟从后台加载数据的情况
function getData(): Promise<Data> {
  return new Promise((resolve, reject) => {
    // 从服务器加载过来的数据
    const data = { messagea: '这是一个消息' }

    // 对data做一系列的检查，如果正确则调用resolve()返回数据，错误则调用reject()来报错
    // 也可以使用断言函数来断言data的类型
    isData(data)
    resolve(data)
  })
}

getData()
  .then((res) => {
    console.log(res.message)
  })
  .catch((err) => {
    console.log('出错了', err)
  })
```
