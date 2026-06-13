# GitFlow Module Architecture Design

The GitFlow module architecture design diagram is as follows:

<img src="/images/gitFlowDesign.jpg">

* Git: The core class for Git automation
* GitServer: The base class for Git remote repositories
* Gitee: Inherits from GitServer, used for calling Gitee API and getting basic info
* Github: Inherits from GitServer, used for calling Github API and getting basic info
* GiteeRequest: Encapsulates basic Gitee API call methods
* GithubRequest: Encapsulates basic Github API call methods
* CloudBuild: The core class for cloud build

## Github and Gitee API Integration

### Github API Integration

* Get SSH keys: https://github.com/settings/keys
* Get token: https://github.com/settings/tokens
> SSH creation help docs: https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh
* View API list: https://docs.github.com/cn/rest
* When calling the API, you need to include the token in the header:
config.headers['Authorization'] = `token ${this.token}`;

```js
config.headers['Authorization'] = `token ${this.token}`;
```

### Gitee API Integration
Integration flow:

* Get SSH keys: https://gitee.com/profile/sshkeys
* Get token: https://gitee.com/personal_access_tokens
* SSH creation help docs: https://gitee.com/help/articles/4191
* View API list: https://gitee.com/api/v5/swagger
* When calling the API, you need to include `access_token` in the parameters:

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
Default .gitignore template
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



