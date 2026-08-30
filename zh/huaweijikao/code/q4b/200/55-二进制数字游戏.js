// 55. 二进制数字游戏
// 输入：正整数 n（1<=n<=1e9）
// 输出：比 n 大的数 m，且 n 和 m 的二进制中 1 的个数相同，输出最小的 m
function main(n) {
  let c = n
  let c0 = 0
  let c1 = 0
  while ((c & 1) === 0 && c !== 0) {
    c0++
    c >>= 1
  }
  while ((c & 1) === 1) {
    c1++
    c >>= 1
  }
  const p = c0 + c1
  let ans = n
  ans |= 1 << p // 翻转最右侧非尾随零的位为 1
  ans &= ~((1 << p) - 1) // 清零 p 位以下
  ans |= (1 << (c1 - 1)) - 1 // 补上 c1-1 个 1
  return ans
}

console.log(main(2))
