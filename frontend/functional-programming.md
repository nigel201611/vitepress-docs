# Introduction to Functional Programming

## Chapter 1: Basic Concepts of Functional Programming

## Outline

1. Background
2. Characteristics of Functional Programming
3. Benefits of Functional Programming

## Why Functional Programming (Background)

Vue3, React, and others are all advocating functional programming. Functional programming is also beneficial for integration testing and unit testing in large, complex projects.
In Vue3, features like on-demand imports, createApp, createStore, createRouter, and custom hooks all embody functional programming. In React, useState, useCallback, useEffect, and hooks all bear the imprint of functional programming.

## Characteristics of Functional Programming

### Referential Transparency

Referential transparency is a concept that originated in analytic philosophy and coincidentally describes functional programming well. In simple terms, the same input always produces the same output, making concurrent execution and function caching possible.

### Declarative and Abstract

Functional programming advocates for declarative and abstract approaches. Being declarative means telling the computer what to do, while the how is abstracted into functions or methods.
For example, using the forEach function is declarative, whereas an imperative for loop instructs the computer step by step on how to do something.

## Benefits of Functional Programming

### Pure Functions

In JavaScript, functions are first-class citizens, making it naturally suited for functional programming. However, it is not a pure functional language, so functional programming practices are needed for standardization.
Pure functions are the foundation for concepts like currying in later chapters. A pure function embodies referential transparency -- it does not depend on external environment, only on input parameters.
The same input always produces the same output. Implementing pure functions is beneficial for unit testing, subsequent maintenance, program robustness, and bug tracking.

### Concurrent Execution

Due to referential transparency, functions can execute independently without affecting each other, providing a foundation for concurrent execution. This reduces problems caused by synchronous execution and improves performance.

### Cacheability

The results of pure functions with the same input parameters can be cached, improving performance and avoiding redundant computation.

## Chapter 2: Abstraction and Higher-Order Functions

In computer languages, abstraction refers to using the language to describe relationships between things, such as using a [class] in the language to describe a car type.
Abstraction is also an important concept in functional programming and is the foundation of higher-order functions. Below are several examples to help understand higher-order functions and code abstraction.

```js
// every(arr, fn) function, used to iterate over a given array and check if all items satisfy the condition specified by the given function parameter
function every(arr, fn) {
  let result
  for (let i = 0; i < arr.length; i++) {
    result = result && fn(arr[i])
  }
  return result
}
// some(arr, fn) function, used to iterate over a given array and check if at least one item satisfies the condition specified by the given function parameter
function some(arr, fn) {
  let result
  for (let i = 0; i < arr.length; i++) {
    result = result || fn(arr[i])
  }
  return result
}
```

In the functions above, the array iteration and condition checking are encapsulated within the function body. Users only need to know how to use them, not the implementation details. Using function parameters to determine conditions makes the program more robust and extensible.
The focus here is on explaining abstraction and higher-order concepts; readers do not need to dwell on implementation efficiency.

### Commonly Used Sorting Function sort(compareFn)

```js
// mock data
const userInfo = [
  { firstName: 'aanigel', lastName: 'bbnigel' },
  { firstName: 'bbnigel', lastName: 'aanigel' }
]
// Sort by firstName of user info
userInfo.sort((a, b) => {
  return a.firstName - b.firstName < 1 ? -1 : a.firstName - b.firstName > 1 ? 1 : 0
})
// Sort by lastName of user info
userInfo.sort((a, b) => {
  return a.lastName - b.lastName < 1 ? -1 : a.lastName - b.lastName > 1 ? 1 : 0
})

// Can further abstract the comparison function to avoid writing almost identical repetitive comparison code each time
function sortBy(key) {
  return (a, b) => (a[key] - b[key] < 1 ? -1 : a[key] - b[key] > 1 ? 1 : 0)
}
userInfo.sort(sortBy('firstName'))
```

### Practical Higher-Order Functions in Applications

#### unary Function

```js
// The unary function converts a multi-parameter function into a single-parameter function, essentially ignoring the remaining parameters
function unary(fn) {
  return fn.length === 1 ? fn : (arg) => fn(arg)
}
;[1, 2, 3].map(unary(parseInt))
// [1, 2, 3].map(parseInt) results in [1, NaN, NaN]
```

#### once Function

```js
// The once function is used for functions that should only execute once during initialization
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
// Subsequent calls to doInit() will no longer print 'do init once'
```

#### memoized Function

```js
// memoized allows pure functions (pure function prerequisite) to compute only once, using cache for subsequent computations
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
// If you later compute fastFactorial(6), the previous 5 factorials will use cache for efficiency
```

## Chapter 3: Function Currying and Partial Functions

### Function Currying

> Function currying is the process of converting a multi-parameter function into nested unary functions.

