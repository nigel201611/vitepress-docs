// 30 任务处理积分

function main(n, t, tasks) {
  tasks.sort((a, b) => a[0] - b[0])

  // 小顶堆,保存已选定任务的积分
  const heap = []
  const push = (v) => {
    heap.push(v)
    let i = heap.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (heap[p] > heap[i]) {
        ;[heap[p], heap[i]] = [heap[i], heap[p]]
        i = p
      } else break
    }
  }
  const pop = () => {
    const top = heap[0]
    const last = heap.pop()
    if (heap.length) {
      heap[0] = last
      let i = 0
      while (true) {
        const l = 2 * i + 1
        const r = 2 * i + 2
        let m = i
        if (l < heap.length && heap[l] < heap[m]) m = l
        if (r < heap.length && heap[r] < heap[m]) m = r
        if (m === i) break
        ;[heap[m], heap[i]] = [heap[i], heap[m]]
        i = m
      }
    }
    return top
  }

  for (const [sla, v] of tasks) {
    const cap = Math.min(sla, t)
    if (heap.length < cap) {
      push(v)
    } else if (v > heap[0]) {
      pop()
      push(v)
    }
  }

  return heap.reduce((sum, v) => sum + v, 0)
}

console.log(
  main(4, 3, [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
  ])
)
