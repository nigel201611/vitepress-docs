// 第 27 题:城市最小聚集度(树的重心)
// n个城市,城市与城市之间有且只有一条道路相连(无环),即城市网络是一棵树。
// 切断通往城市 i 的所有道路后,地图分成若干连通的城市群,
// 聚集度 DP_i = 各城市群节点数的最大值。求 DP 最小的城市编号(可多解,升序输出)。
// 设以某节点为根 DFS 后,节点 u 的子树大小为 sz[u]:
//   删除 u 后,分成的部分 = 各孩子的子树 + "父方向"部分(size 为 n - sz[u]),
//   故 DP_u = max(n - sz[u], max(孩子子树 sz)),取 DP 最小的节点输出即可。
function main(n, edges) {
  const N = n
  const g = Array.from({ length: N + 1 }, () => [])
  for (const [x, y] of edges) {
    g[x].push(y)
    g[y].push(x)
  }
  const sz = new Array(N + 1).fill(0)
  const parent = new Array(N + 1).fill(0)
  const order = []
  const stack = [1]
  parent[1] = -1
  while (stack.length) {
    const u = stack.pop()
    order.push(u)
    for (const v of g[u]) {
      if (v === parent[u]) continue
      parent[v] = u
      stack.push(v)
    }
  }
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i]
    sz[u] = 1
    for (const v of g[u]) if (parent[v] === u) sz[u] += sz[v]
  }
  const children = (u) => g[u].filter((v) => parent[v] === u)
  let best = Infinity
  const ans = []
  for (let u = 1; u <= N; u++) {
    let dp = N - sz[u]
    for (const v of children(u)) dp = Math.max(dp, sz[v])
    if (dp < best) {
      best = dp
      ans.length = 0
      ans.push(u)
    } else if (dp === best) {
      ans.push(u)
    }
  }
  return ans.join(' ')
}

console.log(main(5, [[1, 2], [2, 3], [3, 4], [4, 5]]))
