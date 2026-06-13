# VS Code Plugin Development
## Generate plugin templates via Yeoman scaffolding

```bash
npm install -g yo generator-code
yo code

# Effect in the command line as follows

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

## How to Debug

Press F5, this will compile and run the extension in a new Extension Development Host window.
Run the command from the Command Palette (⇧⌘P).

## Project Structure
The core lies in two files:
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
    // Develop the functionality you need, e.g., register commands
    const syncpluginCommand = vscode.commands.registerCommand(
    `${vsPluginName}.syncplugin`,
    function () {}
  );
  context.subscriptions.push(syncpluginCommand);
}
```

## Publish to VS Code Marketplace

```bash
npm i -g vsce
vsce package
# myExtension.vsix generated
vsce login <your publisher id>
vsce publish
# <publisherID>.myExtension published to VS Code Marketplace
```
If the installation fails, e.g., due to permission issues, you can resolve it by setting `npm -g config set user root`, or you can package locally and manually upload to the plugin management platform for publishing.

## VSCode Debug Configuration Reference
* request: Configuration type, can be launch or attach
Below are common properties for both launch and attach types:
* protocol: Set the debug protocol
* auto: Attempt to auto-detect the protocol used by the target runtime
* inspector: New V8 debugger protocol, resolves most issues from legacy versions, node versions >= 6.3 and Electron versions >= 1.7.4
* legacy: Original V8 debugger protocol, node versions < v8.0 and Electron versions < 1.7.4
* port: Port used for debugging
* address: TCP/IP address for remote debugging
* localRoot: Local directory mapping for remote debugging
* remoteRoot: Remote directory path for remote debugging
* sourceMaps: Defaults to true
* outFiles: Used to specify the location of sourceMaps when map files are not in the same directory as JS files
* restart: Automatically restart debugging
* timeout: Configure timeout for auto-attach
* stopOnEntry: Automatically breakpoint at the first line of code
* smartStep: Automatically skip code that is not mapped to source
* skipFiles: []String, specify code to skip during step debugging
* trace: Enable diagnostic output

The following are configuration properties specific to the launch type:
* program: Specify the debug entry file path
* args: []String, arguments passed to the program, accessible via process.argv
* cwd: Specify the working directory for debugging startup, useful when the vscode startup directory is not the project root and when debugging npm scripts
* runtimeExecutable: Set the runtime executable path, default is node; can be other executables like npm, nodemon
* runtimeArgs: Arguments passed to the runtime executable, e.g.:
* runtimeVersion: Set the runtime executable version; if using nvm, you can switch node.js version
* env: Add additional environment variables
* envFile: Load environment variables from file
* console: Configure the terminal, can be external terminal or integrated terminal, default is internalConsole
* autoAttachChildProcesses: Track all child processes of the debug target and automatically attach to child processes started in debug mode
