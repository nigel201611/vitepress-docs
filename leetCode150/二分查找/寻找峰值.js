// 峰值元素是指其值严格大于左右相邻值的元素。给你一个整数数组 nums，找到峰值元素并返回其索引。
// 数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
// 你可以假设 nums[-1] = nums[n] = -∞。

// 思路：二分查找
// 对于中点 mid，比较 nums[mid] 与 nums[mid + 1]：
// 1. nums[mid] < nums[mid + 1]：说明右侧是上升趋势，峰值必然在右侧（右侧边界是 -∞，一定会掉头），left = mid + 1
// 2. 否则：峰值在左侧（含 mid），right = mid
// 因为边界外是 -∞，所以一定能找到峰值。

var findPeakElement = function (nums) {
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    const mid = (left + right) >> 1
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
}

console.log(findPeakElement([1, 2, 3, 1])) // 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])) // 1 或 5
