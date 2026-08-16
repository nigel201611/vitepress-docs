// 整数数组 nums 按升序排列，数组中的值互不相同。
// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]。
// 给你旋转后的数组 nums 和一个整数 target，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

// 思路：二分查找（旋转数组的特点：总有一半是有序的）
// 取中点 mid，比较 nums[left] 与 nums[mid]：
// 1. nums[left] <= nums[mid]：左半部分有序。若 target 落在 [nums[left], nums[mid]) 内，搜索左侧；否则搜索右侧。
// 2. 否则：右半部分有序。若 target 落在 (nums[mid], nums[right]] 内，搜索右侧；否则搜索左侧。

var search = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    if (nums[mid] === target) return mid
    if (nums[left] <= nums[mid]) {
      // 左半部分有序
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      // 右半部分有序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)) // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)) // -1
console.log(search([1], 0)) // -1
