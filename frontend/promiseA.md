# Implementation of the Promise/A+ Specification
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
        this.onResolvedCallbacks = []; // Stores resolved callbacks
        this.onRejectedCallbacks = []; // Stores rejected callbacks
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
            // Execute the executor function when new Promise is created
            executor(resolve, reject);
        } catch (e) {
            // If an error is thrown, go to the rejection logic
            reject(e);
        }

    }
    then(onFufilled, onRejected) {
        // Synchronous logic
        if (this.status === STATUS.FUFILLED) {
            onFufilled(this.value);
        }
     // Synchronous logic
        if (this.status === STATUS.REJECTED) {
            onRejected(this.reason);
        }
        if (this.status === STATUS.PENDING) {
          // When the promise's resolve or reject is called asynchronously, collect the onFulfilled or onRejected functions first
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

## Version Upgrade
Handle the case where resolve contains a Promise in new Promise and the then return value is a promise.
Implement catch, static resolve, static reject.
```js
const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: "REJECTED"
}

// ************Handle the case where the then return value is a promise****************
function resolvePromise(x, promise2, resolve, reject) {
    // The resolve and reject here always refer to the values in the promise object that then should return
    if (promise2 == x) { // Prevent waiting for itself
        return reject(new TypeError('Error occurred'))
    }

    // Check if x is a normal value or a promise. If it's a promise, adopt its state.
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try { // x can be an object or a function
            let then = x.then; // Check if this object has a then method
            if (typeof then == 'function') {

                // then is a function, so I consider x to be a promise
                then.call(x, function(y) { // Call the returned promise, use its result as the result of the next then
                    if (called) return
                    called = true;
                    // Recursively resolve the successful value until it is a normal value
                    resolvePromise(y, promise2, resolve, reject);
                }, function(r) {
                    if (called) return
                    called = true;
                    reject(r);
                })

            } else {
                resolve(x); // x is now a normal object
            }
        } catch (e) {
            if (called) return
            called = true;
            reject(e); // An error occurred while accessing then
        }

    } else {
        resolve(x); // x is now a normal object
    }
}
// ************Handle the case where the then return value is a promise****************
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; // Stores resolved callbacks
        this.onRejectedCallbacks = []; // Stores rejected callbacks
        const resolve = (val) => {
            // --------------Resolve when the passed value is a promise------------------------
           // Perform recursive resolution; this implementation effectively has a delay effect
            if (val instanceof Promise) {
                return val.then(resolve, reject);
            }
            // ---------------------------------------
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
                // Used for async publication
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
            // If an error is thrown, go to the rejection logic
            reject(e);
        }

    }
    then(onFufilled, onRejected) {
        // Optional parameters
        onFufilled = typeof onFufilled === 'function' ? onFufilled : data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            // Synchronous
            if (this.status === STATUS.FUFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFufilled(this.value);
                        // x is the value returned by the then callback, promise2 is the promise object that then needs to return
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
            // Asynchronous
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
    catch (err) { // Default: no success, only failure
        return this.then(null, err);
    }
    static resolve(val) {
        return new Promise((resolve) => {
            resolve(val)
        })
    }
    static reject(reason) { // Rejected promise
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
}

Promise.defer = Promise.deferred = function() { // We'll talk about catch later
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
module.exports = Promise;
```
## Implementation of Promise.all
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
    console.log('err value', err)
})
```
