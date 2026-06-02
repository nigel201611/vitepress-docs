# 函数式编程入门

## 第一章 函数式编程基本概念

## 大纲

1. 背景
2. 函数式编程特点
3. 函数式编程好处

## 为什么需要函数式编程（背景）

Vue3、React 等都在推崇函数式编程，函数式编程也利于大型复杂项目的集成测试，单测。
Vue3 中按需引入，createApp、createStore、createRouter、自定义 hooks。React 中的 useState、useCallback、useEffect、hooks 都有函数式编程的影子。

## 函数式编程特点

### 引用透明性

引用透明性是分析哲学里兴起的概念，用于描述函数式编程不谋而合。大白话讲就是，相同的输入只会得到相同输出，使得并发运行和函数缓存成为可能。

### 声明式与抽象

函数式编程主张声明式与抽象，声明式就是告诉计算机做什么，至于怎么做被抽象到函数或方法中处理。
比如 forEach 函数的使用，就是一个声明式，命令式的 for 循环指令就是一步步告诉计算机如何做

## 函数式编程好处

### 纯函数

JavaScript 里，函数作为一等公民，天生适合函数式编程，但却不是纯函数语言，所以需要函数式编程来规范。
纯函数是后面章节函数柯里化等基础。纯函数即是引用透明性特点的实现，不依赖外部环境，只看输入参数。
对于相同的输入只会得到相同输出。实现纯函数，有益于单测、后续维护，程序健壮性，bug 追踪。

### 并发运行

由于引用透明性特点，可以使得函数的运行互相独立，互不影响，为并发运行提供基础。减少同步运行造成的问题，提升性能

### 可缓存

可缓存相同的输入参数运行后函数结果，提升性能，避免重复计算

## 第二章 抽象和高阶函数

在计算机语言中，抽象是指用计算机语言来描述事物之间的关系，比如使用语言中【类】来描述车子类型。
抽象也是函数式编程里面重要的概念，也是高阶函数的基础。下面列举几个例子，用于理解高阶函数和代码抽象。

```js
// every（arr,fn） 函数，用于遍历给定数组，是否全部符合给定函参规定的条件
function every(arr, fn) {
  let result
  for (let i = 0; i < arr.length; i++) {
    result = result && fn(arr[i])
  }
  return result
}
// some（arr,fn） 函数，用于遍历给定数组，是否至少有一项符合给定函参规定的条件
function some(arr, fn) {
  let result
  for (let i = 0; i < arr.length; i++) {
    result = result || fn(arr[i])
  }
  return result
}
```

上面函数， 对数组的遍历和条件判断封装在了函数体内，使用者只需要知道如何使用，不需知道实现细节。并且使用函参来判断条件，程序更健壮可拓展。
这里在于讲解抽象和高阶概念，读者不需要纠结实现是否高效

### 排序经常用到的函数 sort(compareFn)

```js
// mock的数据
const userInfo = [
  { firstName: 'aanigel', lastName: 'bbnigel' },
  { firstName: 'bbnigel', lastName: 'aanigel' }
]
// 按照用户信息的 firstName 进行排序
userInfo.sort((a, b) => {
  return a.firstName - b.firstName < 1 ? -1 : a.firstName - b.firstName > 1 ? 1 : 0
})
// 按照用户信息的 lastName 进行排序
userInfo.sort((a, b) => {
  return a.lastName - b.lastName < 1 ? -1 : a.lastName - b.lastName > 1 ? 1 : 0
})

// 可以进一步抽象出比较函数，不需要每次写差不多一摸一样的重复比较代码
function sortBy(key) {
  return (a, b) => (a[key] - b[key] < 1 ? -1 : a[key] - b[key] > 1 ? 1 : 0)
}
userInfo.sort(sortBy('firstName'))
```

### 应用中实际可使用高阶函数

#### unary 函数

```js
// unary 函数让多参函数变为单参函数,其实就是把后面参数忽略掉
function unary(fn) {
  return fn.length === 1 ? fn : (arg) => fn(arg)
}
;[1, 2, 3].map(unary(parseInt))
// [1, 2, 3].map(parseInt) 结果是 [1, NaN, NaN]
```

