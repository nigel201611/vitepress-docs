# require源码解析

## require的使用场景
### 加载模块类型：
* 加载内置模块：require('fs')
* 加载node_modules模块：require('ejs')
* 加载本地模块：require('./utils')
### 支持文件类型：
* 加载 .js 文件
* 加载 .json 文件
* 加载 .node 文件
* 加载 .mjs 文件
* 加载其他类型文件

## require源码阅读过程中的一些思考
* CommonJS 加载主模块的流程
* require 如何加载内置模块？
* require 如何加载 node_modules 模块？
* require 为什么会将非 js/json/node 文件视为 js 文件加载？
* require 连续加载同一个模块时，是如何进行缓存的？
  
## Module对象
* id：源码文件路径，如：/Users/sam/Desktop/vue-test/imooc-test/bin/ejs/index.js
* path：源码文件对应的文件夹，通过 path.dirname(id) 生成
* exports：模块输出的内容，默认为 {}
* parent：父模块信息
* filename：源码文件路径
* loaded：是否已经加载完毕
* children：子模块对象集合
* paths：模块查询范围

## require执行流程
<br/>
<img src="/images/requireYL.jpg" alt="require执行流程">

## require执行流程总结
1. relativeResolveCache[relResolveCacheIdentifier] 查询缓存路径
2. Module._cache[filename] 查询缓存模块
3. Module._resolveFilename 查询模块的真实路径
4. loadNativeModule 加载内置模块
5. new Module 实例化 Module 对象
6. module.load(filename) 加载模块
7. findLongestRegisteredExtension 获取文件后缀
8. Module._extensions[extension](this, filename) 解析模块并执行模块
9. module._compile 编译模块代码
10. compileFunction 将模块代码生成可执行函数
11. exports, require, module, filename, dirname 生成入参
12. compiledWrapper.call 执行模块函数
13. return module.exports 输出模块返回结果
