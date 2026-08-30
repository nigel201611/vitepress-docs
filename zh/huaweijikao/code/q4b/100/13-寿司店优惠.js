// 13 寿司店优惠：环形价格数组,选第i盘免费赠送顺时针距离最近的下盘寿司j(prices[j]<prices[i]),输出各盘实付

function main(prices) {
  const n = prices.length
  const result = []
  for (let i = 0; i < n; i++) {
    let free = 0
    for (let step = 1; step < n; step++) {
      const j = (i + step) % n
      if (prices[j] < prices[i]) {
        free = prices[j]
        break
      }
    }
    result.push(prices[i] + free)
  }
  return result.join(' ')
}

console.log(main([3, 14, 15, 6, 5]))
