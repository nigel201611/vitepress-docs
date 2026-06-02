# GitFlow 模块架构设计

GitFlow 模块架构设计图如下：

<img src="/images/gitFlowDesign.jpg">

* Git：Git 自动化的核心类
* GitServer：Git 远程仓库基类
* Gitee：继承 GitServer，用于调用 Gitee API 和获取基本信息
* Github：继承 GitServer，用于调用 Github API 和获取基本信息
* GiteeRequest：封装 Gitee API 调用基本方法
* GithubRequest：封装 Github API 调用基本方法
* CloudBuild：云构建核心类

## Github 和 Gitee API 接入

### Github API 接入

* 获取 ssh：https://github.com/settings/keys
* 获取 token：https://github.com/settings/tokens
>创建 SSH 帮助文档：https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh
* 查看 API 列表：https://docs.github.com/cn/rest
* 调用 API 时需要在 header 中携带 token：
config.headers['Authorization'] = `token ${this.token}`;

```js
config.headers['Authorization'] = `token ${this.token}`;
```

### Gitee API 接入
接入流程：

* 获取 ssh：https://gitee.com/profile/sshkeys
* 获取 token：https://gitee.com/personal_access_tokens
* 创建 SSH 帮助文档：https://gitee.com/help/articles/4191
* 查看 API 列表：https://gitee.com/api/v5/swagger
* 调用 API 时需要在参数中携带 access_token：

```js
get(url, params, headers) {
  return this.service({
    url,
    params: {
      ...params,
      access_token: this.token,
    },
    method: 'get',
    headers,
  });
}
```
默认 .gitignore 模板
```js
.DS_Store
node_modules
/dist


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```




