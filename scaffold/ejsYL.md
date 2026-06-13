# ejs Source Code Analysis

## ejs Execution Flow

<br/>
<img src="/images/ejsYL.jpg" alt="ejs execution flow">

* new Template: Initialize the Template object
* compile: Compile the Template and return a new Function, requiring the `data` parameter to render the template