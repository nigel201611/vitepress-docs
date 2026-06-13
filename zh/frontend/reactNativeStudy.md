# react-native学习记录

## IOS环境搭建

### 安装依赖
必须安装的依赖有：Node、Watchman、Xcode 和 CocoaPods。

虽然你可以使用任何编辑器来开发应用（编写 js 代码），但你仍然必须安装 Xcode 来获得编译 iOS 应用所需的工具和环境

###  Node & Watchman​

我们推荐使用Homebrew来安装 Node 和 Watchman。在命令行中执行下列命令安装（如安装较慢可以尝试阿里云的镜像源）：
```js
brew install node
brew install watchman
```
如果你已经安装了 Node，请检查其版本是否在 v14 以上。安装完 Node 后建议设置 npm 镜像（淘宝源）以加速后面的过程（或使用科学上网工具）。

1. 使用nrm工具切换淘宝源
npx nrm use taobao

2. 如果之后需要切换回官方源可使用
npx nrm use npm

### Ruby​

Ruby 是一种通用编程语言。React Native 在某些与 iOS 依赖管理相关的脚本中会使用到它。与所有编程语言一样，Ruby 多年来也发布了了许多不同的版本。

React Native 使用 .ruby-version 文件来确保您的 Ruby 版本与所需的版本相一致。目前，macOS 12.5.1 自带的 Ruby 版本是 2.6.8，但这并不是 React Native 所需的版本。我们建议安装 Ruby 版本管理器来安装和管理需要的版本。

常见的 Ruby 版本管理器有

* rbenv
* RVM
* chruby
* asdf-vm 及其 asdf-ruby 插件
可以使用下面的命令来检查系统当前所使用的 Ruby 版本：
```
ruby --version
```
### Ruby 的包管理器 Bundler​

Ruby 使用 gems 这个词来指代其生态中的各种包/库/依赖。gem 就好比 npm 生态中的包，或是 Homebrew 中的 formula，或是 Cocoapods 中的 pod。

Ruby 的 Bundler 本身也是一个 gem，它的作用是管理项目中的 Ruby 依赖。我们需要使用 Ruby 来安装 Cocoapods，而 Bundler 会管理其相关的各种依赖，以保证其能够正常工作。

如果你想进一步了解此工具，可以阅读这篇英文说明.

### Yarn​

Yarn是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。

### Xcode​

