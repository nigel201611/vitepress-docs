function main(lines) {
  const rows = Number(lines[0].trim().split(/[,\s]+/)[0])
  const cols = Number(lines[0].trim().split(/[,\s]+/)[1])
  const grid = []
  for (let i = 1; i < lines.length; i++) {
    const tokens = lines[i].trim().split(/[,\s]+/).map(Number)
    if (tokens.length) grid.push(tokens)
  }
  if (grid[0][0] === 1) return 0
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0n))
  dp[0][0] = 1n
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        dp[i][j] = 0n
        continue
      }
      if (i > 0) dp[i][j] += dp[i - 1][j]
      if (j > 0) dp[i][j] += dp[i][j - 1]
    }
  }
  return dp[rows - 1][cols - 1].toString()
}

console.log(main(['3 3', '0 0 0', '0 1 0', '0 0 0']))
