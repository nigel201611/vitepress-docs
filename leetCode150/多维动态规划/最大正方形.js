// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。

// 思路：动态规划
// dp[i][j] 表示以 (i, j) 为右下角的最大正方形的边长。
// 若 matrix[i][j] === '1'，则：
// dp[i][j] = min(上方 dp[i-1][j], 左方 dp[i][j-1], 左上 dp[i-1][j-1]) + 1
// 直觉：以 (i,j) 为右下角能形成边长为 x 的正方形，前提是上方、左方、左上三个位置
// 分别能形成边长至少为 x-1 的正方形，取三者最小值 + 1。
// 若为 '0'，则 dp[i][j] = 0。
// 初始：第一行和第一列的值就是矩阵本身的值（'1' 则边长 1）。
// 边计算边记录最大边长 maxSide，答案 = maxSide²。

var maximalSquare = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  const dp = Array.from({ length: m }, () => new Array(n).fill(0))
  let maxSide = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        if (i === 0 || j === 0) {
          dp[i][j] = 1
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
        }
        maxSide = Math.max(maxSide, dp[i][j])
      }
    }
  }
  return maxSide * maxSide
}

console.log(
  maximalSquare([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0'],
  ])
) // 4
console.log(maximalSquare([['0', '1'], ['1', '0']])) // 1
