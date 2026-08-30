// 多马归位:等级为k的马1步可走1~k次日字,求所有马到同一位置的最少总步数
function main(m, n, grid) {
  const moves = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
  const horses = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const v = String(grid[i][j])
      if (v !== '.') horses.push([i, j, parseInt(v, 10)])
    }
  }
  const INF = Infinity
  const dists = []
  for (const [r, c, k] of horses) {
    const d = Array.from({ length: m }, () => new Array(n).fill(INF))
    d[r][c] = 0
    const q = [[r, c]]
    let h = 0
    while (h < q.length) {
      const [x, y] = q[h++]
      for (const [dx, dy] of moves) {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < m && ny >= 0 && ny < n && d[nx][ny] > d[x][y] + 1) {
          d[nx][ny] = d[x][y] + 1
          q.push([nx, ny])
        }
      }
    }
    dists.push({ d, k })
  }
  let best = INF
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0
      let ok = true
      for (const { d, k } of dists) {
        if (d[i][j] === INF) {
          ok = false
          break
        }
        sum += Math.ceil(d[i][j] / k)
      }
      if (ok) best = Math.min(best, sum)
    }
  }
  return best === INF ? -1 : best
}

console.log(main(3, 2, [['.', '.'], ['2', '.'], ['.', '.']]))
