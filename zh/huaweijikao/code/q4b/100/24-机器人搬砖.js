// 24 机器人搬砖

function main(bricks) {
  const n = bricks.length
  // 能充的能量格数为最大堆砖数时,每堆只需1小时,共n小时
  if (n > 8) return -1
  let lo = 1
  let hi = Math.max(...bricks)
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    let hours = 0
    for (const b of bricks) hours += Math.ceil(b / mid)
    if (hours <= 8) hi = mid
    else lo = mid + 1
  }
  return lo
}

console.log(main([30, 12, 25, 8, 19]))
