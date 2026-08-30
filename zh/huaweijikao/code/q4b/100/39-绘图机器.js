// 39 绘图机器
// 笔从(0,0)开始,沿横轴正向画线,遇到指令 X offsetY 时在纵坐标方向偏移后继续画线；
// 求画出的折线与横坐标轴、X=E 直线上方围成图形的面积（认为各段先水平画再跳变）

function main(e, cmds) {
  let y = 0
  let lastX = 0
  let area = 0
  for (const [x, offsetY] of cmds) {
    area += y * (x - lastX)
    y += offsetY
    lastX = x
  }
  area += y * (e - lastX)
  return area
}

console.log(main(10, [[1, 1], [2, 1], [3, 1], [4, -2]]))
