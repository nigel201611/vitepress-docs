# 学习 YAML

>YAML （YAML Ain’t a Markup Language）是一种标记语言，它使用空格作为缩进，看起来非常的简洁，可读性非常的好，非常适合一些内容大纲和配置文件。

```js
# document start
# scalars 纯量，不能再分割的量
key: value
a_number_value: 100
boolean: true
# 字符串是不需要使用引号的，但是使用了也不会报错
quote_string: 'quote string'
# 多行字符串可以使用 literal block，也就是竖线
mutiple_string: |
  line one 
  line two
  line three
# COLLECTION TYPES 集合类型
# 使用缩进表示层级关系,最好是两个空格
# 不是也没关系，只要对齐就可以
person:
  name: viking
  age: 30
  address:
    city: 'shanghai'
# Sequences 数组或者列表
hobbies:
  - Item 1
  - Item 2
  - name: 'weson'
    value: 'xyz'

```

YAML 语法检查器：https://yamlchecker.com/

## Github actions

>Github actions https://docs.github.com/en/actions

<img src="/images/githubActions.png">

### Workflow

https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions#workflows

Workflow 是一个可配置的自动化流程，可以包含多个 jobs，通过在 repo (.github/workflows/xx.yml) 当中的 yml 文件来定义对应的流程，一个 repo 可以包含多个 workflow。

### Events

Event 是触发 workflow 的特殊事件，比如 pull request，push 或者 issue，也可以完全自定义，完整列表请看：https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows

### Jobs

Job 是 Workflow 当中一系列的可执行步骤，每个 Job 是在同一个 runner 中进行的（Runner 是指处于 github 的一台特殊的虚拟机，支持各种操作系统），每个步骤或者是一个 shell 脚本，抑或是一个可执行的 action，每个步骤是按顺序执行，并且互相依赖的。

### Actions

Action 是 github actions 中的一个自定义应用，它可以运行一系列复杂的并且常用的任务，使用 action 可以帮我们减少在 workflow 中写重复代码，Github 提供了非常多常用的 action，可以在这里查阅：https://github.com/marketplace?type=actions 同时我们也可以写自己的 action。

### 使用 Github Secrets

文档地址：https://docs.github.com/cn/actions/security-guides/encrypted-secrets

### 使用 ssh-action 完成远程登录

文档地址：https://github.com/appleboy/ssh-action


### 改进目前的部署流程

目前线上更新的流程

```js
# 每次代码更新以后，登录到 ssh 服务器
# 关闭服务
docker-compose down
# 更新代码
git pull
# 假如有 .env 的更新 需要重新设置 .env 文件
# 重新 build 应用镜像
docker-compose build xxx-backend
# 重启服务
docker-compose up -d

```

### 目前问题的弊端

* 初次上线和更新属于两步
* 初次上线需要特别的操作，就是之前手动部署上线的运行的过程
  * clone 代码
  * 设置环境变量 .env
  * docker-compose up -d
* 追求的成果：每次提交，可以自动一次性的部署到任何服务器，实现初次启动或者更新的效果，这才是一个完美的 devops 的流程

### 解决方案
```yaml
# 目前的方案
services:
	xxx-redis:
		image: redis:6
	xxx-mongo:
		image: mongo:latest
	xxx-backend:
		image: xxx-backend
		# 我们需要每次手动的 build 镜像，也就说镜像只存在于本地
		build:
          context: . 
          dockerfile: Dockerfile
```
### 更好的解决方案

```yaml
# 更好的方案
# 不需要任何代码库中的文件，只需要一个 docker-compose.yml 文件
# 就可以轻松的在任何服务器运行
services:
	xxx-redis:
		image: redis:6
	xxx-mongo:
		image: mongo:latest
	xxx-backend:
		# 不需要 build，而是存在于 docker hub 服务器中，可以每次直接拉取
		image: xxx-backend:1.0.1

```

### 阿里云容器镜像服务 ACR

地址：https://www.aliyun.com/product/acr
个人版完全免费

### 推送镜像到 ACR

```bash
# 来到镜像仓库的基本信息页面
# 登录
docker login --username=你的名称 registry.cn-hangzhou.aliyuncs.com
# tag两种方式：1 使用 tag build
docker build --tag "registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:[镜像版本号]" .
# 2 给 build 好的打 tag
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:[镜像版本号]
# 查看镜像是否 build 完成
docker images
# 推送镜像
docker push registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:[镜像版本号]
# 在阿里云 ACR 界面检查看是否已经存在

```

## Github Actions 完成自动部署

### 大体分为两步

* 在 runner 上 build image 并且 push
* 使用 docker-compose-online 文件在服务器上运行应用
  
第一步详细流程分析， 在 github runner 上运行

