# MongoDB 

##  MongoDB Installation

### Manual Installation

```bash
# Go to /usr/local, a common location for installing local software
cd /usr/local
# 1 Download
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.3.tgz
# 2 Extract the downloaded file
sudo tar -zxvf mongodb-macos-x86_64-5.0.3.tgz
# Create a database storage folder and set permissions
# Default location is /data/db
# macOS 10.15 cannot use this folder, create another one
mkdir -p /usr/local/var/mongodb
# 3 Run
# Enter the folder
cd mongodb-macos-x86_64-5.0.3/bin
./mongod --dbpath /usr/local/var/mongodb

# Add to global commands
# 4 Rename
sudo mv mongodb-macos-x86_64-5.0.3  /usr/local/mongodb
# 5 Add to $PATH environment variable
export PATH=/usr/local/mongodb/bin:$PATH
# 6 Run
mongod --dbpath /usr/local/var/mongodb

# Run in background
# 1 Create a log storage folder and set permissions
mkdir -p /usr/local/var/log/mongodb
# 2 mongod parameters
--dbpath sets the data storage location
--logpath specifies the log file path
--fork runs in the background
# 3 Check if mongo is running
ps aux | grep mongod

# Using a configuration file
[Documentation](https://docs.mongodb.com/manual/reference/configuration-options#std-label-configuration-options)
[Mapping between command-line tool parameters and configuration file](https://docs.mongodb.com/manual/reference/configuration-file-settings-command-line-options-mapping#std-label-conf-file-command-line-mapping)
# Configuration example
systemLog:
  destination: file
  path: "/usr/local/var/log/mongodb/mongod.log"
  logAppend: true
storage:
  dbPath: "/usr/local/var/mongodb"
processManagement:
  fork: true
# Start with configuration
mongod --config /usr/local/etc/mongo.conf
```

### Installing via Homebrew

```bash
# https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
# Download the homebrew formula
brew tap mongodb/brew
# Download
brew install mongodb-community@5.0
# Run
brew services start mongodb-community@5.0
# Stop
brew services stop mongodb-community@5.0
# You can also use the binary directly
```

### Adding mongodb as a Global Command

```bash
# macOS system, my terminal uses zsh, so configured in .zshrc
# Add the following line at the bottom, specifying the bin path where mongodb is installed
export PATH=${PATH}:/usr/local/mongodb/bin
```

###  Mongo Shell

```bash
# Run mongo shell
mongo
# List all databases in the current instance
> show dbs;
admin   0.000GB
config  0.000GB
local   0.000GB
# View the current database
> db;
test
# Switch database, use use + new database name to create one
> use hello
# View collections in the current database
> show collections
# Insert data into a specific collection, db refers to the current database; if the collection does not exist, it will be created automatically
> db.user.insertOne({ name: 'viking' })
# Find data, you can enter specific conditions in parentheses
> db.user.find()
> db.user.find({ name: 'viking' })
# Update data
> db.user.update({ name: 'viking'}, {name: 'lucy'})
# Delete data
> db.user.deleteOne({name: 'lucy'})
# Exit the interactive interface
> exit 

```

### MongoDB GUI Tools

* Official MongoDB Compass https://docs.mongodb.com/compass/current/
* Robo 3T: https://robomongo.org/

### MongoDB with Node.js
Documentation: https://docs.mongodb.com/drivers/node/current/quick-start/
```bash
# Create a new project
mkdir learn-mongo & cd learn-mongo
# Install the driver
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

* MongoDB commands list: https://docs.mongodb.com/manual/reference/command/
* Documentation on the Cursor object returned by queries: https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/cursor/

#### Querying

* Query condition documentation: https://docs.mongodb.com/drivers/node/current/fundamentals/crud/query-document/
* All operator reference documentation:
https://docs.mongodb.com/manual/reference/operator/query/

```bash
// Comparison Operators
(>) greater than - $gt
(<) less than - $lt
(>=) greater than or equal - $gte
(<= ) less than or equal - $lte
(===) equal - $eq
(!==) not equal - $neq
// Format
{ age: { $gt : 30 } }

// Logical Operators
Logical AND - add multiple conditions directly in the object, $and
Logical OR - $or

// Format
{  age: { $gte: 30 }, name: 'james' }
// Equivalent to
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
$exists: check if a property exists
$type: data type, all types list: https://docs.mongodb.com/manual/reference/operator/query/type/#available-types
Format: { $exists: true }
{ $type: 'string'}

```

#### Updating

Documentation: https://docs.mongodb.com/drivers/node/current/fundamentals/crud/write-operations/change-a-document/

** Update Operators **

```bash
$set - replaces the value of a field with a specified one
$inc - increments or decrements field values
$rename - renames fields
$unset - removes fields
$mul - multiplies a field value by a specified number

```
#### Update Format

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

#### Array Update Methods

Array operator documentation: https://docs.mongodb.com/manual/reference/operator/update-array/

Array query and update based on matched elements:

Query array documentation: https://docs.mongodb.com/manual/tutorial/query-arrays/


### MongoDB Indexes and Aggregation

##### Index

An index improves query efficiency.
MongoDB's file type: BSON (Binary JSON), mainly used as the data storage and network transmission format in MongoDB databases.

Without an index, MongoDB must scan every document in a collection to find matching records, which is inefficient.

An index is a special data structure that stores data in an easily traversable form.

#### Index Pros and Cons

* Disadvantage: Indexes increase the cost of write operations
* Advantage: High query efficiency
#### Aggregation (aggregate)
Aggregation operations group values from multiple documents and can perform various operations on grouped data to return corresponding results.

#### Common Aggregation Operators

* $group: Groups documents in a collection, useful for statistics
* $match: Filters data, only outputs documents that match the criteria
* $project: Modifies the structure of input documents (e.g., renaming, adding, removing fields, creating computed results)
* $sort: Sorts results before output
* $limit: Limits the number of results output by the pipeline
* $skip: Skips a specified number of results and returns the rest
#### Group Format

Documentation: https://docs.mongodb.com/manual/reference/operator/aggregation/group/#std-label-accumulators-group

```js
{
  $group:
    {
      _id: <expression>, // Group By Expression
      <field1>: { <accumulator1> : <expression1> },  // New field1
      ...
    }
 }
```

#### Accumulator Operators

* $sum: Calculates the sum, {$sum: 1} returns the total count, use { $sum: '`<field>`' } to get the sum of a specified field's values
* $avg: Calculates the average
* $min: Finds the minimum value
* $max: Finds the maximum value
* $push: Inserts values into an array in the result document
* $first: Gets the first document data based on sorting
* $last: Similarly, gets the last data
  
Using $lookup for multi-collection queries
Documentation: https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/

#### $Lookup Format

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


#### Summary
![](/images/mongodb2.png)
