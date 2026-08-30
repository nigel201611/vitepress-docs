// 部门人力分配:M个月内完成N个需求,每月最多2个需求,求每月最少需要的人力
function main(m, requirements) {
  const arr = requirements.slice().sort((a, b) => a - b)
  const n = arr.length
  const check = (x) => {
    let l = 0
    let r = n - 1
    let c = 0
    while (l <= r) {
      if (l < r && arr[l] + arr[r] <= x) {
        l++
        r--
      } else {
        r--
      }
      c++
    }
    return c <= m
  }
  let lo = arr[n - 1]
  let hi = 0
  for (const v of arr) hi += v
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (check(mid)) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  return lo
}

console.log(main(3, [3, 5, 3, 4]))
