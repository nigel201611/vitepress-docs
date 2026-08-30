// 18 连续正整数分解

function main(n) {
  for (let m = 2; (m * (m + 1)) / 2 <= n; m++) {
    if ((2 * n) % m !== 0) continue
    const t = (2 * n) / m - m + 1
    if (t % 2 === 0 && t / 2 >= 1) {
      const a = t / 2
      const seq = Array.from({ length: m }, (_, i) => a + i)
      return n + '=' + seq.join('+')
    }
  }
  return 'N'
}

console.log(main(21))
