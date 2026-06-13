# Mongoose
## 什么是 Mongoose
### 问题
使用 ** 原生的 mongoDB nodejs driver ** 数据结构以及操作过于灵活。
Mongoose：https://mongoosejs.com/

* 建立在 native mongoDB nodejs driver 之上
* 提出 Model，数据模型的概念，用来约束集合中的数据结构
* 非常多扩展的内容
* 它是一个 ODM（Object Document Mapping）工具。


## 谈谈 ORM
>ORM 指的是 Object Relational Mapping
简单说，ORM 就是通过实例对象的语法，完成关系型数据库的操作的技术。

### 优点

* 不需要再去写晦涩的 SQL 语句。
* 使用面向对象的方式操作数据，代码量少，语义性好，容易理解。
* Classes 类- Tables
* Objects 实例 - Records（表中的一行数据）
* Attributes 属性 - Records 中的值
* 内置很多功能，数据验证，清洗，预处理等等操作。

### 例子

```js
//使用 sql 操作
let sql =
    "INSERT INTO Users (username, password) VALUES ('john-doe', 'oomygooturulob')";
conn.query(sql, function (error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});
// 使用 ORM 进行操作
//Defining User model
const User = sequelize.define("User", {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
});
//Inserting user
User.create({
	username: "john-doe",
	password: "okbro",
}).then(function (user) {
	console.log(user);
}

```

>ODM 针对 noSql 数据库，关注文档模型

```js
const User = mongoose.model("User", {
	username: { type: String },
	password: { type: String },
});
//user object
const newUser = new User({
	username: "john-doe",
	password: "helloworld",
})
await newUser.save()

```