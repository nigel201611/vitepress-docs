# Self-Developed Scaffold

## Development Background

Existing projects use various frameworks, tech stacks, and tool collections. From one project to another, there is no unified development environment. Developers switching between different projects need significant time to familiarize themselves with each project. Some older projects cannot be updated to newer frameworks in a timely manner, with high update costs, high refactoring costs, and subsequent maintenance and refactoring expenses being very high, to the point that no one maintains them. By using a scaffold to uniformly manage project version dependencies, tool collections, and framework upgrades, we can provide a unified development environment and development standards. Developers switching between different projects experience minimal cognitive load, have more time to focus on requirements, saving development time and improving efficiency.

## Goal

Unify the management of frameworks, project dependency versions, bundling tools, and utility helper functions through the scaffold, thereby decoupling bundling tools, project dependencies, utility functions, and project source code, reducing development focus points, and allowing developers to concentrate on the requirements themselves. At the same time, use the scaffold for unified management and maintenance.

## Scaffold Usage

### Installation
```
npm i -g @pa/one-cli
```
### Initialize Project

```bash
npx one init
```

### Development

```bash
one dev --env=dev
```

### Build

```bash
one build --env=prd
```

### User Configuration

Add `one.config.js` to the project root directory
```js
module.exports = {
    isMulti: true,
    port: '9000',
    deployPath: '',
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

| Field | Description | Default Value |
| ------ | ----- | ------ |
|  isMulti |  Whether multi-page |  true |
|  port |  Port for dev server |  9000 |
| deploy |  Deploy path, or application directory in online deploy config | '' |
|  assetsPublicPath |  Directory for static assets after build, default '/' |  / |
|  appDirPath |  Directory for page source code |  src/container/ |
|  packTool |  Bundling tool, future support for vite, rspack |  webpack |
|  PUIVer | Poppy UI version |  5.0.30 |
|  authSdkVer | Auth SDK version |  1.0.0 |
|  aladdinVer | Aladdin version |  1.0.22 |
|  shareSdkVer | Share SDK version |  3.0.2 |
|  safeToolsVer | Security toolkit SDK version |  1.0.23 |
|  adverSdkVer | Advertising SDK version |  3.0.0 |
|  filterPackages | Full build can filter certain sub-packages via filterPackages |  [] |
|  report | Whether to generate build analysis (bundle size analysis) |  false |

### Incremental Bundling

In multi-page mode, use the environment variable `--packages=sub-package1:sub-package2:sub-package3` for incremental bundling locally

```bash
one build --env=prd --packages=sub-package1:sub-package2
```

For online deployment environments, pass through via configuration, such as the RMS3.0 online deployment configuration file `.wermsrc.yml`
```bash
# Language environment config, currently only supports node environment
language: node_js
version: v14.16.3

env:
  - ENV=fat
  - CLEAN=0

before_build:
  - [ ${CLEAN} = 1 ] && anpm i --registry=http://repo.pab.com.cn/artifactory/api/npm/npm-arch-frontend
# Build related
build:
  # Script to execute the build
  script:
    - echo ${PACKAGES}
    - echo ${TYPE}
    - npm run build:${ENV} --  --packages=${PACKAGES}

  dist_dir: dist/${ENV}/pay/sfk/
# Post-build operations
after_build:
   - echo Success!!
```

Pass-through method
```bash
npm run build:${ENV} --  --packages=${PACKAGES}
```

### Environment Variables

Add configuration files for different environments in the project root directory

* .env.dev
* .env.fat
* .env.prd


## Update Utility Function Library -- In Development

```bash
one upate
```



## Migrating Legacy Projects

### 1. Add to package.json

```json
"scripts": {
        "start": "one dev --env=dev",
        "build:prd": "one build --env=prd ",
        "build:uat": "one build --env=uat",
        "build:fat": "one build --env=fat"
}
```

### 2. Add `one.config.js`

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

### 3. Static Assets

Place static assets in the root `static` directory. Assets under `static` will not be compiled by the build tool and are generally used for storing third-party libraries, images, etc.







## Module Breakdown by Function:
- Core module: core
- Command module: commands
- Model module: models
- Utility module: utils

### Core Module Technical Architecture

> Command execution flow
1. Preparation phase
2. Command registration
3. Command execution

<img src="/images/myCliDev-core.png" alt="Core module technical architecture">

## Architecture Optimization
<br/>
<img src="/images/cli-dev-init.jpg" alt="Initial scaffold architecture">
This architecture design can already meet general scaffold requirements, but has the following two issues:

1. Slow CLI installation: All packages are integrated into the CLI, so when there are many commands, it slows down the CLI installation speed
2. Poor flexibility: The `init` command can only use the `@cli-dev/init` package. For a group company, each department's `init` command may be different, requiring dynamic `init` commands, such as:
* Team A uses `@cli-dev/init` as the initialization module
* Team B uses their own `@cli-dev/my-init` as the initialization module
* Team C uses their own `@cli-dev/your-init` as the initialization module
This poses a challenge to our architecture design, requiring us to dynamically load `init` modules. This increases architectural complexity but greatly improves scaffold extensibility, decoupling the scaffold framework from business logic.

<img src="/images/cli-dev-optimize.png" alt="Optimized scaffold architecture">


### Command Module Dynamic Loading Architecture Design
<br/>
<img src="/images/cli-dev-execComand.jpg" alt="Scaffold command dynamic loading architecture design">

### Project and Component Creation Architecture Design
Thoughts behind the architecture
* Extensibility: Can be quickly reused across different teams, adapting to differences between teams (custom installation)
* Low cost: New templates can be added without modifying the scaffold source code, and the cost of adding templates is very low (template information stored in database)
* High performance: Control storage space, fully utilize Node multi-process during installation to improve installation performance

<br/>
<img src="/images/cli-dev-createProject.png" alt="Scaffold project creation architecture design">









