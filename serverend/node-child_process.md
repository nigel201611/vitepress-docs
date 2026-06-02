# child_process 用法原理

## child_process 用法

```js
const cp = require("child_process");
const path = require("path");
let child;
// cp.exec 用来执行 shell 脚本，child 是 ChildProcess 子进程对象
// cp.exec(command,options,callback) 
// options: env,timeout,encoding,shell,maxBuffer
child = cp.exec("ls -al|grep node_modules", function (err, stdout, stderr) {
  console.log("callback start-------------");
  console.log(err);
  console.log(stdout);
  console.log(stderr);
  console.log("callback end-------------");
});

child.on("error", (err) => {
  console.log("error!", err);
});

child.stdout.on("data", (chunk) => {
  console.log("stdout data", chunk);
});

child.stderr.on("data", (chunk) => {
  console.log("stderr data", chunk);
});

child.stdout.on("close", () => {
  console.log("stdout close");
});

child.stderr.on("close", () => {
  console.log("stderr close");
});

child.on("exit", (exitCode) => {
  console.log("exit!", exitCode);
});

child.on("close", () => {
  console.log("close!");
});

// 一般执行shell脚本文件，和exec相比，exec可以加入 grep 等管道筛选命令
// 另外 exec 也可传入一个shell脚本文件，但不支持传额外参数
// cp.execFile(file[, args][, options][, callback])
// options: env,timeout,encoding,shell,maxBuffer
cp.execFile(
  path.resolve(__dirname, "test.shell"),
  ["-al", "-bl"],
  function (err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  }
);

// spawn: 耗时任务（比如：npm install），需要不断接收日志，不断输出
// cp.spawn(file,args,options)
const child2 = cp.spawn("npm", ["install"], {
  cwd: path.resolve("/Users/sam/Desktop/vue-test/imooc-test-lib"),
  stdio: "inherit",
});

child2.stdout.on("data", function (chunk) {
  console.log(chunk.toString());
});

child2.stderr.on("data", function (chunk) {
  console.log(chunk.toString());
});
// exec/execFile: 开销比较小的任务
// 会将结果一次性返回
// cp.exec(
//   "npm install",
//   {
//     cwd: path.resolve("/Users/nigel/Desktop/vue-test/test-lib"),
//   },
//   function (err, stdout, stderr) {
//     console.log(err);
//     console.log(stdout);
//     console.log(stderr);
//   }
// );
// fork：Node(main) -> Node(child)
// fork(modulePath[, args][, options])
const child3 = cp.fork(path.resolve(__dirname, "child.js"));
child3.send("hello child process!", () => {
  child.disconnect();
});
child3.on("message", (msg) => {
  console.log(msg);
});
console.log("main pid:", process.pid);

// child_process 同步方法
const ret = cp.execSync("ls -al|grep node_modules");
console.log(ret.toString());
const ret2 = cp.execFileSync("ls", ["-al"]);
console.log(ret2.toString());
const ret3 = cp.spawnSync("ls", ["-al"]);
console.log(ret3.stdout.toString());
```
>exec execFile spawn 返回的是子进程实例 
child 上挂载的 stdin,stdout,stderr 都是socket实例

## child_process 原理

### exec/execFile/spawn/fork的区别
* exec：会对参数做一些处理，底层调用了 execFile
* execFile：对参数做一些处理，底层调用 spawn 创建和执行子进程，并建立了回调，一次性将所有的 stdout 和 stderr 结果返回
* spawn：原理是调用了 internal/child_process，实例化了 ChildProcess 子进程对象，再调用 child.spawn 创建子进程并执行命令，底层是调用了 child._handle.spawn 执行 process_wrap 中的 spawn 方法，执行过程是异步的，执行完毕后通过 PIPE 进行单向数据通信，通信结束后会子进程发起 onexit 回调，同时 Socket 会执行 close 回调
* fork：原理是通过 spawn 创建子进程和执行命令，采用 node 执行命令，通过 setupchannel 创建 IPC 用于子进程和父进程之间的双向通信
### data/error/exit/close回调的区别
* data：主进程读取数据过程中通过 onStreamRead 发起的回调
* error：命令执行失败后发起的回调
* exit：子进程关闭完成后发起的回调
* close：子进程所有 Socket 通信端口全部关闭后发起的回调
* stdout close/stderr close：特定的 PIPE 读取完成后调用 onReadableStreamEnd 关闭 Socket 时发起的回调

## exec 源码深入分析
child_process
* exec
* execFile
* spawn
  
internal/child_process
* ChildProcess
* spawn

<img src="/images/node-child_process.jpg" alt="child_process 源码流程图">

## Node 多进程回调流程

* spawn
* Pipe
* onexit
* kill
* Socket
* close
* exit
  
<img src="/images/process_spawn_callback.jpg" alt="Node 多进程回调流程">

## Node 多进程执行阶段总结

<br/>
<img src="/images/process_spawn_callback2.jpg" alt="多进程执行阶段总结">

## Fork 执行流程分析
核心区别是创建 IPC Channel 取代 [stdin, stdout, stderr]

## 知识储备

### shell的使用

方法一：直接执行shell文件

```bash
/bin/sh test.shell
```
方法二：直接执行shell语句
```bash
/bin/sh -c "ls -al|grep node_modules"
```

