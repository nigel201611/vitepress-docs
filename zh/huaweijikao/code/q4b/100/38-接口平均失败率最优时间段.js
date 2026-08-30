// 38 接口平均失败率最优时间段
// 找出平均值小于等于 minAverageLost 的最长连续时间段（子数组），
// 若存在多个最长段，全部输出并按 beginIndex 从小到大的顺序用空格拼接
// 找不到则返回 NULL

function main(minAverageLost, arr) {
  const n = arr.length
  // 前缀和，方便求任意区间平均值
  const pre = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + arr[i]
  for (let len = n; len >= 1; len--) {
    const res = []
    for (let i = 0; i + len - 1 < n; i++) {
      const sum = pre[i + len] - pre[i]
      if (sum <= minAverageLost * len) {
        res.push(i + '-' + (i + len - 1))
      }
    }
    if (res.length > 0) {
      return res.join(' ')
    }
  }
  return 'NULL'
}

console.log(main(1, [0, 1, 2, 3, 4]))
