# 常见正则

## (?:pattern) 非捕获分组

(?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来

## (?=pattern) 正向肯定预查

正向肯定预查，匹配pattern前面的位置。这是一个非捕获匹配。
简单说，以 xxx(?=pattern)为例，就是捕获以pattern结尾的内容xxx

## (?!pattern) 正向否定预查

正向否定预查，任何不匹配pattern的字符串开始处匹配查找字符串。
简单说，以 xxx(?!pattern)为例，就是捕获不以pattern结尾的内容xxx

## (?<=pattern) 反向肯定预查
反向肯定预查，与正向肯定预查类似，只是方向相反。
简单说，以(?<=pattern)xxx为例，就是捕获以pattern开头的内容xxx。

## (?<！pattern) 反向否定预查
简单说，以(?<!pattern)xxx为例，就是捕获不以pattern开头的内容xxx。