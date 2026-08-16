// 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，
// 其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。
// 每个 Ai 或 Bi 是一个表示单个变量的字符串。
// 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件求出 Cj / Dj = ? 的结果。

// 思路：图 + DFS（带权图）
// 把每个变量当作节点，A / B = v 建两条带权边：
//   A -> B 权值为 v，B -> A 权值为 1/v
// 查询 C / D：从 C 出发 DFS 找 D，路径上边的权值相乘即为结果。
// 用 visited 集合防止成环死循环；不存在路径返回 -1；C === D 时值为 1。

var calcEquation = function (equations, values, queries) {
  const graph = {}
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i]
    if (!graph[a]) graph[a] = []
    if (!graph[b]) graph[b] = []
    graph[a].push([b, values[i]])
    graph[b].push([a, 1 / values[i]])
  }

  const dfs = (start, end, visited) => {
    if (!graph[start] || !graph[end]) return -1 // 变量不存在
    if (start === end) return 1
    visited.add(start)
    for (const [next, val] of graph[start]) {
      if (visited.has(next)) continue
      const res = dfs(next, end, visited)
      if (res !== -1) return val * res
    }
    return -1
  }

  return queries.map(([a, b]) => dfs(a, b, new Set()))
}

console.log(
  calcEquation(
    [
      ['a', 'b'],
      ['b', 'c'],
    ],
    [2.0, 3.0],
    [
      ['a', 'c'],
      ['b', 'a'],
      ['a', 'e'],
      ['a', 'a'],
      ['x', 'x'],
    ]
  )
) // [6, 0.5, -1, 1, -1]
