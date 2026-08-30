function main(lines) {
  const parts = lines[0].trim().split(/[,\s]+/)
  const m = Number(parts[0])
  const n = Number(parts[1])
  const speeds = []
  for (let i = 1; i < lines.length; i++) {
    const v = Number(lines[i].trim())
    if (!Number.isNaN(v)) speeds.push(v)
  }
  // 第 i 辆车第 i 小时出发,理想到达时间为 i + n/s_i;
  // 不能超车,第 i 辆车的实际到达时间 = max(自身理想到达时间, 前车实际到达时间)
  let bestNum = 0
  let bestDen = 1
  for (let i = 0; i < m; i++) {
    const num = i * speeds[i] + n
    const den = speeds[i]
    // num/den 与 bestNum/bestDen 比较
    if (num * bestDen > bestNum * den) {
      bestNum = num
      bestDen = den
    }
  }
  const duration = bestNum / bestDen - (m - 1)
  const rounded = Math.round(duration * 1e9) / 1e9
  return String(rounded)
}

console.log(main(['2 11', '3', '2']))
