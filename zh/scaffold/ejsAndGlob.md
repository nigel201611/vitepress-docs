# ejs和glob用法详解

## ejs用法

### ejs模板的三种用法
```js
let template = ejs.compile(str, options);
template(data);
// => 输出渲染后的 HTML 字符串
ejs.render(str, data, options);
// => 输出渲染后的 HTML 字符串
ejs.renderFile(filename, data, options, function(err, str){
    // str => 输出渲染后的 HTML 字符串
});
```
### 标签含义
```bash
<% '脚本' 标签，用于流程控制，无输出。
<%_ 删除其前面的空格符
<%= 输出数据到模板（输出是转义 HTML 标签）
<%- 输出非转义的数据到模板
<%# 注释标签，不执行、不输出内容
<%% 输出字符串 '<%'
%> 一般结束标签
-%> 删除紧随其后的换行符
_%> 将结束标签后面的空格符删除
```
### 包含

```js
<%- include('header', { header: 'header' }); -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer', { footer: 'footer' }); -%>

```

### 自定义分隔符

```js
let ejs = require('ejs'),
    users = ['geddy', 'neil', 'alex'];

// 单个模板文件
ejs.render('<?= users.join(" | "); ?>', {users: users},
    {delimiter: '?'});
// => 'geddy | neil | alex'

// 全局
ejs.delimiter = '$';
ejs.render('<$= users.join(" | "); $>', {users: users});
// => 'geddy | neil | alex'

```

### 自定义文件加载器

```js
let ejs = require('ejs');
let myFileLoader = function (filePath) {
  return 'myFileLoader: ' + fs.readFileSync(filePath);
};

ejs.fileLoader = myFileLoad;
```

## glob用法

>参考npm仓库：https://www.npmjs.com/package/glob

### 匹配规则
不同语言的 glob 库支持的规则会略有不同。下面是 node-glob 的匹配规则。
1. * 匹配任意 0 或多个任意字符
2. ? 匹配任意一个字符
3. [...] 若字符在中括号中，则匹配。若以 ! 或 ^ 开头，若字符不在中括号中，则匹配
4. !(pattern|pattern|pattern) 不满足括号中的所有模式则匹配
5. ?(pattern|pattern|pattern) 满足 0 或 1 括号中的模式则匹配
6. +(pattern|pattern|pattern) 满足 1 或 更多括号中的模式则匹配
7. *(a|b|c) 满足 0 或 更多括号中的模式则匹配
8. @(pattern|pat*|pat?erN) 满足 1 个括号中的模式则匹配
9. ** 跨路径匹配任意字符

