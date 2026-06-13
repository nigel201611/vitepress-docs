# markdown

## 生成流程图

```
tag=>type: content:>url
```
tag：元素名字，
type：是这个元素的类型，分别为：
* start # 开始
* end # 结束
* operation # 操作
* subroutine # 子程序
* condition # 条件
* inputoutput # 输入或产出
url是一个连接，与框框中的文本相绑定，content就是在框框中要写的内容，注意type后的冒号与内容文本之间一定要有个空格。

连接元素的语法：
用->来连接两个元素，需要注意的是condition类型，因为他有yes和no两个分支，所以要写成
```
cond(yes)->e 
cond(no)->op
```
示例
```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```

## 生成目录结构

1. npm install mddir --save
2. 打开终端或命令提示符，并cd进入mddir模块/src文件夹
3. 执行 node mddir "../../../"

执行结果会生成的markdown文件结构'directoryList.md'

