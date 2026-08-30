// 50 幸运数字: 求 k 在 m 进制表示中幸运数字 n 出现的个数
// 输入: k(价值), n(幸运数字), m(进制); 输入非法时输出 0

function main(k, n, m) {
  if (!Number.isInteger(k) || !Number.isInteger(n) || !Number.isInteger(m)) {
    return 0
  }
  if (k <= 0 || n < 0 || n >= m || m <= 1) {
    return 0
  }
  // 将 k 转换为 m 进制
  let num = k
  let digits = ''
  while (num > 0) {
    const r = num % m
    digits = (r < 10 ? String(r) : String.fromCharCode(87 + r)) + digits
    num = Math.floor(num / m)
  }
  if (digits === '') digits = '0'
  const target = n < 10 ? String(n) : String.fromCharCode(87 + n)
  let count = 0
  for (const ch of digits) {
    if (ch === target) count++
  }
  return count
}

console.log(main(10, 2, 4))

// 非法输入示例
console.log(main(10, 4, 4))
console.log(main(-5, 2, 4))
