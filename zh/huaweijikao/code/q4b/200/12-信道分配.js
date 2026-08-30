class MaxHeap {
  constructor() {
    this.a = []
  }
  push(v) {
    const a = this.a
    a.push(v)
    let i = a.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (a[p] >= a[i]) break
      ;[a[p], a[i]] = [a[i], a[p]]
      i = p
    }
  }
  pop() {
    const a = this.a
    const top = a[0]
    const last = a.pop()
    if (a.length) {
      a[0] = last
      let i = 0
      for (;;) {
        const l = i * 2 + 1
        const r = l + 1
        let m = i
        if (l < a.length && a[l] > a[m]) m = l
        if (r < a.length && a[r] > a[m]) m = r
        if (m === i) break
        ;[a[m], a[i]] = [a[i], a[m]]
        i = m
      }
    }
    return top
  }
  size() {
    return this.a.length
  }
}

function main(lines) {
  const R = Number(lines[0].trim())
  const counts = lines[1].trim().split(/[,\s]+/).map(Number)
  const D = Number(lines[2].trim())
  // 构造信道列表(容量为 2^i 的信道 counts[i] 个)
  const items = []
  for (let i = 0; i <= R; i++) {
    for (let j = 0; j < (counts[i] || 0); j++) items.push(2 ** i)
  }
  const total = items.reduce((s, x) => s + x, 0)

  const can = (k) => {
    const heap = new MaxHeap()
    for (let i = 0; i < k; i++) heap.push(D)
    const sorted = items.slice().sort((a, b) => b - a)
    for (const c of sorted) {
      if (heap.size() === 0) break
      const need = heap.pop()
      const nv = need - c
      if (nv > 0) heap.push(nv)
    }
    return heap.size() === 0
  }

  let lo = 0
  let hi = Math.floor(total / D)
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (can(mid)) lo = mid
    else hi = mid - 1
  }
  return lo
}

console.log(main(['5', '10 5 0 1 3 2', '30']))
