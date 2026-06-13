# ejs and glob Usage Details

## ejs Usage

### Three Ways to Use ejs Templates
```js
let template = ejs.compile(str, options);
template(data);
// => Outputs the rendered HTML string
ejs.render(str, data, options);
// => Outputs the rendered HTML string
ejs.renderFile(filename, data, options, function(err, str){
    // str => Outputs the rendered HTML string
});
```
### Tag Meaning
```bash
<% 'Script' tag, used for flow control, no output.
<%_ Delete preceding whitespace
<%= Output data to template (output escapes HTML tags)
<%- Output unescaped data to template
<%# Comment tag, no execution, no output
<%% Output string '<%'
%> General end tag
-%> Delete following newline
_%> Delete whitespace after the end tag
```
### Includes

```js
<%- include('header', { header: 'header' }); -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer', { footer: 'footer' }); -%>

```

### Custom Delimiters

```js
let ejs = require('ejs'),
    users = ['geddy', 'neil', 'alex'];

// Single template file
ejs.render('<?= users.join(" | "); ?>', {users: users},
    {delimiter: '?'});
// => 'geddy | neil | alex'

// Global
ejs.delimiter = '$';
ejs.render('<$= users.join(" | "); $>', {users: users});
// => 'geddy | neil | alex'

```

### Custom File Loader

```js
let ejs = require('ejs');
let myFileLoader = function (filePath) {
  return 'myFileLoader: ' + fs.readFileSync(filePath);
};

ejs.fileLoader = myFileLoad;
```

## glob Usage

> Reference npm repo: https://www.npmjs.com/package/glob

### Matching Rules
Different language glob libraries may support slightly different rules. Below are the matching rules for node-glob.
1. `*` Matches any 0 or more characters
2. `?` Matches any single character
3. `[...]` Matches if the character is inside the brackets. If starting with `!` or `^`, matches if the character is NOT inside the brackets
4. `!(pattern|pattern|pattern)` Matches if none of the patterns in parentheses are satisfied
5. `?(pattern|pattern|pattern)` Matches if 0 or 1 of the patterns in parentheses are satisfied
6. `+(pattern|pattern|pattern)` Matches if 1 or more of the patterns in parentheses are satisfied
7. `*(a|b|c)` Matches if 0 or more of the patterns in parentheses are satisfied
8. `@(pattern|pat*|pat?erN)` Matches if exactly 1 of the patterns in parentheses is satisfied
9. `**` Matches any characters across path segments

