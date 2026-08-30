// 64 最大N个数与最小N个数的和: 数组去重后求最大N个数与最小N个数的和, 重叠或非法输入返回 -1
// 输入: M, arr, N

function main(M, arr, N) {
  if (!Number.isInteger(N) || N < 1 || !Array.isArray(arr) || arr.length !== M) return -1
  for (const v of arr) {
    if (!Number.isInteger(v) || v < 0 || v > 1000) return -1
  }
  // 去重并排序
  const uniq = [...new Set(arr)].sort((a, b) => a - b)
  if (uniq.length < 2 * N) return -1
  let sum = 0
  for (let i = 0; i < N; i++) {
    sum += uniq[i] + uniq[uniq.length - 1 - i]
  }
  return sum
}

console.log(main(5, [95, 88, 83, 64, 100], 2))

// 重叠示例
console.log(main(3, [1, 1, 2], 2))
