// 42 计费表跳过4
// 计费表从1开始计数，任何数字位置遇到数字4就直接跳过，
// 即实际费用 f 对应的表面读数是第 f 个不含数字4的正整数。
// 给定表面读数 N，实际费用 = 1~N 中不含数字4的整数的个数

function countNo4(n) {
  const s = String(n)
  const m = s.length
  let cnt = 0
  for (let i = 0; i < m; i++) {
    const lim = Number(s[i])
    for (let x = 0; x < lim; x++) {
      if (x !== 4) cnt += Math.pow(9, m - 1 - i)
    }
    if (lim === 4) return cnt // N本身含4的情况：后续前缀与N相等且本位为4，全部无效
  }
  cnt += 1 // N本身不含4
  return cnt
}

function main(n) {
  return countNo4(n) - 1 // 去掉数字0，实际费用从1开始计
}

console.log(main(5))
