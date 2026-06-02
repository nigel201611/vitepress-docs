# 谷歌插件开发

>开发工具来提高你使用浏览器的效率

通过简单的Chrome 插件,学习如何制作Chrome扩展，先来实现点击浏览器按钮显示 “Hello , Chrome” 
创建 目录 Hello
在 Hello 目录里创建如下几个文件
manifest.json,popup.html, icon.png

manifest.json 内容如下:
```js
{
    "name": "HelloChrome",
    "version": "1.0.0",
    "manifest_version": 2,
    "description": "对我说 Hello，Chrome",
    "browser_action": {
        "default_title": "say",
        "default_icon":"icon.png",
        "default_popup": "popup.html"
    },
    "icons": {
        "16": "icons/16.png",
        "32": "icons/32.png",
        "48": "icons/48.png",
        "128": "icons/128.png"
    }
}
```
popup.html 内容如下:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body style="width:300px ;height:100px">
    <h1>Hello, Chrome</h1>
</body>
</html>
 
```
icon.png 是一个 16*16 像素的图标

简单介绍下 manifest.json,
manifest.json 是Chrome 扩展中最重要的一个文件，它是整个扩展的入口和说明文件。
* name 扩展名
* version 扩展版本
* manifest_version manifest 一般填 “2” 
* description 扩展描述
* browser_action 扩展浏览器上操作按钮，icon.png 就是按钮图标,popup.html就是当你点击按钮弹出的页面框，可以在里面写自己的界面包括逻辑代码。

## 使用插件
开启Chrome扩展的开发者模式，然后加载了 Hello 目录进去，这时候，看我们浏览器的右上角，就会出现一个图标


## Popup 弹窗无法记录数据
看下面的例子, popup.html 换为以下代码，并添加一个 popup.js

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="jquery-2.1.4.min.js"></script>
    <script src="popup.js"> </script>
</head>
<body style="width:300px ;height:300px">
    <h1>Hello, Chrome</h1>
    <input type="text" id="input" value="0">
    <button id="btn">+1</button>
</body>
</html>
```

```js
var count = 0;
$(function(){
    $('#input').val(count);
    $('#btn').click(function(){
        count = count+1;
        $('#input').val(count);
    });
})

```

点击 “+1” ，输入框中的数字就会增加，然后关闭弹窗，再点开，发现数字又变成了0，这说明当我们关闭弹窗时，popup.html就被销毁了，我们在popup.js 中用 count 存储的全局变量，也被销毁了。
问题来了，想让插件能记录数字，不是关掉弹窗数据就丢了，或者说我们在插件运行过程中怎么保存这些插件运行时的数据呢，答案就是用background 特性。


## 引入 Background
你可以通过 background 指定一个background.js文件，这个js文件是扩展被安装后会一直运行在浏览器中的程序，比如我们要保存一些扩展运行时的状态，缓存一些数据，或者绑定一些浏览器的事件等代码都可以放到这个js文件中。

让我们来修改 manifest.json
在broswer_action 后面加入：

```js
{
    "background" : {
        "scripts": ["background.js"],
        "persistent": false
    }
}
```
我们通过 background 属性，引入了一个background.js, 代码里面仅放一行代码:
```js
var count = 0;
```

也就是说，用background.js 中的全局变量 count 来存储我们累加的数字，因为 background.js 中的全局变量在浏览器运行时都不会被销毁。

我们修改下 popup.js 来调用 background.js 中的全局变量
```js
//在popup.js 中调用 backgourd.js 中的变量和方法，很重要
var bg = chrome.extension.getBackgroundPage(); 
$(function(){
    $('#input').val(bg.count);
    $('#btn').click(function(){
        bg.count = bg.count+1;
        $('#input').val(bg.count);
    });
})
```

## conent_scripts

使用 content_scripts 你可以修改你当前访问的页面的dom，你可以实现类似下面这样的功能：

* 放大某些特殊信息的字体
* 把页面里所有链接形式的文本都加上 a 标签
* 在页面中注入HTML，为页面附加新的功能或交互

限制:

* 只能访问Chrome.extension、 Chrome.runtime 接口
* 不能直接访问它所在的扩展里的函数和变量

可以通过 message 机制来实现 content_scripts 和他所在扩展的通信，比如 background 和 popup，从而间接调用扩展内部的变量和函数。


例子来演示，Content_scripts 和 popup 之间通信。
扩展主要实现在popup.html 中向百度搜索框发送关键词，并提交搜索请求。

首先在manifest.json中添加 content_scripts 配置
```js
{
    "name": "腾百万",
    "version": "1.0.0",
    "manifest_version": 2,
    "description": "演示content_scripts 的通信",
    "browser_action": {
        "default_title": "查看",
        "default_icon": "icon.png",
        "default_popup": "popup.html"
    },
    "background" : {
        "scripts": ["background.js"],
        "persistent": false
    }
    "content_scripts": [
        {
            "matches": ["https://www.baidu.com/*"],
            "js": ["jquery-2.1.4.min.js","baidu.js"]
        }
    ],
    "permissions" : ["tabs", "activeTab"] //向浏览器申请的权限
}
```
content_scripts 配置意思是页面 url 匹配到 “https://www.baidu.com/*” 模式时才向页面中注入jquery-2.1.4.min.js, baidu.js 两个js 文件， baidu.js 里是主要逻辑。


```js
// baidu.js
var kw = $('#kw');
var form = $('#form');
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "send") {
            kw.val(request.keyword)
            sendResponse({state:'关键词填写成功！'});
        }
        if (request.action == "submit") {
            form.submit();
            sendResponse({state:'提交成功！'});
        }
    }
);
 
```

```html
//  popup.html 
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="jquery-2.1.4.min.js"></script>
    <script src="popup.js">
    </script>
 
</head>
<body style="width:300px ;height:100px">
    <input type="keyword" id="keyword"><br />
    <span  id="state" style="color:green"></span><br />
    <button id="send">发送</button><br />
    <button id="submit">提交</button>
</body>
</html>
 ```

```js
// popup.js
$(function(){
    var state = $('#state');
    $('#send').click(function () {//给对象绑定事件
        chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
            //向tab发送请求
            chrome.tabs.sendMessage(tab[0].id, { 
                action: "send",
                keyword: $('#keyword').val()
            }, function (response) {
                state.html(response.state)
            });
        });
    });
    $('#submit').click(function () {
        chrome.tabs.query({active:true, currentWindow:true}, function (tab) {
            chrome.tabs.sendMessage(tab[0].id, {  
               action: "submit"   
            }, function (response) {
                state.html(response.state)
            });
        });
    })
})
```