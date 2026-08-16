// 给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

// 思路：动态规划（状态机推广到 k 次交易）
// 用两个一维数组滚动：
// buy[j]：已完成 j 次交易，且当前持有股票时的最大利润
// sell[j]：已完成 j 次交易（已卖出）后的最大利润
// 转移（遍历每天价格）：
// buy[j]  = max(buy[j],  sell[j-1] - price)
// sell[j] = max(sell[j], buy[j] + price)
// 注意：卖出的那一刻才算完成一笔交易。
// 当 k >= prices.length / 2 时，退化为无限次交易，直接用贪心累计所有上涨段即可（否则会超时）。

var maxProfit = function (k, prices) {
  const n = prices.length
  if (n <= 1 || k <= 0) return 0

  if (k >= n / 2) {
    // 无限次交易：贪心，累加所有上涨差
    let profit = 0
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1]
      }
    }
    return profit
  }

  const buy = new Array(k + 1).fill(-Infinity)
  const sell = new Array(k + 1).fill(0)
  for (const price of prices) {
    for (let j = 1; j <= k; j++) {
      buy[j] = Math.max(buy[j], sell[j - 1] - price)
      sell[j] = Math.max(sell[j], buy[j] + price)
    }
  }
  return sell[k]
}

console.log(maxProfit(2, [2, 4, 1])) // 2
console.log(maxProfit(2, [3, 2, 6, 5, 0, 3])) // 7
