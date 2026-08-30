// 49 分配土地: m x n 地图, 求相同数字旗子的最小矩形面积的最大值
// 输入: m, n 和地图网格 grid

function main(m, n, grid) {
  let maxArea = 0
  // 旗子上的数字为 1-500
  for (let d = 1; d <= 500; d++) {
    let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity
    let found = false
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === d) {
          found = true
          if (i < minR) minR = i
          if (i > maxR) maxR = i
          if (j < minC) minC = j
          if (j > maxC) maxC = j
        }
      }
    }
    if (found) {
      const area = (maxR - minR + 1) * (maxC - minC + 1)
      if (area > maxArea) maxArea = area
    }
  }
  return maxArea
}

console.log(main(3, 3, [
  [1, 0, 1],
  [0, 0, 0],
  [0, 1, 0],
]))
