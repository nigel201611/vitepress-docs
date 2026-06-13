# Scaffold Publish Architecture Design
## Frontend Publish Flow

<img src="/images/my-cli-dev-publish.jpg">

## Frontend Publish Architecture Design
<br>
<img src="/images/publish-init.png">

## Frontend Publish: GitFlow + Cloud Build + Cloud Publish

<br/>
<img src="/images/publish-detail.png">

## GitFlow Main Flow

<img src="/images/gitflow1.jpg">

### GitFlow Multi-person Collaboration Flow

<img src="/images/gitflow2.jpg">

## Cloud Build

### Why Cloud Build Is Needed
* Reduce repetitive work in the release process
  * Bundle and build
  * Upload to static resource server
  * Upload to CDN
* Avoid differences between environments, ensure dependency version consistency
* Improve build performance
* Centralized management and control of the build process
  * Unified code rule checks before release, addressing many security issues or performance bottlenecks
  * Example 1: Require all APIs to use HTTPS
  * Example 2: Force updates for certain outdated dependency versions
  * Unified release gate during lockdown periods

### Cloud Build Architecture Design Diagram

<img src="/images/cloundBuild_1.jpg">

## WebSocket & Redis Quick Start
WebSocket Quick Start
### What is WebSocket?

WebSocket basic concepts: https://www.runoob.com/html/html5-websocket.html

### WebSocket Development Flow

WebSocket development flow: https://eggjs.org/zh-cn/tutorials/socketio.html

### WebSocket Server Development Flow

Install dependencies
```js
npm i -S egg-socket.io
```
Update configuration file
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
Update route configuration
// router.js
// app.io.of('/')
app.io.route('chat', app.io.controller.chat.index);
// app.io.of('/chat')
app.io.of('/chat').route('chat', app.io.controller.chat.index);
// Develop middleware
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
// Develop controller
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
### WebSocket Client Development Flow
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
## Redis Quick Start
### What is Redis?

Redis basic concepts: https://www.runoob.com/redis/redis-tutorial.html

Redis Installation Methods
* Windows & Linux: https://www.runoob.com/redis/redis-install.html
* MacOS: https://www.cnblogs.com/pangkang/p/12612292.html
Redis Development Flow
Redis development flow: https://www.npmjs.com/package/egg-redis


## Cloud Publish Architecture Diagram

<img src="/images/cloundPublish.jpg">