#### once 函数

```js
// once 函数用于在初始化只执行一次的函数
function once(fn) {
  let done = false
  return function () {
    return done ? undefined : ((done = true), fn.apply(this, arguments))
  }
}
const doInit = once(() => {
  console.log('do init once')
})
doInit()
// 后面再次执行 doInit() 不会再打印 'do init once' 了
```

#### memoized 函数

```js
// memoized 可以让纯函数（纯函数前提） 只计算一次，后续计算使用缓存
function memoized(fn) {
  const loopupTable = {}
  return (arg) => loopupTable[arg] || (loopupTable[arg] = fn(arg))
}
let fastFactorial = memoized((n) => {
  if (n === 0) {
    return 1
  }
  return n * fastFactorial(n - 1)
})
fastFactorial(5)
// 后续你在计算 fastFactorial(6) 前面的 5 个 会走缓存提升效率
```

## 第三章 函数柯里化和偏函数

### 函数柯里化

> 函数柯里化是指将多参函数转为嵌套的一元函数过程

```js
// 将二元函数转换一元
function curry(fn) {
  return function (arg1) {
    return function (arg2) {
      return fn(arg1, arg2)
    }
  }
}
function sum(x, y) {
  return x + y
}
const currySum = curry(sum)
currySum(2)(3)

// 将变参函数转换一元
function curryN(fn) {
  if (typeof fn !== 'function') {
    throw new Error('fn must be a function')
  }
  return function curryFunc(...args) {
    if (args.length < fn.length) {
      return function () {
        return curryFunc.apply(null, args.concat([].slice.call(arguments)))
      }
    }
    return fn.apply(null, args)
  }
}
function multiply(x, y, z) {
  return x * y * z
}
const curryMulti = curryN(multiply)
curryMulti(1)(2)(3)
// 针对日志打印 使用柯里化 减少样板代码
function logInfo(mode, initialMsg, errMsg, lineNo) {
  switch (mode) {
    case 'WARNING':
      console.log(`${initialMsg} ${errMsg} at line: ${lineNo}`)
      break
    case 'DEBUG':
      console.log(`${initialMsg} ${errMsg} at line: ${lineNo}`)
      break
    case 'ERROR':
      console.log(`${initialMsg} ${errMsg} at line: ${lineNo}`)
      break
    default:
      throw new Error(`wrong mode: ${mode}`)
  }
}
// 平时调用前面两个参数经常会一样，如下
logInfo('WARNING', 'invalid in stat.js', 'undefined function', 10)
logInfo('WARNING', 'invalid in stat.js', 'undefined value', 55)
// 优化
const logInfoWarn = curryN(logInfo)('WARNING')('invalid in stat.js')
logInfoWarn('undefined function', 10)
logInfoWarn('undefined value', 55)
```

### 偏函数

> 可以让开发者应用部分函数参数

例子说明如下

```js
// 定时 固定时间，执行函数
setTimeout(() => console.log('do something X'), 10)
setTimeout(() => console.log('do something Y'), 10)
// 此处不能用柯里化优化（从左到右的），除非包装一下，改变函参的顺序（这里目的是要抽离不变的变量，时间10）
// 使用偏函数，实现如下
function partial(fn, ...partialArgs) {
  if (typeof fn !== 'function') {
    throw new Error('fn must be a function')
  }
  let args = partialArgs.slice(0)
  return function partialFn(...fullArgs) {
    let count = 0
    for (let i = 0; i < args.length && count < fullArgs.length; i++) {
      if (args[i] === undefined) {
        args[i] = fullArgs[count++]
      }
    }
    return fn.apply(null, args)
  }
}
const partialTimeout = partial(setTimeout, undefined, 10)
partialTimeout(() => console.log('do something X'))
partialTimeout(() => console.log('do something Y'))
```

## 第四章 函数组合和管道

### 函数组合

```js
function compose(...fns) {
  for (let i = 0; i < fns.length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new Error('fns must be all function')
    }
  }
  return (value) => fns.reverse().reduce((acc, fn) => fn(acc), value)
}

function splitInSpaces(str) {
  return str.split(' ')
}
function count(arr) {
  return arr.length
}

const countWords = compose(count, splitInSpaces)
console.log(countWords('this is a test'))
```

