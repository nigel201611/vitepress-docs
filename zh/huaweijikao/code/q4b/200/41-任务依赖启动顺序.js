// 任务依赖启动顺序:贪婪策略(无依赖先执行,多个就绪按名称字典序)
function main(deps) {
  const list = Array.isArray(deps) ? deps : deps.split(/\s+/).filter(Boolean)
  const adj = new Map() // 依赖边: b -> a (a 依赖 b)
  const indeg = new Map()
  for (const dep of list) {
    const eq = dep.indexOf('->')
    const a = dep.slice(0, eq)
    const b = dep.slice(eq + 2)
    if (!indeg.has(a)) indeg.set(a, 0)
    if (!indeg.has(b)) indeg.set(b, 0)
    if (!adj.has(b)) adj.set(b, [])
    adj.get(b).push(a)
    indeg.set(a, indeg.get(a) + 1)
  }
  // 最小堆(按名称字典序)
  const heap = []
  const push = (v) => {
    heap.push(v)
    let i = heap.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (heap[p] <= heap[i]) break
      ;[heap[p], heap[i]] = [heap[i], heap[p]]
      i = p
    }
  }
  const pop = () => {
    const top = heap[0]
    const last = heap.pop()
    if (heap.length) {
      heap[0] = last
      let i = 0
      while (true) {
        const l = i * 2 + 1
        const r = i * 2 + 2
        let s = i
        if (l < heap.length && heap[l] < heap[s]) s = l
        if (r < heap.length && heap[r] < heap[s]) s = r
        if (s === i) break
        ;[heap[s], heap[i]] = [heap[i], heap[s]]
        i = s
      }
    }
    return top
  }
  for (const [node, d] of indeg) if (d === 0) push(node)
  const res = []
  while (heap.length) {
    const u = pop()
    res.push(u)
    for (const v of adj.get(u) || []) {
      indeg.set(v, indeg.get(v) - 1)
      if (indeg.get(v) === 0) push(v)
    }
  }
  return res.join(' ')
}

console.log(main('A->B C->B'))
