// 简易内存池:REQUEST 分配连续内存(优先低地址),RELEASE 释放;失败输出 error
function main(n, ops) {
  const blocks = [] // { start, size }
  const out = []
  const findFree = (size) => {
    const sorted = blocks.slice().sort((a, b) => a.start - b.start)
    let cursor = 0
    for (const b of sorted) {
      if (b.start - cursor >= size) return [cursor, size]
      cursor = Math.max(cursor, b.start + b.size)
    }
    if (100 - cursor >= size) return [cursor, size]
    return null
  }
  for (const op of ops) {
    const eq = op.indexOf('=')
    const cmd = op.slice(0, eq)
    const val = eq < 0 ? NaN : parseInt(op.slice(eq + 1), 10)
    if (cmd === 'REQUEST') {
      if (!Number.isInteger(val) || val < 1) {
        out.push('error')
        continue
      }
      const blk = findFree(val)
      if (!blk) {
        out.push('error')
        continue
      }
      blocks.push({ start: blk[0], size: blk[1] })
      out.push(String(blk[0]))
    } else if (cmd === 'RELEASE') {
      const i = blocks.findIndex((b) => b.start === val)
      if (i < 0) {
        out.push('error')
        continue
      }
      blocks.splice(i, 1)
    } else {
      out.push('error')
    }
  }
  return out.join('\n')
}

console.log(main(2, ['REQUEST=10', 'REQUEST=20']))
