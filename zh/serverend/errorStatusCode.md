# 错误码设计原则

## 统一格式 A-BB-CCC

* A：错误级别，如1代表系统级错误，2代表服务级错误
* B：项目或模块名称，一般团队不会超过99个项目，这里使用01代表用户模块
* C：具体错误编码，自增即可，一个项目999种错误码应该够用

## 加密方案选择

### md5 hash 保存 - 碰撞，彩虹表

```js
MD5('123') = 202CB962AC59075B964B07152D234B70
username: nigel
password: 202CB962AC59075B964B07152D234B70
```
### md5 hash + salt（盐）保存

盐（Salt），在密码学中，是指在hash之前将明文内容（例如：密码）的任意固定位置插入特定的字符串。

```js
MD5('123' + '1ck12b13k1jmjxrg1h0129h2lj') = '6c22ef52be70e11b6f3bcf0f672c96ce'
username: nigel
password: 6c22ef52be70e11b6f3bcf0f672c96ce
salt: 1ck12b13k1jmjxrg1h0129h2lj
```

### bcrypt
一种加盐的单向Hash，不可逆的加密算法，同一种明文（plaintext），每次加密后的密文都不一样，而且不可反向破解生成明文，破解难度很大。
node.js 实现 - https://github.com/kelektiv/node.bcrypt.js

```js
bcrypt('123') = $2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT
username: nigel
password: $2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT
```

<img src="/images/bcrypt.png" alt="bcrypt png">

### egg-bcrypt 

```js
// config.default.js
exports.bcrypt = {
  saltRounds: 10 // default 10
}
// {app_root}/config/plugin.js
exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}
```

