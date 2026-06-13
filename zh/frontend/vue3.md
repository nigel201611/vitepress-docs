# vue3

## 副作用

副作用 跟函数外部环境发生的交互

* 网络请求
* DOM 操作
* 订阅数据来源
* 写入文件系统
* 获取用户输入


### React 的方式
使用 useEffect 钩子函数添加函数的副作用

### Vue3 的方式

使用 watchEffect 钩子函数来添加函数的副作用
任何界面的更新都会触发这个 effect
它会自动追踪在函数体内的变量，只有使用到的值就会自动的触发
### 深入 watchEffect

* 自动收集依赖并且触发
* 可手动销毁 effect  (const stop = watchEffect())
* 使副作用失效 
  ```js
    watchEffect((onInvalidate)=>{
        onInvalidate(()=>{
            source.cancel()
        })
    })
  ```
* 副作用执行顺序 (watchEffect(()=>{},{flush:'post'}))
  
React 的执行顺序不可调整，都只在组件 updated 之后触发

## Watch 精确控制 effect

### watch 的基本用法
  ```js
  watch(count,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```
### watch reactive 的单个值
 
使用 toRefs
 ```js
  const { msg } = toRefs(props)
   watch(msg,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```
使用 getter 函数
  ```js
   watch(()=>props.msg,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```

### watch 多个值
```js
  const { msg } = toRefs(props)
   watch([msg,count],(newVal,oldVal)=>{
      console.log(newVal,oldVal)
  })
  ```
### React 的做法和 watchEffect 对比
* 懒执行副作用
* 什么状态应该触发 watcher 重新运行
* 访问数据变化前后的值