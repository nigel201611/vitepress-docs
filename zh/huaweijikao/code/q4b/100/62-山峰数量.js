// 62 山峰数量: 高度大于相邻位置的高度即为山峰(边界处大于相邻高度即可), 统计山峰个数
// 输入: 海拔高度数组

function main(arr) {
  const n = arr.length
  let count = 0
  for (let i = 0; i < n; i++) {
    const left = i === 0 ? -Infinity : arr[i - 1]
    const right = i === n - 1 ? -Infinity : arr[i + 1]
    if (arr[i] > left && arr[i] > right) count++
  }
  return count
}

console.log(main([0, 1, 4, 3, 1, 0, 0, 1, 2, 3, 1, 2, 1, 0]))
