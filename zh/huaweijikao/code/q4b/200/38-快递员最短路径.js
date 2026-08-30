// 快递员最短路径:投递站(0)出发送完所有客户并返回投递站,求最短距离
function main(n, m, deliveries, routes) {
  // deliveries: [客户id, 投递站到客户距离]; routes: [客户1id, 客户2id, 距离]
  const depDist = new Map()
  for (const [id, d] of deliveries) {
    const cur = depDist.get(id)
    if (cur === undefined || d < cur) depDist.set(id, d)
  }
  const ids = [...depDist.keys()].sort((a, b) => a - b)
  const idx = new Map()
  ids.forEach((id, i) => idx.set(id, i))
  const N = ids.length
  const INF = Infinity
  const dist = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(INF))
  for (let i = 0; i <= N; i++) dist[i][i] = 0
  for (let i = 0; i < N; i++) {
    dist[0][i + 1] = depDist.get(ids[i])
    dist[i + 1][0] = depDist.get(ids[i])
  }
  for (const [a, b, w] of routes) {
    const ia = idx.get(a)
    const ib = idx.get(b)
    if (ia === undefined || ib === undefined) continue
    if (w < dist[ia + 1][ib + 1]) {
      dist[ia + 1][ib + 1] = w
      dist[ib + 1][ia + 1] = w
    }
  }
  // Floyd 全源最短(允许多次经过投递站与客户)
  for (let k = 0; k <= N; k++) {
    for (let i = 0; i <= N; i++) {
      if (dist[i][k] === INF) continue
      for (let j = 0; j <= N; j++) {
        const d = dist[i][k] + dist[k][j]
        if (d < dist[i][j]) dist[i][j] = d
      }
    }
  }
  const full = (1 << N) - 1
  const dp = Array.from({ length: 1 << N }, () => new Array(N).fill(INF))
  for (let i = 0; i < N; i++) dp[1 << i][i] = dist[0][i + 1]
  for (let mask = 1; mask <= full; mask++) {
    for (let i = 0; i < N; i++) {
      if (!(mask & (1 << i)) || dp[mask][i] === INF) continue
      for (let j = 0; j < N; j++) {
        if (mask & (1 << j)) continue
        const nd = dp[mask][i] + dist[i + 1][j + 1]
        if (nd < dp[mask | (1 << j)][j]) dp[mask | (1 << j)][j] = nd
      }
    }
  }
  let ans = INF
  for (let i = 0; i < N; i++) {
    ans = Math.min(ans, dp[full][i] + dist[i + 1][0])
  }
  return ans === INF ? -1 : ans
}

console.log(main(2, 1, [[1, 1000], [2, 1200]], [[1, 2, 300]]))
