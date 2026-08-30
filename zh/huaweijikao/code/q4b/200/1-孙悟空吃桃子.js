function main(arr, h) {
  const n = arr.length
  if (n === 0) return 0
  let max = 0
  for (const x of arr) {
    if (x < 0) return 0
    max = Math.max(max, x)
  }
  if (max === 0) return 0
  const can = (k) => {
    let hours = 0
    for (const x of arr) {
      hours += Math.ceil(x / k)
    }
    return hours <= h
  }
  // 每小时最多只能吃一棵树上的桃子,N 棵桃树至少需要 N 小时
  if (!can(max)) return 0
  let lo = 1
  let hi = max
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (can(mid)) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  return lo
}

console.log(main([2, 3, 4, 5], 4))
