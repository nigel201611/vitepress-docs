// 有向图:首节点(入度为0)和尾节点(出度为0);含环返回-1
function main(n, nums) {
  const edges = []
  for (let i = 0; i + 1 < Math.min(nums.length, 2 * n); i += 2) {
    edges.push([nums[i], nums[i + 1]])
  }
  if (edges.length === 0) return ''
  const nodeSet = new Set()
  for (const [u, v] of edges) {
    nodeSet.add(u)
    nodeSet.add(v)
  }
  const ids = [...nodeSet].sort((a, b) => a - b)
  const idx = new Map()
  ids.forEach((id, i) => idx.set(id, i))
  const K = ids.length
  const inDeg = new Array(K).fill(0)
  const outDeg = new Array(K).fill(0)
  const adj = Array.from({ length: K }, () => [])
  for (const [u, v] of edges) {
    adj[idx.get(u)].push(idx.get(v))
    inDeg[idx.get(v)]++
    outDeg[idx.get(u)]++
  }
  const origIn = inDeg.slice()
  // Kahn 拓扑排序检测环
  const q = []
  for (let i = 0; i < K; i++) if (inDeg[i] === 0) q.push(i)
  let head = 0
  let cnt = 0
  while (head < q.length) {
    const u = q[head++]
    cnt++
    for (const v of adj[u]) {
      if (--inDeg[v] === 0) q.push(v)
    }
  }
  if (cnt !== K) return -1
  const heads = []
  const tails = []
  for (let i = 0; i < K; i++) {
    if (origIn[i] === 0) heads.push(ids[i])
    if (outDeg[i] === 0) tails.push(ids[i])
  }
  tails.sort((a, b) => b - a)
  return [...heads, ...tails].join(' ')
}

console.log(main(4, [0, 1, 0, 2, 1, 2, 2, 3]))
