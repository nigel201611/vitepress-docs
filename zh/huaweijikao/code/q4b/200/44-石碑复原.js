// 石碑复原:碎片文字全排列(去重,升序输出,拼接输出)
function main(n, pieces) {
  const counts = new Map()
  for (const p of pieces) counts.set(p, (counts.get(p) || 0) + 1)
  const keys = [...counts.keys()].sort()
  const res = []
  const cur = []
  const dfs = () => {
    if (cur.length === n) {
      res.push(cur.join(''))
      return
    }
    for (const k of keys) {
      if (counts.get(k) > 0) {
        counts.set(k, counts.get(k) - 1)
        cur.push(k)
        dfs()
        cur.pop()
        counts.set(k, counts.get(k) + 1)
      }
    }
  }
  dfs()
  return res.join('\n')
}

console.log(main(3, ['a', 'b', 'c']))