### 组合函数特性

> 满足结合律

```js
// 伪代码，结合律可自由组合我们需要的函数
compose(f, compose(g, h)) = compose(compose(f, g), h)
```

### 管道

管道是和函数组合基本一样的实现，只不过数据流是从左到右的，和 Unix 系统的 '|' 基本类似

```js
function pipe(...fns) {
  for (let i = 0; i < fns.length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new Error('fns must be all function')
    }
  }
  return (value) => fns.reduce((acc, fn) => fn(acc), value)
}
function splitInSpaces(str) {
  return str.split(' ')
}
function count(arr) {
  return arr.length
}

const countWords = pipe(splitInSpaces, count)
console.log(countWords('this is a test'))
```

选择使用函数组合还是管道，取决于想要什么样的数据流向，但不要混用两种

### 函数式组合应用

```js
const apressBooks = [
  {
    id: 1,
    title: 'JavaScript',
    author: 'nigel',
    rating: [3.8],
    reviews: []
  },
  {
    id: 2,
    title: 'NodeJs',
    author: 'nigel',
    rating: [4.5],
    reviews: []
  }
]
const filter = function (arr, fn) {
  let reuslt = []
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      reuslt.push(arr[i])
    }
  }
  return reuslt
}
const map = function (arr, fn) {
  let reuslt = []
  for (let i = 0; i < arr.length; i++) {
    reuslt.push(fn(arr[i]))
  }
  return reuslt
}

// 取出 apressBooks 中 评分在4.5以上 书名和作者
const projectTitleAndAuthor = function ({ title, author }) {
  return { title, author }
}
const isGoodBooks = function (item) {
  return item.rating[0] >= 4.5
}
// 这里需要 partial 一下，filter，map有两个参数，组合只能应用一元函数
const queryGoodBooks = partial(filter, undefined, isGoodBooks)
const mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor)

const titleAndAuthorForGoodbooks = compose(mapTitleAndAuthor, queryGoodBooks)
console.log(titleAndAuthorForGoodbooks(apressBooks))
```

## 第五章 函子，MayBe，Either

### 函子基础

> 函子是指实现 map 方法的容器对象或者类,该容器对象可以持有任何值

```js
// 最基础的函子
function Container(val) {
  this.value = val
}
Container.protory.map = function (fn) {
  return Container.of(fn(this.value))
}
Container.of = function (value) {
  return new Container(value)
}
```

上面函子同时也是 Pointed 函子（实现了 of 方法）

### MayBe 函子

> MayBe 函子使用函数式方式来处理错误

```js
function MayBe(val) {
  this.value = val
}
MayBe.of = function (val) {
  return new MayBe(val)
}
MayBe.prototype.isNothing = function () {
  return this.value === null || this.value === undefined
}
MayBe.prototype.map = function (fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
}
```

### MayBe 函子的应用

```js
// 简单示例
const maybe1 = MayBe.of('test').map((str) => str.toUpperCase())
console.log(maybe1) // MayBe { value: 'TEST' }
const maybe2 = MayBe.of(null).map((str) => str.toUpperCase())
console.log(maybe2) // MayBe { value: null }
```

上面示例可以看出不需关心传入的参数是否有问题，MayBe 函子帮我们做了判断和处理

### Either 函子

Either 函子对错误处理更全面一些，可以清楚知道那条分支出了问题

### Either 函子定义

```js
function Nothing (val){
  this.value = val
}
Nothing.prototype.of = function(val){
  return new Nothing(val)
}
Nothing.prototype.map = function(fn){
  return this
}

function Some (val){
  this.value = val
}
Some.prototype.of = function(val){
  return new Some(val)
}
Some.prototype.map = function(fn){
  return Some.of(fn(this.value))
}
const Either = {
  Nothing: Nothing
  Some: Some
}
```

### Either 函子应用

使用 Maybe 函子，某个 map 的映射出问题，不清楚具体是哪个 map 有问题，也不知道具体错误原因

