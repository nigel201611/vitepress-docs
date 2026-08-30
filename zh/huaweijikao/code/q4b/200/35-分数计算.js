// 分数计算:四则运算(+ - * /)和括号,分数化为最简,除零输出ERROR
function main(expr) {
  const s = expr.replace(/\s+/g, '')
  let pos = 0
  const fail = () => {
    throw new Error('ERROR')
  }
  const gcd = (a, b) => {
    a = a < 0n ? -a : a
    b = b < 0n ? -b : b
    while (b) {
      const t = a % b
      a = b
      b = t
    }
    return a || 1n
  }
  const reduce = (n, d) => {
    if (d === 0n) fail()
    if (d < 0n) {
      n = -n
      d = -d
    }
    const g = gcd(n, d)
    return [n / g, d / g]
  }
  const isDigit = (c) => c >= '0' && c <= '9'

  function parseNum() {
    let t = ''
    while (pos < s.length && isDigit(s[pos])) t += s[pos++]
    if (!t) fail()
    return BigInt(t)
  }

  function parseFactor() {
    if (s[pos] === '(') {
      pos++
      const [n, d] = parseExpr()
      if (s[pos] !== ')') fail()
      pos++
      return [n, d]
    }
    if (isDigit(s[pos])) {
      const v = parseNum()
      return [v, 1n]
    }
    fail()
  }

  function parseTerm() {
    let [n, d] = parseFactor()
    while (pos < s.length && (s[pos] === '*' || s[pos] === '/')) {
      const op = s[pos++]
      const [n2, d2] = parseFactor()
      if (op === '*') {
        n *= n2
        d *= d2
      } else {
        if (n2 === 0n) fail()
        n *= d2
        d *= n2
      }
      ;[n, d] = reduce(n, d)
    }
    return [n, d]
  }

  function parseExpr() {
    let [n, d] = parseTerm()
    while (pos < s.length && (s[pos] === '+' || s[pos] === '-')) {
      const op = s[pos++]
      const [n2, d2] = parseTerm()
      if (op === '+') {
        n = n * d2 + n2 * d
        d = d * d2
      } else {
        n = n * d2 - n2 * d
        d = d * d2
      }
      ;[n, d] = reduce(n, d)
    }
    return [n, d]
  }

  try {
    const [n, d] = parseExpr()
    if (pos !== s.length) return 'ERROR'
    if (n === 0n) return '0'
    if (d === 1n) return String(n)
    return `${n}/${d}`
  } catch (e) {
    return 'ERROR'
  }
}

console.log(main('1 + 5 * 7 / 8'))
console.log(main('1 / (0 - 5)'))
