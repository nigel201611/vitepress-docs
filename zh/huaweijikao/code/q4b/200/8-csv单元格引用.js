function main(line) {
  const cells = line.split(',')
  if (cells.length > 26) return '-1'
  const memo = new Array(cells.length).fill(null)
  const memoDone = new Array(cells.length).fill(false)

  const expand = (idx) => {
    if (idx < 0 || idx >= cells.length) return null
    if (memoDone[idx]) return memo[idx]
    if (memo[idx] !== null) return null // 循环引用
    memo[idx] = '' // 标记展开中,防止循环
    const src = cells[idx]
    let result = ''
    let i = 0
    while (i < src.length) {
      if (src[i] === '<') {
        const end = src.indexOf('>', i)
        if (end === -1) return null // 缺少右尖括号
        const ref = src.slice(i + 1, end)
        if (!/^[A-Z]$/.test(ref)) return null
        if (ref.charCodeAt(0) - 65 >= cells.length) return null
        const val = expand(ref.charCodeAt(0) - 65)
        if (val === null) return null
        result += val
        i = end + 1
      } else if (src[i] === '>') {
        return null // 多余的右尖括号
      } else {
        result += src[i]
        i++
      }
    }
    if (result.length > 100) return null
    memo[idx] = result
    memoDone[idx] = true
    return result
  }

  const output = []
  for (let i = 0; i < cells.length; i++) {
    const v = expand(i)
    if (v === null) return '-1'
    output.push(v)
  }
  return output.join(',')
}

console.log(main('1,2<A>00'))
