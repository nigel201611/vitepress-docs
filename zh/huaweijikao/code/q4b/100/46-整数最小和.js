// 46 整数最小和
// 字符串只含 a-zA-Z+-。提取所有合法整数（正整数：一个或多个0-9；负整数：-开头接一个或多个0-9），
// 求它们组成的“最小和”：负整数整体保留使和更小；正整数拆成单个数字相加使和最小

function main(s) {
  const nums = s.match(/-?\d+/g) || []
  let sum = 0
  for (const n of nums) {
    if (n[0] === '-') {
      sum += Number(n) // 负数整体保留
    } else {
      for (const d of n) {
        sum += Number(d) // 正数拆成单个数字
      }
    }
  }
  return sum
}

console.log(main('bb1234aa'))
