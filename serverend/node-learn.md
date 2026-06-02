# Node.js 一些知识

## 让 Node 支持 ES Module

node 14 以上版本支持，使用 .mjs 作为文件后缀
14以下版本 需要额外添加命令行参数 --experimental-modules

## Node 版本管理工具

### nvm

macOS安装方法
>github地址：https://github.com/nvm-sh/nvm

安装nvm
```bash
# 1
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
# 2
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
在环境变量文件中填写如下内容，
任选以下任一个环境变量文件：~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc
```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

使用
```bash
nvm ls # 查看本地node版本
nvm ls-remote # 查看远程node版本
nvm use 12.9.0 # 将本地node版本切换至12.9.0
nvm install 14.15.1 # 在本地安装node 14.15.1版本
```

## 另外一种 Node 版本管理
>n 是另一个 Node 版本管理方案，用法也非常简单，大家可以直接参考官方文档即可：https://www.npmjs.com/package/n




