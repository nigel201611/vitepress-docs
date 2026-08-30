// 51. 机房最大局域网
// 输入：n, m，之后为 n*m 的二维数组（1 表示服务器，0 表示没有）
// 两台服务器位于同一行或者同一列中紧邻的位置，可以组成局域网
// 输出：最大局域网包含的服务器个数
function main(n, m, grid) {
  const seen = Array.from({ length: n }, () => new Array(m).fill(false))
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  let best = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] !== 1 || seen[i][j]) continue
      let size = 0
      const stack = [[i, j]]
      seen[i][j] = true
      while (stack.length) {
        const [x, y] = stack.pop()
        size++
        for (const [dx, dy] of dirs) {
          const nx = x + dx
          const ny = y + dy
          if (nx >= 0 && nx < n && ny >= 0 && ny < m && !seen[nx][ny] && grid[nx][ny] === 1) {
            seen[nx][ny] = true
            stack.push([nx, ny])
          }
        }
      }
      if (size > best) best = size
    }
  }
  return best
}

console.log(main(2, 2, [[1, 0], [1, 1]]))
