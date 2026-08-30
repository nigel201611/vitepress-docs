function main(lines) {
  const n = Number(lines[0].trim())
  const k = Number(lines[1].trim())
  const lists = []
  for (let i = 2; i < lines.length; i++) {
    const s = lines[i].trim()
    if (s === '') continue
    lists.push(s.split(/[,\s]+/).map(Number))
  }
  const windows = Array.from({ length: n }, () => [])

  const place = (elem, intend) => {
    // 从目标窗口开始向后查找第一个未满的窗口(循环查找),全部已满则丢弃
    for (let step = 0; step < n; step++) {
      const idx = (intend + step) % n
      if (windows[idx].length < k) {
        windows[idx].push(elem)
        return true
      }
    }
    return false
  }

  // 按轮次处理:第 r 轮时,每个列表的第 r*N 到 r*N+N-1 个元素依次放到窗口 1..N
  outer: for (let r = 0; ; r++) {
    for (const list of lists) {
      const base = r * n
      for (let j = 0; j < n; j++) {
        const elem = list[base + j]
        if (elem === undefined) continue
        place(elem, j)
      }
    }
    // 所有窗口已满,或所有列表耗尽则结束
    let full = true
    let hasMore = false
    for (const w of windows) {
      if (w.length < k) full = false
    }
    for (const list of lists) {
      if (list.length > (r + 1) * n) hasMore = true
    }
    if (full || !hasMore) break outer
  }
  const result = []
  for (const w of windows) result.push(...w)
  return result.join(' ')
}

console.log(main(['4', '7', '0 1 2 3 4 5 6 7 8 9', '10 11 12 13 14 15 16 17 18 19', '20 21 22 23 24 25 26 27 28 29']))
