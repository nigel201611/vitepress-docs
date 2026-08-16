// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 思路：Kadane 算法（动态规划 + 滚动变量）
// cur 表示「以当前元素结尾的最大子数组和」：
//   cur = max(nums[i], cur + nums[i])
// 要么从当前元素重新开始，要么接上前面的最优子数组。
// 用 max 记录遍历过程中的最大值。空间 O(1)。

var maxSubArray = function (nums) {
  let cur = 0
  let max = -Infinity
  for (const num of nums) {
    cur = Math.max(num, cur + num)
    max = Math.max(max, cur)
  }
  return max
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // 6: [4,-1,2,1]
console.log(maxSubArray([1])) // 1
console.log(maxSubArray([5, 4, -1, 7, 8])) // 23
