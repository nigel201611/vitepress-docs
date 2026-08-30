// 4 王者荣耀表演赛：10人分两队各5人,实力差绝对值最小

function main(arr) {
  const total = arr.reduce((a, b) => a + b, 0)
  let best = Infinity
  for (let mask = 0; mask < (1 << 10); mask++) {
    let count = 0
    for (let i = 0; i < 10; i++) {
      if (mask & (1 << i)) count++
    }
    if (count !== 5) continue
    let sum = 0
    for (let i = 0; i < 10; i++) {
      if (mask & (1 << i)) sum += arr[i]
    }
    const diff = Math.abs(total - 2 * sum)
    if (diff < best) best = diff
  }
  return best
}

console.log(main([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
