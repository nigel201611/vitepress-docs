# React Native Android Packaging

## Packaging Android

To package an `Android` application, you must have a signature.

In fact, this section is no longer related to React Native; it's all about Android packaging knowledge.

First, navigate to the `android/app` directory in the project root, then execute this command to generate the signing key.
```bash
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
Then set the gradle variables.
Open the `gradle.properties` file and add the signing key information, including name, alias, password, etc.
```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=123456
MYAPP_RELEASE_KEY_PASSWORD=123456
```
Finally, add the signing configuration to the project's gradle configuration.
Open the `android/app/build.gradle` file and add a release configuration inside `signingConfigs`.
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
    // In buildTypes, change signingConfigs.debug to release
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

Next, we can set up separate APK generation for different CPU architectures to reduce the APK file size.

```bash
enableSeparateBuildPerCPUArchitecture=true
```

Now we can proceed with the build. The React Native official tutorial uses gradle commands directly.

```bash
cd android && ./gradlew assembleRelease
```

If executing on Windows cmd, remove the `./` prefix.

You can also use a script tool called `react-native-upload` to package. It helps us build and upload to various testing platforms and app stores with a single command.
Note that this command is written as a shell script. If you want to run it on Windows, it is recommended to install git bash.

First, install the dependency:

```bash
yarn add react-native-upload --dev
```

Then generate the configuration file:

```bash
npx upload-init
```

Then you can execute the build command:

## Build Android Only
npx upload-build --no-ios
On Windows, execute in the git bash command line. If you have it installed, you can select bash in VSCode.

APK name explanation:
* arm64-v8a: 8th generation, 64-bit ARM processor, few devices, Samsung Galaxy S6 is one of them.
* armeabiv-v7a: 7th generation and above ARM processors. Used by most Android devices produced after 2011.
* x86: Mostly used on tablets and emulators.
* x86_64: 64-bit tablets.
* 
Generally, the armeabiv-v7a package will run on most phones.

After building, the application usually needs to be given to testers or internal company personnel for testing. In this case, we can upload the application to a testing marketplace.
Here, we use Pgyer, which is an application testing marketplace. Simply upload the application to be tested to Pgyer, generate a QR code, and users can install it on their phones by scanning the QR code.
upload.json
```json
"pgy": {
	// Upload credentials, visit https://www.pgyer.com/account/api, copy the Api Key
    "pgy_api_key": "Pgyer key",
    "pgy_install_type": 2,
    "pgy_install_password": "123456",
    "ios_export_plist": "./ios-export/ad-hoc.plist"
  }
```

Now execute the command:

## Upload all generated android apk files by default, apk specifies the apk name regex to upload
npx upload-pgy --apk=v7a --no-ios 
##  Ignore the iOS packaging for now, as we haven't configured the iOS side yet
You can also add a command in scripts:
```js
"build": "export ENVFILE=.env.production && npx upload-pgy --apk=v7a --no-ios"
```
On Windows, you can run it in git bash:

```bash
"build": "set ENVFILE=.env.production && npx upload-pgy --apk=v7a --no-ios"
```

Done. Now, whenever you need to publish to a testing marketplace, it's just one command away.

## react-native-config Configuration on iOS

Configuration of react-native-config
Installation:
```bash
yarn add react-native-config
```

iOS needs native linking:
```bash
cd ios && pod install && cd ..
```

On iOS, if you only want to use the configuration in native code, you can use it after completing the above steps.

```java
// import header
#import "ReactNativeConfig.h"

// then read individual keys like:
NSString *apiUrl = [ReactNativeConfig envFor:@"API_URL"];

// or just fetch the whole config
NSDictionary *config = [ReactNativeConfig env];

```

But if you want to use it in Build Settings and Info.plist, you need some additional configuration.
For example, the iOS project name is configured in info.plist.
Next, let's configure how to use values from .env in info.plist.
### Step 1
Open the project, navigate to the ios directory, double-click `ximalaya.xcworkspace` to open xcode.
Right-click the project name, click the newFile menu.

<img src="/images/iosSetting1.png" alt="">

### Create a configuration file

<img src="/images/iosSetting2.png" alt="">

Save it as `ios/Config.xcconfig`, select `ximalaya` under Targets.

<img src="/images/iosSetting3.png" alt="">

Add:
```java
#include? "tmp.xcconfig"
```

<img src="/images/iosSetting4.png" alt="">

Then add the following to `.gitignore`. The `tmp.config` file is dynamically generated and does not need to be committed to git.
```java
# react-native-config codegen
ios/tmp.xcconfig
```

Apply the newly created configuration. Do the same for both Debug and Release configurations.

<img src="/images/iosSetting5.png" alt="">

Click the `ximalaya` target, open Build Phase.

<img src="/images/iosSetting6.png" alt="">

Click the plus sign to create a script, select New Run Script Phase.

<img src="/images/iosSetting7.png" alt="">
<img src="/images/iosSetting8.png" alt="">

```bash
"${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildXCConfig.rb" "${SRCROOT}/.." "${SRCROOT}/tmp.xcconfig"
```
Finally, we can use the configurations defined in the .env file in info.plist.

<img src="/images/iosSetting9.png" alt="">

That's it!
