function main(n) {
  let w = []
  let i = 0
  while (i < n) {
    w.push(n % 2)
    n = Math.floor(n / 2)
  }

  w.push(0)
  let len = w.length
  for (let i = 0; i < len; i++) {
    if (i + 1 < len && w[i] === 1 && w[i + 1] === 0) {
      ;[w[i], w[i + 1]] = [w[i + 1], w[i]]

      let left = 0,
        right = i - 1
      while (left < right) {
        // 低位是1，那么++，否则需要该低位的0交换到高位
        while (left < right && w[left] === 1) {
          left++
        }
        while (left < right && w[right] === 0) {
          right--
        }
        if (left < right) {
          ;[w[left], w[right]] = [w[right], w[left]]
          left++
          right++
        }
      }
      break
    }
  }

  console.log(w)
  let res = 0
  for (let j = 0; j < len; j++) {
    if (w[j] === 1) {
      res += 1 << j
    }
  }

  return res
}

console.log(main(7))
