// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。
// 要求算法的时间复杂度为 O(log (m+n))。

// 思路：二分查找（划分数组，O(log min(m, n))）
// 目标是找到一种划分，把两个数组合并后的整体切成左右两半，左半元素个数 = (m+n+1)/2（向下取整）。
// 在较短的 nums1 上二分划分点 i（0 <= i <= m），则 nums2 的划分点 j = (m+n+1)/2 - i。
// 检查交叉大小关系：
//   左边最大值 max(nums1[i-1], nums2[j-1]) <= 右边最小值 min(nums1[i], nums2[j])
//   满足则找到划分：奇数长度取左边最大值，偶数长度取 (左边最大值 + 右边最小值) / 2
// 不满足时，根据 nums1[i-1] 与 nums2[j] 的大小关系调整二分方向。

var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length
  const n = nums2.length
  if (m > n) return findMedianSortedArrays(nums2, nums1) // 保证在较短的数组上二分

  let left = 0
  let right = m
  const totalLeft = Math.floor((m + n + 1) / 2) // 左半部分元素个数

  while (left <= right) {
    const i = (left + right) >> 1 // nums1 划分点：左边取 nums1[0..i-1]
    const j = totalLeft - i // nums2 划分点：左边取 nums2[0..j-1]

    const nums1Left = i === 0 ? -Infinity : nums1[i - 1]
    const nums1Right = i === m ? Infinity : nums1[i]
    const nums2Left = j === 0 ? -Infinity : nums2[j - 1]
    const nums2Right = j === n ? Infinity : nums2[j]

    if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
      // 找到正确划分
      if ((m + n) % 2 === 1) return Math.max(nums1Left, nums2Left)
      return (Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) / 2
    } else if (nums1Left > nums2Right) {
      right = i - 1 // i 太大，nums1 左边取多了
    } else {
      left = i + 1 // i 太小
    }
  }
  return 0
}

console.log(findMedianSortedArrays([1, 3], [2])) // 2
console.log(findMedianSortedArrays([1, 2], [3, 4])) // 2.5
