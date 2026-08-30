// 第 23 题:抢7游戏的B胜组合数
// A、B 交替报数:A 先报起始数字 M,之后每人报的数比上一个数小 1 或 2
// (0 < 差值 < 3),谁先报到 7 谁获胜。求 B 获胜的不同报数组合数。
// DP:dpA[i] = A 报到数字 i 的组合数, dpB[i] = B 报到数字 i 的组合数。
// 初始 dpA[M] = 1(A 先报 M);递推(从大到小):
//   dpB[i] = dpA[i+1] + dpA[i+2] (B 之前 A 报的是 i+1 或 i+2)
//   dpA[i] = dpB[i+1] + dpB[i+2]
// 答案 = dpB[7]。组合数增长类似斐波那契数列,M 较大时超过普通整数范围,用 BigInt。
function main(input) {
  const m = Number(input)
  const zero = 0n
  const one = 1n
  const dpA = new Array(m + 3).fill(zero)
  const dpB = new Array(m + 3).fill(zero)
  dpA[m] = one
  for (let i = m - 1; i >= 7; i--) {
    dpB[i] = dpA[i + 1] + dpA[i + 2]
    dpA[i] = dpB[i + 1] + dpB[i + 2]
  }
  return dpB[7].toString()
}

console.log(main(10))
