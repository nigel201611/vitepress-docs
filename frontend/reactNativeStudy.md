# React Native Study Notes

## iOS Environment Setup

### Install Dependencies
Required dependencies: Node, Watchman, Xcode, and CocoaPods.

Although you can use any editor to develop the application (write JS code), you must still install Xcode to obtain the tools and environment needed to compile iOS applications.

### Node & Watchman

We recommend using Homebrew to install Node and Watchman. Run the following commands in the terminal (if installation is slow, you can try using Alibaba Cloud's mirror source):
```js
brew install node
brew install watchman
```
If you already have Node installed, please check that its version is v14 or higher. After installing Node, it is recommended to set up an npm mirror (Taobao source) to speed up the subsequent process (or use a proxy tool).

1. Use nrm to switch to Taobao source:
npx nrm use taobao

2. If you need to switch back to the official source later:
npx nrm use npm

### Ruby

Ruby is a general-purpose programming language. React Native uses it in some scripts related to iOS dependency management. Like all programming languages, Ruby has released many different versions over the years.

React Native uses a .ruby-version file to ensure your Ruby version matches the required one. Currently, macOS 12.5.1 comes with Ruby version 2.6.8, which is not the version required by React Native. We recommend installing a Ruby version manager to install and manage the required version.

Common Ruby version managers include:

* rbenv
* RVM
* chruby
* asdf-vm with its asdf-ruby plugin
You can check the currently used Ruby version on your system with the following command:
```
ruby --version
```
### Ruby Package Manager Bundler

Ruby uses the term "gems" to refer to various packages/libraries/dependencies in its ecosystem. A gem is like a package in the npm ecosystem, a formula in Homebrew, or a pod in Cocoapods.

Ruby's Bundler itself is a gem. Its purpose is to manage Ruby dependencies in a project. We need to use Ruby to install Cocoapods, and Bundler manages the various related dependencies to ensure it works properly.

If you want to learn more about this tool, you can read this English article.

### Yarn

Yarn is an alternative to npm provided by Facebook that can speed up the download of node modules.

### Xcode

React Native currently requires Xcode 12 or higher. You can download it from the App Store or from the Apple Developer website [https://developer.apple.com/download/]. This step will also install Xcode IDE, Xcode command line tools, and the iOS simulator.

### Xcode Command Line Tools

Launch Xcode, and check under the Xcode | Preferences | Locations menu to see if a version of Command Line Tools is installed. Xcode's command line tools include necessary tools such as git.

Installing iOS Simulator in Xcode

To install a simulator, simply open the Xcode > Preferences... menu, then select the Components tab to see various iOS version simulators available for installation.

### CocoaPods

CocoaPods is a package manager written in Ruby (think of it as npm for iOS). Starting from version 0.60, React Native's iOS version requires CocoaPods to manage dependencies. You can install CocoaPods using the following commands. CocoaPods version must be 1.10 or higher.

Of course, the installation might not go smoothly, so please use a proxy tool.
```
sudo gem install cocoapods
```
Or you can use brew to install it.
```
brew install cocoapods
```
For more information, visit the CocoaPods official website.


### Creating a New Project

If you have previously installed the old react-native-cli globally, please uninstall it using `npm uninstall -g react-native-cli` to avoid conflicts:
```
npm uninstall -g react-native-cli @react-native-community/cli
```
Use React Native's built-in command line tool to create a new project called "AwesomeProject". This command line tool does not need to be installed; you can use it directly with the npx command that comes with Node (note that the init command creates the latest version by default):
```
npx react-native init AwesomeProject
```
>Note 1: Do not use Chinese characters, spaces, or other special characters in directory or file names. Do not use common keywords as project names (e.g., class, native, new, package, etc.). Do not use project names that are the same as core modules (e.g., react, react-native, etc.).
Note 2: Native dependencies for version 0.60 and above are integrated and installed via CocoaPods. CocoaPods sources must be accessed through a proxy (mirror sources are also ineffective). If the CocoaPods dependency installation step gets stuck (the command line stays at "Installing CocoaPods dependencies" for a long time, or various network timeout/reset errors occur, or the .xcworkspace file cannot be generated in the ios directory), please make sure your proxy configuration is effective for the command line.
If you want to integrate React Native into an existing native project, the steps are completely different. Please refer to Integration with Existing Native Apps.

### [Optional] Specify Version or Project Template

You can use the `--version` parameter (note the two hyphens) to create a project with a specific version. The version number must be precise to two decimal points.
```
npx react-native init AwesomeProject --version X.XX.X
```
You can also use `--template` to use community-provided templates, such as one with TypeScript configuration:
```
npx react-native init AwesomeTSProject --template react-native-template-typescript
```
### [Optional] Xcode Environment Configuration File

Starting from React Native version 0.69, you can use the .xcode.env file provided by the template to configure the Xcode environment.

The .xcode.env file contains an environment variable example for exporting the path to the node executable in the NODE_BINARY variable. This is the recommended practice for decoupling the build infrastructure from the system version of node. If different from the default, you should customize this variable with your own path or your own node version manager.

You can also add any other environment variables during the build script phase and import the .xcode.env file. If you need to run scripts that require a specific environment, this is also the recommended practice for decoupling the build phase from a specific environment.

### Compile and Run the React Native Application

In your project directory, run `yarn ios` or `yarn react-native run-ios`:
```
cd AwesomeProject
yarn ios
# Or
yarn react-native run-ios
```
This command compiles the native part of the project and simultaneously starts the Metro service in another command line to bundle the JS code in real-time (similar to webpack). The Metro service can also be started separately with the `yarn start` command.

You should soon see the iOS simulator automatically launch and run your project.

After a successful compilation, keep the Metro command line window running during development and do not close it. When you need to run the project again later, if you haven't modified any files in the ios directory, you only need to start the `yarn start` command. If you have modified any files in the ios directory, you need to run the `yarn ios` command again to complete the native compilation.

### Modifying the Project

Now that you have successfully run the project, you can start modifying it:

Open App.js with your favorite editor and make a few changes.
Press `Cmd-R` in the iOS simulator to refresh the APP and see your latest changes! (If it doesn't work, check that the "connect hardware keyboard" option is enabled in the simulator's Hardware menu).
Done!

Congratulations! You have successfully run and modified your first React Native application.


## Android Environment Setup

### Install Dependencies

Required dependencies: Node, JDK, and Android Studio.

Although you can use any editor to develop the application (write JS code), you must still install Android Studio to obtain the tools and environment needed to compile Android applications.

Node & Watchman

We recommend using Homebrew to install Node and Watchman. Run the following commands in the terminal (if installation is slow, you can try using Alibaba Cloud's mirror source):
```
brew install node
brew install watchman
```

### Java Development Kit

We recommend using Homebrew to install the OpenJDK distribution called Zulu provided by Azul. This distribution supports both Intel and M1 chips. On Macs with M1 chip architecture, it has significant performance advantages during compilation compared to other JDKs.
```
brew tap homebrew/cask-versions
brew install --cask zulu11
```
React Native requires Java Development Kit [JDK] 11. You can check your currently installed JDK version by entering `javac -version` in the command line (note it's javac, not java).

React Native versions below 0.67 require JDK 1.8 (also referred to as version 8).

### Android Development Environment

If you have never worked with the Android development environment before, be prepared -- this process is tedious. Please read the following instructions very carefully and follow the documentation strictly when configuring.

Translator's note: Please note!!! Users in China must have a stable proxy tool; otherwise, you will encounter constant connection timeouts and disconnections during the download, installation, and configuration process, making development impossible. Some proxy tools may only provide browser proxy functionality or may only proxy certain websites. Please research and configure accordingly or switch to another tool. In short, if there is a URL in the error message, it's 99% likely a network connection issue.

#### 1. Install Android Studio

First, download and install Android Studio. Users in China may not be able to open the official link; please use a search engine to find available download links. In the installation interface, select the "Custom" option, and make sure the following items are checked:

* Android SDK
* Android SDK Platform
* Android Virtual Device
Then click "Next" to install the selected components.

If the selection boxes are grayed out, you can skip them and install these components later.
After installation, when you see the welcome screen, you can proceed with the following steps.


#### 2. Install Android SDK

Android Studio will install the latest version of the Android SDK by default. Currently, compiling React Native applications requires the Android 13 (Tiramisu) SDK (note that the SDK version is not the same as the terminal system version; RN currently supports Android 5 and above devices). You can select and install various SDK versions in Android Studio's SDK Manager.

You can find the SDK Manager from the Android Studio welcome screen. Click "Configure" and then you will see "SDK Manager".

The SDK Manager can also be found in Android Studio's "Preferences" menu. The specific path is Appearance & Behavior => System Settings => Android SDK.
In the SDK Manager, select the "SDK Platforms" tab, then check "Show Package Details" in the bottom right corner. Expand the Android 13 (Tiramisu) option and make sure the following components are checked (again, you must use a stable proxy tool, otherwise you might not even see this interface):

Android SDK Platform 33
Intel x86 Atom_64 System Image (official emulator image file; not needed if using a non-official emulator) or Google APIs ARM 64 v8a System Image (for Apple Silicon series)
Then click the "SDK Tools" tab, also check "Show Package Details" in the bottom right corner. Expand "Android SDK Build-Tools" and make sure to select version 33.0.0, which is required by React Native. You can install multiple other versions simultaneously.

Click "Apply" to download and install the selected components.


#### 3. Configure the ANDROID_HOME Environment Variable

React Native needs to know the path where your Android SDK is installed through environment variables in order to compile properly.

The specific method is to add the following commands to your shell's configuration file. If your shell is zsh, the configuration file is `~/.zshrc`; if it's bash, the file is `~/.bash_profile` (you can use the `echo $0` command to check which shell you are using):

#### If you did not install the SDK through Android Studio, the path may be different; please verify it yourself.
```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Translator's note: `~` represents the user directory, i.e., `/Users/your_username/`, and files starting with a dot are hidden in Finder, and this file may not exist. You can create or edit it using `vi ~/.zshrc` in the terminal. If you are not familiar with vi, click here to learn.
Use the `source $HOME/.zshrc` command to make the environment variable settings take effect immediately (otherwise they will only take effect after a reboot). Use `echo $ANDROID_HOME` to check if the variable has been set correctly.

## Issues Encountered During Environment Setup

### zip end header not found #21130
>Solution:
Go to /Users/{USER_NAME}/.gradle, delete all folders and files in this folder and run again.

### npx react-native doctor cannot find emulator

Download a new version of Android Studio. I installed Android Studio Flamingo | 2022.2.1 Patch 2.

[Official download link](https://developer.android.com/studio?utm_source=android-studio)


## Install YApi

```
npm install -g yapi-cli
yapi server
node server/app.js 
```

### Installation Error

> Error during browser deployment: Error: getaddrinfo ENOTFOUND yapi.demo.qunar.com #2180

#### Resolution Steps
1. Find the installation location of yapi-cli
```
$ npm config get prefix
/opt/homebrew
$ cd /opt/homebrew/lib/node_modules/yapi-cli/
```
2. Modify two files
```
$ vim src/commands/server.js +34
if(config.company){
  try{
    // Comment out the line below, then save and exit
    // axios.post('http://yapi.demo.qunar.com/publicapi/statis', {company: config.company}).then(res=>{});
  }catch(e){}
}
// Save & exit
$ vim src/commands/install.js +128
try{
  await verifyConfig(config);
  let yapiPath = path.resolve(root, 'vendors');
  utils.log('Starting to download platform file archive...')
  await wget(yapiPath, v);  // Replace this line with: await wget(yapiPath, v, "github"); i.e., specify the type parameter
  utils.log('Deployment file completed, installing dependency libraries...')
  shell.cd(yapiPath);
  await handleNpmInstall();
  utils.log('Dependency libraries installed, initializing database mongodb...')
  await handleServerInstall();
  utils.log(`Deployment successful, please switch to the deployment directory, enter: "node vendors/server/app.js" to start the server, then visit ${domain} in the browser`);
}catch(e){
  throw new Error(e.message)
}
// Save & exit
```

### Check Port Usage

```
lsof -i:port_number
```

## react-navigation

### Installation
``` bash
yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context
# If you're on a Mac and developing for iOS, you need to install the pods (via Cocoapods) to complete the linking.
npx pod-install ios

```



### Android Configuration

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

## react-native-iconfont-cli Font Icons

### Step 1

Install plugins

```
# Yarn
yarn add react-native-svg
yarn add react-native-iconfont-cli --dev

# Npm
npm install react-native-svg
npm install react-native-iconfont-cli --save-dev

```
### Step 2
Static linking. Please note your React-Native version number.
```
# RN < 0.60
react-native link react-native-svg
# RN >= 0.60
cd ios && pod install
```


### Step 3
Generate configuration file
```
npx iconfont-init
```
This will generate an `iconfont.json` file in the project root directory with the following content:
```js
{
    "symbol_url": "Please refer to README.md and copy the JS link provided on the official website",
    "use_typescript": false,
    "save_dir": "./src/iconfont",
    "trim_icon_prefix": "icon",
    "default_icon_size": 18,
    "local_svgs": "./localSvgs"
}
```

Configuration parameters explanation:
symbol_url
Please directly copy the project link from the iconfont official website. Make sure it has a .js extension, not .css. If you haven't created an iconfont repository yet,
you can use this link for testing: http://at.alicdn.com/t/font_1373348_ghk94ooopqr.js

### Step 4
Start generating React-Native standard components
```
npx iconfont-rn
```
After generation, check the save directory you set to see if all icons are included. You can refer to the snapshot files in the snapshots directory to distinguish between icon structures in different modes.

### Usage

We now provide two import methods for you to choose from:
1. Use the aggregated Icon component:
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
2. Use individual icons. This prevents unused icons from being bundled into the App:
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
Icon Size
According to the configuration `default_icon_size`, each icon will have a default size, which you can override at any time.
```js
<IconFont name="alipay" size={20} />
```

Single Color Icons
For single-color icons, if no color value is specified, the icon will render with its original colors. If you want to set a different color, simply set the desired color.

Note: If the color you pass via props is a string rather than an array, even multi-color icons will become single-color.
```js
<IconFont name="alipay" color="green" />
```
Multi-Color Icons
For multi-color icons, if no color value is specified, the icon will render with its original multi-color scheme. If you want to set different colors, set an array of desired colors.
```js
<IconFont name="alipay" color={['green', 'orange']} />
```
The number and order of the color group need to be determined based on the current icon's information. You need to look into the icon component to examine and draw conclusions.



### Updating Icons
When icons on iconfont.cn change, simply modify the `symbol_url` config and execute Step 4 again to regenerate the latest icon components.
After modifying the symbol_url configuration, execute:
```
npx iconfont-rn
```

## react-native-debugger Usage

### Installation
```bash
# brew update && brew install --cask react-native-debugger
# brew version > 2.14
brew install --cask https://raw.githubusercontent.com/Homebrew/homebrew-cask/b6ac3795c1df9f97242481c0817b1165e3e6306a/Casks/react-native-debugger.rb

```

react-native 0.72 does not support connecting to react-native-debugger.
Default recommendation is to use flipper for debugging (https://fbflipper.com)

### Common Issues

1. cannot find babel-plugin-module-resolver
  - Re-run yarn start --reset-cache

2. compiling js failed react native expected buffer size
  - npx react-native start --reset-cache
3. Resolve Xcode14 pod signing issue
  - cd ios && pod update
4. Clean Android project cache
  - cd android && ./gradlew clean

