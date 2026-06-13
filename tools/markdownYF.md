# Markdown

## Generate Flowcharts

```
tag=>type: content:>url
```
tag: Element name,
type: The type of this element, which can be:
* start
* end
* operation
* subroutine
* condition
* inputoutput
url is a link bound to the text in the box. content is the text written inside the box. Note that there must be a space between the colon after type and the content text.

Syntax for connecting elements:
Use `->` to connect two elements. Special note for the condition type, since it has yes and no branches, it should be written as:
```
cond(yes)->e 
cond(no)->op
```
Example:
```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```

## Generate Directory Structure

1. npm install mddir --save
2. Open the terminal or command prompt and cd into the mddir module/src folder
3. Run node mddir "../../../"

The result will generate a markdown file structure 'directoryList.md'
