# JWT
>token 一种最流行的实现方式 JWT（json web token）https://jwt.io/

基本工作流程

<img src="/images/jwt.png">

## JWT token 的组成

* Header：JSON对象，描述 JWT 的元数据，加密算法以及类型
* Payload：JSON对象，存放数据需要传递的数据
* Signature：对前两部分的签名，防止数据篡改。需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。

## Token 优点

* token 是无状态的（stateless），服务器不需要记录任何信息，不占用内存
* 多进程，多服务器集群没有影响，易于扩展
* 假如不记录在 cookie 中，没有跨域的影响
* 和服务器端解耦，任何设备都可以生成token。

## Token 的缺点

* 无法废弃，没有办法对快速对已经登录的用户做处理。
* 空间更大，所有数据是通过 base64进行编码的，会随着数据量的增大而变大。