import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/vitepress-docs/'

export default defineConfig({
  base,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: "Nigel's Notes",
      description: 'Documenting my learning journey',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Frontend', link: '/frontend/regexp', activeMatch: '/frontend/' },
          { text: 'Backend', link: '/serverend/node-learn', activeMatch: '/serverend/' },
          { text: 'Testing', link: '/jesttest/jestStudy', activeMatch: '/jesttest/' },
          { text: 'Tools', link: '/tools/vscode-plugin', activeMatch: '/tools/' },
          { text: 'Scaffold', link: '/scaffold/scaffoldYL', activeMatch: '/scaffold/' },
          { text: 'Blockchain', link: '/blockchain/', activeMatch: '/blockchain/' },
          { text: 'Team Sharing', link: '/team-sharing/', activeMatch: '/team-sharing/' },
        ],
        sidebar: {
          '/frontend/': [
            {
              text: 'Frontend',
              items: [
                { text: 'Common Regex', link: '/frontend/regexp' },
                { text: 'Infinite Scroll', link: '/frontend/slideScrollComp' },
                { text: 'Functional Programming', link: '/frontend/functional-programming' },
                { text: 'Vue 3', link: '/frontend/vue3' },
                { text: 'Rollup Config', link: '/frontend/rollup' },
                { text: 'Frontend Monitoring', link: '/frontend/frontend-monitor' },
                { text: 'MaxCompute', link: '/frontend/MaxCompute' },
                { text: 'React Native Notes', link: '/frontend/reactNativeStudy' },
                { text: 'React Native Splash Screen', link: '/frontend/reactNativeBootstrapScreen' },
                { text: 'React Native Android Build', link: '/frontend/bootstrapSetting' },
                { text: 'Promise A+', link: '/frontend/promiseA' },
              ]
            }
          ],
          '/serverend/': [
            {
              text: 'Backend',
              items: [
                { text: 'Node.js Basics', link: '/serverend/node-learn' },
                { text: 'nodeModulePaths Source', link: '/serverend/nodeModulePaths' },
                { text: 'child_process Guide', link: '/serverend/node-child_process' },
                { text: 'inquirer Internals', link: '/serverend/inquirerYL' },
                { text: 'MongoDB', link: '/serverend/MongoDB' },
                { text: 'Mongoose', link: '/serverend/Mongoose' },
                { text: 'Error Code Design', link: '/serverend/errorStatusCode' },
                { text: 'Redis', link: '/serverend/redis' },
                { text: 'OAuth2 Login', link: '/serverend/OAuth2' },
                { text: 'Alibaba Cloud OSS', link: '/serverend/aliOss' },
                { text: 'RBAC Permissions', link: '/serverend/RBAC' },
                { text: 'Docker Intro', link: '/serverend/docker' },
                { text: 'Docker Compose', link: '/serverend/dockerCompose' },
                { text: 'YAML Guide', link: '/serverend/YAML' },
                { text: 'Mock Server & HTML2Canvas', link: '/serverend/MockServer' },
                { text: 'Node Best Practices', link: '/serverend/nodeBestPractice' },
                { text: 'JWT', link: '/serverend/JWT' },
              ]
            }
          ],
          '/jesttest/': [
            {
              text: 'Testing',
              items: [
                { text: 'Frontend Testing', link: '/jesttest/jestStudy' },
              ]
            }
          ],
          '/tools/': [
            {
              text: 'Tools',
              items: [
                { text: 'VS Code Extension', link: '/tools/vscode-plugin' },
                { text: 'syncvsplugin', link: '/tools/syncvsplugin' },
                { text: 'Chrome Extension', link: '/tools/google-plugin' },
                { text: 'GitLab Pages Deploy', link: '/tools/gitlab-pages-deploy' },
                { text: 'Useful Git Commands', link: '/tools/git-function' },
                { text: 'Drawing Tools', link: '/tools/drawdoctool' },
                { text: 'Markdown Guide', link: '/tools/markdownYF' },
              ]
            }
          ],
          '/scaffold/': [
            {
              text: 'Scaffold',
              items: [
                { text: 'Scaffold Dev', link: '/scaffold/scaffoldYL' },
                { text: 'Custom CLI', link: '/scaffold/my-cli-dev' },
                { text: 'Commander', link: '/scaffold/commander' },
                { text: 'EJS & Glob Guide', link: '/scaffold/ejsAndGlob' },
                { text: 'EJS Source', link: '/scaffold/ejsYL' },
                { text: 'Require Source', link: '/scaffold/requireYL' },
                { text: 'Reusing Code', link: '/scaffold/reuseCode' },
                { text: 'Publish Architecture', link: '/scaffold/myClidevPublish' },
                { text: 'GitFlow Design', link: '/scaffold/gitFlowDesign' },
                { text: 'Component Platform', link: '/scaffold/componentPlatform' },
              ]
            }
          ],
          '/blockchain/': [
            {
              text: 'Blockchain',
              items: [
                { text: 'Blockchain Index', link: '/blockchain/' },
                { text: 'Ethereum', link: '/blockchain/ethereum' },
                { text: 'Bitcoin', link: '/blockchain/bitcoin' },
                { text: 'BNB Smart Chain', link: '/blockchain/bsc' },
                { text: 'TRON', link: '/blockchain/tron' },
                { text: 'Solana', link: '/blockchain/solana' },
                { text: 'Base', link: '/blockchain/base' },
                { text: 'Aptos', link: '/blockchain/aptos' },
                { text: 'Polygon', link: '/blockchain/polygon' },
                { text: 'Avalanche', link: '/blockchain/avalanche' },
                { text: 'Arbitrum', link: '/blockchain/arbitrum' },
                { text: 'Optimism', link: '/blockchain/optimism' },
                { text: 'TON', link: '/blockchain/ton' },
                { text: 'Blockchain Tools', link: '/blockchain/tools' },
              ]
            }
          ],
          '/team-sharing/': [
            {
              text: 'Team Sharing',
              items: [
                { text: 'Home', link: '/team-sharing/' },
                { text: 'Frontend Identity & Value in the AI Agent Era', link: '/team-sharing/frontend-ai-agent-era' },
              ]
            }
          ],
        },
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: "Nigel's Notes",
      description: '记录工作、学习所思所得',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '前端', link: '/zh/frontend/regexp', activeMatch: '/zh/frontend/' },
          { text: '服务端', link: '/zh/serverend/node-learn', activeMatch: '/zh/serverend/' },
          { text: '测试', link: '/zh/jesttest/jestStudy', activeMatch: '/zh/jesttest/' },
          { text: '工具开发', link: '/zh/tools/vscode-plugin', activeMatch: '/zh/tools/' },
          { text: '脚手架', link: '/zh/scaffold/scaffoldYL', activeMatch: '/zh/scaffold/' },
          { text: '区块链', link: '/zh/blockchain/', activeMatch: '/zh/blockchain/' },
          { text: '团队分享', link: '/zh/team-sharing/', activeMatch: '/zh/team-sharing/' },
        ],
        sidebar: {
          '/zh/frontend/': [
            {
              text: '前端',
              items: [
                { text: '常见正则', link: '/zh/frontend/regexp' },
                { text: '无限滚动列表', link: '/zh/frontend/slideScrollComp' },
                { text: '函数式编程入门', link: '/zh/frontend/functional-programming' },
                { text: 'Vue 3', link: '/zh/frontend/vue3' },
                { text: 'Rollup 配置', link: '/zh/frontend/rollup' },
                { text: '前端监控', link: '/zh/frontend/frontend-monitor' },
                { text: 'MaxCompute', link: '/zh/frontend/MaxCompute' },
                { text: 'React Native 学习记录', link: '/zh/frontend/reactNativeStudy' },
                { text: 'React Native 启动图片', link: '/zh/frontend/reactNativeBootstrapScreen' },
                { text: 'React Native Android 打包', link: '/zh/frontend/bootstrapSetting' },
                { text: 'Promise A+', link: '/zh/frontend/promiseA' },
              ]
            }
          ],
          '/zh/serverend/': [
            {
              text: '服务端',
              items: [
                { text: 'Node.js 一些知识', link: '/zh/serverend/node-learn' },
                { text: 'nodeModulePaths 源码学习', link: '/zh/serverend/nodeModulePaths' },
                { text: 'child_process 用法原理', link: '/zh/serverend/node-child_process' },
                { text: 'inquirer 命令行交互原理', link: '/zh/serverend/inquirerYL' },
                { text: 'MongoDB', link: '/zh/serverend/MongoDB' },
                { text: 'Mongoose', link: '/zh/serverend/Mongoose' },
                { text: '错误码设计原则', link: '/zh/serverend/errorStatusCode' },
                { text: 'Redis', link: '/zh/serverend/redis' },
                { text: 'OAuth2 完成用户登录', link: '/zh/serverend/OAuth2' },
                { text: '阿里云 OSS', link: '/zh/serverend/aliOss' },
                { text: '基于 RBAC 的权限验证', link: '/zh/serverend/RBAC' },
                { text: 'Docker 简介', link: '/zh/serverend/docker' },
                { text: 'Docker Compose', link: '/zh/serverend/dockerCompose' },
                { text: '学习 YAML', link: '/zh/serverend/YAML' },
                { text: 'Mock Server & HTML2Canvas', link: '/zh/serverend/MockServer' },
                { text: 'Node 最佳实践', link: '/zh/serverend/nodeBestPractice' },
                { text: 'JWT', link: '/zh/serverend/JWT' },
              ]
            }
          ],
          '/zh/jesttest/': [
            {
              text: '测试',
              items: [
                { text: '前端测试', link: '/zh/jesttest/jestStudy' },
              ]
            }
          ],
          '/zh/tools/': [
            {
              text: '工具开发',
              items: [
                { text: 'VS Code 插件开发', link: '/zh/tools/vscode-plugin' },
                { text: 'syncvsplugin 插件', link: '/zh/tools/syncvsplugin' },
                { text: '谷歌插件开发', link: '/zh/tools/google-plugin' },
                { text: 'GitLab Pages 部署', link: '/zh/tools/gitlab-pages-deploy' },
                { text: '有用的 GIT 命令', link: '/zh/tools/git-function' },
                { text: '绘图工具', link: '/zh/tools/drawdoctool' },
                { text: 'Markdown 用法', link: '/zh/tools/markdownYF' },
              ]
            }
          ],
          '/zh/scaffold/': [
            {
              text: '脚手架',
              items: [
                { text: '脚手架开发', link: '/zh/scaffold/scaffoldYL' },
                { text: '自研脚手架', link: '/zh/scaffold/my-cli-dev' },
                { text: 'Commander', link: '/zh/scaffold/commander' },
                { text: 'EJS 和 Glob 用法详解', link: '/zh/scaffold/ejsAndGlob' },
                { text: 'EJS 源码详解', link: '/zh/scaffold/ejsYL' },
                { text: 'Require 源码解析', link: '/zh/scaffold/requireYL' },
                { text: '复用代码', link: '/zh/scaffold/reuseCode' },
                { text: '脚手架发布架构设计', link: '/zh/scaffold/myClidevPublish' },
                { text: 'GitFlow 模块架构设计', link: '/zh/scaffold/gitFlowDesign' },
                { text: '组件平台架构设计', link: '/zh/scaffold/componentPlatform' },
              ]
            }
          ],
          '/zh/blockchain/': [
            {
              text: '区块链',
              items: [
                { text: '区块链索引', link: '/zh/blockchain/' },
                { text: 'Ethereum', link: '/zh/blockchain/ethereum' },
                { text: 'Bitcoin', link: '/zh/blockchain/bitcoin' },
                { text: 'BNB Smart Chain', link: '/zh/blockchain/bsc' },
                { text: 'TRON', link: '/zh/blockchain/tron' },
                { text: 'Solana', link: '/zh/blockchain/solana' },
                { text: 'Base', link: '/zh/blockchain/base' },
                { text: 'Aptos', link: '/zh/blockchain/aptos' },
                { text: 'Polygon', link: '/zh/blockchain/polygon' },
                { text: 'Avalanche', link: '/zh/blockchain/avalanche' },
                { text: 'Arbitrum', link: '/zh/blockchain/arbitrum' },
                { text: 'Optimism', link: '/zh/blockchain/optimism' },
                { text: 'TON', link: '/zh/blockchain/ton' },
                { text: '区块链工具箱', link: '/zh/blockchain/tools' },
              ]
            }
          ],
          '/zh/team-sharing/': [
            {
              text: '团队分享',
              items: [
                { text: '首页', link: '/zh/team-sharing/' },
                { text: 'AI Agent 时代下前端的定位与价值思考', link: '/zh/team-sharing/frontend-ai-agent-era' },
              ]
            }
          ],
        },
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nigel201611/vitepress-docs' }
    ]
  }
})
