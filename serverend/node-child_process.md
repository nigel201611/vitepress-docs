# child_process Usage and Principles

## child_process Usage

```js
const cp = require("child_process");
const path = require("path");
let child;
// cp.exec is used to execute shell scripts, child is a ChildProcess instance
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

// Generally used to execute shell script files. Compared to exec, exec can include pipe filtering commands like grep
// Also, exec can take a shell script file, but does not support passing extra arguments
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

// spawn: long-running tasks (e.g., npm install), requires continuous log output
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
// exec/execFile: lightweight tasks
// Returns results all at once
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

// child_process synchronous methods
const ret = cp.execSync("ls -al|grep node_modules");
console.log(ret.toString());
const ret2 = cp.execFileSync("ls", ["-al"]);
console.log(ret2.toString());
const ret3 = cp.spawnSync("ls", ["-al"]);
console.log(ret3.stdout.toString());
```
> exec, execFile, and spawn return child process instances.
> The stdin, stdout, stderr attached to the child are socket instances.

## child_process Principles

### Differences between exec/execFile/spawn/fork
* exec: Processes arguments, internally calls execFile
* execFile: Processes arguments, internally calls spawn to create and execute a child process, sets up a callback that returns all stdout and stderr results at once
* spawn: Internally calls internal/child_process, instantiates a ChildProcess object, then calls child.spawn to create the child process and execute the command. Under the hood, it calls child._handle.spawn which executes the spawn method from process_wrap. Execution is asynchronous. After completion, one-way data communication happens via PIPE, and then the child process initiates a onexit callback, while Socket executes a close callback
* fork: Creates a child process and executes commands via spawn, uses Node to execute commands, creates an IPC channel via setupchannel for bidirectional communication between child and parent processes
### Differences between data/error/exit/close callbacks
* data: Callback initiated via onStreamRead while the main process is reading data
* error: Callback initiated after command execution fails
* exit: Callback initiated after the child process completes shutdown
* close: Callback initiated after all Socket communication ports of the child process are fully closed
* stdout close/stderr close: Callback initiated when a specific PIPE finishes reading and closes the Socket via onReadableStreamEnd

## exec Source Code Deep Dive
child_process
* exec
* execFile
* spawn
  
internal/child_process
* ChildProcess
* spawn

<img src="/images/node-child_process.jpg" alt="child_process source code flow chart">

## Node Multi-process Callback Flow

* spawn
* Pipe
* onexit
* kill
* Socket
* close
* exit
  
<img src="/images/process_spawn_callback.jpg" alt="Node multi-process callback flow">

## Node Multi-process Execution Phase Summary

<br/>
<img src="/images/process_spawn_callback2.jpg" alt="Multi-process execution phase summary">

## Fork Execution Flow Analysis
The core difference is creating an IPC Channel instead of [stdin, stdout, stderr]

## Prerequisite Knowledge

### Using the Shell

Method 1: Execute a shell file directly

```bash
/bin/sh test.shell
```
Method 2: Execute shell commands directly
```bash
/bin/sh -c "ls -al|grep node_modules"
```

