# Docker compose
>Docker compose 是 Docker 官方推出的工具，用来管理和共享多个容器的应用。

## 安装

Mac 和 Windows 假如安装客户端的话，是会自动安装 Docker compose 的。
```js
docker-compose version
```
## 配置

docker compose 通过一个特殊的 yml 文件，进行配置，这个文件必须命名为 docker-compose.yml

docker-compose 所有的字段参考文档：https://docs.docker.com/compose/compose-file/compose-file-v3/

```js
version: '3'
services:
  xxx-mongo:
    image: mongo
    container_name: lego-mongo
    volumes:
      - '.docker-volumes/mongo/data:/data/db'
      - '$PWD/mongo-entrypoint/:/docker-entrypoint-initdb.d/'
    ports:
      - 27017:27017
    env_file:
      - .env
  xxx-redis:
    image: redis:6
    container_name: lego-redis
    command: >
      --requirepass ${REDIS_PASSWORD}
    ports:
      - 6379:6379
    env_file:
      - .env
  xxx-backend:
    depends_on:
      - xxx-mongo
      - xxx-redis
    build:
      context: . # 当前目录
      dockerfile: Dockerfile # 基于 Dockerfile 构建
    image: xxx-backend
    container_name: xxx-backend
    ports:
     - 7001:7001
    env_file:
      - .env

```

## 启动以及关闭

```js
# 启动
docker-compose up -d
# 关闭
docker-compose down

```

## MongoDB 用户以及权限管理

授权文档：https://docs.mongodb.com/manual/core/authentication/

内置的 Roles：https://docs.mongodb.com/manual/reference/built-in-roles/


### 初始化一个新数据库以后 期望的步骤

* 创建 admin 级别的 root 用户/ roles: root
* 创建对应的数据库 lego
* 创建该数据库的管理员 xyz / roles: readWrite
* 代码中，使用管理员 xyz 的用户名密码链接数据库并且完成操作。

### 初始化数据库数据以及运行脚本

数据库准备工作

* 数据库配置，初始化工作，比如插入一些特定的数据
* 避免使用 root 用户去启动服务，从而提高安全性

特殊的初始化数据库的位置：/docker-entrypoint-initdb.d

* mongoDB：https://hub.docker.com/_/mongo
* Postgres：https://hub.docker.com/_/postgres
* 特别注意，只有在数据库没有被创建的情况下，也就是数据库的文件夹是空的情况下，脚本才会被执行。


## Docker mongo 提供的环境变量

```js
MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=pass
MONGO_DB_USERNAME=user
MONGO_DB_PASSWORD=pass
```

## Shell 中 EOF << 的用法

在Shell中我们通常将EOF与 << 结合使用，表示后续的输入作为子命令或子Shell的输入，直到遇到EOF为止，再返回到主调Shell。

```js
#!/bin/bash

mongo <<EOF
use admin
db.auth('root', '123456')
use lego
EOF

```

## Docker 镜像构建优化

### 优化镜像大小

什么是 Alpine Linux：https://alpinelinux.org/

Alpine 的优点

* Small 小
    * 默认软件包，alpine 选择 busybox
    * C 运行库，一般会用 glibc，alpine 选择 musl
* 最简依赖，Simple
    * 很多内置软件的插件都去掉。
    * 国际化内容都被删除
* Secure 安全

## 部署到服务器

安装 Docker

Ubuntu：

https://www.runoob.com/docker/ubuntu-docker-install.html

https://docs.docker.com/engine/install/ubuntu/

## 配置用户组

因为是 root 安装，普通用户执行对应的命令的时候有可能会报错
>Can’t connect to docker daemon Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock

需要将对应的用户添加到 docker 的用户组中。
```js
# usermod 命令 修改用户账户
# -a --append 添加 -G --groups 组的名称
sudo usermod -aG docker 你的用户名
# 如果组不存在，添加对应的 docker 组
sudo groupadd docker
# 查看一个用户所属的组
groups

```

### 添加下载镜像

```js
# root
vim /etc/docker/daemon.json

{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn/",
    "https://reg-mirror.qiniu.com"
  ]
}

```

运行

```js
# 拉最新的代码
git pull
# 先查看目前端口是否被占用，
# 如果被占用，释放端口
# 或者改变 docker-compose.yml 的映射端口
docker-compose up -d
```


