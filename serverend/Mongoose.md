# Mongoose
## What is Mongoose
### Problem
Using the ** native MongoDB Node.js driver **, the data structures and operations are too flexible.
Mongoose: https://mongoosejs.com/

* Built on top of the native MongoDB Node.js driver
* Introduces the concept of Model to constrain data structures in collections
* Many extended features
* It is an ODM (Object Document Mapping) tool.


## About ORM
>ORM stands for Object Relational Mapping
Simply put, ORM is a technique that uses the syntax of instance objects to perform relational database operations.

### Advantages

* No need to write obscure SQL statements.
* Operate data in an object-oriented way, with less code, good semantics, and easy to understand.
* Classes - Tables
* Instances (Objects) - Records (a row of data in a table)
* Attributes - Values in Records
* Built-in many features such as data validation, sanitization, preprocessing, etc.

### Example

```js
// Using SQL
let sql =
    "INSERT INTO Users (username, password) VALUES ('john-doe', 'oomygooturulob')";
conn.query(sql, function (error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});
// Using ORM
// Defining User model
const User = sequelize.define("User", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});
// Inserting user
User.create({
    username: "john-doe",
    password: "okbro",
}).then(function (user) {
    console.log(user);
}

```

>ODM is for NoSQL databases, focusing on document models

```js
const User = mongoose.model("User", {
    username: { type: String },
    password: { type: String },
});
// user object
const newUser = new User({
    username: "john-doe",
    password: "helloworld",
})
await newUser.save()

```
