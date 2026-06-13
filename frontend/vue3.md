# vue3

## Side Effects

Side effects are interactions with the external environment of a function.

* Network requests
* DOM operations
* Subscribing to data sources
* Writing to the file system
* Getting user input

### React's Approach
Using the useEffect hook function to add side effects to functions.

### Vue3's Approach

Using the watchEffect hook function to add side effects to functions.
Any update to the interface will trigger this effect.
It automatically tracks the variables used within the function body -- only the values that are used will trigger automatically.

### Deep Dive into watchEffect

* Automatically collects dependencies and triggers
* Can manually destroy the effect (const stop = watchEffect())
* Invalidate side effects
  ```js
    watchEffect((onInvalidate)=>{
        onInvalidate(()=>{
            source.cancel()
        })
    })
  ```
* Execution order of side effects (watchEffect(()=>{},{flush:'post'}))

React's execution order cannot be adjusted; they are only triggered after the component has updated.

## Watch: Precise Control of Effects

### Basic Usage of watch
  ```js
  watch(count,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```
### Watching a Single Value of reactive

Using toRefs
 ```js
  const { msg } = toRefs(props)
   watch(msg,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```
Using a getter function
  ```js
   watch(()=>props.msg,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```

### Watching Multiple Values
```js
  const { msg } = toRefs(props)
   watch([msg,count],(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```
### Comparison Between React's Approach and watchEffect
* Lazy execution of side effects
* Which states should trigger the watcher to re-run
* Accessing values before and after data changes