* checkout 代码
* 创建 .env 文件，并且添加两个环境变量（upload to OSS 需要两个对应的信息）
* 使用阿里云ACR 完成 docker login
* 使用正确的阿里云 tag 进行 docker build
* 怎样每次push 生成特殊的 tag？是一个后续的问题
* docker push

```yaml
name: build image, push to ACR
on: [push]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      # checkout 代码
      - uses: actions/checkout@v2
      # 创建 env 文件
      - run: touch .env
      - run: echo ALC_ACCESS_KEY=${{ secrets.ALC_ACCESS_KEY }} >> .env
      - run: echo ALC_SECRET_KEY=${{ secrets.ALC_SECRET_KEY }} >> .env
      # 使用阿里云ACR 完成 docker login 
      - name: Login to Aliyun Container Registry (ACR)
        uses: aliyun/acr-login@v1
        with:
          login-server: https://registry.cn-hangzhou.aliyuncs.com
          region-id: cn-hangzhou
          username: "${{ secrets.ACR_USERNAME }}"
          password: "${{ secrets.ACR_PASSWORD }}"
      # 使用正确的阿里云 tag 进行 docker build
      - name: Build image for Docker
        run: docker build --tag "registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:0.0.2" .
      - name: Push Image to ACR
        run: docker push registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:0.0.2  
```
  
第二步详细流程分析，在服务器上部署对应的代码并且运行

* checkout 代码
* 创建 .env 文件，添加多个环境变量。（应用所有需要的环境变量）
创建文件夹，拷贝如下文件到文件夹内
.env
docker-compose-online.yml
mongo-entrypoint 文件夹
* 将新建的文件夹拷贝到服务器（SCP）当中
* 使用 https://github.com/appleboy/scp-action
* SSH 到服务器中
* 登录阿里云 ACR
* 进入拷贝的文件夹内
* 停止服务 docker-compose down（第一次的话，没有启动也不会报错）
* 启动服务 docker-compose up
* 清理工作可选，保证安全（删除 .env 文件，登出 docker 账户）

```yaml
name: Deploy app to server
on: [push]
jobs:
  deploy-and-restart:
    runs-on: ubuntu-latest
    steps:
      # checkout 代码
      - uses: actions/checkout@v2
      # 创建 env 文件
      - name: 'create env file'
        run: |
          touch .env
          echo ALC_ACCESS_KEY=${{ secrets.ALC_ACCESS_KEY }} >> .env
          echo ALC_SECRET_KEY=${{ secrets.ALC_SECRET_KEY }} >> .env
          echo GITEE_CID=${{ secrets.GITEE_CID }} >> .env
          echo GITEE_SECRET=${{ secrets.GITEE_SECRET }} >> .env
          echo JWT_SECRET=${{ secrets.JWT_SECRET }} >> .env
          echo MONGO_INITDB_ROOT_USERNAME=${{ secrets.MONGO_INITDB_ROOT_USERNAME }} >> .env
          echo MONGO_INITDB_ROOT_PASSWORD=${{ secrets.MONGO_INITDB_ROOT_PASSWORD }} >> .env
          echo MONGO_DB_USERNAME=${{ secrets.MONGO_DB_USERNAME }} >> .env
          echo MONGO_DB_PASSWORD=${{ secrets.MONGO_DB_PASSWORD }} >> .env
          echo REDIS_PASSWORD=${{ secrets.REDIS_PASSWORD }} >> .env
          echo PING_ENV=${{ secrets.PING_ENV }} >> .env
      # 拷贝必须文件到一个文件夹，包括 .env, docker-compose-online.yml, mongo-entrypoint
      - name: 'copy necessary files in to one folder'
        run: |
          mkdir xxx-backend
          cp .env docker-compose-online.yml xxx-backend
          cp -r mongo-entrypoint xxx-backend
          ls -a xxx-backend
      # 通过 scp 拷贝必须文件到服务器
      - name: 'copy xxx-backend folder via scp'
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          source: 'xxx-backend'
          target: '~'
      # 通过 SSH 登录然后重启服务
      - name: executing ssh and restart docker
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          script_stop: true
          # * 登录阿里云 ACR
          # 停止服务 docker-compose down
          # 启动服务 docker-compose up 
          # 清理工作
          script: |
            docker login --username=${{secrets.ACR_USERNAME}} --password=${{secrets.ACR_PASSWORD}} registry.cn-hangzhou.aliyuncs.com
            cd ~/xxx-backend/
            docker-compose -f docker-compose-online.yml down
            docker-compose -f docker-compose-online.yml up -d
            rm -rf .env
            docker logout registry.cn-hangzhou.aliyuncs.com
```
  

结合两步之前要完成的任务

