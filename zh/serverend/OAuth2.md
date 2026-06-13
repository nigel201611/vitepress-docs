# OAuth2 完成用户登录
>OAuth是一个关于授权（authorization）的开放网络标准，在全世界得到广泛应用，是用来授权第三方应用。

## 传统方式的缺陷

* 为了后续的服务，会保存用户的密码，这样不是很安全。
* 没法限制用户获得授权的范围和有效期。
* 用户只有修改密码，才能收回赋予第三方应用的权力。
* 只要有一个第三方应用程序被破解，就会导致用户密码泄漏，以及所有被密码保护的数据泄漏。

## Oauth2 的思路

* OAuth在"客户端"与"服务提供商"之间，设置了一个授权层（authorization layer）
* 客户端"不能直接登录"服务提供商"，只能登录授权层，以此将用户与客户端区分开来。
* "客户端"登录授权层所用的令牌（token），与用户的密码不同。用户可以在登录的时候，指定授权层令牌的权限范围和有效期。

## Token 的优点

* 令牌是短期的，到期会自动失效，用户自己无法修改。
* 令牌可以被数据所有者撤销，会立即失效。
* 令牌有权限范围（scope）

## Oatuh2 的授权方式

* 授权码（authorization-code）
* 隐藏式（implicit）
* 密码式（password）：
* 客户端凭证（client credentials）

## 授权码方式的工作流程

<img src="/images/oauth2.png">

## Gitee 文档地址
* [Oauth 文档](https://gitee.com/api/v5/oauth_doc#/)
* [获取用户信息 API 文档](https://gitee.com/api/v5/swagger#/getV5User)

## oauth2 前端调用流程
<img src="/images/oauth21.png">