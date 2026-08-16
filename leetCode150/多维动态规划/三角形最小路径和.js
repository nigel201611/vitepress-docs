// 给定一个三角形 triangle ，找出自顶向下的最小路径和。
// 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。
// 也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

// 思路：动态规划（自底向上，原地修改）
// 从倒数第二行开始，自底向上计算：dp[j] 表示从当前位置（i 行 j 列）到三角形底部的最小路径和。
// 转移：dp[j] = triangle[i][j] + min(下一行的 dp[j], 下一行的 dp[j+1])
// 因为只依赖下一行，直接复用一维数组 dp，初始为最后一行。
// 最终 dp[0] 就是自顶向下的最小路径和。

var minimumTotal = function (triangle) {
  const n = triangle.length
  const dp = [...triangle[n - 1]] // 初始化为最后一行
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1])
    }
  }
  return dp[0]
}

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])) // 11: 2+3+5+1
console.log(minimumTotal([[-10]])) // -10
