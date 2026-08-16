// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
// 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
// 例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

// 方法一：动态规划（O(n²)）
// dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。
// 遍历 i 之前的每个 j，如果 nums[j] < nums[i]，则 dp[i] = max(dp[i], dp[j] + 1)。
// 初始 dp[i] = 1（每个元素自身构成长度为 1 的子序列）。

// 方法二：贪心 + 二分（O(n log n)）
// 维护数组 tails，tails[k] 表示长度为 k+1 的递增子序列的末尾元素的最小值（tails 本身是严格递增的）。
// 遍历 nums：在 tails 中二分查找第一个 >= nums[i] 的位置，用 nums[i] 替换它（更小的末尾更优）；
// 如果 nums[i] 比 tails 所有元素都大，就追加到末尾。
// 最终 tails 的长度就是最长递增子序列的长度。

var lengthOfLIS = function (nums) {
  const tails = []
  for (const num of nums) {
    let left = 0
    let right = tails.length
    while (left < right) {
      const mid = (left + right) >> 1
      if (tails[mid] < num) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    if (left === tails.length) {
      tails.push(num)
    } else {
      tails[left] = num
    }
  }
  return tails.length
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])) // 4: [2,3,7,101]
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])) // 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])) // 1
