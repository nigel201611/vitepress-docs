// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 思路一：快速选择（QuickSelect，期望 O(n)）
// 类似快速排序的 partition，每轮把 pivot 放到正确位置，
// 根据下标大小决定只递归一边。第 k 大 = 排序后第 n-k 小。

// 思路二：大小为 k 的最小堆（O(n log k)）
// 维护一个容量为 k 的最小堆，堆顶就是当前第 k 大的元素；遍历完所有元素后堆顶即答案。
// 本题用快速选择实现。

var findKthLargest = function (nums, k) {
  const target = nums.length - k // 第 k 大 = 第 (n-k) 小
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const pivotIndex = partition(nums, left, right)
    if (pivotIndex === target) return nums[pivotIndex]
    if (pivotIndex < target) {
      left = pivotIndex + 1
    } else {
      right = pivotIndex - 1
    }
  }
}

// 以 nums[right] 为 pivot，把数组分为 < pivot | pivot | >= pivot，返回 pivot 最终下标
function partition(nums, left, right) {
  const pivot = nums[right]
  let i = left
  for (let j = left; j < right; j++) {
    if (nums[j] < pivot) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
      i++
    }
  }
  ;[nums[i], nums[right]] = [nums[right], nums[i]]
  return i
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)) // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)) // 4
