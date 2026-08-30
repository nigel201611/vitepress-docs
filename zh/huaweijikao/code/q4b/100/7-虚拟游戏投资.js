// 7 虚拟游戏投资：最多投资2个产品,总额<=N,总风险<=X,投资额*回报率=回报,输出各产品投资额

function main(m, N, X, rate, risk, cap) {
  const res = new Array(m).fill(0)
  let best = 0
  for (let i = 0; i < m; i++) {
    if (risk[i] <= X) {
      const amt = Math.min(N, cap[i])
      const gain = amt * rate[i]
      if (gain > best) {
        best = gain
        res.fill(0)
        res[i] = amt
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (risk[i] + risk[j] > X) continue
      const a = rate[i] >= rate[j] ? i : j
      const b = a === i ? j : i
      const x = Math.min(N, cap[a])
      const y = Math.min(N - x, cap[b])
      const gain = x * rate[a] + y * rate[b]
      if (gain > best) {
        best = gain
        res.fill(0)
        res[a] = x
        res[b] = y
      }
    }
  }
  return res.join(' ')
}

console.log(main(5, 100, 10, [10, 20, 30, 40, 50], [3, 4, 5, 6, 10], [20, 30, 20, 40, 30]))
