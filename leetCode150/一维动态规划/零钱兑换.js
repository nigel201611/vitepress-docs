// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。

// 思路：动态规划（完全背包）
// dp[i] 表示凑出金额 i 所需的最少硬币数。
// 遍历每个面额 coin：dp[i] = min(dp[i], dp[i - coin] + 1)
// 初始：dp[0] = 0，其余为一个大值（如 amount + 1，因为硬币面额最小为 1，amount+1 一定不可能）。
// 最后 dp[amount] > amount 说明无法凑出，返回 -1。

var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount]
}

console.log(coinChange([1, 2, 5], 11)) // 3: 5+5+1
console.log(coinChange([2], 3)) // -1
console.log(coinChange([1], 0)) // 0