```js
// Convert a binary function to unary
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

// Convert a variadic function to unary
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
// Using currying for logging to reduce boilerplate code
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
// In practice, the first two parameters are often the same, as shown below
logInfo('WARNING', 'invalid in stat.js', 'undefined function', 10)
logInfo('WARNING', 'invalid in stat.js', 'undefined value', 55)
// Optimization
const logInfoWarn = curryN(logInfo)('WARNING')('invalid in stat.js')
logInfoWarn('undefined function', 10)
logInfoWarn('undefined value', 55)
```

### Partial Functions

> Allows developers to apply only part of the function parameters.

Example explained below:

```js
// Set a fixed time to execute a function
setTimeout(() => console.log('do something X'), 10)
setTimeout(() => console.log('do something Y'), 10)
// Currying (left-to-right) cannot be used here unless wrapping changes the order of function parameters (the goal here is to extract the constant variable, the time 10)
// Using partial functions, implemented as follows:
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

## Chapter 4: Function Composition and Pipelines

### Function Composition

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

### Composition Function Properties

> Satisfies the associative law

```js
// Pseudocode: associativity allows us to freely compose the functions we need
compose(f, compose(g, h)) = compose(compose(f, g), h)
```

### Pipelines

Pipelines are essentially the same as function composition, except data flows from left to right, similar to the Unix system '|'.

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

Whether to use function composition or pipelines depends on the desired data flow direction, but do not mix the two approaches.

### Practical Application of Functional Composition

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

// Extract title and author from apressBooks with ratings above 4.5
const projectTitleAndAuthor = function ({ title, author }) {
  return { title, author }
}
const isGoodBooks = function (item) {
  return item.rating[0] >= 4.5
}
// Need to partial filter and map since both take two parameters but composition only works with unary functions
const queryGoodBooks = partial(filter, undefined, isGoodBooks)
const mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor)

const titleAndAuthorForGoodbooks = compose(mapTitleAndAuthor, queryGoodBooks)
console.log(titleAndAuthorForGoodbooks(apressBooks))
```

## Chapter 5: Functors, MayBe, Either

### Functor Basics

> A functor is a container object or class that implements a map method. This container object can hold any value.

```js
// Basic functor
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

The functor above is also a Pointed functor (it implements the of method).

### MayBe Functor

> The MayBe functor handles errors in a functional way.

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

### MayBe Functor Application

```js
// Simple example
const maybe1 = MayBe.of('test').map((str) => str.toUpperCase())
console.log(maybe1) // MayBe { value: 'TEST' }
const maybe2 = MayBe.of(null).map((str) => str.toUpperCase())
console.log(maybe2) // MayBe { value: null }
```

The above example shows that you don't need to worry about whether the passed parameters are valid; the MayBe functor handles the checking and processing for us.

### Either Functor

The Either functor provides more comprehensive error handling, allowing you to clearly know which branch encountered the problem.

### Either Functor Definition

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

### Either Functor Application

When using the Maybe functor, if a map transformation goes wrong, it's unclear which specific map had the problem, and the specific error reason is unknown.

```js
// Using Maybe to request data and process it, as shown in the pseudocode below
async function getTop10SubRedditData(url) {
  const response = await getTop10RedditPosts(url)
  return Maybe.of(response).map((arr)=>arr.data).map((arr)=>arr.children).map((arr)=>arrayUtil.map(arr,(item)=>{'title':item.title,'url':item.url}))
}
```

Switch to Either for handling request data:

```js
// Using Either to request data and process it, as shown in the pseudocode below
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

Whether to use MayBe or Either depends on your needs.

## Chapter 6: Deep Dive into Monad Functor

In the previous chapter, the MayBe functor may have issues with multi-level nested map data retrieval. Consider the following example:

```js
// Pseudocode
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

The above example shows multi-level nesting to get comment data, requiring the following approach to access comments data, which is very unfriendly for users.

```js
// Pseudocode
const answers = await mergedVieMaybe('function propram')
answers.map(
  arrUtils.map(arr, (item) => {
    // item.coments is a MayBe object MayBe { value: comments }
    item.coments.map(
      arrUtils.map(arr, (comment) => {
        // Get comment data
      })
    )
  })
)
```

We can use join to handle this. The join definition is as follows:

```js
// join definition
MayBe.prototype.join = function () {
  return this.isNothing() ? MayBe.of(null) : this.value
}
// Using join to handle the above example
// Pseudocode
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

By flattening Maybe with join, accessing comment data now looks like this:

```js
arrUtils.map(arr, (item) => {
  // Get comments data
  console.log(item.comments)
})
```

### Implementing the chain Method

In the previous section, always needing to add join after map can be encapsulated in a chain method.

```js
MayBe.prototype.chain = function (f) {
  return this.map(f).join()
}
// Optimization using chain
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
// The above addition of the chain method allows more flexible data processing, e.g., returning the comment count for coments
```

> Summary: A Pointed functor that implements the chain method is a Monad.
