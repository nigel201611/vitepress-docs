import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nigel's Notes",
  description: "记录工作、学习所思所得",
  base: '/vitepress-docs/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-docs/favicon.svg' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/frontend/regexp', activeMatch: '/frontend/' },
      { text: '服务端', link: '/serverend/node-learn', activeMatch: '/serverend/' },
      { text: '测试', link: '/jesttest/jestStudy', activeMatch: '/jesttest/' },
      { text: '工具开发', link: '/tools/vscode-plugin', activeMatch: '/tools/' },
      { text: '脚手架', link: '/scaffold/scaffoldYL', activeMatch: '/scaffold/' },
    ],

    sidebar: {
      '/frontend/': [
        {
          text: '前端',
          items: [
            { text: '常见正则', link: '/frontend/regexp' },
            { text: '无限滚动列表', link: '/frontend/slideScrollComp' },
            { text: '函数式编程入门', link: '/frontend/functional-programming' },
            { text: 'Vue 3', link: '/frontend/vue3' },
            { text: 'Rollup 配置', link: '/frontend/rollup' },
            { text: '前端监控', link: '/frontend/frontend-monitor' },
            { text: 'MaxCompute', link: '/frontend/MaxCompute' },
            { text: 'React Native 学习记录', link: '/frontend/reactNativeStudy' },
            { text: 'React Native 启动图片', link: '/frontend/reactNativeBootstrapScreen' },
            { text: 'React Native Android 打包', link: '/frontend/bootstrapSetting' },
            { text: 'Promise A+', link: '/frontend/promiseA' },
          ]
        }
      ],
      '/serverend/': [
        {
          text: '服务端',
          items: [
            { text: 'Node.js 一些知识', link: '/serverend/node-learn' },
            { text: 'nodeModulePaths 源码学习', link: '/serverend/nodeModulePaths' },
            { text: 'child_process 用法原理', link: '/serverend/node-child_process' },
            { text: 'inquirer 命令行交互原理', link: '/serverend/inquirerYL' },
            { text: 'MongoDB', link: '/serverend/MongoDB' },
            { text: 'Mongoose', link: '/serverend/Mongoose' },
            { text: '错误码设计原则', link: '/serverend/errorStatusCode' },
            { text: 'Redis', link: '/serverend/redis' },
            { text: 'OAuth2 完成用户登录', link: '/serverend/OAuth2' },
            { text: '阿里云 OSS', link: '/serverend/aliOss' },
            { text: '基于 RBAC 的权限验证', link: '/serverend/RBAC' },
            { text: 'Docker 简介', link: '/serverend/docker' },
            { text: 'Docker Compose', link: '/serverend/dockerCompose' },
            { text: '学习 YAML', link: '/serverend/YAML' },
            { text: 'Mock Server & HTML2Canvas', link: '/serverend/MockServer' },
            { text: 'Node 最佳实践', link: '/serverend/nodeBestPractice' },
            { text: 'JWT', link: '/serverend/JWT' },
          ]
        }
      ],
      '/jesttest/': [
        {
          text: '测试',
          items: [
            { text: '前端测试', link: '/jesttest/jestStudy' },
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具开发',
          items: [
            { text: 'VS Code 插件开发', link: '/tools/vscode-plugin' },
            { text: 'syncvsplugin 插件', link: '/tools/syncvsplugin' },
            { text: '谷歌插件开发', link: '/tools/google-plugin' },
            { text: 'GitLab Pages 部署', link: '/tools/gitlab-pages-deploy' },
            { text: '有用的 GIT 命令', link: '/tools/git-function' },
            { text: '绘图工具', link: '/tools/drawdoctool' },
            { text: 'Markdown 用法', link: '/tools/markdownYF' },
          ]
        }
      ],
      '/scaffold/': [
        {
          text: '脚手架',
          items: [
            { text: '脚手架开发', link: '/scaffold/scaffoldYL' },
            { text: '自研脚手架', link: '/scaffold/my-cli-dev' },
            { text: 'Commander', link: '/scaffold/commander' },
            { text: 'EJS 和 Glob 用法详解', link: '/scaffold/ejsAndGlob' },
            { text: 'EJS 源码详解', link: '/scaffold/ejsYL' },
            { text: 'Require 源码解析', link: '/scaffold/requireYL' },
            { text: '复用代码', link: '/scaffold/reuseCode' },
            { text: '脚手架发布架构设计', link: '/scaffold/myClidevPublish' },
            { text: 'GitFlow 模块架构设计', link: '/scaffold/gitFlowDesign' },
            { text: '组件平台架构设计', link: '/scaffold/componentPlatform' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nigel201611/vitepress-docs' }
    ]
  }
})
