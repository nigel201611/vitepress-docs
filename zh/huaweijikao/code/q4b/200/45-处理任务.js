// 处理任务:每个任务可在[s_i, e_i]内任选一天完成,一天一个任务,求最多处理任务数
function main(n, tasks) {
  const sorted = tasks.slice().sort((a, b) => a[0] - b[0])
  let maxDay = 0
  for (const [, e] of sorted) maxDay = Math.max(maxDay, e)
  // 最小堆:按结束时间
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
  let idx = 0
  let count = 0
  for (let day = 1; day <= maxDay; day++) {
    while (idx < n && sorted[idx][0] <= day) {
      push(sorted[idx][1])
      idx++
    }
    while (heap.length && heap[0] < day) pop()
    if (heap.length) {
      pop()
      count++
    }
  }
  return count
}

console.log(main(3, [[1, 1], [1, 2], [1, 3]]))
