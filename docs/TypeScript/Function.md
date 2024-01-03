---
sidebar_position: 3
---

# 函数

## 函数

- 函数的类型注解
  - 使用 Function
    - 开发时几乎不用，因为它的限定范围过于宽泛，使用意义不大
  - 函数类型表达式
    - 语法：(参数列表) => 返回值
  - 使用调用签名
    - 适用于更加复杂的函数
    - 调用签名需要在对象或接口中使用，使用后即表示该类型是一个可调用的类型(函数)

```ts
export {}

let fn: Function

fn = function () {}
fn = (a: string) => {}

let fn2: (str: string) => number

fn2 = function (str: string) {
  return 111
}

type MyFunction = (str: string) => number
let fn3 = (str: string) => 111

type MyFunction2 = {
  (a: number, b: number): number
  hello: string
}

// function fn4(a: number, b: number) {
//   return a + b
// }

// fn4.hello = '哈哈'

// let sum: MyFunction2 = fn4

let sum: MyFunction2 = function (a: number, b: number) {
  return a + b
} as MyFunction2

sum.hello = '哈哈'

interface MyFunction3 {
  (a: string, b: string): number
}

let getStr: MyFunction3 = (a: string, b: string) => {
  return a.length + b.length
}
```

## 函数的类型注解

- 参数：
  - 参数名
    - 类型的参数名和值的参数名不需要一致
    - 最终的函数的签名以类型为准，所以尽量将类型中的参数名写得有意义一些
  - 参数的数量
    - 值中的参数数量不能多余类型定义的参数数量
    - 为了兼容旧版本 js 的函数，所以值中的参数个数可以少于类型中定义的参数个数
  - 参数的类型
    - strictFunctionTypes 开启时
      - 值中的参数类型不能比类型中的参数类型还具体
      - 值的参数类型 > 类型的参数类型
    - strictFunctionTypes 关闭时(双向协变)
      - 此时只要值中的参数类型被类型中的参数类型所包含即可
    - strictFunctionTypes 对于方法无效
- 返回值：
  - void
    - void 表示没有返回值或返回值没用

```ts
export {}

type MyFunction = (str: string, num: number) => number

let fn: MyFunction = (a: string) => a.length

type MyFunction2 = (params: string | number) => number

let fn2: MyFunction2 = (a: string | number) => 123

interface MyObj {
  test(params: string | number): void
}

let obj: MyObj = {
  // strictFunctionTypes对于方法无效，所以这里可能会出现运行时异常
  test(str: string) {},
}

type MyFunction3 = () => void

let fn3: MyFunction3 = () => 111
```

## 构造签名

构造签名的主要作用，是用来描述类的

```ts
export {}

interface MyFn {
  new (age: number): any
}

type MyFn2 = {
  new (): any
}

interface MyFn3 {
  new (): any
  (): any
}

let Fn: MyFn = class {
  age: number

  constructor(age: number) {
    this.age = age
  }
}

let fn = new Fn(18)

let Fn2: MyFn2 = function () {} as any
```

## 使用的场景

```ts
export {}

type MyFunction = (str: string) => void

// 直接使用函数类型来限制变量
let fn: MyFunction = (a) => 'hello'

// 用来限制回调函数的结构
function eventHandler(event: string, callback: MyFunction) {}

eventHandler('hello', (a) => {})
```

## 可选参数

- 在定义函数类型时，可以将参数设置为可选参数
- 只需要在参数后添加一个?则表示当前的参数是一个可选的参数
- 可选参数可以设置多个，它们必须位于参数列表的最后！
- 可选参数后边只能是可选参数

```ts
export {}

type MyFunction = (str?: string, num?: number) => void

let fn: MyFunction = (str, num) => 111

fn('hello')
```

## 剩余参数

剩余参数只能有一个，以...开头，需要添加数组类型的注解

```ts
export {}

type MyFunction = (str: string, num?: number, ...args: any[]) => void
```

## 泛型

