# Google Plugin Development

> Develop tools to improve your browser productivity

Learn how to create Chrome extensions with a simple Chrome plugin. Let's start by implementing a browser button that displays "Hello, Chrome".
Create a `Hello` directory.
Create the following files in the `Hello` directory:
manifest.json, popup.html, icon.png

manifest.json content:
```js
{
    "name": "HelloChrome",
    "version": "1.0.0",
    "manifest_version": 2,
    "description": "Say Hello to Chrome",
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
popup.html content:

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
icon.png is a 16x16 pixel icon

Brief introduction to manifest.json:
manifest.json is the most important file in a Chrome extension. It is the entry point and description file for the entire extension.
* name: Extension name
* version: Extension version
* manifest_version: Generally set to "2"
* description: Extension description
* browser_action: The operation button on the extension toolbar. icon.png is the button icon, popup.html is the popup page that appears when you click the button. You can write your own interface and logic code inside.

## Using the Plugin
Enable Chrome Extension Developer Mode, then load the `Hello` directory. At this point, an icon will appear in the top-right corner of your browser.

## Popup Cannot Persist Data
Look at the example below: replace popup.html with the following code and add a popup.js file.

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

Click "+1", the number in the input box will increase. Then close the popup and reopen it -- the number returns to 0. This means that when we close the popup, popup.html is destroyed, along with the global variable `count` stored in popup.js.
The question is: how can we make the plugin remember the number, so the data isn't lost when closing the popup? In other words, how do we persist plugin runtime data during execution? The answer is to use the `background` feature.

## Introducing Background
You can specify a background.js file via the `background` property. This JS file runs persistently in the browser once the extension is installed. For example, you can store extension runtime state, cache data, or bind browser events in this file.

Let's modify manifest.json.
Add the following after browser_action:

```js
{
    "background" : {
        "scripts": ["background.js"],
        "persistent": false
    }
}
```
We use the `background` property to introduce background.js, with just one line of code:
```js
var count = 0;
```

That is, we use the global variable `count` in background.js to store our accumulated number, because global variables in background.js are never destroyed during the browser runtime.

Let's modify popup.js to call the global variable in background.js:
```js
// Important: calling variables and methods from background.js in popup.js
var bg = chrome.extension.getBackgroundPage(); 
$(function(){
    $('#input').val(bg.count);
    $('#btn').click(function(){
        bg.count = bg.count+1;
        $('#input').val(bg.count);
    });
})
```

## content_scripts

Using content_scripts, you can modify the DOM of the page you are currently visiting. You can implement features like:

* Enlarging fonts of certain special information
* Adding `<a>` tags to all link-formatted text in the page
* Injecting HTML into the page to add new features or interactions

Limitations:

* Can only access Chrome.extension and Chrome.runtime APIs
* Cannot directly access functions and variables of the extension it belongs to

You can use the message mechanism to enable communication between content_scripts and the extension (e.g., background and popup), thereby indirectly calling the extension's internal variables and functions.

Example to demonstrate communication between Content_scripts and popup:
The extension mainly sends keywords to the Baidu search box in popup.html and submits the search request.

First, add the content_scripts configuration in manifest.json:
```js
{
    "name": "Tencent Baidu",
    "version": "1.0.0",
    "manifest_version": 2,
    "description": "Demonstrate content_scripts communication",
    "browser_action": {
        "default_title": "View",
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
    "permissions" : ["tabs", "activeTab"] // Permissions requested from the browser
}
```
The content_scripts configuration means that when the page URL matches the pattern "https://www.baidu.com/*", two JS files -- jquery-2.1.4.min.js and baidu.js -- are injected into the page. baidu.js contains the main logic.


```js
// baidu.js
var kw = $('#kw');
var form = $('#form');
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "send") {
            kw.val(request.keyword)
            sendResponse({state:'Keyword filled successfully!'});
        }
        if (request.action == "submit") {
            form.submit();
            sendResponse({state:'Submitted successfully!'});
        }
    }
);
 
```

```html
// popup.html 
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
    <button id="send">Send</button><br />
    <button id="submit">Submit</button>
</body>
</html>
 ```

```js
// popup.js
$(function(){
    var state = $('#state');
    $('#send').click(function () {
        chrome.tabs.query({active:true, currentWindow:true}, function (tab) {
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
