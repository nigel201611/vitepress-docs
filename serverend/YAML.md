# Learning YAML

>YAML (YAML Ain't a Markup Language) is a markup language that uses spaces for indentation. It looks very concise, has excellent readability, and is well-suited for content outlines and configuration files.

```js
# document start
# scalars - indivisible quantities
key: value
a_number_value: 100
boolean: true
# Strings do not need quotes, but using them won't cause errors
quote_string: 'quote string'
# Multi-line strings can use a literal block, i.e., the pipe character
multi_line_string: |
  line one 
  line two
  line three
# COLLECTION TYPES
# Use indentation to indicate hierarchy, preferably two spaces
# It doesn't have to be two spaces; alignment is what matters
person:
  name: viking
  age: 30
  address:
    city: 'shanghai'
# Sequences (arrays or lists)
hobbies:
  - Item 1
  - Item 2
  - name: 'weson'
    value: 'xyz'

```

YAML syntax checker: https://yamlchecker.com/

## GitHub Actions

>GitHub Actions https://docs.github.com/en/actions

<img src="/images/githubActions.png">

### Workflow

https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#workflows

A Workflow is a configurable automated process that can contain multiple jobs. It is defined by a YAML file in the repo (.github/workflows/xx.yml). A repo can have multiple workflows.

### Events

An Event is a specific activity that triggers a workflow, such as a pull request, push, or issue. It can also be fully customized. For a complete list, see: https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows

### Jobs

A Job is a set of executable steps within a Workflow. Each Job runs on the same runner (a special virtual machine hosted by GitHub that supports various operating systems). Each step is either a shell script or an executable action. Steps are executed sequentially and depend on each other.

### Actions

An Action is a custom application in GitHub Actions that can run a series of complex and common tasks. Using actions helps reduce repetitive code in workflows. GitHub provides many commonly used actions, which can be found here: https://github.com/marketplace?type=actions. You can also write your own actions.

### Using GitHub Secrets

Documentation: https://docs.github.com/en/actions/security-guides/encrypted-secrets

### Using ssh-action for Remote Login

Documentation: https://github.com/appleboy/ssh-action


### Improving the Current Deployment Process

Current online update process

```js
# After each code update, log in to the SSH server
# Stop the service
docker-compose down
# Update code
git pull
# If .env is updated, recreate the .env file
# Rebuild the application image
docker-compose build xxx-backend
# Restart the service
docker-compose up -d

```

### Issues with the Current Approach

* Initial deployment and updates are two separate steps
* Initial deployment requires special operations, i.e., the previously manual deployment process
  * Clone code
  * Set environment variables .env
  * docker-compose up -d
* Desired outcome: Each commit can automatically deploy to any server in one step, achieving both initial startup and updates. This is a perfect DevOps workflow.

### Solution
```yaml
# Current approach
services:
    xxx-redis:
        image: redis:6
    xxx-mongo:
        image: mongo:latest
    xxx-backend:
        image: xxx-backend
        # We need to manually build the image each time, meaning the image only exists locally
        build:
            context: . 
            dockerfile: Dockerfile
```
### Better Solution

```yaml
# Better approach
# No files in the codebase are needed, only a docker-compose.yml file
# Can easily run on any server
services:
    xxx-redis:
        image: redis:6
    xxx-mongo:
        image: mongo:latest
    xxx-backend:
        # No need to build; instead, it exists on Docker Hub and can be pulled directly each time
        image: xxx-backend:1.0.1

```

### Alibaba Cloud Container Registry (ACR)

URL: https://www.aliyun.com/product/acr
Personal edition is completely free

### Pushing Images to ACR

```bash
# Go to the image repository's basic information page
# Login
docker login --username=your-username registry.cn-hangzhou.aliyuncs.com
# Two ways to tag: 1 use tag during build
docker build --tag "registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:[image-version]" .
# 2 tag an already built image
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:[image-version]
# Check if the image was built successfully
docker images
# Push the image
docker push registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:[image-version]
# Check on the Alibaba Cloud ACR interface to confirm it exists

```

## GitHub Actions Automated Deployment

### Two Main Steps

* Build the image on the runner and push it
* Use the docker-compose-online file to run the application on the server
  
Step 1 Detailed Flow (on GitHub runner)

* Checkout code
* Create .env file and add two environment variables (upload to OSS requires two corresponding pieces of info)
* Login to Alibaba Cloud ACR Docker
* Docker build with the correct Alibaba Cloud tag
* How to generate a unique tag for each push? This is a follow-up question
* docker push

```yaml
name: build image, push to ACR
on: [push]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      # checkout code
      - uses: actions/checkout@v2
      # create env file
      - run: touch .env
      - run: echo ALC_ACCESS_KEY=${{ secrets.ALC_ACCESS_KEY }} >> .env
      - run: echo ALC_SECRET_KEY=${{ secrets.ALC_SECRET_KEY }} >> .env
      # Login to Aliyun Container Registry (ACR)
      - name: Login to Aliyun Container Registry (ACR)
        uses: aliyun/acr-login@v1
        with:
          login-server: https://registry.cn-hangzhou.aliyuncs.com
          region-id: cn-hangzhou
          username: "${{ secrets.ACR_USERNAME }}"
          password: "${{ secrets.ACR_PASSWORD }}"
      # Build image with the correct Alibaba Cloud tag
      - name: Build image for Docker
        run: docker build --tag "registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:0.0.2" .
      - name: Push Image to ACR
        run: docker push registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:0.0.2  
```
  
Step 2 Detailed Flow (deploy and run on the server)

* Checkout code
* Create .env file, add multiple environment variables (all needed by the application)
* Create folder, copy the following files into it:
  .env
  docker-compose-online.yml
  mongo-entrypoint folder
* Copy the new folder to the server (SCP)
* Use https://github.com/appleboy/scp-action
* SSH into the server
* Login to Alibaba Cloud ACR
* Enter the copied folder
* Stop service: docker-compose down (won't error on first run if not started)
* Start service: docker-compose up
* Optional cleanup for security (delete .env file, logout Docker account)

```yaml
name: Deploy app to server
on: [push]
jobs:
  deploy-and-restart:
    runs-on: ubuntu-latest
    steps:
      # checkout code
      - uses: actions/checkout@v2
      # create env file
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
      # copy necessary files into one folder, including .env, docker-compose-online.yml, mongo-entrypoint
      - name: 'copy necessary files in to one folder'
        run: |
          mkdir xxx-backend
          cp .env docker-compose-online.yml xxx-backend
          cp -r mongo-entrypoint xxx-backend
          ls -a xxx-backend
      # copy folder to server via scp
      - name: 'copy xxx-backend folder via scp'
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          source: 'xxx-backend'
          target: '~'
      # SSH into the server and restart the service
      - name: executing ssh and restart docker
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          script_stop: true
          # * Login to Alibaba Cloud ACR
          # Stop service: docker-compose down
          # Start service: docker-compose up 
          # Cleanup
          script: |
            docker login --username=${{secrets.ACR_USERNAME}} --password=${{secrets.ACR_PASSWORD}} registry.cn-hangzhou.aliyuncs.com
            cd ~/xxx-backend/
            docker-compose -f docker-compose-online.yml down
            docker-compose -f docker-compose-online.yml up -d
            rm -rf .env
            docker logout registry.cn-hangzhou.aliyuncs.com
```
  

Prerequisites before combining the two steps

* Not every commit needs to build and deploy; only release on specific occasions.
* Use commit-specific information as the tag when building images.
* Common practice: deploy when there's a commit or merge to main/master. The most common approach is using tags, as seen in Travis CI for publishing component libraries. Tags are the best practice for versioning.
* You can use commit-specific markers as the image tag. If you use tag-based publishing, use the tag; otherwise, you can use the commit ID.
  
Tasks for this lesson

* Trigger the corresponding job only when pushing tags
https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows
* How to get the commit-specific information for each push
https://docs.github.com/en/actions/learn-github-actions/contexts
* Use this information to replace the version in docker-compose-online.yml with the version being built
https://github.com/marketplace/actions/find-and-replace
* Use Release-it to automatically fill deployment info

>Currently, we need to manually update tags and package.json info, which is time-consuming and error-prone. Use a tool to standardize this process: Release-it, https://github.com/release-it/release-it


```yaml
name: Auto-deploy new version to server
# Triggered when a specific tag is pushed
on:
  push:
    tags:
      - 'v*.*.*'
jobs:
  publish-release:
    runs-on: ubuntu-latest
    steps:
      # checkout code
      - uses: actions/checkout@v2
      # create env file
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
      # Login to Aliyun Container Registry (ACR)
      - name: Login to Aliyun Container Registry (ACR)
        uses: aliyun/acr-login@v1
        with:
          login-server: https://registry.cn-hangzhou.aliyuncs.com
          region-id: cn-hangzhou
          username: "${{ secrets.ACR_USERNAME }}"
          password: "${{ secrets.ACR_PASSWORD }}"
      # Docker build with the correct GitHub tag mapped to ACR tag
      - name: Build image for ACR docker
        run: docker build --tag "registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:${{github.ref_name}}" .
      # Push with the tag
      - name: Push Image to ACR
        run: docker push registry.cn-hangzhou.aliyuncs.com/vikingmute/xxx:${{github.ref_name}} 
      # Find docker-compose-online file and replace version
      - name: Find and Replace
        uses: jacobtomlinson/gha-find-replace@v2
        with: 
          find: "{{tag}}"
          replace: ${{github.ref_name}}
          include: "docker-compose-online.yml"
      - run: cat docker-compose-online.yml
      # Copy necessary files into one folder, including .env, docker-compose-online.yml, mongo-entrypoint
      - name: 'copy necessary files in to one folder'
        run: |
          mkdir xxx-backend 
          cp .env docker-compose-online.yml xxx-backend
          cp -r mongo-entrypoint xxx-backend
          ls -a xxx-backend
      # Copy folder to server via scp
      - name: 'copy xxx-backend folder via scp'
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          source: 'xxx-backend'
          target: '~'
      # SSH into the server and restart the service
      - name: executing ssh and restart docker
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PWD }}
          script_stop: true
          # * Login to Alibaba Cloud ACR
          # Stop service: docker-compose down
          # Start service: docker-compose up 
          # Cleanup
          script: |
            docker login --username=${{secrets.ACR_USERNAME}} --password=${{secrets.ACR_PASSWORD}} registry.cn-hangzhou.aliyuncs.com
            cd ~/xxx-backend/
            docker-compose -f docker-compose-online.yml down
            docker-compose -f docker-compose-online.yml up -d
            rm -rf .env
            docker logout registry.cn-hangzhou.aliyuncs.com 

```