```ts
export {}

function firstElement<T>(arr: T[]): T {
  return arr[0]
}

let r1 = firstElement<string>(['hello', 'world'])
let r2 = firstElement<number>([1, 2, 3])
console.log(r2)
```

## 泛型

- 泛型是一种在定义函数、类、接口、类型别名时不指定具体类型，而在使用时在指定类型的编程方法。
- 泛型也可以被推断，如果使用时不指定泛型的类型，TS 会自动推断其类型

```ts
export {}

function fn<T>(arg: T): T {
  return arg
}

fn<string>('Hello')

interface MyInterface<T> {
  get(): T
}

let obj: MyInterface<string> = {
  get() {
    return 'hello'
  },
}

class MyClass<T> {
  property: T

  constructor(property: T) {
    this.property = property
  }
}

type MyType<T> = T
```

## 泛型的约束

- 在定义泛型时，可以通过 extends 关键字来对泛型进行约束
- 语法：
  - 泛型 extends 类型
- 例子：
  - `T extends { length: number }`
  - K extends keyof T
- keyof 运算符，可以获取一个类型(接口、类、类型别名)中的所有属性名

```ts
export {}

function getLength<T extends { length: number }>(value: T): number {
  return value.length
}

getLength('hello')
getLength([1, 2, 3])

function getProperty<T, K extends keyof T>(obj: T, propName: K) {
  return obj[propName]
}

interface Person {
  name: string
  age: number
  gender: string
}

type objKeys = keyof Person // "name" | "age" | "gender"
let a: objKeys = 'name'

getProperty({ name: '孙悟空', age: 18 }, 'age')
```

## 重载

- 重载指为一个函数提供多个函数签名，根据传递参数的不同调用不同函数签名
- 一个函数对应多个函数签名
- 语法：
  - 函数签名 1
  - 函数签名 2
  - ......
  - 函数实现(){}
  - 当我们调用重载函数时，TS 会自动根据参数的个数和类型自动自上向下匹配签名

```ts
export {}

function sum(a: number, b: number): number
function sum(a: string, b: string): string
function sum(a: string, b: number): string
function sum(a: number, b: string): string
function sum(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b
  } else if (typeof a === 'string' && typeof b === 'number') {
    return a + b
  } else if (typeof a === 'number' && typeof b === 'string') {
    return a + b
  }

  throw new Error('Type Error')
}

let result = sum(1, 1)
```

## 重载

- 重载签名
- 实现签名
  - 实现签名不会在调用时显示
  - 实现签名应该覆盖重载签名的所有参数和返回值
  - 调用函数时，实参必须能和某个重载签名完全匹配，否则会报错
  - 如果能够使用联合类型来实现，就尽量不用重载

```ts
export {}

// 这个重载没有什么太大的意义
function fn(a: string): void
function fn(a: boolean, b: number): void
function fn() {}

fn('hello')
fn(true, 123)

function fn2(a: string): void
function fn2(a: boolean, b: number): void
function fn2(a: string | boolean, b?: number) {}

function len(a: string): number
function len(a: any[]): number
function len(a: string | any[]): number {
  return a.length
}

len('hello')
len([1, 2, 3])

// 错误的
// len(Math.random() > 0.5 ? 'hello' : [1, 2, 3])

function len2(a: string | any[]): number {
  return a.length
}

len2('hello')
len2([1, 2, 3])
len2(Math.random() > 0.5 ? 'hello' : [1, 2, 3])
```

## this

- 由于我们开启了严格模式，直接访问 this 会出现问题
- noImplicitThis 开启后会禁止 this 有隐式的 any 的类型
- 在函数中可以通过第一个参数来为 this 做类型注解
- 在箭头函数中不能指定 this

```ts
export {}

function fn(this: any) {
  console.log(this)
}

class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHello(this: Person) {
    console.log(this.name)
  }

  test = () => {
    console.log(this.age)
  }
}

function filterPerson(filter: (this: Person) => boolean) {}

filterPerson(function () {
  console.log(this.name)
  return true
})

filterPerson(() => {
  return true
})
```
