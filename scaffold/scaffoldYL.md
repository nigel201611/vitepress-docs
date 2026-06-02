# 脚手架开发
开发脚手架的核心目标是：提升前端研发效能（创建项目自动化、发布自动化、Git操作自动化等）。
脚手架本质是一个操作系统的客户端，它通过命令行执行。

## 脚手架的实现原理

### 从使用角度看什么是脚手架

脚手架的执行原理如下：
1. 在终端输入 vue create vue-test-app
2. 终端解析出 vue 命令
3. 终端在环境变量中找到 vue 命令
4. 终端根据 vue 命令链接到实际文件 vue.js
5. 终端利用 node 执行 vue.js
6. vue.js 解析 command / options
7. vue.js 执行 command
8. 执行完毕，退出执行

从应用的角度看如何开发一个脚手架

>这里以 vue-cli 为例

* 开发 npm 项目，该项目中应包含一个 bin/vue.js 文件，并将这个项目发布到 npm
* 将 npm 项目安装到 node 的 lib/node_modules
* 在 node 的 bin 目录下配置 vue 软链接指向 lib/node_modules/@vue/cli/bin/vue.js
* 这样我们在执行 vue 命令的时候就可以找到 vue.js 进行执行

### 还有很多疑问需要解答
为什么全局安装 @vue/cli 后会添加的命令为 vue？
```bash
npm install -g @vue/cli
```
1. 全局安装 @vue/cli 时发生了什么？
2. 为什么 vue 指向一个 js 文件，我们却可以直接通过 vue 命令直接去执行它？

### 脚手架实现原理
<br/>
<img alt="脚手架原理图片链接" src="/images/scaffold-yl.png" style="zoom:20%">


入口文件顶部加上
```bash
#!/usr/bin/env node
```

```js
#!/usr/bin/env node
#!/usr/bin/node
```
* 第一种是在环境变量中查找 node
* 第二种是直接执行 /usr/bin/ 目录下的 node

### 脚手架开发流程详解

开发流程

* 创建 npm 项目
* 创建脚手架入口文件，最上方添加：
```bash
#!/usr/bin/env node
```
* 配置 package.json，添加 bin 属性
* 编写脚手架代码
* 将脚手架发布到 npm

### 脚手架本地link标准流程

链接本地脚手架：

```bash
cd your-cli-dir
npm link
```

链接本地库文件：

```bash
cd your-lib-dir
npm link
cd your-cli-dir
npm link your-lib
```

取消链接本地库文件：
```bash
cd your-lib-dir
npm unlink
cd your-cli-dir
# link存在
npm unlink your-lib
# link不存在
rm -rf node_modules
npm install -S your-lib
```

理解 npm link：
* npm link your-lib：将当前项目中 node_modules 下指定的库文件链接到 node 全局 node_modules 下的库文件
* npm link：将当前项目链接到 node 全局 node_modules 中作为一个库文件，并解析 bin 配置创建可执行文件

理解 npm unlink：
* npm unlink：将当前项目从 node 全局 node_modules 中移除
* npm unlink your-lib：将当前项目中的库文件依赖移除






## 使用Lerna进行多包管理

Lerna 是一个优化基于 git+npm 的多 package 项目的管理工具

### 优势
* 大幅减少重复操作
* 提升操作的标准化
  
Lerna 是架构优化的产物，它揭示了一个架构真理：项目复杂度提升后，就需要对项目进行架构优化。架构优化的主要目标往往都是以效能为核心。

### lerna 开发脚手架流程
<br>
<!-- ![lerna 开发脚手架流程图](/images/scaffold-lerna.png) -->
<img alt="lerna 开发脚手架流程图" src="/images/scaffold-lerna.png" style="zoom:50%">

### 基于 Lerna 创建项目

```bash
npm install -g lerna
git init my-cli-test && cd my-cli-test
# 初始化 Lerna 项目
lerna init
# 创建 Package
lerna create @my-cli/core packages
# 安装依赖
lerna add mocha packages/core --dev
# 删除依赖
lerna clean
# 安装依赖
lerna bootstrap
lerna run test
# 执行特定包的单元测试
lerna run test @my-cli-test/core
lerna link
lerna publish
```

### Lerna 使用细节
>lerna init：会自动完成 git 初始化，但不会创建 .gitignore，这个必须手动添加，否则会将 node_modules 目录都上传到 git，如果 node_modules 已经加入 git stage，可使用：
```bash
git reset HEAD <file>
```
执行 unstage 操作，如果文件已经被 git 监听到变更，可使用：
```bash
git checkout -- <filename>
```

### Lerna源码分析

#### 为什么要做源码分析？

* 自我成长、提升编码能力和技术深度的需要
* 为我所用、应用到实际开发，实际产生效益
* 学习借鉴、站在巨人肩膀上，登高望远
  
#### import-local 源码精读

>import-local 的用途是如果处于 lerna 代码根目录下，执行全局 lerna 命令时，会优先执行当前目录下的 lerna 代码

