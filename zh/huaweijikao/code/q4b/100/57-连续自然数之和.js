// 57 连续自然数之和: 计算整数 T 的连续自然数之和表达式, 自然数个数少的优先输出
// 输入: 目标整数 T

function main(T) {
  const lines = []
  let count = 0
  let k = 1
  while ((k * (k - 1)) / 2 < T) {
    const base = (k * (k - 1)) / 2
    const a = (T - base) / k
    if (Number.isInteger(a) && a >= 1) {
      const seq = []
      for (let i = 0; i < k; i++) seq.push(a + i)
      lines.push(T + '=' + seq.join('+'))
      count++
    }
    k++
  }
  lines.push('Result ' + count)
  return lines.join('\n')
}

console.log(main(9))
