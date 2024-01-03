---
sidebar_position: 4
---

# 对象

## 可选和只读

- readonly 表示只读属性
- ?表示可选属性
- 当我们为一个接口类型直接赋值一个字面量时，会进行额外属性检查
- 属性的只读只是在 TS 编译时做的限制，并没有在 JS 层面对属性产生实质影响

```ts
export {}

interface Person {
  readonly name: string
  age?: number
}

const p: Person = { name: '孙悟空', age: 18 }

console.log(p.name)
// 无法修改
// p.name = '猪八戒'

const obj: { name: string; age?: number } = p

// 可以修改，但没有意义
obj.name = '猪八戒'
console.log(p.name)
```

## 索引签名

- 用来设置类型中索引(属性、键)和值的类型
- 语法：[名字: 类型]:类型
- TS 中支持的属性名的类型：
  - string
  - number
  - symbol
- 在对象中，所有以数字为属性的属性名，最终都会转换为字符串

```ts
export {}

interface Inter {
  [propName: string]: string | number
}

const obj: Inter = { name: '孙悟空', age: 18, 0: 123 }

interface Inter2 {
  [propName: number]: string | number
}

const obj2: Inter2 = [1, 2, 3, 'hello']
```

## 索引签名

索引签名可以混合使用

```ts
export {}

interface Inter {
  [key: symbol]: string
}

const s = Symbol()

const obj: Inter = { [s]: 'hello' }

// console.log(obj[s])

// 索引签名可以混合使用
// 下边的例子，就避免了额外属性检查
// 其他属性的类型必须是string属性的子类型
interface Inter2 {
  // [propName: string]: string | number
  [propName: string]: any
  name: string
  age: number
}

const obj2: Inter2 = { name: '孙悟空', age: 18, gender: '男' }

interface Inter3 {
  [propName: string]: number | string
  [index: number]: number
}

const obj3: Inter3 = { name: '孙悟空', 0: 123 }
// const obj4: Inter3 = [1, 2, 3]
```

## 接口继承和交叉类型

- 接口继承：
  - 继承后子接口将拥有父接口中全部属性定义
  - 继承可以多重继承
  - 接口之间是继承！类和接口之间是实现！类和类之间是继承！
- 交叉类型：
  - 交叉类型混合两种类型
- 区别：
  - 继承发生在接口(或类)之间，交叉类型只要是类型就可以进行
  - 发生冲突属性时，接口会报错！交叉类型会合并出 never

```ts
export {}

interface A {
  name: string
}

interface B {
  age: number
}

interface C extends A, B {
  gender: string
}

let c: C = { name: '孙悟空', age: 18, gender: '男' }

class D implements A, B {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

type E = A & B

let e: E = { name: '孙悟空', age: 18 }

interface F {
  name: string
  gender: string
}

interface G {
  age: number
  gender: boolean
}

// interface H extends F, G {}

type H = F & G
```

## 只读数组

- 只读数组
  - 数组中的元素只能读不能修改
  - `ReadonlyArray<元素类型>`
  - readonly 元素类型 []
- 只读集合
  - Map
    - `ReadonlyMap<键的类型, 值的类型>`
  - Set
    - `ReadonlySet<值的类型>`

```ts
export {}

const arr: ReadonlyArray<number> = [1, 2, 3]
const arr2: readonly string[] = ['hello', 'world']

const map: ReadonlyMap<string, number> = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
])

const set: ReadonlySet<string> = new Set(['hello', 'world'])

for (let item of set) {
  console.log(item)
}
```

## 元组 (tuple)

- 元组是一个特殊的数组
- 使用元组时可以为每个元素分别指定类型，同时可以限制元素的数量
- 除了数量固定，类型分别指定外，元组和数组使用的方式是一样的
- 元组适用于强约定的 API
- 元组也支持可选元素和可变元素

```ts
export {}

let tuple: [string, number] = ['hello', 123]

function fn(person: [string, number, string]) {}

fn(['孙悟空', 18, '男'])

function fn2() {
  return [() => {}, true, null]
}

function fn3(a: string, b: number, ...args: [string, number, boolean]) {}

fn3('hello', 123, 'abc', 111, true)

let tuple2: readonly [number, string] = [111, 'test']

let tuple3: [number, boolean?] = [123]

let tuple4: [number, string, ...boolean[]] = [123, 'hello', true, false]
let tuple5: [number, ...boolean[], string] = [123, true, false, 'hello']
let tuple6: [...boolean[], number, string] = [true, false, 123, 'hello']
```

