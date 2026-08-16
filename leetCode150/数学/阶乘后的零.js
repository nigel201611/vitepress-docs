// 给定一个整数 n ，返回 n! 结果中尾随零的数量。

// 思路：统计因子 5 的个数
// 尾随零来自因子 10 = 2 × 5。阶乘中因子 2 的数量远多于因子 5，
// 所以尾随零的数量 = n! 中因子 5 的总个数。
// 5 的倍数贡献 1 个 5，25 的倍数多贡献 1 个，125 的倍数再多贡献 1 个……
// 即 n/5 + n/25 + n/125 + ...（向下取整累加）。

var trailingZeroes = function (n) {
  let count = 0
  while (n > 0) {
    n = Math.floor(n / 5)
    count += n
  }
  return count
}

console.log(trailingZeroes(3)) // 0（3! = 6）
console.log(trailingZeroes(5)) // 1（5! = 120）
console.log(trailingZeroes(25)) // 6（25/5 + 25/25 = 5 + 1）
