# redis

## 手机验证码登录的功能

检查验证码

<img src="/images/genVeriCode.png">

创建用户

<img src="/images/createByPhoneNumber.png">


## 验证码持久化

* 速度要快
* 操作简单，key value 最佳
* 有自动的过期删除机制

## 使用 Redis

>地址：https://redis.io/
开源的，高性能的 key-value 数据库。

### 特点

* 默认运行在内存中，也可以持久化到硬盘。
* 性能极高 读：110000次/s，写： 81000次/s
* 支持更复杂的数据结构：list, set, zset, hash 等
* 丰富的特性 – 还支持 原子操作,publish/subscribe, 通知, key 过期等等特性


### 安装 redis

```bash
brew install redis
```
### 源代码编译安装
```js
# 下载
sudo curl -O https://download.redis.io/releases/redis-6.2.6.tar.gz
# 解压缩
sudo tar -zvxf redis-6.2.6.tar.gz
# 这里不想老是 sudo 的话，可以修改一下文件夹的权限
# 修改所有者
# sudo chown -R liusha（用户名）redis-6.2.6
# 或修改权限
# sudo chmod -R 777 redis-6.2.6
# 进入文件夹
cd redis-6.2.6
# 编译
make
# 运行
cd src
./redis-server
# 修改配置文件, 可以讲配置文件放在任意位置，比如和 mongo 放在一起 /usr/local/etc
vim ../redis.conf
# 配置后台运行
daemonize yes
# 带配置文件运行
./redis-server ../redis.conf
// 查看后台运行
ps aux | grep redis
```
### Redis CLI
```js
# 基本语法
COMMAND KEY_NAME（VALUE）
# 数据类型为字符串 https://redis.io/commands#string
# 增改
SET name viking
# 查
GET name
# 删除
DEL name

# 数据类型为列表 https://redis.io/commands#list
# 增 头部
LPUSH software redis
LPUSH software mongo
# 增 尾部
RPUSH software mysql
# 查
LRANGE software 0 10
# 获取长度
LLEN software
# 删除一项
LPOP software
RPOP software
# 改
LSET software 1 mongoDB
# 整体删除
DEL software software
# 数据结构为哈希表 https://redis.io/commands#hash
#  增
HMSET person name "viking" age 30
# 查
HGETALL person
HGET person name
# 改
HSET person name "lily"
# 删
HDEL person name
```


### Redis Node.js 客户端

>Node.js 客户端：https://redis.io/clients#nodejs

### 其中的翘楚
* ioredis: https://github.com/luin/ioredis
* node-redis:https://github.com/redis/node-redis
