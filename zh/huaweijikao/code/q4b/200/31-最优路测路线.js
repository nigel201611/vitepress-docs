// 第 31 题:最优路测路线
// R行C列的栅格地图,每格有信号值S(越大越好),路测路线从(0,0)到(R-1,C-1),
// 只能上下左右移动、不能对角;路线的评分 = 路线上信号最差的栅格值,
// 求评分最高的路线得分。
// 二分答案:对给定评分 X,若所有栅格中"信号值 >= X 且四连通"能打通(0,0)到
// (R-1,C-1)即为可行;可行性关于 X 单调,二分找最大可行评分(注意起点终点也须达标)。
function main(r, c, grid) {
  const R = r
  const C = c
  const can = (lim) => {
    if (grid[0][0] < lim || grid[R - 1][C - 1] < lim) return false
    const seen = new Uint8Array(R * C)
    const q = [[0, 0]]
    seen[0] = 1
    while (q.length) {
      const [x, y] = q.pop()
      if (x === R - 1 && y === C - 1) return true
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      for (const [dx, dy] of dirs) {
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || nx >= R || ny < 0 || ny >= C) continue
        if (seen[nx * C + ny]) continue
        if (grid[nx][ny] < lim) continue
        seen[nx * C + ny] = 1
        q.push([nx, ny])
      }
    }
    return false
  }
  let lo = 0
  let hi = 65535
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2)
    if (can(mid)) lo = mid
    else hi = mid - 1
  }
  return lo
}

console.log(main(3, 3, [[5, 4, 5], [1, 2, 6], [7, 4, 6]]))
