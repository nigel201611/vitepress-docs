// 第 20 题:像素1物体的边界个数
// 二维像素图仅含 1 和 5。与像素5格子相邻(8方向)的像素1格子组成"边界"。
// 边界格子之间相邻(8方向)的属于同一条边界,求边界总数。
// 步骤:标记出所有与5相邻的1格子,再统计这些格子的8-连通分量个数。
function main(m, n, grid) {
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ]
  const g = grid.map((row) => (typeof row === 'string' ? row.split('').map(Number) : row))
  const isBoundary = Array.from({ length: m }, () => new Array(n).fill(false))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] !== 1) continue
      for (const [di, dj] of dirs) {
        const ni = i + di,
          nj = j + dj
        if (ni >= 0 && ni < m && nj >= 0 && nj < n && g[ni][nj] === 5) {
          isBoundary[i][j] = true
          break
        }
      }
    }
  }
  let count = 0
  const seen = Array.from({ length: m }, () => new Array(n).fill(false))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!isBoundary[i][j] || seen[i][j]) continue
      count++
      const stack = [[i, j]]
      seen[i][j] = true
      while (stack.length) {
        const [x, y] = stack.pop()
        for (const [di, dj] of dirs) {
          const nx = x + di,
            ny = y + dj
          if (nx >= 0 && nx < m && ny >= 0 && ny < n && isBoundary[nx][ny] && !seen[nx][ny]) {
            seen[nx][ny] = true
            stack.push([nx, ny])
          }
        }
      }
    }
  }
  return count
}

console.log(
  main(6, 6, ['111111', '151111', '111111', '111111', '111111', '111115'])
)