React Native 目前需要Xcode 12 或更高版本。你可以通过 App Store 或是到Apple 开发者官网[https://developer.apple.com/download/]上下载。这一步骤会同时安装 Xcode IDE、Xcode 的命令行工具和 iOS 模拟器。

### Xcode 的命令行工具​

启动 Xcode，并在Xcode | Preferences | Locations菜单中检查一下是否装有某个版本的Command Line Tools。Xcode 的命令行工具中包含一些必须的工具，比如git等。

在 Xcode 中安装 iOS 模拟器​

安装模拟器只需打开 Xcode > Preferences... 菜单，然后选择 Components 选项，即可看到各种可供安装的不同的 iOS 版本的模拟器。

### CocoaPods​

CocoaPods是用 Ruby 编写的包管理器（可以理解为针对 iOS 的 npm）。从 0.60 版本开始 react native 的 iOS 版本需要使用 CocoaPods 来管理依赖。你可以使用下面的命令来安装 CocoaPods。CocoaPods 的版本需要 1.10 以上。

当然安装可能也不顺利，请使用代理软件。
```
sudo gem install cocoapods
```
或者可以使用 brew 来安装
```
brew install cocoapods
```
要了解更多信息，可以访问CocoaPods 的官网。


### 创建新项目​

如果你之前全局安装过旧的react-native-cli命令行工具，请使用npm uninstall -g react-native-cli卸载掉它以避免一些冲突：
```
npm uninstall -g react-native-cli @react-native-community/cli
```
使用 React Native 内建的命令行工具来创建一个名为"AwesomeProject"的新项目。这个命令行工具不需要安装，可以直接用 node 自带的npx命令来使用（注意 init 命令默认会创建最新的版本）：
```
npx react-native init AwesomeProject
```
>注意一：请不要在目录、文件名中使用中文、空格等特殊符号。请不要单独使用常见的关键字作为项目名（如 class, native, new, package 等等）。请不要使用与核心模块同名的项目名（如 react, react-native 等）。
注意二：0.60 及以上版本的原生依赖是通过 CocoaPods 集成安装的。CocoaPods 的源必须使用代理访问（镜像源也无效）。如果在 CocoaPods 的依赖安装步骤卡住（命令行停在 Installing CocoaPods dependencies 很久，或各种网络超时重置报错，或在 ios 目录中无法生成.xcworkspace 文件），请务必检查确定你的代理配置是否对命令行有效。
如果你是想把 React Native 集成到现有的原生项目中，则步骤完全不同，请参考集成到现有原生应用。

### [可选参数] 指定版本或项目模板​

你可以使用--version参数（注意是两个杠）创建指定版本的项目。注意版本号必须精确到两个小数点。
```
npx react-native init AwesomeProject --version X.XX.X
```
还可以使用--template来使用一些社区提供的模板，例如带有TypeScript配置的：
```
npx react-native init AwesomeTSProject --template react-native-template-typescript
```
### [可选文件] Xcode 的环境配置文件


从 React Native 版本 0.69 开始，可以使用模板提供的 .xcode.env 文件来配置 Xcode 环境。

.xcode.env 文件中包含一个环境变量示例，用于在 NODE_BINARY 变量中导出 node 执行文件的路径。这是将构建基础结构与node系统版本解耦的推荐做法。如果与默认值不同，则应使用您自己的路径或您自己的node版本管理器来自定义此变量。

此外，您还可以在构建脚本阶段中添加任何其他环境变量并导入 .xcode.env 文件。如果您需要运行需要特定环境的脚本，这也是将构建阶段与特定环境解耦的推荐做法。

### 编译并运行 React Native 应用​

在你的项目目录中运行yarn ios或者yarn react-native run-ios：
```
cd AwesomeProject
yarn ios
# 或者
yarn react-native run-ios
```
此命令会对项目的原生部分进行编译，同时在另外一个命令行中启动Metro服务对 js 代码进行实时打包处理（类似 webpack）。Metro服务也可以使用yarn start命令单独启动。
很快就应该能看到 iOS 模拟器自动启动并运行你的项目。

在正常编译完成后，开发期间请保持Metro命令行窗口运行而不要关闭。以后需要再次运行项目时，如果没有修改过 ios 目录中的任何文件，则只需单独启动yarn start命令。如果对 ios 目录中任何文件有修改，则需要再次运行yarn ios命令完成原生部分的编译。

### 修改项目​

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

使用你喜欢的编辑器打开App.js并随便改上几行。
在 iOS 模拟器中按下⌘-R就可以刷新 APP 并看到你的最新修改！（如果没有反应，请检查模拟器的 Hardware 菜单中，connect hardware keyboard 选项是否选中开启）
完成了！​

恭喜！你已经成功运行并修改了你的第一个 React Native 应用。


## Android环境搭建

### 安装依赖​

必须安装的依赖有：Node、JDK 和 Android Studio。

虽然你可以使用任何编辑器来开发应用（编写 js 代码），但你仍然必须安装 Android Studio 来获得编译 Android 应用所需的工具和环境。

Node & Watchman​

我们推荐使用Homebrew来安装 Node 和 Watchman。在命令行中执行下列命令安装（如安装较慢可以尝试阿里云的镜像源）：
```
brew install node
brew install watchman
```

### Java Development Kit​

我们推荐使用Homebrew来安装由 Azul 提供的 名为 Zulu 的 OpenJDK 发行版。此发行版同时为 Intel 和 M1 芯片提供支持。在 M1 芯片架构的 Mac 上相比其他 JDK 在编译时有明显的性能优势。
```
brew tap homebrew/cask-versions
brew install --cask zulu11
```
React Native 需要 Java Development Kit [JDK] 11。你可以在命令行中输入 javac -version（请注意是 javac，不是 java）来查看你当前安装的 JDK 版本。

低于 0.67 版本的 React Native 需要 JDK 1.8 版本（官方也称 8 版本）。

### Android 开发环境​

如果你之前没有接触过 Android 的开发环境，那么请做好心理准备，这一过程繁琐。请万分仔细地阅读下面的说明，严格对照文档进行配置操作。

译注：请注意！！！国内用户必须必须必须有稳定的代理软件，否则在下载、安装、配置过程中会不断遭遇链接超时或断开，无法进行开发工作。某些代理软件可能只提供浏览器的代理功能，或只针对特定网站代理等等，请自行研究配置或更换其他软件。总之如果报错中出现有网址，那么 99% 就是无法正常连接网络

#### 1. 安装 Android Studio

首先下载和安装 Android Studio，国内用户可能无法打开官方链接，请自行使用搜索引擎搜索可用的下载链接。安装界面中选择"Custom"选项，确保选中了以下几项：

* Android SDK
* Android SDK Platform
* Android Virtual Device
然后点击"Next"来安装选中的组件。

如果选择框是灰的，你也可以先跳过，稍后再来安装这些组件。
安装完成后，看到欢迎界面时，就可以进行下面的操作了。


#### 2. 安装 Android SDK

Android Studio 默认会安装最新版本的 Android SDK。目前编译 React Native 应用需要的是Android 13 (Tiramisu)版本的 SDK（注意 SDK 版本不等于终端系统版本，RN 目前支持 android 5 以上设备）。你可以在 Android Studio 的 SDK Manager 中选择安装各版本的 SDK。

你可以在 Android Studio 的欢迎界面中找到 SDK Manager。点击"Configure"，然后就能看到"SDK Manager"。

SDK Manager 还可以在 Android Studio 的"Preferences"菜单中找到。具体路径是Appearance & Behavior → System Settings → Android SDK。
在 SDK Manager 中选择"SDK Platforms"选项卡，然后在右下角勾选"Show Package Details"。展开Android 13 (Tiramisu)选项，确保勾选了下面这些组件（重申你必须使用稳定的代理软件，否则可能都看不到这个界面）：

Android SDK Platform 33
Intel x86 Atom_64 System Image（官方模拟器镜像文件，使用非官方模拟器不需要安装此组件）或是Google APIs ARM 64 v8a System Image（针对 Apple Silicon 系列机型）
然后点击"SDK Tools"选项卡，同样勾中右下角的"Show Package Details"。展开"Android SDK Build-Tools"选项，确保选中了 React Native 所必须的33.0.0版本。你可以同时安装多个其他版本。

点击"Apply"来下载和安装选中的这些组件。


#### 3. 配置 ANDROID_HOME 环境变量​

React Native 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。

具体的做法是把下面的命令加入到 shell 的配置文件中。如果你的 shell 是 zsh，则配置文件为~/.zshrc，如果是 bash 则为~/.bash_profile（可以使用echo $0命令查看你所使用的 shell。）：

#### 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚
```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
译注：~表示用户目录，即/Users/你的用户名/，而小数点开头的文件在 Finder 中是隐藏的，并且这个文件有可能并不存在。可在终端下使用vi ~/.zshrc命令创建或编辑。如不熟悉 vi 操作，请点击这里学习。
使用source $HOME/.zshrc命令来使环境变量设置立即生效（否则重启后才生效）。可以使用echo $ANDROID_HOME检查此变量是否已正确设置。

## 安装环境遇到的问题

### zip end header not found #21130
>Solution:
Go to /Users/{USER_NAME}/.gradle, delete all folders and files in this folder and run again

### npx react-native doctor诊断 找不到 emulator

下载新版本 Android Studio，我这里安装的是 Android Studio Flamingo | 2022.2.1 Patch 2

[官方下载地址](https://developer.android.com/studio?utm_source=android-studio)


## 安装 YApi

```
npm install -g yapi-cli
yapi server
node server/app.js 
```

### 遇到安装报错 

>在浏览器部署的时候不成功提示Error: getaddrinfo ENOTFOUND yapi.demo.qunar.com #2180

#### 解决步骤
1. 找到安装yapi-cli组件的位置
```
$ npm config get prefix
/opt/homebrew
$ cd /opt/homebrew/lib/node_modules/yapi-cli/
```
2. 修改两处文件
```
$ vim src/commands/server.js +34
if(config.company){
  try{
    // 将下面这行注释掉 然后保存退出
    // axios.post('http://yapi.demo.qunar.com/publicapi/statis', {company: config.company}).then(res=>{});
  }catch(e){}
}
// 保存 & 退出
$ vim src/commands/install.js +128
try{
  await verifyConfig(config);
  let yapiPath = path.resolve(root, 'vendors');
  utils.log('开始下载平台文件压缩包...')
  await wget(yapiPath, v);  // 将这行代码替换为: await wget(yapiPath, v, "github"); 即指定传入的type类型
  utils.log('部署文件完成，正在安装依赖库...')
  shell.cd(yapiPath);
  await handleNpmInstall();
  utils.log('依赖库安装完成，正在初始化数据库mongodb...')
  await handleServerInstall();
  utils.log(`部署成功，请切换到部署目录，输入： "node vendors/server/app.js" 指令启动服务器, 然后在浏览器打开 ${domain} 访问`);
}catch(e){
  throw new Error(e.message)
}
// 保存 & 退出
```

### 查看端口占用

```
lsof -i:端口号
```

## react-navigation

### 安装
``` bash
yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context
# If you're on a Mac and developing for iOS, you need to install the pods (via Cocoapods) to complete the linking.
npx pod-install ios

```



### 配置安卓

```js
// 1. Add the highlighted code to the body of MainActivity class
public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
}

