# Redis

## Phone Verification Code Login Feature

Check verification code

<img src="/images/genVeriCode.png">

Create user

<img src="/images/createByPhoneNumber.png">


## Verification Code Persistence

* Must be fast
* Simple to operate, key-value is best
* Has automatic expiration and deletion mechanism

## Using Redis

>Website: https://redis.io/
An open-source, high-performance key-value database.

### Features

* Runs in memory by default, can also persist to disk.
* Very high performance - Read: 110,000 ops/s, Write: 81,000 ops/s
* Supports more complex data structures: list, set, zset, hash, etc.
* Rich features - also supports atomic operations, publish/subscribe, notifications, key expiration, etc.


### Installing Redis

```bash
brew install redis
```
### Compile and Install from Source
```js
# Download
sudo curl -O https://download.redis.io/releases/redis-6.2.6.tar.gz
# Extract
sudo tar -zvxf redis-6.2.6.tar.gz
# To avoid using sudo often, modify folder permissions
# Change owner
# sudo chown -R liusha(username) redis-6.2.6
# Or modify permissions
# sudo chmod -R 777 redis-6.2.6
# Enter the folder
cd redis-6.2.6
# Compile
make
# Run
cd src
./redis-server
# Edit configuration file, can be placed anywhere, e.g., with mongo at /usr/local/etc
vim ../redis.conf
# Configure to run in background
daemonize yes
# Run with configuration file
./redis-server ../redis.conf
// Check background process
ps aux | grep redis
```
### Redis CLI
```js
# Basic syntax
COMMAND KEY_NAME(VALUE)
# String data type https://redis.io/commands#string
# Set
SET name viking
# Get
GET name
# Delete
DEL name

# List data type https://redis.io/commands#list
# Add to head
LPUSH software redis
LPUSH software mongo
# Add to tail
RPUSH software mysql
# Get range
LRANGE software 0 10
# Get length
LLEN software
# Remove one item
LPOP software
RPOP software
# Update
LSET software 1 mongoDB
# Delete entire list
DEL software
# Hash data type https://redis.io/commands#hash
# Set
HMSET person name "viking" age 30
# Get all
HGETALL person
HGET person name
# Update
HSET person name "lily"
# Delete
HDEL person name
```


### Redis Node.js Client

>Node.js clients: https://redis.io/clients#nodejs

### Top Choices
* ioredis: https://github.com/luin/ioredis
* node-redis: https://github.com/redis/node-redis
