// 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

// 思路：动态规划（状态机，最多 2 次交易，每天结束时 4 种状态）
// buy1: 进行了 1 次买入（持有股票）后的最大利润
// sell1: 完成了 1 次买卖（已卖出）后的最大利润
// buy2: 完成第 1 次买卖后，又买入第 2 次后的最大利润
// sell2: 完成 2 次买卖后的最大利润
// 转移（在遍历每天价格时滚动更新）：
// buy1  = max(buy1,  -price)        买入用负数价格表示"花费"
// sell1 = max(sell1, buy1 + price)
// buy2  = max(buy2,  sell1 - price)
// sell2 = max(sell2, buy2 + price)
// 初始：buy1 = buy2 = -Infinity，sell1 = sell2 = 0。
// 答案：max(sell1, sell2)。

var maxProfit = function (prices) {
  let buy1 = -Infinity
  let sell1 = 0
  let buy2 = -Infinity
  let sell2 = 0
  for (const price of prices) {
    buy1 = Math.max(buy1, -price)
    sell1 = Math.max(sell1, buy1 + price)
    buy2 = Math.max(buy2, sell1 - price)
    sell2 = Math.max(sell2, buy2 + price)
  }
  return Math.max(sell1, sell2)
}

console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])) // 6: 第 4 天买(0)第 6 天卖(3) + 第 7 天买(1)第 8 天卖(4)
console.log(maxProfit([1, 2, 3, 4, 5])) // 4: 只做一笔也满足，5-1
console.log(maxProfit([7, 6, 4, 3, 1])) // 0
