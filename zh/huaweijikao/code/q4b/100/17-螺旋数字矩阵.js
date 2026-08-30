// 17 螺旋数字矩阵 n m

function main(n, m) {
  const cols = Math.ceil(n / m)
  const grid = Array.from({ length: m }, () => new Array(cols).fill('*'))
  let top = 0
  let bottom = m - 1
  let left = 0
  let right = cols - 1
  let num = 1
  while (top <= bottom && left <= right && num <= n) {
    for (let j = left; j <= right && num <= n; j++) grid[top][j] = num++
    top++
    for (let i = top; i <= bottom && num <= n; i++) grid[i][right] = num++
    right--
    for (let j = right; j >= left && num <= n; j--) grid[bottom][j] = num++
    bottom--
    for (let i = bottom; i >= top && num <= n; i--) grid[i][left] = num++
    left++
  }
  return grid.map((row) => row.join(' ')).join('\n')
}

console.log(main(9, 4))
