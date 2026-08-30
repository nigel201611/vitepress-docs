// 49. 局域网病毒传播（网络延迟）
// 输入：N（电脑个数），M（连接数），edges（每条边 [u, v, t] 表示 u -> v 需要时间 t），start（病毒起始电脑号）
// 输出：所有电脑都被感染的最短时间；若有电脑不被感染，返回 -1
function main(N, M, edges, start) {
  const graph = Array.from({ length: N + 1 }, () => [])
  for (const [u, v, t] of edges) {
    graph[u].push([v, t])
  }
  const dist = new Array(N + 1).fill(Infinity)
  const visited = new Array(N + 1).fill(false)
  dist[start] = 0
  for (let k = 0; k < N; k++) {
    let u = -1
    for (let i = 1; i <= N; i++) {
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) u = i
    }
    if (u === -1 || dist[u] === Infinity) break
    visited[u] = true
    for (const [v, t] of graph[u]) {
      if (dist[u] + t < dist[v]) dist[v] = dist[u] + t
    }
  }
  let max = 0
  for (let i = 1; i <= N; i++) {
    if (dist[i] === Infinity) return -1
    if (dist[i] > max) max = dist[i]
  }
  return max
}

console.log(main(4, 3, [[2, 1, 1], [2, 3, 1], [3, 4, 1]], 2))
