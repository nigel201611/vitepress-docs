# 阿里云 OSS

>node.js SDK: https://help.aliyun.com/document_detail/32068.html

## 基于 Node.js SDK 封装的插件

egg-oss：https://github.com/eggjs/egg-oss/

## 几个需要的参数

```js
// 所有配置参数
https://help.aliyun.com/document_detail/64097.html
// access key 名称
accessKeyId: process.env.ALC_ACCESS_KEY,,
// accessSecre
accessKeySecret: process.env.ALC_SECRET_KEY,
// bucket 名称
bucket: 'logo-backend',
// 访问域名和数据中心
// https://help.aliyun.com/document_detail/31837.html
endpoint: 'oss-cn-shanghai.aliyuncs.com'
```