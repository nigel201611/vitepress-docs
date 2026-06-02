# 自研脚手架

## 开发背景
现有项目使用各种各样框架、技术栈、工具集合。从一个项目到另一项目，没有统一开发环境，开发者切换不同项目，熟悉项目需要不少的时间成本，且对于一些旧项目不能及时更新框架或更新换代，更新成本高，重构代价大，后续维护和重构成本很高，以至后面无人维护。由脚手架统一管理项目版本依赖，工具集合、框架升级，用脚手架来统一开发环境、开发规范，开发者切换不同项目极少有心智负担，有更多时间专注于需求，节约开发者时间成本，提升效率。

## 目标

通过脚手架统一管理框架、项目依赖版本、打包工具、工具辅助函数，从而将打包工具、项目依赖、工具辅助函数和项目源码解耦，降低开发关注点，专注于需求本身。同时借助节脚手架统一管理和维护。



## 脚手架使用

### 安装
```
npm i -g @pa/one-cli
```
### 初始化项目

```bash
npx one init
```

### 开发

```bash
one dev --env=dev
```

### 构建

```bash
one build --env=prd
```

### 用户配置

项目根目录下新增 one.config.js
```js
module.exports = {
    isMulti: true,
    port: '9000',
    deployPath: '', // 部署路径，或者线上部署配置中的应用目录
    assetsPublicPath: '/pay/sfk/',
    appDirPath: 'src/container/',
    packTool: 'webpack',
    PUIVer: '5.0.30',
    authSdkVer: '1.0.0',
    aladdinVer: '1.0.22',
    shareSdkVer: '3.0.2',
    safeToolsVer: '1.0.23',
    adverSdkVer: '3.0.0',
    filterPackages: [], 
    report: false,
};

```

| 字段 | 描述 | 默认值 |
| ------ | ----- | ------ |
|  isMulti |  是否多页面 |  true | 
|  port |  开发服务器启动的端口 |  9000 | 
| deploy |  部署路径，或者线上部署配置中的应用目录 | '' |
|  assetsPublicPath |  打包构建后静态资源所在目录，默认 '/' |  / | 
|  appDirPath |  页面源代码所在目录  |  src/container/ | 
|  packTool |  打包构建工具，后续支持 vite、rspack  |  webpack | 
|  PUIVer | poppy ui 版本  |  5.0.30 | 
|  authSdkVer | auth sdk 版本  |  1.0.0 | 
|  aladdinVer | aladdin  版本  |  1.0.22 | 
|  shareSdkVer | 分享 sdk  版本  |  3.0.2 | 
|  safeToolsVer | 安全工具箱 sdk  版本  |  1.0.23 | 
|  adverSdkVer | 广告 sdk  版本  |  3.0.0 | 
|  filterPackages | 全量构建可以通过 filterPackages 过滤某些子包  |  [] | 
|  report | 是否需要构建分析，分析包资源大小情况  |  false | 

### 增量打包

多页面模式，本地通过环境变量 --packages=子包1:子包2:子包3 进行增量打包

```bash
one build --env=prd --packages=子包1:子包2
```

线上部署环境通过透传方式，如下RMS3.0线上部署配置文件.wermsrc.yml
```bash
# 语言环境配置， 目前只支持node环境
language: node_js
version: v14.16.3

env:
  - ENV=fat
  - CLEAN=0

before_build:
  - [ ${CLEAN} = 1 ] && anpm i --registry=http://repo.pab.com.cn/artifactory/api/npm/npm-arch-frontend
# 构建相关
build:
  # 执行构建的脚本
  script:
    - echo ${PACKAGES}
    - echo ${TYPE}
    - npm run build:${ENV} --  --packages=${PACKAGES}

  dist_dir: dist/${ENV}/pay/sfk/
# 构建完之后的操作
after_build:
   - echo Success!!
```

透传方式
```bash
npm run build:${ENV} --  --packages=${PACKAGES}
```

### 环境变量

根目录下新增不同环境配置文件

* .env.dev
* .env.fat
* .env.prd


## 更新工具函数库--开发中

```bash
one upate
```



## 迁移旧项目

### 1、packages.json 新增

```json
"scripts": {
        "start": "one dev --env=dev",
        "build:prd": "one build --env=prd ",
        "build:uat": "one build --env=uat",
        "build:fat": "one build --env=fat"
}
```

### 2、 新增配置 one.config.js

```js
module.exports = {
    isMulti: true,
    port: '9000',
    assetsPublicPath: '/',
    appDirPath: 'src/container/',
    packTool: 'webpack',
    PUIVer: '5.0.30',
    authSdkVer: '1.0.0',
    aladdinVer: '1.0.22',
    shareSdkVer: '3.0.2',
    safeToolsVer: '1.0.23',
    adverSdkVer: '3.0.0',
    filterPackages: [],
    report: false,
};
```

### 3、 静态资源

静态资源放入根目录 static下,static下的资源不会经过构建工具编译，一般用于存放第三方库，图片等资源。








## 根据模块的功能拆分：
- 核心模块：core
- 命令模块：commands
- 模型模块：models
- 工具模块：utils

### core 模块技术方案

>命令执行流程
1. 准备阶段
2. 命令注册
3. 命令执行

<img src="/images/myCliDev-core.png" alt="core 模块技术方案">

## 架构优化
<br/>
<img src="/images/cli-dev-init.jpg" alt="脚手架初始架构">
这样的架构设计已经可以满足一般脚手架需求，但是有以下两个问题：

1. cli 安装速度慢：所有 package 都集成在 cli 里，因此当命令较多时，会减慢 cli 的安装速度
2. 灵活性差：init 命令只能使用 @cli-dev/init 包，对于集团公司而言，每个部门的 init 命令可能都各不相同，可能需要实现 init 命令动态化，如：
* 团队 A 使用 @cli-dev/init 作为初始化模块
* 团队 B 使用自己开发的 @cli-dev/my-init 作为初始化模块
* 团队 C 使用自己开发的 @cli-dev/your-init 作为初始化模块
这时对我们的架构设计就提出挑战，要求我们能够动态加载 init 模块，这将增加架构的复杂度，但大大提升脚手架的可扩展性，将脚手架框架和业务逻辑解耦

<img src="/images/cli-dev-optimize.png" alt="脚手架架构优化图">


### 命令模块动态加载功能架构设计
<br/>
<img src="/images/cli-dev-execComand.jpg" alt="脚手架命令动态加载功能架构设计">

### 项目、组件创建功能架构设计
架构背后的思考
* 可扩展：能够快速复用到不同团队，适应不同团队之间的差异（自定安装）
* 低成本：在不改动脚手架源码的情况下，能够新增模板，且新增模板的成本很低（模板信息存数据库）
* 高性能：控制存储空间，安装时充分利用 Node 多进程提升安装性能
  
<br/>
<img src="/images/cli-dev-createProject.png" alt="脚手架项目创建功能架构设计">