* 不是每次 commit 都需要构建并且部署上线的，只有特定的情况下，才会发布上线。
* 需要使用和该次提交相关的特殊信息，作为构建 image 的时候的 tag。
* 常见的发布是当 main/ master 有提交或者 merge 的情况下才会发布，还有最常用的是使用 tag，在 travis 发布组件库的时候也有所耳闻，tag 是标记版本的一个最好的实践。
* 可以使用提交的特殊标记作为要构建镜像的 tag，这里假如你选用 tag 发布，自然是选择对应的 tag，如果是其他情况可以选择 commit 的 ID。
  
这节课的任务

* 在 push tags 的时候才触发对应的 job
https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows
* 怎样获取对应的每次提交相关的特殊信息
https://docs.github.com/en/actions/learn-github-actions/contexts
* 使用这个特殊信息，在对应的 docker-compose-online.yml 中进行替换，将要启动的版本替换为将要构建的版本。
https://github.com/marketplace/actions/find-and-replace
* 使用 Release-it 自动填写部署信息

>现在我们的 tag，以及package.json 中的信息，需要手动修改，费时而且容易出错，使用一款工具来规范这个流程：Release-it，https://github.com/release-it/release-it


```yaml
name: 自动部署新版本到服务器
# 在特定 tag 被 push 以后被触发
on:
  push:
    tags:
      - 'v*.*.*'
jobs:
  publish-release:
    runs-on: ubuntu-latest
    steps:
      # checkout 代码
      - uses: actions/checkout@v2
      # 创建 env 文件
      # build docker image
      # start the app
      - name: 'create env file'
        run: |
          touch .env
          echo ALC_ACCESS_KEY=${{ secrets.ALC_ACCESS_KEY }} >> .env
          echo ALC_SECRET_KEY=${{ secrets.ALC_SECRET_KEY }} >> .env
          echo GITEE_CID=${{ secrets.GITEE_CID }} >> .env
          echo GITEE_SECRET=${{ secrets.GITEE_SECRET }} >> .env
          echo JWT_SECRET=${{ secrets.JWT_SECRET }} >> .env
          echo MONGO_INITDB_ROOT_USERNAME=${{ secrets.MONGO_INITDB_ROOT_USERNAME }} >> .env
          echo MONGO_INITDB_ROOT_PASSWORD=${{ secrets.MONGO_INITDB_ROOT_PASSWORD }} >> .env
          echo MONGO_DB_USERNAME=${{ secrets.MONGO_DB_USERNAME }} >> .env
          echo MONGO_DB_PASSWORD=${{ secrets.MONGO_DB_PASSWORD }} >> .env
          echo REDIS_PASSWORD=${{ secrets.REDIS_PASSWORD }} >> .env
      # 使用阿里云ACR 完成 docker login 
      - name: Login to Aliyun Container Registry (ACR)
        uses: aliyun/acr-login@v1
        with:
          login-server: https://registry.cn-hangzhou.aliyuncs.com
          region-id: cn-hangzhou
          username: "${{ secrets.ACR_USERNAME }}"
          password: "${{ secrets.ACR_PASSWORD }}"
      # 使用正确的github tag 对应ACR tag 进行 docker build
      - name: Build image for ACR docker
        run: docker build --tag "registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:${{github.ref_name}}" .
      # 使用标记的 tag 进行 push
      - name: Push Image to ACR
        run: docker push registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:${{github.ref_name}} 
      # 查找 docker-compose-online 文件 并且完成版本替换
      - name: Find and Replace
        uses: jacobtomlinson/gha-find-replace@v2
        with: 
          find: "{{tag}}"
          replace: ${{github.ref_name}}
          include: "docker-compose-online.yml"
      - run: cat docker-compose-online.yml
      # 拷贝必须文件到一个文件夹，包括 .env, docker-compose-online.yml, mongo-entrypoint
      - name: 'copy necessary files in to one folder'
        run: |
          mkdir xxx-backend 
          cp .env docker-compose-online.yml xxx-backend
          cp -r mongo-entrypoint xxx-backend
          ls -a xxx-backend
      # 通过 scp 拷贝必须文件到服务器
      - name: 'copy xxx-backend folder via scp'
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          source: 'xxx-backend'
          target: '~'
      # 通过 SSH 登录然后重启服务
      - name: executing ssh and restart docker
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          script_stop: true
          # * 登录阿里云 ACR
          # 停止服务 docker-compose down
          # 启动服务 docker-compose up 
          # 清理工作
          script: |
            docker login --username=${{secrets.ACR_USERNAME}} --password=${{secrets.ACR_PASSWORD}} registry.cn-hangzhou.aliyuncs.com
            cd ~/xxx-backend/
            docker-compose -f docker-compose-online.yml down
            docker-compose -f docker-compose-online.yml up -d
            rm -rf .env
            docker logout registry.cn-hangzhou.aliyuncs.com 

```
