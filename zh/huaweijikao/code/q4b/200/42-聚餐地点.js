// 聚餐地点:小华和小为(两个2)都能到达的聚餐地点(3)数量
function main(m, n, grid) {
  const walkable = (v) => v === 0 || v === 2 || v === 3
  const marks = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        const vis = Array.from({ length: m }, () => new Array(n).fill(false))
        const q = [[i, j]]
        vis[i][j] = true
        let h = 0
        while (h < q.length) {
          const [x, y] = q[h++]
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nx = x + dx
            const ny = y + dy
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !vis[nx][ny] && walkable(grid[nx][ny])) {
              vis[nx][ny] = true
              q.push([nx, ny])
            }
          }
        }
        marks.push(vis)
      }
    }
  }
  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 3 && marks.every((v) => v[i][j])) ans++
    }
  }
  return ans
}

console.log(main(4, 4, [[2, 1, 0, 3], [0, 1, 2, 1], [0, 3, 0, 0], [0, 0, 0, 0]]))
