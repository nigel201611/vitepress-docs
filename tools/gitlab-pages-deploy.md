# GitLab Pages Deployment

The core lies in whether the `.gitlab-ci.yml` file exists. For file syntax and usage, it's recommended to check the GitLab documentation. Using a shared runner is sufficient. Shared runners have a CI/CD maximum limit, apparently 3000 times per month, which is generally enough.

The following `.gitlab-ci.yml` file is what the author used when deploying their tech blog.

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
The following is a `.gitlab-ci.yml` file the author once wrote for automatically publishing an npm package.

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
