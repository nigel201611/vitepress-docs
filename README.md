# Nigel's Notes — VitePress Docs

📝 个人技术博客，基于 [VitePress](https://vitepress.dev/) 构建，记录工作与学习中的所思所得。

🌐 在线地址：<https://nigel201611.github.io/vitepress-docs/>

## 📚 内容结构

| 目录 | 简介 |
|------|------|
| [frontend/](./frontend/) | **前端** — Vue 3、React Native、Rollup、正则、前端监控等 |
| [serverend/](./serverend/) | **服务端** — Node.js、MongoDB、Docker、OAuth2、Redis、JWT 等 |
| [jesttest/](./jesttest/) | **测试** — 前端测试实践与工具 |
| [tools/](./tools/) | **工具开发** — VS Code 插件、Chrome 插件、Git 用法、绘图工具等 |
| [scaffold/](./scaffold/) | **脚手架** — 脚手架架构设计、Commander、EJS 源码分析等 |
| [blockchain/](./blockchain/) | **区块链** — Ethereum、Bitcoin、Solana、TON 等主流公链开发资源索引 |

## 🚀 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建静态文件
pnpm docs:build

# 本地预览构建结果
pnpm docs:preview
```

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev/) — 静态网站生成器
- [pnpm](https://pnpm.io/) — 包管理器
- GitHub Pages — 部署托管

## 📦 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages。推送至 `main` 分支后自动构建发布。

## 📄 许可

ISC © 2025 Nigel
