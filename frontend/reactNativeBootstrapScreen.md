# react-native项目添加启动图片
App每次打开都会有一个白屏的时间，实际上哪怕使用原生的代码写Android应用或者iOS应用，也会稍微有那么一点点的白屏时间,这个白屏主要是因为系统在启动应用的时候，需要初始化一些然后继续加载js代码，这个时间会比原生的应用会长一点

选择使用react-native-splash-screen库来解决白屏问题。
这个库的原理就是在应用刚刚加载时显示一张图片，等js代码加载完毕之后，将这个图片隐藏，这样看起来就不是白屏了。

另外还有一个react-native-bootsplash，这个库也是一个非常优秀的库，也是用于解决白屏问题的，它的优点在于能够通过一张图片，通过命令自动生成Android和iOS需要的启动图片，不用自己去创建。

```js
// 安装react-native-splash-screen的依赖
yarn add react-native-splash-screen
```
## 配置安卓启动图片
接下来，准备好启动图片，放在res文件夹中
然后创建一个Android的布局文件
app/src/main/res/layout/launch_screen.xml
在这个布局中显示一张图片，也就是我们的启动图片
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>
```
接下来，创建一个colors文件夹，新创建color.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimaryDark">#FFFFFF</color>
</resources>
```
在styles.xml中添加一个主题，这个主题配置了colorPrimaryDark属性，这个属性是配置状态栏的颜色的，当然这个属性是只能在Android5.0版本以上才有效。但是这个只是小问题，毕竟不会影响使用，没有必要去花太多的时间去适配低版本的Android系统。
```xml
<style name="SplashScreenTheme" parent="SplashScreen_SplashTheme">
	<item name="colorPrimaryDark">@color/colorPrimaryDark</item>
</style>
```
最后，打开android/app/src/main/java/com/ximalaya/MainActivity.java
```java
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    // 重写onCreate方法，整个RN项目的加载的入口
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 显示启动屏，第二个参数是我们自定义主题的引用
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
    }
}
```
这样应用在启动的时候，就会显示一张图片了，接下来，我们需要在合适的机会隐藏掉这个图片。
在src/index.tsx中添加componentDidMount函数
```java
import SplashScreen from 'react-native-splash-screen';

componentDidMount() {
	SplashScreen.hide();
}

```
在终端中重新安装应用
yarn android

## 配置iOS启动图片
接下来，我们来配置一下iOS端的启动屏。
在项目根目录下执行
```bash
cd ios && pod install && cd ..
```
实际上目前的项目中，iOS上打开应用是有一个启动屏的，这个启动屏是项目创建时就已经存在的`LaunchScreen.xib`。
`storyboard`和`xib`都是描述软件界面的文件，`storyboard`一般描述整个软件界面，`xib`用来描述局部界面。
以前可能在iOS项目上是通过创建LauchImage来制作启动屏的，但是iOS目前最新的审核机制是强制使用LaunchScreen制作启动屏的，不能再使用launchImage创建启动屏了。
### 接下来就添加一个LaunchScreen.storyboard 来为RN应用添加启动屏
打开项目文件夹，进入ios目录，双击xxx.xcworkspace，打开xcode
在左侧文件导航面板右键选择新建文件：

<img src="/images/reactNativeBS1.jpeg" alt="打开xcode在左侧文件导航面板右键选择新建文件">

创建LaunchScreen.storyboard

<img src="/images/reactNativeBS2.jpeg" alt="LaunchScreen.storyboard">

创建LaunchScreen Image Set

<img src="/images/reactNativeBS3.jpeg" alt="LaunchScreen Image Set">

打开Images.xcassets然后添加名为LaunchScreen的Image Set，拖入准备好的启动图标

<img src="/images/reactNativeBS4.jpeg" alt="LaunchScreen Image Set">


接下来，在LaunchScreen.storyboard中添加ImageView

<img src="/images/reactNativeBS5.jpeg" alt="LaunchScreen Image Set">

调整好位置，在为其绑定LaunchScreen Image Set：

<img src="/images/reactNativeBS6.png" alt="LaunchScreen Image Set">

最后还需要在TARGETS中设置Launch Screen File：

<img src="/images/reactNativeBS7.png" alt="LaunchScreen Image Set">

打开AppDelegate.m文件

```java
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
// 导入声明文件
#import "RNSplashScreen.h" 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...other code
    // 调用RNSplashScreen的show方法
    [RNSplashScreen show];  // here
    return YES;
}
```

重新安装iOS应用，模拟器查看效果
现在我们的应用看起来就比较有模有样了哈

