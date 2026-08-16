// 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。

// 思路：n & (n - 1) 技巧
// n & (n - 1) 会把 n 最右侧的 1 变成 0（例如 1010 & 1001 = 1000）。
// 每执行一次就消掉一个 1，循环次数 = 1 的个数，比逐位检查更快。

var hammingWeight = function (n) {
  let count = 0
  while (n !== 0) {
    n = n & (n - 1)
    count++
  }
  return count
}

console.log(hammingWeight(11)) // 3（1011）
console.log(hammingWeight(128)) // 1（10000000）
console.log(hammingWeight(2147483645)) // 30