// 2. and make sure to add the following import statement at the top of this file below your package statement:
import android.os.Bundle;

// 3. Wrapping your app in NavigationContainer

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}

```

## react-native-iconfont-cli 字体图标

### Step 1

安装插件

```
# Yarn
yarn add react-native-svg
yarn add react-native-iconfont-cli --dev

# Npm
npm install react-native-svg
npm install react-native-iconfont-cli --save-dev

```
### Step 2
静态链接。请注意您使用的React-Native版本号
```
# RN < 0.60
react-native link react-native-svg
# RN >= 0.60
cd ios && pod install
```


### Step 3
生成配置文件
```
npx iconfont-init
```
此时项目根目录会生成一个iconfont.json的文件，内容如下：
```js
{
    "symbol_url": "请参考README.md，复制官网提供的JS链接",
    "use_typescript": false,
    "save_dir": "./src/iconfont",
    "trim_icon_prefix": "icon",
    "default_icon_size": 18,
    "local_svgs": "./localSvgs"
}
```

配置参数说明：
symbol_url
请直接复制iconfont官网提供的项目链接。请务必看清是.js后缀而不是.css后缀。如果你现在还没有创建iconfont的仓库,
那么可以填入这个链接去测试：http://at.alicdn.com/t/font_1373348_ghk94ooopqr.js

### Step 4
开始生成React-Native标准组件
```
npx iconfont-rn
```
生成后查看您设置的保存目录中是否含有所有的图标，你可以参考snapshots目录的快照文件，以区分不同模式下的图标结构。

### 使用

现在我们提供了两种引入方式供您选择：
1、使用汇总Icon组件：
```js
import IconFont from '../src/iconfont';

