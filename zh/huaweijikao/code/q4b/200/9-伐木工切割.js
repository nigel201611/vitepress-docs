function main(x) {
  // best[x] = { prod: 最大乘积, cnt: 最少段数, parts: 各木段长度(升序) }
  const best = new Array(x + 1)
  const cmp = (a, b) => {
    if (a.prod !== b.prod) return b.prod - a.prod // 乘积越大越好
    if (a.cnt !== b.cnt) return a.cnt - b.cnt // 段数越少越好
    for (let i = 0; i < Math.min(a.parts.length, b.parts.length); i++) {
      if (a.parts[i] !== b.parts[i]) return a.parts[i] - b.parts[i]
    }
    return a.parts.length - b.parts.length
  }
  best[0] = null
  for (let i = 1; i <= x; i++) {
    let cur = { prod: i, cnt: 1, parts: [i] } // 不切割
    for (let a = 1; a < i; a++) {
      if (best[i - a] === null) continue
      const parts = [a, ...best[i - a].parts].sort((m, n2) => m - n2)
      const cand = { prod: a * best[i - a].prod, cnt: 1 + best[i - a].cnt, parts }
      if (cmp(cand, cur) < 0) cur = cand
    }
    best[i] = cur
  }
  return best[x].parts.join(' ')
}

console.log(main(10))
