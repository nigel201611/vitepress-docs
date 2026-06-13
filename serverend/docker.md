# Docker Introduction

We want a tool that can help us with one-click intelligent deployment. If you need to deploy on multiple different machines, you no longer have to worry about differences in operating systems, versions, or the pain of installing various software before running.

## Solution

The popular virtualization software: Docker https://www.docker.com/

## Docker Evolution

<img src="/images/docker.png">

* Traditional virtual machines virtualize hardware and then need to install a complete operating system on top.
* Docker: Introduced the concept of containers. Each container does not need to install a complete operating system. Processes inside run directly in the host kernel created by Docker, without virtualizing hardware.

## Docker Advantages

* Faster startup speed
* Less resource usage
* Consistent running environment
* Microservices architecture; Docker is naturally suited for microservices

## Download and Use Docker

>Download link: https://www.docker.com/products/docker-desktop

## Docker Images

You can get various official images at https://hub.docker.com/search?q=&type=image, and you can also upload your own custom images.

The command to pull images from a Docker registry is `docker pull`.

```js
# Download image 
docker pull <image-name>:<tag>
# List downloaded images
docker images
# Delete image
docker rmi <image-id>
# Push image
docker push <username>/<repository>:<tag>
```
Using a registry mirror
```js
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn/",
    "https://reg-mirror.qiniu.com"
  ]
```
## Docker Container

Start a Docker container
```js
docker run -d -p 81:80 --name container-name image-name
# -d run in background
# -p port mapping, 81 is the host port, 80 is the container port
# --name custom container name
# image-name image name; if not available locally, Docker will automatically pull it first
```
Other commands
```js
# List all containers
docker ps
# Stop container
docker stop container-id
# Remove container 
docker rm container-id
# Start a stopped container
docker container start container-id
```

Enter a container
```js
docker exec -it <container-id> command
-i : Keep STDIN open even if not attached
-t : Allocate a pseudo-TTY
```

## Persisting Container Data

Use the -v parameter

```js
docker run -d -p 81:80 -v host:container image-name
```

Create a volume

```js
# Create
docker volume create <volume-name>
# Start with volume
docker run -d -v <volume-name>:/data/db mongo
# Inspect
docker volume inspect <volume-name>
# Remove
docker volume rm <volume-name>
```

## Using Dockerfile to Create Custom Images

A Dockerfile is a special text file containing a series of instructions used to build an image.
**All instructions**
https://docs.docker.com/engine/reference/builder/#from
```js
# Specify base image, build from node14
FROM node:14
# Create the corresponding folder as the project's working directory
RUN mkdir -p /usr/src/app
# Set working directory, all subsequent commands will run in this directory
WORKDIR /usr/src/app
# Copy files from local to the working directory
COPY server.js /usr/src/app
# Inform that this Docker image exposes port 3000
EXPOSE 3000
# Execute startup command, only one CMD per Dockerfile
CMD node server.js

```

## Docker build - Building Custom Images

```js
# Pay special attention to the context concept; do not use Dockerfile in the root directory
docker build [options] <context-path/URL/-> 
```

## Communication Between Multiple Containers

>Principle: Each container in Docker should do one thing and do it well

Advantages:

* Decoupling: Different services and backend code are completely separated, making management and future expansion easier.
* Service updates and upgrades are completely independent.
* Starting multiple different processes in one container requires a process manager.
