// 给你无向连通图中一个节点的引用，请你返回该图的深拷贝（克隆）。
// 图中的每个节点都包含它的值 val 和其邻居的列表 neighbors。

// 思路：DFS + 哈希表
// 用 Map 记录「原节点 → 克隆节点」，避免重复克隆和死循环（无向图会互相访问）。
// 递归克隆节点：先创建克隆节点并登记，再逐个克隆它的邻居并接入克隆节点的 neighbors。

var cloneGraph = function (node) {
  if (!node) return null
  const visited = new Map()
  const dfs = (n) => {
    if (visited.has(n)) return visited.get(n)
    const clone = new Node(n.val, [])
    visited.set(n, clone)
    for (const neighbor of n.neighbors) {
      clone.neighbors.push(dfs(neighbor))
    }
    return clone
  }
  return dfs(node)
}
