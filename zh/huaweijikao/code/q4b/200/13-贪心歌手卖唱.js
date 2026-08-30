function main(lines) {
  const parts1 = lines[0].trim().split(/[,\s]+/)
  const T = Number(parts1[0])
  const N = Number(parts1[1])
  const travel = lines[1].trim().split(/[,\s]+/).map(Number)
  const cities = []
  for (let i = 2; i < 2 + N; i++) {
    const parts = lines[i].trim().split(/[,\s]+/)
    cities.push({ m: Number(parts[0]), d: Number(parts[1]) })
  }
  const totalTravel = travel.reduce((s, x) => s + x, 0)
  let remain = T - totalTravel
  if (remain <= 0) return 0
  // 生成每座城市每天的边际收入(M, M-D, M-2D, ...递减到0为止)
  const margins = []
  for (const c of cities) {
    for (let v = c.m, j = 0; v > 0 && j < remain; v -= c.d, j++) {
      margins.push(v)
    }
  }
  margins.sort((a, b) => b - a)
  let ans = 0
  for (let i = 0; i < Math.min(remain, margins.length); i++) ans += margins[i]
  return ans
}

console.log(main(['10 2', '1 1 2', '120 20', '90 10']))
