# MongoDB 

##  MongoDB 安装

### 手动安装

```bash
# 进入 /usr/local 安装本地软件的常用位置
cd /usr/local
# 1 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.3.tgz
# 2 解压对应的下载文件
sudo tar -zxvf mongodb-macos-x86_64-5.0.3.tgz
# 创建数据库存放文件夹以及设定权限，特别注意权限问题
# 默认是在 /data/db
# macos 10.15 不能使用这个文件夹，创建一个其他的文件夹
mkdir -p /usr/local/var/mongodb
# 3 运行
# 进入文件夹
cd mongodb-macos-x86_64-5.0.3/bin
./mongod --dbpath /usr/local/var/mongodb

# 添加到全局命令
# 4 重命名
sudo mv mongodb-macos-x86_64-5.0.3  /usr/local/mongodb
# 5 添加到 $PATH 环境变量
export PATH=/usr/local/mongodb/bin:$PATH
# 6 运行
mongod --dbpath /usr/local/var/mongodb

# 后台运行
# 1 创建日志存放文件夹以及设定权限
mkdir -p /usr/local/var/log/mongodb
# 2 mongod 的参数
--dbpath 可以设定数据存放的位置
--logpath 配置文件地址
--fork 后台运行
# 3 查看 mongo 是否启动
ps aux | grep mongod

# 使用配置文件
[文档地址](https://docs.mongodb.com/manual/reference/configuration-options#std-label-configuration-options)
[命令行工具参数和配置文件的对应关系](https://docs.mongodb.com/manual/reference/configuration-file-settings-command-line-options-mapping#std-label-conf-file-command-line-mapping)
# 配置示例
systemLog:
  destination: file
  path: "/usr/local/var/log/mongodb/mongod.log"
  logAppend: true
storage:
  dbPath: "/usr/local/var/mongodb"
processManagement:
  fork: true
# 使用配置启动
mongod --config /usr/local/etc/mongo.conf
```

### homebrew 进行安装 

```bash
# https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
# 下载 homebrew 的 formula
brew tap mongodb/brew
# 下载
brew install mongodb-community@5.0
# 运行
brew services start mongodb-community@5.0
# 停止
brew services stop mongodb-community@5.0
# 也可以直接使用二进制命令进行运行
```

### mongodb 添加为全局命令

```bash
# MACOS 系统，本人终端是 zsh,所以在 .zshrc 里配置
# 在底部添加如下语句，添加安装 mongodb 所在bin路径
export PATH=${PATH}:/usr/local/mongodb/bin
```

###  Mongo Shell

```bash
# 运行 mongo shell
mongo
# 查看当前实例所有数据库
> show dbs;
admin   0.000GB
config  0.000GB
local   0.000GB
# 查看当前使用的数据库
> db;
test
# 切换数据库,直接 use + 新的数据库名称 就可以新建
> use hello
# 查看当前数据库中的集合（collections）
> show collections
# 在特定 collections 插入数据，db 指的是当前数据库，不存在 collection 名称的时候会自动插入
> db.user.insertOne({ name: 'viking' })
# 查找数据, 括号中可以输入特定条件
> db.user.find()
> db.user.find({ name: 'viking' })
# 更新数据
> db.user.update({ name: 'viking'}, {name: 'lucy'})
# 删除数据
> db.user.deleteOne({name: 'lucy'})
# 退出交互界面
> exit 

```

### MongoDB GUI 工具

* 官方的 MongoDB Compass https://docs.mongodb.com/compass/current/
* Robo 3T:https://robomongo.org/

### MongoDB 结合 Node.js
文档地址：https://docs.mongodb.com/drivers/node/current/quick-start/
```bash
# 创建一个新的项目
mkdir learn-mongo & cd learn-mongo
# 安装 dirver
npm install mongodb --save
```

```js
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
```

* MongoDB 的 commands 列表：https://docs.mongodb.com/manual/reference/command/
* 关于查询返回的 Cursor 对象的文档：https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/cursor/

