// 59. 分月饼
// 输入：m 个员工，n 个月饼（m<=n）
// 每人至少 1 个月饼，按序号从 1 到 m 分到的数量递减（Max1>=Max2>=...>=Maxm），且相邻差值 <=3
// 输出：有多少种分法（1+3 和 3+1 算同一种分法）
function main(m, n) {
  if (n < m) return 0
  const memo = new Map()
  // pos：当前员工位置；prev：前一个员工分到的数量；rem：剩余月饼数
  function dfs(pos, prev, rem) {
    if (pos === m) return rem === 0 ? 1 : 0
    const left = m - pos
    if (rem < left) return 0
    if (rem > prev * left + 3 * (left * (left - 1)) / 2) return 0
    const key = pos + ',' + prev + ',' + rem
    if (memo.has(key)) return memo.get(key)
    let hi = Math.min(rem - (left - 1), prev)
    let lo = Math.max(1, prev - 3)
    let total = 0
    for (let x = hi; x >= lo; x--) {
      total += dfs(pos + 1, x, rem - x)
    }
    memo.set(key, total)
    return total
  }
  function start(f) { return dfs(1, f, n - f) }
  // 第一个员工（最多者）数量从 ceil(n/m) 到 n-(m-1)
  let ans = 0
  const maxFirst = n - (m - 1)
  const minFirst = Math.ceil(n / m)
  for (let f = maxFirst; f >= minFirst; f--) {
    ans += start(f)
  }
  return ans
}

console.log(main(2, 4))
