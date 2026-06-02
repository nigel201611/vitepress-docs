# VS Code 插件开发
## 通过 Yeoman 脚手架自动生成插件模板

```bash
npm install -g yo generator-code
yo code

#命令行中效果如下

     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the Visual  │
    |--(o)--|    │   Studio Code Extension  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? What type of extension do you want to create? (Use arrow keys)
❯ New Extension (TypeScript) 
  New Extension (JavaScript) 
? What type of extension do you want to create? New Extension (JavaScript)
? What's the name of your extension? vsplugindemo
? What's the identifier of your extension? vsplugindemo
? What's the description of your extension? for stady
? Enable JavaScript type checking in 'jsconfig.json'? Yes
? Initialize a git repository? No
? Which package manager to use? npm

```

## 如何调式

按F5，这将在新的扩展开发主机窗口中编译并运行扩展。
从命令选项板运行命令(⇧⌘P）执行命令

## 项目结构
核心在于两个文件
package.json
```js
{
	"name": "syncvsplugin",
	"displayName": "syncvsplugin",
	"description": "a vscode plugin which can sync team's vscode plugin",
	"version": "1.0.2",
	"engines": {
		"vscode": "^1.62.0"
	},
	"publisher": "xianglianluo",
	"author": {
		"name": "nigel"
	},
	"activationEvents": [
		"onCommand:syncvsplugin.syncplugin"
	],
	"main": "./extension.js",
	"contributes": {
		"commands": [
			{
				"command": "syncvsplugin.syncplugin",
				"title": "syncplugin"
			}
		]
	}
}
```
extension.js

```js
import * as vscode from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // 开发你需要的功能，比如注册命令
    const syncpluginCommand = vscode.commands.registerCommand(
    `${vsPluginName}.syncplugin`,
    function () {}
  );
  context.subscriptions.push(syncpluginCommand);
}
```

## 发布到VS Code插件市场

```bash
npm i -g vsce
vsce package
# myExtension.vsix generated
vsce login < your publisher id>
vsce publish
# <publisherID>.myExtension published to VS Code Marketplace
```
如果安装失败，比如报权限问题，可以通过设置 npm -g config set user root 来解决，也可以本地打包，然后在插件管理平台手动上传发布

## VSCode调试配置项说明
* request：请求配置类型，可以为launch（启动）或attach（附加）
下面是launch 和 attach 类型共有的属性：
* protocol：设置调试协议
* auto： 尝试自动检测目标运行时使用的协议
* inspector 新的V8调试器协议，解决遗留版本的多数问题，node versions >= 6.3 and Electron versions >= 1.7.4
* legacy： 原始的v8调试器协议，node versions < v8.0 and Electron versions < 1.7.4.
* port：调试使用的端口
* address ：TCP/IP地址，用于远程调试
* localRoot： 远程调试时映射的本地地址
* remoteRoot： 远程调试时的远程目录地址
* sourceMaps： 默认为true
* outFiles ：当map文件不在js文件同目录时用于指定 sourceMaps的位置
* restart ：自动重启调试
* timeout： 配置自动附加的超时时间
* stopOnEntry： 自动断点到第一行代码处
* smartStep： 自动跳过未映射到源代码的代码
* skipFiles :[]String,指定跳过单步调试的代码
* trace ： 启用诊断输出

以下是特定于类型 launch(启动)的配置属性：
* program： 指定调试入口文件地址
* args ： []String 传递给程序的参数,可在process.argv拿到
* cwd ：指定程序启动调试的目录 ,当vscode启动目录不是项目根目录，并且调试npm script时非常有用
* runtimeExecutable： 设置运行时可执行文件路径，默认是node
可以是其他的执行程序，如npm、nodemon
* runtimeArgs： 传递给运行时可执行文件的参数,例如：
* runtimeVersion： 设置运行时可执行程序的版本，如果使用nvm，可以切换node.js版本
* env： 添加额外的环境变量
* envFile： 文件加载环境变量
* console： 配置终端可以是外部终端或者内部集成终端，默认值internalConsole
* autoAttachChildProcesses： 跟踪调试对象的所有子过程，并自动附加到在调试模式下启动的子过程