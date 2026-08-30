function main(input, output) {
  const deque = []
  let pos = 0
  let result = ''
  const take = (t) => {
    const idx = deque.indexOf(t)
    if (idx !== -1) {
      if (idx === 0) {
        result += 'L'
        deque.shift()
      } else if (idx === deque.length - 1) {
        result += 'R'
        deque.pop()
      } else {
        return false
      }
      return true
    }
    // 继续放入篮球,直到放入 t
    while (pos < input.length && input[pos] !== t) {
      deque.push(input[pos])
      pos++
    }
    if (pos === input.length) return false
    deque.push(input[pos])
    pos++
    if (deque.length === 1) {
      result += 'L'
    } else {
      result += 'R'
    }
    deque.pop()
    return true
  }
  for (const t of output) {
    if (!take(t)) return 'NO'
  }
  return result
}

console.log(main([4, 5, 6, 7, 0, 1, 2], [6, 4, 0, 1, 2, 5, 7]))
console.log(main([1, 2, 3, 4, 5], [5, 1, 3, 2, 4]))
