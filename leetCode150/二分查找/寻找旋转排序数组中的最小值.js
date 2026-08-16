// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次旋转后，得到输入数组。
// 给你一个元素值互不相同的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的最小元素。

// 思路：二分查找
// 与有序数组不同，旋转数组无法直接比较 nums[mid] 与 nums[left]（可能相等），
// 但可以比较 nums[mid] 与 nums[right]：
// 1. nums[mid] > nums[right]：最小值在右侧（旋转点在右侧），left = mid + 1
// 2. 否则：最小值在左侧（含 mid），right = mid
// 循环结束时 left === right，即为最小值下标。

var findMin = function (nums) {
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    const mid = (left + right) >> 1
    if (nums[mid] > nums[right]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return nums[left]
}

console.log(findMin([3, 4, 5, 1, 2])) // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])) // 0
console.log(findMin([11, 13, 15, 17])) // 11
