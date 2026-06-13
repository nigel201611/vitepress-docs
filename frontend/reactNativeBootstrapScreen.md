# Adding a Splash Screen to a React Native Project

Every time the App is opened, there is a brief white screen period. In fact, even native Android or iOS applications have a slight white screen time. This white screen is mainly because the system needs to initialize some resources when starting the application, then continue loading JS code, which takes a bit longer than native apps.

We choose to use the `react-native-splash-screen` library to solve the white screen problem.

The principle of this library is to display an image when the application first loads, and then hide this image once the JS code has finished loading, so it no longer appears as a white screen.

There is also another library called `react-native-bootsplash`, which is also an excellent library for solving the white screen problem. Its advantage is that it can automatically generate the splash screen images needed for Android and iOS from a single image via a command, without having to create them manually.

```js
// Install react-native-splash-screen dependency
yarn add react-native-splash-screen
```
## Configuring Android Splash Screen

Next, prepare the splash screen image and place it in the res folder.
Then create an Android layout file.
app/src/main/res/layout/launch_screen.xml
Display an image in this layout, which will be our splash screen.
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>
```
Next, create a colors folder and create color.xml.
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimaryDark">#FFFFFF</color>
</resources>
```
Add a theme in styles.xml. This theme configures the colorPrimaryDark property, which sets the status bar color. Note that this property is only effective on Android 5.0 and above. However, this is a minor issue since it doesn't affect functionality, so there's no need to spend too much time adapting to lower Android versions.
```xml
<style name="SplashScreenTheme" parent="SplashScreen_SplashTheme">
	<item name="colorPrimaryDark">@color/colorPrimaryDark</item>
</style>
```
Finally, open `android/app/src/main/java/com/ximalaya/MainActivity.java`.
```java
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    // Override the onCreate method, the entry point for loading the entire RN project
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Show the splash screen, the second parameter is a reference to our custom theme
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
    }
}
```
This way, the application will display an image when it starts. Next, we need to hide this image at the appropriate time.
Add the componentDidMount function in src/index.tsx.
```java
import SplashScreen from 'react-native-splash-screen';

componentDidMount() {
	SplashScreen.hide();
}

```
Reinstall the application in the terminal:
yarn android

## Configuring iOS Splash Screen

Next, let's configure the splash screen for iOS.
Execute the following in the project root directory:
```bash
cd ios && pod install && cd ..
```
In fact, in the current project, the iOS app already has a splash screen when opened. This splash screen is the `LaunchScreen.xib` that was created when the project was initialized.
`storyboard` and `xib` are both files that describe the software interface. `storyboard` generally describes the entire software interface, while `xib` is used to describe a partial interface.
Previously, iOS projects might use `LaunchImage` to create splash screens, but the latest iOS review mechanism now mandates the use of `LaunchScreen` for creating splash screens; `launchImage` can no longer be used.
### Next, add a LaunchScreen.storyboard to add a splash screen for the RN application
Open the project folder, navigate to the ios directory, double-click `xxx.xcworkspace` to open xcode.
Right-click in the left file navigation panel and select New File:

<img src="/images/reactNativeBS1.jpeg" alt="Open xcode, right-click in the left file navigation panel, select New File">

Create LaunchScreen.storyboard

<img src="/images/reactNativeBS2.jpeg" alt="LaunchScreen.storyboard">

Create LaunchScreen Image Set

<img src="/images/reactNativeBS3.jpeg" alt="LaunchScreen Image Set">

Open Images.xcassets and add an Image Set named LaunchScreen, then drag in the prepared splash screen image.

<img src="/images/reactNativeBS4.jpeg" alt="LaunchScreen Image Set">


Next, add an ImageView in LaunchScreen.storyboard.

<img src="/images/reactNativeBS5.jpeg" alt="LaunchScreen Image Set">

Adjust the position, then bind it to the LaunchScreen Image Set:

<img src="/images/reactNativeBS6.png" alt="LaunchScreen Image Set">

Finally, set the Launch Screen File in TARGETS:

<img src="/images/reactNativeBS7.png" alt="LaunchScreen Image Set">

Open the AppDelegate.m file.

```java
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
// Import declaration file
#import "RNSplashScreen.h" 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...other code
    // Call the show method of RNSplashScreen
    [RNSplashScreen show];  // here
    return YES;
}
```

Reinstall the iOS application and check the effect in the simulator.
Now our application looks quite polished!
