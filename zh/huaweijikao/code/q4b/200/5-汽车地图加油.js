class MaxHeap {
  constructor() {
    this.a = []
  }
  push(item) {
    const a = this.a
    a.push(item)
    let i = a.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (a[p].f < a[i].f) {
        ;[a[p], a[i]] = [a[i], a[p]]
        i = p
      } else break
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
        if (l < a.length && a[l].f > a[m].f) m = l
        if (r < a.length && a[r].f > a[m].f) m = r
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
  const grid = []
  let m = 0
  let n = 0
  let first = true
  const DIRS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  for (const line of lines) {
    const s = line.trim()
    if (!s) continue
    const tokens = s.split(/[,\s]+/).map(Number)
    if (first) {
      m = tokens[0]
      n = tokens[1]
      first = false
    } else {
      grid.push(tokens)
    }
  }
  const start = grid[0][0]
  if (start === 0) return -1 // 起点是障碍物,无法出发

  const can = (init) => {
    const dist = Array.from({ length: m }, () => new Array(n).fill(-Infinity))
    let startFuel = start === -1 ? 100 : init - start
    if (startFuel < 0) return false
    dist[0][0] = startFuel
    const heap = new MaxHeap()
    heap.push({ r: 0, c: 0, f: startFuel })
    while (heap.size()) {
      const cur = heap.pop()
      if (cur.f < dist[cur.r][cur.c]) continue
      if (cur.r === m - 1 && cur.c === n - 1) return true
      if (cur.f === 0) continue // 没有油量无法继续移动
      for (const [dr, dc] of DIRS) {
        const nr = cur.r + dr
        const nc = cur.c + dc
        if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue
        const v = grid[nr][nc]
        if (v === 0) continue // 障碍物
        const nf = v === -1 ? 100 : cur.f - v
        if (nf < 0) continue
        if (nf > dist[nr][nc]) {
          dist[nr][nc] = nf
          heap.push({ r: nr, c: nc, f: nf })
        }
      }
    }
    return false
  }

  let lo = 0
  let hi = 26611 // 200 * 200 * 333 + 1,足够大但避免溢出
  if (!can(hi)) return -1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (can(mid)) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  return lo
}

console.log(main(['2,2', '10,20', '30,40']))
console.log(main(['2,2', '10,20', '30,0']))
console.log(main(['3,3', '10,20,30', '-1,5,40', '1,2,10']))
