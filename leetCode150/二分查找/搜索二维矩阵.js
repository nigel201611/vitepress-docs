// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
// 每行中的整数从左到右按非递减顺序排列。每行的第一个整数大于前一行的最后一个整数。
// （等价于：把矩阵拉平成一行，就是一个有序数组）

// 思路：二分查找（把二维矩阵当作一维有序数组）
// 下标 i 对应矩阵中的 matrix[floor(i / n)][i % n]，整个数组是有序的，直接标准二分。

var searchMatrix = function (matrix, target) {
  const m = matrix.length
  const n = matrix[0].length
  let left = 0
  let right = m * n - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    const val = matrix[Math.floor(mid / n)][mid % n]
    if (val === target) return true
    if (val < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return false
}

console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3
  )
) // true
console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13
  )
) // false