## 获取类型

- keyof
  - 用来获取类型的所有属性
- typeof
  - 在 ts 中可以通过 typeof 来获取一个值的类型
  - 对于原始值就是返回对应的类型
  - 对于常量(或 as const)返回的是字面量类型
  - 对于对象类型，返回对象的类型签名
  - 如果使用常量断言，则获取到的对象的属性都是只读的！
- 属性类型
  - 通过 类型["属性名"] 来获取属性的类型

```ts
export {}

interface Person {
  name: string
  age: number
  gender: string
}

type PersonProperties = keyof Person // 'name' | 'age' | 'gender'
let a: PersonProperties = 'name'

let obj = {
  name: '孙悟空',
  age: 18,
}

type ObjProperties = keyof typeof obj // 'name' | 'age'
let b: ObjProperties = 'age'

const obj2 = {
  name: '孙悟空',
  age: 18,
}

let c = 'hello' as const // 'hello'
type GetType = typeof obj2

type PropertyType = Person['name'] // 获取Person的name属性的类型 string
type PropertyType2 = typeof obj2.name // 获取obj2的name属性的类型 string
```

## 条件类型

- 根据不同的条件返回不同的类型
- 语法：
  - T extends U ? X : Y
- 条件类型在日常常规开发中使用几率并不高
- 它主要用来在开发中编写一些类型工具
- infer 用来表示 TS 自动推断

```ts
export {}

let a: number
type isString<T> = T extends string ? 'YES' : 'NO'
let b: isString<typeof a> = 'NO'

type NumberArray = number[]
// 获取数组中元素的类型
// infer 用来表示TS自动推断
type ElementType<T> = T extends Array<infer U> ? U : T
let c: ElementType<NumberArray>
```

## 映射类型

- 根据已有的类型创建一个新的类型
- 映射类型只支持对象字面量的语法
- 创建映射类型时，可以根据需要对原类型中的属性进行修改
- 内置工具类：
  - `Readonly<泛型 T> 创建所有属性都是只读的 T 类型`
  - `Partial<泛型 T> 创建所有属性都是可选的 T 类型`
- 映射修改器：
  - +readonly
  - -readonly
  - +?
  - -?

```ts
export {}

interface Person {
  name: string
  age: number
  gender: string
}

// MyPerson是对Person结构的完全复制
type MyPerson = {
  [P in keyof Person]: Person[P]
}

let a: MyPerson = { name: '孙悟空', age: 18, gender: '男' }

// 将所有属性设置为只读属性
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

let b: MyReadonly<Person> = { name: '孙悟空', age: 18, gender: '男' }

// 将所有属性设置为可选属性
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

let c: MyPartial<Person> = { name: '孙悟空' }

interface Animal {
  name?: string
  readonly age: number
}

// 去除属性的可选性和只读性
type MyAnimal = {
  -readonly [P in keyof Animal]-?: Animal[P]
}

let d: MyAnimal = { name: '旺财', age: 5 }
```

## 工具类型

- TS 中为我们提供的一组用于操作类型的方法
- 泛型中的字母：
  - T Type 类型
  - U 第二个类型
  - K Key 键(属性名)
- 例子：
  - `Partial<泛型 T> 将属性设置为可选属性`
  - `Readonly<泛型 T> 将属性设置只读`
  - `Required<泛型 T> 将属性变为必须的属性`
  - `Pick<T, K> 从 T 类型中挑选出指定属性 K`
  - `Omit<T, K> 从 T 类型中移除指定属性 K`
  - `Record<K, T> 创建一个新的类型`
  - `Exclude<T, U> 将 U 中类型从 T 中排除`
  - `Extract<T, U> 将 T 中符合 U 的类型取出`
  - `NonNullable<泛型 T> 将类型中空值和 undefined 去除`

