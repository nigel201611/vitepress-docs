// 游乐园最低消费:一日/三日/七日/月票,覆盖全部游玩日期的最低费用
function main(costs, days) {
  const dur = [1, 3, 7, 30]
  const n = days.length
  const dp = new Array(n).fill(Infinity)
  for (let i = 0; i < n; i++) {
    for (let t = 0; t < 4; t++) {
      let j = i
      while (j >= 0 && days[j] >= days[i] - dur[t] + 1) j--
      const prev = j < 0 ? 0 : dp[j]
      dp[i] = Math.min(dp[i], prev + costs[t])
    }
  }
  return dp[n - 1]
}

console.log(main([5, 14, 30, 100], [1, 3, 15, 20, 21, 200, 202, 230]))