export const App = () => {
  return (
    <View>
      <IconFont name="alipay" size={20} />
      <IconFont name="wechat" />
    </View>
  );
};
```
2、使用单个图标。这样可以避免没用到的图标也打包进App：
```js
import IconAlipay from '../src/iconfont/IconAlipay';
import IconWechat from '../src/iconfont/IconWechat';

export const App = () => {
  return (
    <View>
      <IconAlipay size={20} />
      <IconWechat />
    </View>
  );
};
```
图标尺寸
根据配置default_icon_size，每个图标都会有一个默认的尺寸，你可以随时覆盖。
```js
<IconFont name="alipay" size={20} />
```

图标单色
单色图标，如果不指定颜色值，图标将渲染原本的颜色。如果你想设置为其他的颜色，那么设置一个你想要的颜色即可。

注意：如果你在props传入的color是字符串而不是数组，那么即使原本是多色彩的图标，也会变成单色图标。
```js
<IconFont name="alipay" color="green" />
```
图标多色彩
多色彩的图标，如果不指定颜色值，图标将渲染原本的多色彩。如果你想设置为其他的颜色，那么设置一组你想要的颜色即可
```js
<IconFont name="alipay" color={['green', 'orange']} />
```
颜色组的数量以及排序，需要根据当前图标的信息来确定。您需要进入图标组件中查看并得出结论。



### 更新图标
当您在iconfont.cn中的图标有变更时，只需更改配置symbol_url，然后再次执行Step 4即可生成最新的图标组件
修改 symbol_url 配置后执行：
```
npx iconfont-rn
```

## react-native-debugger调式使用

### 安装
```bash
# brew update && brew install --cask react-native-debugger
# brew version > 2.14
brew install --cask https://raw.githubusercontent.com/Homebrew/homebrew-cask/b6ac3795c1df9f97242481c0817b1165e3e6306a/Casks/react-native-debugger.rb

```

react-native 0.72  不支持连接 react-native-debugger
默认搭配使用 flipper 进行连接调式 （https://fbflipper.com）

### 问题汇总

1. cannot find  bable-plugin-module-resolver
  - 重新运行 yarn start --reset-cache

2. compiling js failed react native expected buffer size
  - npx react-native start --reset-cache
3. 解决Xcode14 pod签名问题
  - cd ios && pod update
4. 清理安卓项目缓存
  - cd android && ./gradlew clean