```ts
export {}

// Required
interface Todo {
  title?: string
  description?: string
}

let todo: Required<Todo> = { title: '标题', description: '描述' }

function printObj<T>(obj: Required<T>) {
  console.log(obj)
}

printObj<Todo>({ title: '标题', description: '描述' })

// Pick和Omit
interface Person {
  name: string
  age: number
  gender: string
  address: string
}

let p: Pick<Person, 'name' | 'age'> = {
  name: '孙悟空',
  age: 18,
}

interface ButtonProps {
  color: string
  onclick: () => void
  text: string
  disabled?: boolean
}

let props: Pick<ButtonProps, 'color'> = {
  color: 'red',
}

let props2: Omit<ButtonProps, 'onclick'> = {
  color: 'red',
  text: 'hello',
}

// Record
type MyType = Record<'name' | 'gender' | 'address', string>
let p2: MyType = { name: '孙悟空', gender: '男', address: '花果山' }

let personRecord: Record<'Tom' | 'Jerry', Person> = {
  Tom: { name: 'Tom', age: 5, gender: '男', address: 'x' },
  Jerry: { name: 'Jerry', age: 6, gender: '男', address: 'y' },
}

// Exclude
type M1 = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type M2 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'

// Extract
type M3 = Extract<'a' | 'b' | 'c', 'a'> // 'a'
type M4 = Extract<'a' | 'b' | 'c', 'a' | 'b'> // 'a' | 'b'

type T1 = NonNullable<number | string | null | undefined> // string | number

function fn<T>(arr: T[]): NonNullable<T>[] {
  return arr.filter((item) => item !== null && item !== undefined) as NonNullable<T>[]
}

let result = fn([1, 2, undefined, null])
console.log(result)
```

## 字符串的工具类型

- `Uppercase<字符串类型>`
  - 将字符串字面量类型转换为大写
- `Lowercase<字符串类型>`
  - 将字符串字面量类型转换为小写
- `Capitalize<字符串类型>`
  - 将字符串字面量类型转换为首字母大写
- `Uncapitalize<字符串类型>`
  - 将字符串字面量类型转换为首字母小写

```ts
export {}

type MyType = 'hello'

let a: Uppercase<MyType> = 'HELLO'

let b: Lowercase<'HELLO'> = 'hello'

let c: Capitalize<MyType> = 'Hello'

let d: Uncapitalize<'HELLO'> = 'hELLO'
```

## 映射类型

- 通过映射类型来修改属性名
  - 可以通过 as 来修改映射类型中属性名
  - 例子：
    - [P in keyof Person as "hello"]
    - "name" -> "hello"
    - "name" | "age" -> "my_name" | "my_age"

```ts
export {}

interface Person {
  name: string
  age: number
}

type NewPerson = {
  [P in keyof Person as `my${Capitalize<P>}`]: Person[P]
}

interface Person2 {
  name: string
  age: number
  1: number
}

// [P in keyof Person2 as `${string & P}`]
// "name" | "age" | 1 -> "name" | "age"

type NewPerson2 = {
  [P in keyof Person2 as `${string & P}`]: Person2[P]
}

type NewPerson3 = {
  [P in keyof Person2 as `${Exclude<P, 1>}`]: Person2[P]
}

type NewPerson4 = {
  [P in keyof Person2 as `${Extract<P, 'name' | 'age'>}`]: Person2[P]
}

type NewPerson5 = {
  [P in keyof Person2 as `my${Capitalize<string & P>}`]: Person2[P]
}

type NewPerson6 = {
  [P in keyof Person2 as P extends string ? `my${Capitalize<P>}` : never]: Person2[P]
}
```

## 模板字符串类型

模板字符串定义字面量类型，可以和其他类型进行拼接

```ts
export {}

type Fruit = 'apple' | 'orange' | 'banana'

type Hello = `Hello ${Fruit}` // "Hello apple" | "Hello orange" | "Hello banana"

// 监视对象的属性变化，获取到新的值
// obj : 被监视的对象
// eventName : 事件名 - xxxChanged
// callback : 回调函数
function eventHandler<T, K extends string & keyof T>(
  obj: T,
  eventName: `${K}Changed`,
  callback: (newValue: T[K]) => void
) {}

eventHandler({ name: '孙悟空', age: 18, gender: '男' }, 'nameChanged', (newValue) => {})
```
