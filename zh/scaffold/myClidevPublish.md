# 脚手架发布架构设计
## 前端发布流程

<img src="/images/my-cli-dev-publish.jpg">

## 前端发布架构设计
<br>
<img src="/images/publish-init.png">

## 前端发布GitFlow+云构建+云发布

<br/>
<img src="/images/publish-detail.png">

## GitFlow主流程

<img src="/images/gitflow1.jpg">

### GitFlow多人协作流程

<img src="/images/gitflow2.jpg">

## 云构建

### 为什么需要云构建
* 减少发布过程中的重新劳动
  * 打包构建
  * 上传静态资源服务器
  * 上传CDN
* 避免不同环境间造成的差异，保证依赖版本的一致性
* 提升构建性能
* 对构建过程进行统一、集中管控
  * 发布前代码统一规则检查，解决大量安全隐患或者性能瓶颈
  * 例1：要求接口全部使用 https
  * 例2：对于某些落后版本的依赖要求强制更新
  * 封网日统一发布卡口

### 云构建架构设计图

<img src="/images/cloundBuild_1.jpg">

## WebSocket & Redis 快速入门
WebSocket 入门
### 什么是 WebSocket？

WebSocket 基本概念：https://www.runoob.com/html/html5-websocket.html

### WebSocket 开发流程

WebSocket 开发流程：https://eggjs.org/zh-cn/tutorials/socketio.html

### WebSocket 服务开发流程

安装依赖
```js
npm i -S egg-socket.io
```
更新配置文件
```js
// config.default.js
config.io = {
  namespace: {
    '/': {
      connectionMiddleware: ['auth'],
      packetMiddleware: ['filter'],
    },
    '/chat': {
      connectionMiddleware: ['auth'],
      packetMiddleware: [],
    },
  },
};

// plugin.js
exports.io = {
  enable: true,
  package: 'egg-socket.io',
};
修改路由配置
// router.js
// app.io.of('/')
app.io.route('chat', app.io.controller.chat.index);
// app.io.of('/chat')
app.io.of('/chat').route('chat', app.io.controller.chat.index);
// 开发 middleware
// app/io/middleware/auth.js
'use strict';
module.exports = () => {
  return async (ctx, next) => {
    const say = await ctx.service.user.say();
    ctx.socket.emit('res', 'auth!' + say);
    await next();
    console.log('disconnect!');
  };
};
// 开发 controller
// app/io/controller/chat.js
'use strict';
module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      console.log('chat :', message + ' : ' + process.pid);
      const say = await this.ctx.service.user.say();
      this.ctx.socket.emit('res', say);
    }
  }
  return Controller;
};
```
### WebSocket 客户端开发流程
```js
// or http://127.0.0.1:7001/chat
const socket = require('socket.io-client')('http://127.0.0.1:7001');
socket.on('connect', () => {
  console.log('connect!');
  socket.emit('chat', 'hello world!');
});
socket.on('res', msg => {
  console.log('res from server: %s!', msg);
});
```
## Redis 入门
### 什么是 Redis？

Redis 基本概念：https://www.runoob.com/redis/redis-tutorial.html

Redis 安装方法
* Windows & Linux：https://www.runoob.com/redis/redis-install.html
* MacOS：https://www.cnblogs.com/pangkang/p/12612292.html
Redis 开发流程
Redis 开发流程：https://www.npmjs.com/package/egg-redis


## 云发布架构图

<img src="/images/cloundPublish.jpg">