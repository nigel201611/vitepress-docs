// 64. 妈妈带宝宝吃糖果
// 输入：N（矩阵大小），之后 N 行，每行 N 个值（-3=妈妈 -2=宝宝 -1=障碍 >=0=糖果数）
// 妈妈必须在最短时间（每单位时间走一步）到达宝宝位置，只能上下左右走，不能走障碍
// 输出：最短时间路径中最多能拿到多少糖果
function main(N, grid) {
  let sr = -1, sc = -1, tr = -1, tc = -1
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === -3) { sr = i; sc = j }
      if (grid[i][j] === -2) { tr = i; tc = j }
    }
  }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  // BFS 求到各格的最短步数
  const dist = Array.from({ length: N }, () => new Array(N).fill(-1))
  dist[sr][sc] = 0
  const queue = [[sr, sc]]
  while (queue.length) {
    const [r, c] = queue.shift()
    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < N && nc >= 0 && nc < N && grid[nr][nc] !== -1 && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1
        queue.push([nr, nc])
      }
    }
  }
  if (dist[tr][tc] === -1) return 0
  // 按最短路径分层 DP：最优糖果数
  const dp = Array.from({ length: N }, () => new Array(N).fill(-Infinity))
  dp[sr][sc] = 0
  for (let d = 0; d <= dist[tr][tc]; d++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (dist[i][j] !== d) continue
        if (d === 0) continue
        let best = -Infinity
        for (const [dr, dc] of dirs) {
          const pr = i - dr
          const pc = j - dc
          if (pr >= 0 && pr < N && pc >= 0 && pc < N && dist[pr][pc] === d - 1) {
            if (dp[pr][pc] > best) best = dp[pr][pc]
          }
        }
        const val = grid[i][j] < 0 ? 0 : grid[i][j]
        dp[i][j] = best + val
      }
    }
  }
  return dp[tr][tc]
}

console.log(main(4, [[3, 2, 1, -3], [1, -1, 1, 1], [1, -1, 1, 2], [-2, 1, 2, 3]]))
