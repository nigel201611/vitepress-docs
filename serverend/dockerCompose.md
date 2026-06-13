# Docker Compose
>Docker Compose is a tool officially released by Docker for managing and sharing multi-container applications.

## Installation

If you install the Docker client on Mac and Windows, Docker Compose is automatically installed.
```js
docker-compose version
```
## Configuration

Docker Compose uses a special YML file for configuration. This file must be named `docker-compose.yml`.

Reference for all docker-compose fields: https://docs.docker.com/compose/compose-file/compose-file-v3/

```js
version: '3'
services:
  xxx-mongo:
    image: mongo
    container_name: lego-mongo
    volumes:
      - '.docker-volumes/mongo/data:/data/db'
      - '$PWD/mongo-entrypoint/:/docker-entrypoint-initdb.d/'
    ports:
      - 27017:27017
    env_file:
      - .env
  xxx-redis:
    image: redis:6
    container_name: lego-redis
    command: >
      --requirepass ${REDIS_PASSWORD}
    ports:
      - 6379:6379
    env_file:
      - .env
  xxx-backend:
    depends_on:
      - xxx-mongo
      - xxx-redis
    build:
      context: . # current directory
      dockerfile: Dockerfile # build based on Dockerfile
    image: xxx-backend
    container_name: xxx-backend
    ports:
     - 7001:7001
    env_file:
      - .env

```

## Start and Stop

```js
# Start
docker-compose up -d
# Stop
docker-compose down

```

## MongoDB User and Permission Management

Authorization documentation: https://docs.mongodb.com/manual/core/authentication/

Built-in Roles: https://docs.mongodb.com/manual/reference/built-in-roles/


### Steps After Initializing a New Database

* Create an admin-level root user / roles: root
* Create the corresponding database lego
* Create a database administrator xyz / roles: readWrite
* In the code, use the administrator xyz's username and password to connect to the database and perform operations.

### Initializing Database Data and Running Scripts

Database preparation

* Database configuration and initialization, such as inserting specific data
* Avoid using the root user to start the service to improve security

Special initialization database location: /docker-entrypoint-initdb.d

* mongoDB: https://hub.docker.com/_/mongo
* Postgres: https://hub.docker.com/_/postgres
* Note: The script will only run if the database has not been created yet, i.e., when the database folder is empty.


## Docker Mongo Environment Variables

```js
MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=pass
MONGO_DB_USERNAME=user
MONGO_DB_PASSWORD=pass
```

## Shell EOF << Usage

In Shell, EOF is commonly used with << to indicate that subsequent input serves as input for a sub-command or sub-shell until EOF is encountered, then returns to the calling Shell.

```js
#!/bin/bash

mongo <<EOF
use admin
db.auth('root', '123456')
use lego
EOF

```

## Docker Image Build Optimization

### Optimizing Image Size

What is Alpine Linux: https://alpinelinux.org/

Alpine Advantages

* Small
    * Default packages: alpine uses busybox
    * C runtime library: typically glibc, alpine uses musl
* Minimal dependencies, Simple
    * Many built-in software plugins are removed.
    * Internationalization content is removed.
* Secure

## Deploying to a Server

Install Docker

Ubuntu:

https://www.runoob.com/docker/ubuntu-docker-install.html

https://docs.docker.com/engine/install/ubuntu/

## Configuring User Groups

Since Docker is installed as root, regular users may get an error when executing Docker commands.
>Can't connect to docker daemon. Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock

You need to add the user to the Docker user group.
```js
# usermod command modifies user account
# -a --append -G --groups group name
sudo usermod -aG docker your-username
# If the group does not exist, add the docker group
sudo groupadd docker
# Check which groups a user belongs to
groups

```

### Add Registry Mirror

```js
# root
vim /etc/docker/daemon.json

{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn/",
    "https://reg-mirror.qiniu.com"
  ]
}

```

Run

```js
# Pull the latest code
git pull
# Check if the port is currently in use,
# if occupied, release the port
# or change the mapped port in docker-compose.yml
docker-compose up -d
```


