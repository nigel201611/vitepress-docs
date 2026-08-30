// 15 多段线简化：走向只能是水平/竖直/斜45度,保留起点、拐点、终点,输出最简坐标串

function main(args) {
  const pts = []
  for (let i = 0; i < args.length; i += 2) {
    pts.push([args[i], args[i + 1]])
  }
  const dir = (a, b) => [Math.sign(b[0] - a[0]), Math.sign(b[1] - a[1])]
  const res = [pts[0]]
  let prev = dir(pts[0], pts[1])
  for (let i = 1; i < pts.length - 1; i++) {
    const d = dir(pts[i], pts[i + 1])
    if (d[0] !== prev[0] || d[1] !== prev[1]) {
      res.push(pts[i])
    }
    prev = d
  }
  res.push(pts[pts.length - 1])
  return res.flat().join(' ')
}

console.log(main([2, 8, 3, 7, 3, 6, 3, 5, 4, 4, 5, 3, 6, 2, 7, 3, 8, 4, 7, 5]))
