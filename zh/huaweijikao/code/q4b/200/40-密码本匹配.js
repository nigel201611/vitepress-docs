// 密码本匹配:明文数字序列在密码本(上下左右相邻,不重复使用)中查找,返回字典序最小坐标串,找不到返回 error
function main(n, text, m, grid) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  const used = Array.from({ length: m }, () => new Array(m).fill(false))
  const path = []

  const dfs = (pos, r, c) => {
    if (grid[r][c] !== text[pos]) return false
    if (pos === n - 1) {
      path.push([r, c])
      return true
    }
    used[r][c] = true
    const nb = []
    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < m && nc >= 0 && nc < m && !used[nr][nc]) nb.push([nr, nc])
    }
    nb.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    for (const [nr, nc] of nb) {
      if (dfs(pos + 1, nr, nc)) {
        path.push([r, c])
        return true
      }
    }
    used[r][c] = false
    return false
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < m; c++) {
      if (grid[r][c] === text[0] && dfs(0, r, c)) {
        path.reverse()
        return path.map((p) => p.join(' ')).join(' ')
      }
    }
  }
  return 'error'
}

console.log(main(2, [0, 3], 3, [[0, 0, 2], [1, 3, 4], [6, 6, 4]]))
