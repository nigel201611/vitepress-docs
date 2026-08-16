// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。

// 思路：动态规划（原地修改）
// dp[i][j] 表示到达 (i, j) 的最小路径和。
// 由于只能从上方或左方过来：
// dp[i][j] = grid[i][j] + min(上方 dp[i-1][j], 左方 dp[i][j-1])
// 第一行只能从左累加，第一列只能从上累加，直接改在原数组上，空间 O(1)。

var minPathSum = function (grid) {
  const m = grid.length
  const n = grid[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue
      if (i === 0) {
        grid[i][j] += grid[i][j - 1] // 第一行只能从左来
      } else if (j === 0) {
        grid[i][j] += grid[i - 1][j] // 第一列只能从上来
      } else {
        grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
      }
    }
  }
  return grid[m - 1][n - 1]
}

console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
) // 7: 1→3→1→1→1
console.log(minPathSum([[1, 2, 3], [4, 5, 6]])) // 12
