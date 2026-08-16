// 一个机器人位于一个 m x n 网格的左上角（起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。
// 现在考虑网格中有障碍物，用 1 表示障碍物，0 表示可通过。
// 问总共有多少条不同的路径？

// 思路：动态规划
// dp[i][j] 表示到达 (i, j) 的不同路径数，只能从上方或左方过来：
// dp[i][j] = dp[i-1][j] + dp[i][j-1]
// 遇到障碍物（obstacleGrid[i][j] === 1）时 dp[i][j] = 0。
// 初始：起点 dp[0][0] = 1（若起点是障碍物则直接返回 0）；
// 第一行/第一列：没有障碍物时路径数恒为 1，一旦遇到障碍物，后面全部为 0。

var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  if (obstacleGrid[0][0] === 1) return 0
  const dp = new Array(n).fill(0)
  dp[0] = 1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[j] = 0
      } else if (j > 0) {
        dp[j] += dp[j - 1]
      }
      // j === 0 且无障碍物时，dp[0] 保持不变（一直为 1，除非被障碍物清 0）
    }
  }
  return dp[n - 1]
}

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
) // 2
console.log(uniquePathsWithObstacles([[0, 1], [0, 0]])) // 1
