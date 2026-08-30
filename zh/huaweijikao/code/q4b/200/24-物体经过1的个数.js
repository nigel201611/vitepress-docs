// 第 24 题:物体移动经过数字 1 的格子次数
// w*h 的 0/1 矩阵,物体从 (sx, sy) 出发,每时间单位沿速度 (vx, vy) 移动一格,
// 越界时碰壁反弹(坐标关于边界镜像、该轴速度取反)。
// 输出 t 个时间单位内(含初始位置,不含分数时刻)经过的值为 1 的格子次数。
// 注意说明中"矩阵以上左角位置为[0, 0](列(x), 行(y))",w 为宽(列数),h 为高(行数)。
function main(w, h, sx, sy, vx, vy, t, grid) {
  const g = grid.map((row) => (typeof row === 'string' ? row.split('').map(Number) : row))
  let x = sx,
    y = sy,
    dx = vx,
    dy = vy
  let count = g[y][x] === 1 ? 1 : 0
  for (let i = 1; i <= t; i++) {
    x += dx
    y += dy
    if (x < 0) {
      x = -x
      dx = -dx
    } else if (x >= w) {
      x = 2 * (w - 1) - x
      dx = -dx
    }
    if (y < 0) {
      y = -y
      dy = -dy
    } else if (y >= h) {
      y = 2 * (h - 1) - y
      dy = -dy
    }
    if (g[y][x] === 1) count++
  }
  return count
}

console.log(
  main(12, 7, 2, 1, 1, -1, 13, [
    '001000010000',
    '001000010000',
    '001000010000',
    '001000010000',
    '001000010000',
    '001000010000',
    '001000010000',
  ])
)