```js
// 使用 Maybe 来请求数据，并对数据做处理，如下伪代码
async function getTop10SubRedditData(url) {
  const response = await getTop10RedditPosts(url)
  return Maybe.of(response).map((arr)=>arr.data).map((arr)=>arr.children).map((arr)=>arrayUtil.map(arr,(item)=>{'title':item.title,'url':item.url}))
}
```

换成 Either 来对请求数据做处理

```js
// 使用 Either 来请求数据，并对数据做处理，如下伪代码
async getTop10RedditPosts(url){
  try{
    const response = Either.Some.of(JSON.parse( await fetch(url).then(data=>data.json())))
  }catch(err){
    Either.Nothing.of({msg:err.message,err: err})
  }
}
async function getTop10SubRedditData(url) {
  const response = await getTop10RedditPosts(url)
  return response.map((arr)=>arr.data).map((arr)=>arr.children).map((arr)=>arrayUtil.map(arr,(item)=>{'title':item.title,'url':item.url}))
}
```

使用 MayBe 还是 Either 根据个人需要

## 第六章 深入 Monad 函子

上一章节 MayBe 函子可能会发生 map 多层嵌套取数问题，看如下例子

```js
// 伪代码
async function mergedVieMaybe(searchText) {
  const MayBeReddits = Maybe.of(await searchReddit(searchText))
  return MayBeReddits.map((obj) => obj.data)
    .map((obj) => obj.children)
    .map(
      arrUtils.map(arr, (item) => {
        return {
          title: item['data'].title,
          comentsLink: item['data'].comentsLink
        }
      })
    )
    .map(
      arrUtils.map(arr, async (item) => {
        return {
          title: item.title,
          coments: Maybe.of(await getComments(item.comentsLink))
        })
      })
    )
}
```

上面例子就是多层嵌套获取评论数据例子，需要如下方式拿到 comments 数据,对于使用者非常不友好。

```js
// 伪代码
const answers = await mergedVieMaybe('function propram')
answers.map(
  arrUtils.map(arr, (item) => {
    // item.coments 这里是一个 MayBe 对象 MayBe { value: comments }
    item.coments.map(
      arrUtils.map(arr, (comment) => {
        // 拿到 comment 数据
      })
    )
  })
)
```

可以使用 join 来处理下，join 定义如下

```js
// join 定义
MayBe.prototype.join = function () {
  return this.isNothing() ? MayBe.of(null) : this.value
}
// 使用join 处理 上述例子
// 伪代码
async function mergedVieJoin(searchText) {
  const MayBeReddits = Maybe.of(await searchReddit(searchText))
  return MayBeReddits.map((obj) => obj.data)
    .map((obj) => obj.children)
    .map(
      arrUtils.map(arr, (item) => {
        return {
          title: item['data'].title,
          comentsLink: item['data'].comentsLink
        }
      })
    )
    .map(
      arrUtils.map(arr, async (item) => {
        return {
          title: item.title,
          coments: Maybe.of(await getComments(item.comentsLink)).join()
        }
      })
    )
    .join()
}
```

通过 join 打平了 Maybe, 现在去获取 comment 方式如下

```js
arrUtils.map(arr, (item) => {
  // 拿到 comments 数据
  console.log(item.comments)
})
```

### 实现 chain 方法

上一节中，总是需要 map 后面 添加 join,可以封装在 chain 方法中

```js
MayBe.prototype.chain = function (f) {
  return this.map(f).join()
}
// chain 优化改造
async function mergedVieChain(searchText) {
  const MayBeReddits = Maybe.of(await searchReddit(searchText))
  return MayBeReddits.map((obj) => obj.data)
    .map((obj) => obj.children)
    .map(
      arrUtils.map(arr, (item) => {
        return {
          title: item['data'].title,
          comentsLink: item['data'].comentsLink
        }
      })
    )
    .chain(
      arrUtils.map(arr, async (item) => {
        return {
          title: item.title,
          coments: Maybe.of(await getComments(item.comentsLink)).chain((comments) => comments.length)
        }
      })
    )
}
// 上述添加chain 方法，可以更加灵活处理数据，如 coments 返回评论数量
```

> 总结： 实现 chain 方法的 Pointed 函子 就是 Monad
