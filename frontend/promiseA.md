# PromiseA+规范的实现
```js
const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: "REJECTED"
}

class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; // 存放成功的回调
        this.onRejectedCallbacks = []; // 存放失败的回调
        const resolve = (val) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            // new Promise时就执行 executor函数
            executor(resolve, reject);
        } catch (e) {
            // 抛出错误就走失败逻辑
            reject(e);
        }

    }
    then(onFufilled, onRejected) {
        // 同步函数逻辑
        if (this.status === STATUS.FUFILLED) {
            onFufilled(this.value);
        }
     // 同步函数逻辑
        if (this.status === STATUS.REJECTED) {
            onRejected(this.reason);
        }
        if (this.status === STATUS.PENDING) {
          // 当promise的resolve或reject是在异步执行时，先将onFulfilled 或 onRejected 函数收集起来
            this.onResolvedCallbacks.push(() => {
                onFufilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}
module.exports = Promise;
```

## 版本升级
处理new Promise中resolve包含一个Promise 和 then返回值是promise的情况、
实现catch、静态resolve、静态reject
```js
const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: "REJECTED"
}

// ************处理then返回值是promise的情况****************
function resolvePromise(x, promise2, resolve, reject) {
    // 这里的resolve 与 reject一直是then要返回的promise对象内的值
    if (promise2 == x) { // 防止自己等自己的情况
        return reject(new TypeError('出错了'))
    }

    // 看x 是普通值 还是promise 如果是promise要采用他的状态
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try { // x可以是一个对象 或者是函数
            let then = x.then; // 就看一下这个对象是否有then方法
            if (typeof then == 'function') {

                // then 是函数 我就认为这个x是一个promise
                then.call(x, function(y) { // 调用返回的promise 用它的结果 作为下一个then的结果
                    if (called) return
                    called = true;
                    // 递归解析成功的值直到他是普通值
                    resolvePromise(y, promise2, resolve, reject);
                }, function(r) {
                    if (called) return
                    called = true;
                    reject(r);
                })

            } else {
                resolve(x); // 此时x就是一个普通对象
            }
        } catch (e) {
            if (called) return
            called = true;
            reject(e); // 取then时抛出错误了
        }

    } else {
        resolve(x); // 此时x就是一个普通对象
    }
}
// ************处理then返回值是promise的情况****************
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; // 存放成功的回调
        this.onRejectedCallbacks = []; // 存放失败的回调
        const resolve = (val) => {
            // --------------解析resolve传入的值是一个promise -------------------------
           // ，要进行递归解析，这里实现可以说是有延时效果
            if (val instanceof Promise) {
                return val.then(resolve, reject);
            }
            // ---------------------------------------
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
                // 用于异步发布
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            // 抛出错误就走失败逻辑
            reject(e);
        }

    }
    then(onFufilled, onRejected) {
        // 可选参数
        onFufilled = typeof onFufilled === 'function' ? onFufilled : data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            // 同步
            if (this.status === STATUS.FUFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFufilled(this.value);
                        // x是then回调返回的值 promise2是then需要返回的promise对象
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            // 异步
            if (this.status === STATUS.PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFufilled(this.value);
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    catch (err) { // 默认没有成功 只有失败
        return this.then(null, err);
    }
    static resolve(val) {
        return new Promise((resolve) => {
            resolve(val)
        })
    }
    static reject(reason) { // 失败的promise
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
}

Promise.defer = Promise.deferred = function() { // 稍后继续说 catch
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
module.exports = Promise;
```
## Promise.all 的实现原理
```js
const fs = require('fs').promises

let read = fs.readFile
function isPromise(val) {
    if ((typeof val === 'object' && val !== null) || typeof value === 'function') {
        if (typeof val.then === 'function') {
            return true
        }
    }
    return false
}

Promise.all = function(values) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let times = 0;

        function collectResult(val, key) {
            arr[key] = val;
            if (++times === values.length) {
                resolve(arr);
            }
        }
        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            if (value && isPromise(value)) {
                value.then((y) => {
                    collectResult(y, i)
                }, reject)
            } else {
                collectResult(value, i)
            }

        }
    })
}

let p = Promise.all([read('./age.txt', 'utf8'), read('./age.txt', 'utf8')]).then(data => {
    console.log(data)
}, err => {
    console.log('err的值', err)
})
```