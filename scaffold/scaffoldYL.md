# Scaffold Development

The core goal of developing a scaffold is to improve frontend R&D efficiency (automated project creation, automated publishing, automated Git operations, etc.).

A scaffold is essentially an operating system client that executes through the command line.

## How Scaffolds Work

### What is a Scaffold from a Usage Perspective

The execution principle of a scaffold is as follows:
1. Enter `vue create vue-test-app` in the terminal
2. The terminal resolves the `vue` command
3. The terminal finds the `vue` command in the environment variables
4. The terminal links the `vue` command to the actual file `vue.js`
5. The terminal uses Node to execute `vue.js`
6. `vue.js` parses the command / options
7. `vue.js` executes the command
8. Execution completes, exit

How to develop a scaffold from an application perspective

> Here we take vue-cli as an example

* Develop an npm project that includes a `bin/vue.js` file and publish this project to npm
* Install the npm project to node's `lib/node_modules`
* Configure a `vue` symlink in node's `bin` directory pointing to `lib/node_modules/@vue/cli/bin/vue.js`
* This way, when we execute the `vue` command, it can find `vue.js` for execution

### Many Questions Still Need Answers

Why does globally installing `@vue/cli` add the command `vue`?
```bash
npm install -g @vue/cli
```
1. What happens when globally installing `@vue/cli`?
2. Why does `vue` point to a JS file, yet we can execute it directly via the `vue` command?

### Scaffold Implementation Principle
<br/>
<img alt="Scaffold principle image" src="/images/scaffold-yl.png" style="zoom:20%">


Add to the top of the entry file
```bash
#!/usr/bin/env node
```

```js
#!/usr/bin/env node
#!/usr/bin/node
```
* The first looks for node in the environment variables
* The second directly executes node in the `/usr/bin/` directory

### Detailed Scaffold Development Process

Development Process

* Create an npm project
* Create a scaffold entry file, add at the very top:
```bash
#!/usr/bin/env node
```
* Configure `package.json`, add the `bin` property
* Write scaffold code
* Publish the scaffold to npm

### Standard Local Scaffold Link Process

Link a local scaffold:

```bash
cd your-cli-dir
npm link
```

Link a local library:

```bash
cd your-lib-dir
npm link
cd your-cli-dir
npm link your-lib
```

Unlink a local library:
```bash
cd your-lib-dir
npm unlink
cd your-cli-dir
# if link exists
npm unlink your-lib
# if link does not exist
rm -rf node_modules
npm install -S your-lib
```

Understanding npm link:
* `npm link your-lib`: Links the specified library file in the current project's `node_modules` to the library file in node's global `node_modules`
* `npm link`: Links the current project to node's global `node_modules` as a library file, and resolves the `bin` configuration to create an executable file

Understanding npm unlink:
* `npm unlink`: Removes the current project from node's global `node_modules`
* `npm unlink your-lib`: Removes the library file dependency from the current project






## Multi-Package Management with Lerna

Lerna is a tool for optimizing the management of multi-package projects based on git+npm.

### Advantages
* Significantly reduces repetitive operations
* Improves standardization of operations

Lerna is a product of architectural optimization, revealing an architectural truth: as project complexity increases, architectural optimization becomes necessary. The main goal of architectural optimization is typically centered on efficiency.

### Lerna Scaffold Development Process
<br>
<!-- ![lerna scaffold development flowchart](/images/scaffold-lerna.png) -->
<img alt="Lerna scaffold development flowchart" src="/images/scaffold-lerna.png" style="zoom:50%">

### Creating a Project with Lerna

```bash
npm install -g lerna
git init my-cli-test && cd my-cli-test
# Initialize Lerna project
lerna init
# Create a Package
lerna create @my-cli/core packages
# Install dependencies
lerna add mocha packages/core --dev
# Remove dependencies
lerna clean
# Install dependencies
lerna bootstrap
lerna run test
# Run unit tests for a specific package
lerna run test @my-cli-test/core
lerna link
lerna publish
```

### Lerna Usage Details
> `lerna init`: Automatically initializes git, but does not create a `.gitignore`. This must be added manually, otherwise `node_modules` directories will be uploaded to git. If `node_modules` has already been added to git stage, use:
```bash
git reset HEAD <file>
```
To unstage. If files have already been tracked for changes by git, use:
```bash
git checkout -- <filename>
```

### Lerna Source Code Analysis

#### Why Source Code Analysis?

* Self-improvement, enhancing coding ability and technical depth
* For our own use, applying to actual development to produce real benefits
* Learning and borrowing, standing on the shoulders of giants to see further

#### Import-local Source Code Deep Dive

> The purpose of `import-local` is that if you are in the lerna code root directory and execute the global lerna command, it will prioritize executing the local lerna code in the current directory

