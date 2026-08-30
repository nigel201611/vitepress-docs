// 第 28 题:重复内容识别(相似字符串判断)
// 给定两个字符串(两张专辑的专辑名)与若干相似字符组:第三行起每行一组,
// 组内符号视为互相相似,且相似关系具有传递性(跨行共同符号时也彼此相似)。
// 判断两个字符串是否相似:
//   1) 同位置字符相同,或分别属于同一相似组,即视为匹配;
//   2) 相似组中出现 "***" 时,"***" 可匹配任意长度的内容,例如相似组含 "***" 时,
//      "异世邪君(人气玄幻作家)" 与 "异世邪君" 判为相似,相似符号返回 ***;
//   3) 相似时输出 True 和相似符号对;不相似时输出 False 和第一个字符串不相似的部分。
// 实现:用并查集把所有出现过的符号合并成相似类;记忆化搜索 dp(i,j) 判断剩余后缀能否匹配;
// 回溯时按"相同字符 -> 相似组 -> ***"的优先级收集符号对,即得到输出内容。
function main(nameA, nameB, groups) {
  const a = nameA
  const b = nameB
  const lines = groups.map((g) => (Array.isArray(g) ? g : g.split(/\s+/).filter(Boolean)))
  const parent = new Map()
  const find = (t) => {
    if (!parent.has(t)) parent.set(t, t)
    let r = t
    while (parent.get(r) !== r) r = parent.get(r)
    let c = t
    while (parent.get(c) !== r) {
      const n = parent.get(c)
      parent.set(c, r)
      c = n
    }
    return r
  }
  const unite = (x, y) => parent.set(find(x), find(y))
  for (const line of lines) {
    for (const t of line) find(t)
    for (let i = 1; i < line.length; i++) unite(line[0], line[i])
  }
  const classes = new Map() // 相似类根 -> 符号集合
  for (const line of lines)
    for (const t of line) {
      const r = find(t)
      if (!classes.has(r)) classes.set(r, new Set())
      classes.get(r).add(t)
    }
  const hasStar = [...classes.values()].some((s) => s.has('***'))
  const nA = a.length
  const nB = b.length
  const memo = new Map()
  const match = (i, j) => {
    if (i === nA && j === nB) return true
    const key = i * 1000 + j
    if (memo.has(key)) return memo.get(key)
    let res = false
    if (i < nA && j < nB && a[i] === b[j]) res = match(i + 1, j + 1)
    if (!res) {
      outer: for (const set of classes.values()) {
        for (const tA of set) {
          if (tA === '***') continue
          const la = tA.length
          if (i + la > nA || a.substr(i, la) !== tA) continue
          for (const tB of set) {
            if (tB === '***') continue
            const lb = tB.length
            if (j + lb > nB || b.substr(j, lb) !== tB) continue
            if (match(i + la, j + lb)) {
              res = true
              break outer
            }
          }
        }
      }
    }
    if (!res && hasStar) {
      for (let k = i + 1; k <= nA; k++) if (match(k, j)) { res = true; break }
      if (!res) for (let k = j + 1; k <= nB; k++) if (match(i, k)) { res = true; break }
    }
    memo.set(key, res)
    return res
  }
  const similar = match(0, 0)
  const pairs = []
  if (similar) {
    let i = 0
    let j = 0
    while (i < nA && j < nB) {
      if (a[i] === b[j]) {
        i++
        j++
        continue
      }
      let moved = false
      outer: for (const set of classes.values()) {
        for (const tA of set) {
          if (tA === '***') continue
          const la = tA.length
          if (i + la > nA || a.substr(i, la) !== tA) continue
          for (const tB of set) {
            if (tB === '***') continue
            const lb = tB.length
            if (j + lb > nB || b.substr(j, lb) !== tB) continue
            if (match(i + la, j + lb)) {
              if (tA !== tB) pairs.push(tA + ' ' + tB)
              i += la
              j += lb
              moved = true
              break outer
            }
          }
        }
      }
      if (!moved) {
        let done = false
        for (let k = i + 1; k <= nA; k++) {
          if (match(k, j)) { pairs.push('***'); i = k; done = true; break }
        }
        if (!done)
          for (let k = j + 1; k <= nB; k++) {
            if (match(i, k)) { pairs.push('***'); j = k; done = true; break }
          }
        if (!done) break
      }
    }
    return ['True', ...pairs].join('\n')
  }
  // 不相似:找出第一个字符串中不相似(无法匹配)的连续片段,用空格分隔
  const bad = []
  let cur = ''
  let i = 0
  let j = 0
  while (i < nA) {
    if (j < nB && a[i] === b[j]) {
      i++
      j++
      if (cur) { bad.push(cur); cur = '' }
      continue
    }
    let moved = false
    if (j < nB) {
      outer: for (const set of classes.values()) {
        for (const tA of set) {
          if (tA === '***') continue
          const la = tA.length
          if (i + la > nA || a.substr(i, la) !== tA) continue
          for (const tB of set) {
            if (tB === '***') continue
            const lb = tB.length
            if (j + lb > nB || b.substr(j, lb) !== tB) continue
            if (tA !== tB) pairs.push(tA + ' ' + tB)
            i += la
            j += lb
            moved = true
            break outer
          }
        }
      }
    }
    if (moved) continue
    cur += a[i]
    i++
  }
  if (cur) bad.push(cur)
  return ['False', bad.join(' ')].join('\n')
}

console.log(main('林汉达上下五千年', '林汉达上下5千年', ['五 5 ⑤ 伍 wu']))
