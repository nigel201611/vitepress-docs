# Node.js Best Practices
>Full article: https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md

## Project Structure Best Practices
### Split Modules
Splitting principles:
* Split by business
* Split by technology

### Layered Design

Layered business processing, using GitFlow as an example:
* Publish
* Git
* GitServer
* CloudBuild


### Encapsulate Common Modules as NPM Packages

* Refer to Lerna source code design
* Link local modules via file or npm link
* Control granularity, design splitting principles
Configuration files
* Keep configuration files separate
* Use environment variables wisely to share configuration
* Keep password files separate from source code commits
* Use dotenv or config to manage environment variables or configuration files
## Exception Handling Best Practices
Use async await or promise, avoid callbacks

Recommended:
```js
doWork()
 .then(doWork)
 .then(doOtherWork)
 .then((result) => doWork)
 .catch((error) => {throw error;})
 .then(verify);

(async function() {
  try {
    await doWork();
    const result = await doOtherWork();
    await doWork(result);
  } catch(e) {
    throw e;
  } finally {
    verify();
  } 
})();
```
Not recommended:
```js
getData(someParameter, function(err, result){
    if(err != null)
      // do something like calling the given callback with the error
      getMoreData(a, function(err, result){
        if(err != null)
          // do something like calling the given callback with the error
          getMoreData(b, function(c){ 
            getMoreData(d, function(e){ 
              if(err != null)
                // you get the idea?
    });
});
```
## Coding Style Practices
* Use ESLint
* Node.js-specific plugins
* Start code block braces on the same line
* Name your methods
* Naming conventions for variables, constants, functions, and classes
* Use const over let, deprecate var
* Require at the top, not inside methods
* Require folders, not files
* Use the === operator
* Use Async/Await, avoid callbacks
* Use arrow functions (=>)
* Testing and overall quality practices
* At minimum, write API (component) tests
* Use a linter to detect code issues
* Regularly check for vulnerable dependencies
* Check for outdated dependency packages
## Production Practices
* Monitor!
* Use smart logging for transparency
* Delegate everything possible (e.g., gzip, SSL) to a reverse proxy
* Lock dependencies
* Utilize CPU multi-core
* Manage frontend resources outside of Node
* Set NODE_ENV=production
## Security Best Practices
* Adhere to linter security guidelines
* Use middleware to limit concurrent requests
* Separate secrets from configuration files or use packages to encrypt them
* General security best practices collection
* Adjust HTTP response headers to enhance security
* Regularly and automatically check for vulnerable dependencies
* Avoid using Node.js's crypto library for passwords; use Bcrypt
* Escape HTML, JS, and CSS output
* Validate incoming JSON schemas
* Run Node.js as a non-root user
* Avoid JavaScript eval statements
* Run unsafe code in a sandbox
* Be extra careful when using child processes
* Avoid unsafe redirects
* Avoid publishing secrets to NPM registry
