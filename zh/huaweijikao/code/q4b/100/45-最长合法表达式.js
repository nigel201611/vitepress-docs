// 45 最长合法表达式
// 从字符串中提取最长的合法简单数学表达式（只含0-9数字和+ - *，操作符不连续），
// 计算其值；多个等长取第一个；找不到则返回0

function evalExpr(s) {
  const t = s.match(/\d+|[-+*]/g)
  let res = 0
  let term = Number(t[0])
  let i = 1
  while (i < t.length) {
    const op = t[i]
    const n = Number(t[i + 1])
    if (op === '*') {
      term *= n
    } else {
      res += term
      term = op === '-' ? -n : n
    }
    i += 2
  }
  return res + term
}

function main(str) {
  // 合法表达式：以数字开头，后面只能跟 运算符+数字 的组合
  const matched = str.match(/[0-9](?:[-+*][0-9])*/g) || []
  if (matched.length === 0) {
    return 0
  }
  let best = matched[0]
  for (const m of matched) {
    if (m.length > best.length) best = m
  }
  return evalExpr(best)
}

console.log(main('1-2abcd'))
