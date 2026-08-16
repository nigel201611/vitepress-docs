// 给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。
// 环形数组意味着数组的末端将会与开头相连呈环状（nums[0] 和 nums[n-1] 相邻）。

// 思路：Kadane 算法（两种情况取最大）
// 环形数组的最大子数组和只有两种可能：
// 1. 不跨环：就是普通最大子数组和 maxSum（Kadane）
// 2. 跨环：等价于「总和 - 最小子数组和」，即去掉中间一段最小和的子数组
// 答案 = max(maxSum, total - minSum)
// 特殊情况：所有元素都是负数时，maxSum 已经是正确结果（此时 total - minSum = 0，但空子数组不允许，需排除）。

var maxSubarraySumCircular = function (nums) {
  let curMax = 0
  let maxSum = -Infinity
  let curMin = 0
  let minSum = Infinity
  let total = 0

  for (const num of nums) {
    curMax = Math.max(num, curMax + num)
    maxSum = Math.max(maxSum, curMax)
    curMin = Math.min(num, curMin + num)
    minSum = Math.min(minSum, curMin)
    total += num
  }

  return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum
}

console.log(maxSubarraySumCircular([1, -2, 3, -2])) // 3: [3]
console.log(maxSubarraySumCircular([5, -3, 5])) // 10: 跨环 [5,5]
console.log(maxSubarraySumCircular([-3, -2, -3])) // -2
