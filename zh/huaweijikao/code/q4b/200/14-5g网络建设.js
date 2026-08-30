function main(lines) {
  const n = Number(lines[0].trim())
  const m = Number(lines[1].trim())
  const parent = Array.from({ length: n + 1 }, (_, i) => i)
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]
      x = parent[x]
    }
    return x
  }
  const union = (a, b) => {
    const ra = find(a)
    const rb = find(b)
    if (ra !== rb) {
      parent[ra] = rb
      return true
    }
    return false
  }
  const edges = []
  let cost = 0
  for (let i = 2; i < 2 + m; i++) {
    const parts = lines[i].trim().split(/[,\s]+/)
    const x = Number(parts[0])
    const y = Number(parts[1])
    const z = Number(parts[2])
    const p = Number(parts[3])
    if (p === 1) {
      union(x, y) // 已存在光纤,免费互联
    } else {
      edges.push({ x, y, z })
    }
  }
  edges.sort((a, b) => a.z - b.z)
  for (const e of edges) {
    if (union(e.x, e.y)) cost += e.z
  }
  // 校验是否全部连通
  const root = find(1)
  for (let i = 2; i <= n; i++) {
    if (find(i) !== root) return -1
  }
  return cost
}

console.log(main(['3', '3', '1 2 3 0', '1 3 1 0', '2 3 5 0']))
