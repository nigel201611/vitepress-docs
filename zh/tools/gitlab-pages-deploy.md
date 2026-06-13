# GitLab Pages 部署

核心在于.gitlab-ci.yml文件是否存在，文件语法和用法建议去GitLab文档查看，使用共享runner就足够了。共享runner会有CI/CD最大限制，貌似一个月3000次，一般也够用了。

下面.gitlab-ci.yml文件，是作者部署技术博客时使用的

```bash

image: node:14-buster

cache:
  key: $CI_COMMIT_REF_SLUG
  paths:
    - node_modules/

pages:
  stage: deploy
  only:
  - master

  script:
  - yarn --frozen-lockfile
  - yarn docs:build --dest public

  artifacts:
    paths:
      - public

```
下面一个是作者曾写过自动发布到npm包模块的 .gitlab-ci.yml文件

```bash
image: node:latest
before_script:
  - npm ci --cache .npm --prefer-offline

cache:
  key: $CI_COMMIT_REF_SLUG
  paths:
    - .npm/

deploy-job:
  only:
    - master
  interruptible: true
  artifacts:
    name: "$CI_JOB_NAME"
    paths:
      - dist/
  stage: deploy
  script:
    - npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
    # - echo '//registry.npmjs.org/:_authToken=$NPM_TOKEN'>.npmrc
    # - cat .npmrc
    - npm publish --verbose

```

