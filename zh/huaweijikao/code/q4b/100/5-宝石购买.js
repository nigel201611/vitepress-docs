// 5 宝石购买：连续编号购买总价<=v的最大宝石个数

function main(n, gems, v) {
  let left = 0
  let sum = 0
  let best = 0
  for (let right = 0; right < n; right++) {
    sum += gems[right]
    while (sum > v) {
      sum -= gems[left]
      left++
    }
    best = Math.max(best, right - left + 1)
  }
  return best
}

console.log(main(5, [1, 2, 3, 4, 5], 6))
