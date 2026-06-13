# Node 最佳实践
>全文地址：https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md

## 项目结构最佳实践
### 拆分模块
拆分原则：
* 业务拆分
* 技术拆分

### 分层设计

将业务分层处理，以 GitFlow 为例：
* Publish
* Git
* GitServer
* CloudBuild


### 封装公共模块成为NPM的包

* 参考 Lerna 源码设计
* 通过 file 或 npm link 关联本地模块
* 控制拆分力度，设计拆分原则
配置文件
* 将配置文件独立处置
* 巧用环境变量共享配置
* 将密码文件独立于源码提交
* 通过 dotenv 或 config 管理环境变量或配置文件
## 异常处理最佳实践
使用 async await 或 promise，避免使用回调

推荐：
```js
doWork()
 .then(doWork)
 .then(doOtherWork)
 .then((result) => doWork)
 .catch((error) => {throw error;})
 .then(verify);

(async function() {
  try {
    await doWork();
    const result = await doOtherWork();
    await doWork(result);
  } catch(e) {
    throw e;
  } finally {
    verify();
  } 
})();
```
不推荐：
```js
getData(someParameter, function(err, result){
    if(err != null)
      //做一些事情类似于调用给定的回调函数并传递错误
      getMoreData(a, function(err, result){
        if(err != null)
          //做一些事情类似于调用给定的回调函数并传递错误
          getMoreData(b, function(c){ 
            getMoreData(d, function(e){ 
              if(err != null)
                //你有什么想法? 
    });
});
```
## 编码风格实践
* 使用ESLint
* Node.js特定的插件
* 在同一行开始一个代码块的大括号
* 命名您的方法
* 变量、常量、函数和类的命名约定
* 使用const优于let，废弃var
* 先require, 而不是在方法内部
* require 文件夹，而不是文件
* 使用 === 操作符
* 使用 Async Await, 避免回调
* 使用 (=>) 箭头函数
* 测试和总体的质量实践
* 至少，编写API（组件）测试
* 使用一个linter检测代码问题
* 经常检查易受攻击的依赖
* 检查过期的依赖包
## 上线实践
* 监控!
* 使用智能日志增加透明度
* 委托可能的一切（例如：gzip，SSL）给反向代理
* 锁住依赖
* 利用CPU多核
* Node外管理您的前端资源
* 设置NODE_ENV=production
## 安全最佳实践
* 拥护linter安全准则
* 使用中间件限制并发请求
* 把机密信息从配置文件中抽离出来，或者使用包对其加密
* 通用安全最佳实践集合
* 调整 HTTP 响应头以加强安全性
* 经常自动检查易受攻击的依赖库
* 避免使用Node.js的crypto库处理密码，使用Bcrypt
* 转义 HTML、JS 和 CSS 输出
* 验证传入的JSON schemas
* 使用非root用户运行Node.js
* 避免JavaScript的eval声明
* 在沙箱中运行不安全代码
* 使用子进程时要格外小心
* 避免不安全的重定向
* 避免将机密信息发布到NPM仓库