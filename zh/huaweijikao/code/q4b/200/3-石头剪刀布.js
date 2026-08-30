function main(lines) {
  const players = []
  for (const line of lines) {
    const parts = line.trim().split(/\s+/)
    if (parts.length < 2) continue
    players.push({ id: parts[0], shape: parts[1] })
  }
  if (players.length === 0) return 'NULL'
  const count = { A: 0, B: 0, C: 0 }
  const ids = { A: [], B: [], C: [] }
  for (const p of players) {
    if (!(p.shape in count)) return 'NULL'
    count[p.shape]++
    ids[p.shape].push(p.id)
  }
  const shapes = Object.keys(count).filter((s) => count[s] > 0)
  if (shapes.length === 3) return 'NULL' // 三方优势循环,平局
  if (shapes.length === 1) return 'NULL' // 只有一种出拳形状,平局
  // 胜负规则:A > B, B > C, C > A (左边优于右边)
  const beats = { A: 'B', B: 'C', C: 'A' }
  const [s1, s2] = shapes
  const winner = beats[s1] === s2 ? s1 : s2
  return ids[winner].sort().join('\n')
}

console.log(main(['abc1 A', 'xyz B']))
