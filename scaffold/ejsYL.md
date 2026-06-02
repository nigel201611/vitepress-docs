# ejs源码详解

## ejs执行流程

<br/>
<img src="/images/ejsYL.jpg" alt="ejs执行流程">

* new Template：初始化 Template 对象
* compile：编译 Template，并返回一个新的 Function，需要传入 data 参数完成渲染模板