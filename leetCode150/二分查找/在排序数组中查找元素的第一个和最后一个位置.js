// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 思路：二分查找（两次二分，找下界）
// 定义 lowerBound(x)：第一个 >= x 的下标。
// 第一个位置 = lowerBound(target)；若该位置值不是 target，说明不存在，返回 [-1, -1]。
// 最后一个位置 = lowerBound(target + 1) - 1。
// 数组元素是整数，用 target + 1 二分即可。

var searchRange = function (nums, target) {
  const n = nums.length

  const lowerBound = (x) => {
    let left = 0
    let right = n
    while (left < right) {
      const mid = (left + right) >> 1
      if (nums[mid] < x) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    return left
  }

  const first = lowerBound(target)
  if (first === n || nums[first] !== target) return [-1, -1]
  const last = lowerBound(target + 1) - 1
  return [first, last]
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)) // [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)) // [-1, -1]
console.log(searchRange([], 0)) // [-1, -1]
