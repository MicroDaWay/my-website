---
sidebar_position: 5
---

# 类

## 类

- 面向对象(oop)
  - JS 是一个面向对象的编程语言
  - 面向对象指在程序中做的所有操作都需要通过对象来完成
- 对象(object)
  - 编程语言是对现实事物的抽象
  - 具体 抽象
  - 具体的事物抽象到计算机后，就变成了一个对象
  - 例子：
    - 浏览器窗口 -> window 对象
    - 网页 -> document 对象
    - 控制台 -> console 对象
- 程序是如何对一个具体事物进行抽象的？
  - 一个事物再复杂无非由两部分组成：
    - 数据(属性)
    - 行为(方法)
- 类(class)
  - 对象的模板，通过类可以批量创建对象
  - 使用 class 关键字
  - 类由两部分构成：
    - 属性(properties)
      - 属性、字段、成员变量
      - 直接在类中定义
      - 如果开启了 strictPropertyInitialization 选项
      - 则要求属性必须进行正确的初始化
      - 初始化：
        - 可以直接在属性声明处初始化
          - name = "孙悟空"
        - 可以在构造函数中对属性进行初始化
          ```js
          constructor(name: string) {
            this.name = name
          }
          ```
    - 方法(methods)

```ts
export {}

class Person {
  name: string
  age!: number // 非空断言，不需要在类中对属性进行初始化，但是一定记得要在其他地方初始化

  constructor(name: string) {
    this.name = name
  }

  // 正常的方法，添加到原型上
  sayHello() {
    console.log(`大家好, 我是${this.name}`)
  }

  // 通过属性的方式添加的方法，添加到实例上
  // 不推荐使用
  test = () => {
    console.log(`测试, 我是${this.name}`)
  }
}

const p: Person = new Person('孙悟空')
p.age = 18
const p2: Person = new Person('猪八戒')
p2.age = 28

p.sayHello()
p2.sayHello()

p.test()
p2.test()

console.log(p)
console.log(p2)
```

## 构造函数

```ts
export {}

class Person {
  constructor(x: number)
  constructor(x: number, y: number)
  constructor(x: number, y?: number) {}
}
```

## 属性的访问器 (Getter Setter)

- 操作属性的方法
- 通过它们可以避免直接去修改和读取属性
- get 方法用来返回属性值
- set 方法用来修改属性值
- 使用访问器的优点：
  - 可以在读取和设置属性时添加逻辑
  - 可以方便我们控制属性的访问权限

```ts
export {}

class Person {
  // #标识的属性是私有属性，只能在类内部使用！这是JS的语法
  #name: string
  #age: number

  constructor(name: string, age: number) {
    this.#name = name
    this.#age = age
  }

  // get方法用来返回属性值
  get name() {
    return this.#name.replaceAll('空', '*')
  }

  // set方法用来修改属性值
  set name(name: string) {
    this.#name = name
  }

  get age() {
    return this.#age
  }

  set age(age: number) {
    if (age >= 0 && age <= 150) {
      this.#age = age
    }
  }
}

const p: Person = new Person('孙悟空', 18)

p.name = '猪八戒'
p.age = -10

console.log(p.name, p.age)
```

## 继承

1. 方便代码复用
2. 方便扩展(OCP)
3. 多态
4. JS 的语法

- 继承时发生了什么事：
  - 创建类时 JS 引擎会为每个类都定义一个原型对象
  - 当一个子类继承父类时，子类的原型会被设置为父类原型的实例
    - Child[[Prototype]] = 父类原型的实例
  - 当我们调用子类的构造函数创建子类实例时，JS 引擎会自动调用 super()
    - 来使用父类的构造函数先初始化子类
- 继承后，如果需要重写构造函数，在构造函数第一件事就是调用 super()

