# react native Android打包

## 打包 Android

想要打包 `Android` 应用，必须要有一个签名。

其实这一节的内容已经和react native无关了，都是关于Android打包的知识。

首先，我们在项目的根目录下进入android/app目录中，然后执行这个生成签名的命令。
```bash
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
然后设置 gradle 变量
打开gradle.properties文件，添加签名文件，包括名字、别名、密码等等
```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=123456
MYAPP_RELEASE_KEY_PASSWORD=123456
```
最后，把签名配置加入到项目的 gradle 配置中，
打开android/app/build.gradle文件，在singingConfigs里面添加一个release。
```java
android {
    ...
    defaultConfig { ... }
    signingConfigs {
	    ...
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    // 在buildTypes里面的release中将signingConfigs.debug修改成release
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

接下来，我们设置针对不同的 CPU 架构生成 APK 以减小 APK 文件的大小

```bash
enableSeparateBuildPerCPUArchitecture=true
```

接下来，我们就可以进行打包，react native官方教程是直接使用gradle命令打包的

```bash
cd android && ./gradlew assembleRelease
```

如果是在window系统的cmd命令行下执行需要去掉./

其实也可以使用一个脚本工具进行打包react-native-upload，它可以帮助我们用一个命令打包并且上传到各个测试平台和app store。
要注意的是这个命令是用shell脚本写的，如果想要在window系统上运行，推荐大家安装git bash。

首先安装依赖

```bash
yarn add react-native-upload --dev
```

再执行生成配置文件

```bash
npx upload-init
```

然后可以执行打包命令

## 单独打包android
npx upload-build --no-ios
window系统下需要在git bash命令行下执行，如果有安装的话，在vscode里面可以选择使用bash

打包的apk名字解释：
* arm64-v8a: 第8代、64位ARM处理器，很少设备，三星 Galaxy S6是其中之一。
* armeabiv-v7a: 第7代及以上的 ARM 处理器。2011年以后的生产的大部分Android设备都使用它.
* x86: 平板、模拟器用得比较多。
* x86_64: 64位的平板。
* 
一般情况使用armeabiv-v7a包就可以运行在大多数的手机上了。

打包完成之后，我们的应用一般还需要给测试人员进行测试，或者给公司内部人员使用，这种情况下我们可以将应用上传到测试市场。
这里，我们使用蒲公英，蒲公英是一个应用测试市场，只需将需要测试的应用上传至蒲公英，生成二维码，用户就可以在手机上通过扫描二维码，进行安装了。
upload.json
```json
"pgy": {
	// 上传凭证，访问链接 https://www.pgyer.com/account/api ，复制Api Key
    "pgy_api_key": "蒲公英key",
    "pgy_install_type": 2,
    "pgy_install_password": "123456",
    "ios_export_plist": "./ios-export/ad-hoc.plist"
  }
```

现在我们执行命令

## 默认上传所有生成的android apk文件，apk指定上传的apk的名字正则
npx upload-pgy --apk=v7a --no-ios 
##  先忽略iOS端的打包，因为我们还没有配置iOS端的
当然也可以在scripts中添加一个命令
```js
"build": "export ENVFILE=.env.production && npx upload-pgy --apk=v7a --no-ios"
```
在window系统上可以在git bash上执行

```bash
"build": "set ENVFILE=.env.production && npx upload-pgy --apk=v7a --no-ios"
```

完成，这样以后需要发布到测试市场上，一个命令就可以了。

## react-native-config在iOS端的配置

react-native-config的配置
安装
```bash
yarn add react-native-config
```

ios端需要添加原生链接
```bash
cd ios && pod install && cd ..
```

在iOS端，如果我们仅仅是想在原生代码中使用配置，在完成上面的步骤之后就可以使用了

```java
// import header
#import "ReactNativeConfig.h"

// then read individual keys like:
NSString *apiUrl = [ReactNativeConfig envFor:@"API_URL"];

// or just fetch the whole config
NSDictionary *config = [ReactNativeConfig env];

```

但是想要在Build settings 和Info.plist中使用的话，那么还需要进行一番配置才行
比如说iOS的项目名称就是在info.plist中配置的，
接下来，我们就来配置一下如何在info.plist中使用env里面的值
### 第一步
我们打开项目，进入ios目录，双击ximalaya.xcworkspace，这样就可以打开xcode了，
右键项目名，点击newFile菜单

<img src="/images/iosSetting1.png" alt="">

### 创建一个配置文件

<img src="/images/iosSetting2.png" alt="">

将其保存为ios文件夹Config.xcconfig，选中Targets里面的ximalaya

<img src="/images/iosSetting3.png" alt="">

添加
```java
#include? "tmp.xcconfig"
```

<img src="/images/iosSetting4.png" alt="">

再将以下内容添加到.gitignore中，tmp.config文件是动态生成的，不用提交到git。
```java
# react-native-config codegen
ios/tmp.xcconfig
```

应用刚刚创建的config配置，Debug和Release都要做同样的配置

<img src="/images/iosSetting5.png" alt="">

点击targets的ximalaya，打开 build phase

<img src="/images/iosSetting6.png" alt="">

点击加号，创建一个脚本，选择new Run Script Phase

<img src="/images/iosSetting7.png" alt="">
<img src="/images/iosSetting8.png" alt="">

```bash
"${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildXCConfig.rb" "${SRCROOT}/.." "${SRCROOT}/tmp.xcconfig"
```
最后，我们就可以在info.plist中使用在.env文件中定义的配置了。

<img src="/images/iosSetting9.png" alt="">

这样就可以啦