```js
const path = require('path');
const resolveCwd = require('resolve-cwd');
const pkgDir = require('pkg-dir');

module.exports = filename => {
    const globalDir = pkgDir.sync(path.dirname(filename));
    const relativePath = path.relative(globalDir, filename);
    const pkg = require(path.join(globalDir, 'package.json'));
    // Look for the file (relativePath) in the current working directory
    const localFile = resolveCwd.silent(path.join(pkg.name, relativePath));
    // Use `path.relative()` to detect local package installation,
    // because __filename's case is inconsistent on Windows
    // Can use `===` when targeting Node.js 8
    // See https://github.com/nodejs/node/issues/6624
    // Execute the local version of localFile if found
    return localFile && path.relative(localFile, filename) !== '' ? require(localFile) : null;
};
```
Debug using a Node debug configuration file
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
Processing flow:
```
Execute the global lerna command, which is equivalent to executing:
node /usr/local/lib/node_modules/lerna/cli.js
At this point, the import-local variable results are:
globalDir = /usr/local/lib/node_modules/lerna/
relativePath = cli.js
pkg = value of /usr/local/lib/node_modules/lerna/package.json
localFile = /your dir/lerna/lerna-main/core/lerna/cli.js

Eventually, it will execute lerna in the current working directory
require(localFile)
Start executing the import-local logic in /your dir/lerna/lerna-main/core/lerna/cli.js
At this point, the import-local variable results are:
globalDir =  /your dir/lerna/lerna-main/core/lerna
relativePath = cli.js
pkg =  value of /your dir/lerna/lerna-main/core/lerna/package.json
localFile = /your dir/lerna/lerna-main/core/lerna/cli.js
At this point, it executes:
require(".")(process.argv.slice(2));
At this point, the import-local logic is complete.
```

Summary of implementation principles:
* Use `import-local` to prioritize calling the local lerna command
* Use `Yargs` to create the scaffold, first register global properties, then register commands, and finally parse parameters using the `parse` method
* When registering a lerna command, you need to pass `builder` and `handler` methods. The `builder` method registers command-specific options, and `handler` handles the command's business logic
* Lerna uses local npm dependencies for local development. The specific approach is to write `file:your-local-module-path` in the `package.json` dependencies, which will be automatically replaced during `lerna publish`

### Node.js Module Module

* Module._resolveFilename
* Module._nodeModulePaths

Execution Flowchart

<img alt="Module._resolveFilename, Module._nodeModulePaths execution flowchart" src="/images/module-node.jpg">

Node.js Module Path Resolution Process

* Node.js project module path resolution is implemented through the `require.resolve` method
* `require.resolve` is implemented through the `Module._resolveFileName` method
> The `Module._resolveFileName` method core flow has 3 points:
1. Check if it is a built-in module
2. Generate possible `node_modules` paths through `Module._resolveLookupPaths`
3. Query the real path of the module through `Module._findPath`
> The `Module._findPath` core flow has 4 points:
1. Check cache (merge `request` and `paths` with `\x00` to form `cacheKey`)
2. Iterate through `paths`, combining `path` and `request` to form the file path `basePath`
3. If `basePath` exists, call `fs.realPathSync` to get the real file path
4. Cache the real file path in `Module._pathCache` (key is the previously generated `cacheKey`)
> The `fs.realPathSync` core flow has 3 points:
1. Check cache (cache key is `p`, i.e., the file path generated in `Module._findPath`)
2. Traverse the path string from left to right. When encountering `/`, split the path, check if the path is a symlink. If it is a symlink, look up the real link and generate a new path `p`, then continue traversing. There is one detail to note:
   * The subpath `base` generated during traversal will be cached in `knownHard` and `cache` to avoid repeated lookups
3. After traversal, get the real path corresponding to the module. The original path is stored as the key and the real path as the value in the cache
> `require.resolve.paths` is equivalent to `Module._resolveLookupPaths`, which gets all possible `node_modules` paths
* `Module._nodeModulePaths` implementation principle:
If the path is `/` (root directory), directly return `['/node_modules']`
Otherwise, traverse the path string from back to front. When encountering `/`, split the path, append `node_modules`, and add to a `paths` array. Continue until no more `/` is found, then return the `paths` array

## Yargs Usage

Scaffold Initialization Process

Constructor: `Yargs()`
> Common methods:
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
> Scaffold parameter parsing methods
* `hideBin(process.argv)` / Yargs.argv
* Yargs.parse(argv, options)
> Command registration methods
* Yargs.command(command, describe, builder, handler)
* Yargs.command({ command, describe, builder, handler })

Summary of Key Learnings
* Familiar with the Yargs scaffold development framework
* Familiar with the usage and implementation principles of the multi-package management tool Lerna
* In-depth understanding of Node.js module path resolution process