```ts
export {}

class A {
  name: string

  constructor(name: string) {
    console.log('父类的构造函数执行了')
    this.name = name
  }

  method() {
    console.log('method')
  }
}

class B extends A {
  constructor() {
    // 继承后，如果需要重写构造函数，在构造函数第一件事就是调用super()
    super('哈哈')
  }

  newMethod() {
    super.method()
    console.log('newMethod')
  }
}

class Animal {
  name = '动物'
}

class Dog extends Animal {}
class Cat extends Animal {}

class C {}

let a: Animal = new Dog()
let b: Animal = new Cat()
// let c: Animal = new C()
```

## 成员修饰符

- 用来修饰类中的属性和方法
- public 默认值，公共属性，这个属性可以在任何位置使用
- protected 受保护的属性，只能在类内部和子类内部访问
- private 私有属性，只能在类内部访问

```ts
export {}

class MyClass {
  public name = '孙悟空'
  protected age = 18
  private gender = '男'

  test() {
    this.gender = '女'
  }
}

const mc = new MyClass()
mc.name = '猪八戒'

class A extends MyClass {
  sayHello() {
    this.age = 12
  }
}
```

## 静态修饰符

- 静态属性(方法)
  - 通过类直接访问的属性(方法)
  - 类.属性名 类.方法名()
  - 注意：
    - 静态属性和静态方法是直接存储到类中的！
    - 所以在静态方法中不能访问实例属性(方法)
    - 在静态方法中只能访问静态属性和静态方法
    - 在静态方法中 this 就是当前的类！
    - 静态属性可以通过#设置为私有，设置后只能在类内部访问
    - 静态属性不能使用类的泛型
- 静态代码块，它里边的代码只会执行一次，并且是在类定义后就执行
- 在静态代码块中可以访问类中的静态属性和静态方法
- 通常我们会使用静态代码块对静态属性进行初始化(复杂的属性)

```ts
export {}

class MyClass {
  age = 18

  // static #staticProp = '静态属性'
  static #staticProp: string

  static staticMethod() {
    // console.log(this) // MyClass
    console.log('静态方法')
    console.log(this.#staticProp)
  }

  // 静态代码块，它里边的代码只会执行一次，并且是在类定义后就执行
  // 在静态代码块中可以访问类中的静态属性和静态方法
  // 通常我们会使用静态代码块对静态属性进行初始化(复杂的属性)
  static {
    // console.log(this) // MyClass
    this.#staticProp = '静态属性'
  }
}

MyClass.staticMethod()

class Person<T> {
  name: T

  // 静态属性不能使用类的泛型
  // static staticProp: T

  constructor(name: T) {
    this.name = name
  }
}
```

## 实现接口

- 使用 implements 来实现一个接口
- 接口和类不同，接口关心标准
- 多态的体现
- 实现接口和继承类的区别：
  - 接口是 TS 的语法，而类 TS JS 都支持
  - 定义接口时不关心具体的实现,定义类的时候我们需要考虑细节
  - 一个类可以同时实现多个接口，只能继承一个类

```ts
export {}

interface Inter {
  name: string
  age: number
  gender: string
}

interface A {}
class B {}

class Person extends B implements Inter, A {
  name = '孙悟空'
  age = 18
  gender = '男'
}

function printObj(obj: Inter) {
  console.log(obj.name, obj.age, obj.gender)
}

printObj(new Person())
```

## 抽象类

- 介于接口和类之间
- 使用 abstract 关键字来定义一个抽象类
- 抽象类就是专门用来被其他类继承的
- 特点：
  - 抽象类不能创建实例
  - 抽象类是专门被继承的类
  - 在抽象类中可以添加抽象属性和方法
    - 抽象属性和方法必须在子类中初始化和实现
  - 抽象类会被转换为 JS 代码，但其中加了 abstract 关键字的属性和方法都会被删除

```ts
export {}

abstract class MyAbClass {
  constructor(public name: string, public age: number) {}
  // 抽象属性
  abstract gender: string
  // 抽象方法
  abstract sayHello(): void
}

// 抽象类不能创建实例
// const ab = new MyAbClass()

class A extends MyAbClass {
  gender: string

  constructor(name: string, age: number, gender: string) {
    super(name, age)
    this.gender = gender
  }

  sayHello(): void {}
}

const a = new A('孙悟空', 18, '男')
console.log(a)
```