#### 查询

* Query 条件查询文档：https://docs.mongodb.com/drivers/node/current/fundamentals/crud/query-document/
* 所有的操作符参考文档：
https://docs.mongodb.com/manual/reference/operator/query/

```bash
// Comparison Operators 比较操作符
(>) 大于 - $gt
(<) 小于 - $lt
(>=) 大于等于 - $gte
(<= ) 小于等于 - $lte
(===) 等于 - $eq
(!==) 不等于 - $neq
// 格式
{ age: { $gt : 30 } }

// Logical Operators 逻辑操作符
逻辑与 - 直接对象中添加多个条件即可, $and
逻辑或 - $or

//格式
{  age: { $gte: 30 }, name: 'james' }
// 等于
{
   $and: [
      { age: { $gte: 30 } },
      { name: 'james' }
   ]
}
{
   $or: [
      { age: { $gte: 30 } },
      { name: 'xiaobao' }
   ]
}
// Element Operators
$exists: 判断属性是否存在
$type： 数据类型 所有 types 列表：https://docs.mongodb.com/manual/reference/operator/query/type/#available-types
格式：{ $exists: true }
{ $type: 'string'}

```

#### 更新

文档地址：https://docs.mongodb.com/drivers/node/current/fundamentals/crud/write-operations/change-a-document/

** Update 操作符 **

```bash
$set - replaces the value of a field with a specified one, 改变对应的值
$inc - increments or decrements field values，增加或者减少对应的数字
$rename - renames fields 重命名
$unset - removes fields 删除对应的 key
$mul - multiplies a field value by a specified number 乘法

```
#### Update 格式

```bash
{
   <update operator>: {
      <field> : {
         ...
      },
      <field> : {
      }
   },
   <update operator>: {
      ...
   }
}

```

#### 数组更新的方式

数组操作符文档：https://docs.mongodb.com/manual/reference/operator/update-array/

数组检索以及根据检索元素进行更新

query 数组文档：https://docs.mongodb.com/manual/tutorial/query-arrays/


### MongoDB 索引以及聚合

##### 索引

索引(Index)，为了提高查询效率
MongoDB 的文件类型：BSON， Binary JSON，主要被用作MongoDB数据库中的数据存储和网络传输格式。

假如没有索引，必须扫描这个巨大BSON对象集合中的每个文档并选取那些符合查询条件的记录，这样是低效的。

索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中。

#### 索引优缺点

* 缺点 索引会增加写操作的代价
* 优点 查询效率高
#### 聚合 (aggregate)
聚合操作将来自多个文档的值组合在一起，并且可以对分组数据执行各种操作以返回相应的结果。

#### 聚合常用操作符

* $group 将collection中的document分组，可用于统计结果
* $match 过滤数据，只输出符合结果的文档
* $project 修改输入文档的结构(例如重命名，增加、删除字段，创建结算结果等)
* $sort 将结果进行排序后输出
* $limit 限制管道输出的结果个数
* $skip 跳过制定数量的结果，并且返回剩下的结果
#### Group 的书写格式

文档：https://docs.mongodb.com/manual/reference/operator/aggregation/group/#std-label-accumulators-group

```js
{
  $group:
    {
      _id: <expression>, // Group By Expression
      <field1>: { <accumulator1> : <expression1> },  // 新增 field1
      ...
    }
 }
```

#### 表达式操作符 (accumulator)

* $sum 计算总和，{$sum: 1}表示返回总和×1的值(即总和的数量),使用
{ $sum: '指定字段' // 也能直接获取指定字段的值的总和 }
* $avg 求平均值
* $min 求min值
* $max 求max值
* $push 将结果文档中插入值到一个数组中
* $first 根据文档的排序获取第一个文档数据
* $last 同理，获取最后一个数据
  
使用 $lookup 进行多集合查询
文档地址：https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/

#### $Lookup 的格式

```js
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}


```


#### 总结
![](/images/mongodb2.png)
