// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
// 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

// 思路：动态规划
// dp[i] 表示偷到第 i 间房（下标 0 开始）时能得到的最高金额，对于第 i 间房有两个选择：
// 1. 不偷：金额 = dp[i-1]
// 2. 偷：金额 = dp[i-2] + nums[i]（第 i-1 间房不能偷）
// 取两者最大值：dp[i] = max(dp[i-1], dp[i-2] + nums[i])
// 初始：dp[0] = nums[0]，dp[1] = max(nums[0], nums[1])
// 只依赖前两个状态，用两个变量滚动，空间 O(1)。

var rob = function (nums) {
  const n = nums.length
  if (n === 0) return 0
  if (n === 1) return nums[0]
  let prev2 = nums[0] // dp[0]
  let prev1 = Math.max(nums[0], nums[1]) // dp[1]
  for (let i = 2; i < n; i++) {
    const cur = Math.max(prev1, prev2 + nums[i])
    prev2 = prev1
    prev1 = cur
  }
  return prev1
}

console.log(rob([1, 2, 3, 1])) // 4: 偷 1 号 + 3 号
console.log(rob([2, 7, 9, 3, 1])) // 12: 偷 0 号 + 2 号 + 4 号
