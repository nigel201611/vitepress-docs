// 第 17 题:IP地址归属地查询
// 给定若干城市 IP 段(城市名=起始IP,结束IP;多个段用英文分号分隔)与待查询 IP 列表,
// 对每个查询 IP 返回"包含该 IP 且长度最小"的 IP 段所属城市名;若无匹配则输出空串。
// 技巧:按段长度升序排序后,用并查集"下一个未染色点"离线对查询点染色,复杂度 O(SlogS+Qα)。
function main(segStr, qStr) {
  const ipToInt = (ip) => {
    const [a, b, c, d] = ip.split('.').map(Number)
    return ((a * 256 + b) * 256 + c) * 256 + d
  }
  // 解析 IP 段
  const segs = []
  segStr.split(';').forEach((piece) => {
    const eq = piece.indexOf('=')
    const name = piece.slice(0, eq)
    const [s, e] = piece.slice(eq + 1).split(',').map(ipToInt)
    segs.push({ name, s, e, len: e - s, idx: segs.length })
  })
  // 长度相同时按输入顺序,先出现的段优先(稳定)
  segs.sort((a, b) => a.len - b.len || a.idx - b.idx)

  const queries = qStr.split(',').map(ipToInt)
  const order = queries.map((_, i) => i).sort((a, b) => queries[a] - queries[b])
  const ans = new Array(queries.length).fill('')

  // 二分:在已按 IP 升序排列的查询中找第一个 >= v 的排序下标
  const lowerBound = (v) => {
    let l = 0,
      r = order.length
    while (l < r) {
      const m = (l + r) >> 1
      if (queries[order[m]] < v) l = m + 1
      else r = m
    }
    return l
  }
  // 并查集 next:find(i) 返回排序数组从 i 起第一个尚未染色的位置
  const parent = order.map((_, i) => i)
  const find = (i) => {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]]
      i = parent[i]
    }
    return i
  }

  for (const seg of segs) {
    let i = find(lowerBound(seg.s))
    const limit = lowerBound(seg.e + 1)
    while (i < limit) {
      ans[order[i]] = seg.name
      parent[i] = find(i + 1)
      i = find(i)
    }
  }
  return ans.join(',')
}

console.log(
  main(
    'City1=1.1.1.1,1.1.1.2;City1=1.1.1.1,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.6,6.6.6.6',
    '1.1.1.15,3.3.3.5,2.2.2.3'
  )
)