```js
const path = require('path');
const resolveCwd = require('resolve-cwd');
const pkgDir = require('pkg-dir');

module.exports = filename => {
	const globalDir = pkgDir.sync(path.dirname(filename));
	const relativePath = path.relative(globalDir, filename);
	const pkg = require(path.join(globalDir, 'package.json'));
    // 当前工作目录下寻找该文件  relativePath
	const localFile = resolveCwd.silent(path.join(pkg.name, relativePath));
	// Use `path.relative()` to detect local package installation,
	// because __filename's case is inconsistent on Windows
	// Can use `===` when targeting Node.js 8
	// See https://github.com/nodejs/node/issues/6624
    // 找到当前本地版本的 localFile 执行
	return localFile && path.relative(localFile, filename) !== '' ? require(localFile) : null;
};
```
使用node调式配置文件进行调式
```bash
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "runtimeExecutable":"/usr/local/bin/node",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "/usr/local/bin/lerna",
            "trace": true,
            "args": ["-h"],
            // "outFiles": [
            //     "${workspaceFolder}/**/*.js"
            // ]
        }
    ]
}
```
处理流程：
```
执行 lerna 全局命令，此时相当于执行：
node /usr/local/lib/node_modules/lerna/cli.js
此时 import-local 各变量计算结果为：
globalDir = /usr/local/lib/node_modules/lerna/
relativePath = cli.js
pkg = /usr/local/lib/node_modules/lerna/package.json 的值
localFile = /your dir/lerna/lerna-main/core/lerna/cli.js

最终会执行当前工作目录下的lerna
require(localFile)
开始执行 /your dir/lerna/lerna-main/core/lerna/cli.js 中的 import-local 逻辑
此时 import-local 各变量计算结果为：
globalDir =  /your dir/lerna/lerna-main/core/lerna
relativePath = cli.js
pkg =  /your dir/lerna/lerna-main/core/lerna/package.json 的值
localFile = /your dir/lerna/lerna-main/core/lerna/cli.js
此时会执行：
require(".")(process.argv.slice(2));
至此 import-local 逻辑执行完毕
```

实现原理总结：
* 通过 import-local 优先调用本地 lerna 命令
* 通过 Yargs 生成脚手架，先注册全局属性，再注册命令，最后通过 parse 方法解析参数
* lerna 命令注册时需要传入 builder 和 handler 两个方法，builder 方法用于注册命令专属的 options，handler 用来处理命令的业务逻辑
* lerna 通过配置 npm 本地依赖的方式来进行本地开发，具体写法是在 package.json 的依赖中写入：file:your-local-module-path ，在 lerna publish 时会自动将该路径替换


### node 的 module 模块

* Module._resolveFilename
* Module._nodeModulePaths
  
执行流程图

<img alt="Module._resolveFilename、Module._nodeModulePaths 执行流程图" src="/images/module-node.jpg">

Node.js 模块路径解析流程

* Node.js 项目模块路径解析是通过 require.resolve 方法来实现的
* require.resolve 就是通过 Module._resolveFileName 方法实现的
> Module._resolveFileName 方法核心流程有 3 点：
1. 判断是否为内置模块
2. 通过 Module._resolveLookupPaths 方法生成 node_modules 可能存在的路径
3. 通过 Module._findPath 查询模块的真实路径
> Module._findPath 核心流程有 4 点：
1. 查询缓存（将 request 和 paths 通过 \x00 合并成 cacheKey）
2. 遍历 paths，将 path 与 request 组成文件路径 basePath
3. 如果 basePath 存在则调用 fs.realPathSync 获取文件真实路径
4. 将文件真实路径缓存到 Module._pathCache（key 就是前面生成的 cacheKey）
> fs.realPathSync 核心流程有 3 点：
1. 查询缓存（缓存的 key 为 p，即 Module._findPath 中生成的文件路径）
2. 从左往右遍历路径字符串，查询到 / 时，拆分路径，判断该路径是否为软链接，如果是软链接则查询真实链接，并生成新路径 p，然后继续往后遍历，这里有 1 个细节需要特别注意：
   * 遍历过程中生成的子路径 base 会缓存在 knownHard 和 cache 中，避免重复查询
3. 遍历完成得到模块对应的真实路径，此时会将原始路径 original 作为 key，真实路径作为 value，保存到缓存中
>require.resolve.paths 等价于 Module._resolveLookupPaths，该方法用于获取所有 node_modules 可能存在的路径
* Module._nodeModulePaths 实现原理：
如果路径为 /（根目录），直接返回 ['/node_modules']
否则，将路径字符串从后往前遍历，查询到 / 时，拆分路径，在后面加上 node_modules，并传入一个 paths 数组，直至查询不到 / 后返回 paths 数组

## yargs使用方法

脚手架初始化流程

构造函数：Yargs()
> 常用方法：
* Yargs.options
* Yargs.option
* Yargs.group
* Yargs.demandCommand
* Yargs.recommendCommands
* Yargs.strict
* Yargs.fail
* Yargs.alias
* Yargs.wrap
* Yargs.epilogue
>脚手架参数解析方法
* hideBin(process.argv) / Yargs.argv
* Yargs.parse(argv, options)
>命令注册方法
* Yargs.command(command, describe, builder, handler)
* Yargs.command({ command, describe, builder, handler })

收获总结
* 熟悉Yargs脚手架开发框架
* 熟悉多Package管理工具Lerna的使用方法和实现原理
* 深入理解Node.js模块路径解析流程
