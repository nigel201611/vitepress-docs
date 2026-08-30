function main(lines) {
  const tokens = []
  for (const line of lines) {
    for (const t of line.trim().split(/[,\s]+/)) {
      if (t !== '') tokens.push(Number(t))
    }
  }
  const [wa, wb, wt, pa, pb] = tokens
  let best = -1
  // 枚举货物A的件数,剩余重量必须恰好装满货物B的整数件
  for (let a = 1; a * wa < wt; a++) {
    const rem = wt - a * wa
    if (rem % wb !== 0) continue
    const b = rem / wb
    if (b < 1) continue
    best = Math.max(best, a * pa + b * pb)
  }
  return best === -1 ? 0 : best
}

console.log(main(['10 8 36 15 7']))
